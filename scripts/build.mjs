import { existsSync, renameSync, rmSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { spawn } from 'node:child_process';
import { verifyExport } from './verify-export.mjs';

const root = resolve(import.meta.dirname, '..');
const output = join(root, 'dist');
if (output !== resolve(root, 'dist'))
  throw new Error('Invalid build directory');
rmSync(output, { recursive: true, force: true });
let stdout = '',
  stderr = '';
const result = await new Promise((done) => {
  const child = spawn(
    process.execPath,
    ['node_modules/vinext/dist/cli.js', 'build'],
    { cwd: root, env: process.env, stdio: ['ignore', 'pipe', 'pipe'] },
  );
  child.stdout.on('data', (chunk) => {
    stdout += chunk;
    process.stdout.write(chunk);
  });
  child.stderr.on('data', (chunk) => {
    stderr += chunk;
    process.stderr.write(chunk);
  });
  child.on('error', (error) => {
    console.error(error);
    done(1);
  });
  child.on('close', (status) => done(status ?? 1));
});
// A known native shutdown assertion occurs AFTER successful export on Windows.
// Never accept other errors, stale HTML, or an export with missing assets.
const lateWindowsAssertion =
  process.platform === 'win32' &&
  stdout.includes('Build complete.') &&
  stdout.includes('Prerendered') &&
  /Assertion failed: !\(handle->flags & UV_HANDLE_CLOSING\)/.test(stderr);
if (result !== 0 && !lateWindowsAssertion) process.exit(result);

// Pages already mounts the artifact at /repository/. Vinext also nests
// assetPrefix on disk; normalize this without changing the public URLs.
const repository = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const base =
  process.env.GITHUB_ACTIONS === 'true' &&
  repository &&
  !repository.endsWith('.github.io')
    ? '/' + repository
    : '';
const client = join(output, 'client');
if (base) {
  const nested = join(client, repository, '_next');
  if (existsSync(nested)) {
    if (existsSync(join(client, '_next')))
      throw new Error('Ambiguous asset output');
    renameSync(nested, join(client, '_next'));
  }
}
verifyExport(client, base);
if (result !== 0)
  console.warn(
    'Validated fresh static export; known Windows native shutdown assertion only.',
  );
