import assert from 'node:assert/strict';
import { readdirSync, statSync } from 'node:fs';
import { resolve, join, relative, sep } from 'node:path';
const directory = resolve(import.meta.dirname, '..', 'dist/client');
const base = new URL(process.argv[2] ?? 'http://127.0.0.1:4173/');
assert.ok(base.pathname.endsWith('/'), 'Preview URL must end in /');
const list = (dir) =>
  readdirSync(dir).flatMap((name) =>
    statSync(join(dir, name)).isDirectory()
      ? list(join(dir, name))
      : [join(dir, name)],
  );
const files = list(directory);
const queue = [...files];
await Promise.all(
  Array.from({ length: 8 }, async () => {
    while (queue.length) {
      const file = queue.shift();
      const path = relative(directory, file)
        .split(sep)
        .map(encodeURIComponent)
        .join('/');
      const response = await fetch(new URL(path, base), { method: 'HEAD' });
      assert.equal(response.status, 200, path + ' HTTP status');
      const type = response.headers.get('content-type') ?? '';
      if (path.endsWith('.js'))
        assert.ok(type.includes('javascript'), path + ' MIME');
      if (path.endsWith('.css'))
        assert.ok(type.includes('text/css'), path + ' MIME');
      if (path.endsWith('.png'))
        assert.ok(type.includes('image/png'), path + ' MIME');
    }
  }),
);
const html = await (await fetch(base)).text();
for (const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  if (/^(https?:|data:|mailto:)/.test(match[1])) continue;
  const url = new URL(match[1].replaceAll('&amp;', '&'), base);
  assert.ok(
    url.pathname.startsWith(base.pathname),
    'Reference outside Pages path: ' + url,
  );
  assert.equal(
    (await fetch(url, { method: 'HEAD' })).status,
    200,
    url.toString(),
  );
}
const missing = await fetch(new URL('__missing-asset-test__.js', base));
assert.equal(missing.status, 404, 'Unknown asset must not return index.html');
console.log(
  'HTTP check passed: ' +
    files.length +
    ' files, correct JS/CSS/image types, HTML asset URLs, and missing-file 404.',
);
