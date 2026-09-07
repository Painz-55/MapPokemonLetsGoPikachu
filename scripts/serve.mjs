import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { resolve, extname, sep } from 'node:path';
const root = resolve(import.meta.dirname, '..', 'dist/client');
const baseIndex = process.argv.indexOf('--base');
const base =
  baseIndex < 0 ? '' : process.argv[baseIndex + 1].replace(/\/$/, '');
const port = Number(process.env.PORT ?? 4173);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
};
createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405);
    res.end();
    return;
  }
  let pathname;
  try {
    pathname = decodeURIComponent(
      new URL(req.url, 'http://localhost').pathname,
    );
  } catch {
    res.writeHead(400);
    res.end();
    return;
  }
  if (pathname === base && base) {
    res.writeHead(302, { Location: base + '/' });
    res.end();
    return;
  }
  if (base && !pathname.startsWith(base + '/')) {
    res.writeHead(404);
    res.end('Outside repository');
    return;
  }
  const relative = base ? pathname.slice(base.length) : pathname;
  const file = resolve(
    root,
    '.' + relative + (relative.endsWith('/') ? 'index.html' : ''),
  );
  if (
    !file.startsWith(root + sep) ||
    !existsSync(file) ||
    !statSync(file).isFile()
  ) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }
  res.writeHead(200, {
    'Content-Type': types[extname(file)] ?? 'application/octet-stream',
    'Cache-Control': 'no-store',
  });
  if (req.method === 'HEAD') res.end();
  else createReadStream(file).pipe(res);
}).listen(port, '127.0.0.1', () =>
  console.log('Static preview: http://127.0.0.1:' + port + base + '/'),
);
