import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, join, sep } from 'node:path';
import { pathToFileURL } from 'node:url';

export function verifyExport(directory, base = '') {
  const root = resolve(directory);
  const html = readFileSync(join(root, 'index.html'), 'utf8');
  if (!/<!doctype html>/i.test(html)) throw new Error('Missing exported HTML');
  const urls = [...html.matchAll(/(?:src|href)="([^"#]+)"/g)].map((m) => m[1]);
  const local = urls.filter((url) => !/^(https?:|data:|mailto:)/.test(url));
  for (const url of local) {
    const pathname = new URL(
      url.replaceAll('&amp;', '&'),
      'https://pages.test' + base + '/',
    ).pathname;
    if (base && !pathname.startsWith(base + '/'))
      throw new Error('Asset outside repository: ' + url);
    const file = resolve(
      root,
      '.' + (base ? pathname.slice(base.length) : pathname),
    );
    if (!file.startsWith(root + sep))
      throw new Error('Unsafe asset URL: ' + url);
    if (!existsSync(decodeURIComponent(file)))
      throw new Error('Missing public asset: ' + url);
  }
  const files = (dir) =>
    readdirSync(dir).flatMap((name) =>
      statSync(join(dir, name)).isDirectory()
        ? files(join(dir, name))
        : [join(dir, name)],
    );
  const assets = files(root);
  if (
    !assets.some((p) => p.endsWith('.css')) ||
    !assets.some((p) => p.endsWith('.js'))
  )
    throw new Error('CSS/JS not exported');
  if (!existsSync(join(root, '.nojekyll')))
    throw new Error('Missing .nojekyll');
  console.log(
    'Export verified: ' +
      local.length +
      ' HTML references, ' +
      assets.length +
      ' files, base ' +
      (base || '/'),
  );
}
if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
)
  verifyExport(process.argv[2] ?? 'dist/client', process.argv[3] ?? '');
