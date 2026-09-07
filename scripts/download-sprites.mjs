// Optional maintenance task, not part of the build. Downloads unmodified icons.
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
const directory = join(import.meta.dirname, '..', 'public', 'pokemon');
await mkdir(directory, { recursive: true });
const queue = Array.from({ length: 151 }, (_, index) => index + 1);
await Promise.all(
  Array.from({ length: 8 }, async () => {
    while (queue.length) {
      const id = queue.shift();
      const response = await fetch(
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' +
          id +
          '.png',
      );
      if (!response.ok)
        throw new Error('Sprite ' + id + ': ' + response.status);
      const bytes = Buffer.from(await response.arrayBuffer());
      if (bytes.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a')
        throw new Error('Invalid PNG ' + id);
      await writeFile(join(directory, id + '.png'), bytes);
    }
  }),
);
console.log('151 original PNG icons downloaded and validated.');
