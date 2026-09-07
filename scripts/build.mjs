import { existsSync, readFileSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

rmSync('dist', { recursive: true, force: true });

const result = spawnSync(
  process.execPath,
  ['node_modules/vinext/dist/cli.js', 'build'],
  { stdio: 'inherit', env: process.env },
);

if (result.status === 0) process.exit(0);

// Vinext beta pode encerrar com uma asserção do libuv no Windows depois de
// concluir a exportação. Aceitamos somente esse caso, após validar o HTML novo.
const output = 'dist/client/index.html';
const validWindowsExport =
  process.platform === 'win32' &&
  existsSync(output) &&
  readFileSync(output, 'utf8').includes('<!DOCTYPE html>');

if (validWindowsExport) {
  console.warn('Exportação estática concluída; ignorando encerramento tardio do Vinext no Windows.');
  process.exit(0);
}

process.exit(result.status ?? 1);
