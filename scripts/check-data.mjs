import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import ts from 'typescript';
const require = createRequire(import.meta.url);
// Test authored TypeScript data without requiring a second runtime dependency.
require.extensions['.ts'] = (module, path) =>
  module._compile(
    ts.transpileModule(readFileSync(path, 'utf8'), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        esModuleInterop: true,
      },
    }).outputText,
    path,
  );
const root = resolve(import.meta.dirname, '..');
const { places, placeById } = require('../lib/atlas-data.ts');
const { cityData } = require('../lib/city-data.ts');
const { ladderData, legendaryPosition } = require('../lib/floor-data.ts');
const { pokemonId } = require('../lib/pokemon.ts');
assert.equal(places.length, 49);
assert.equal(places.filter((p) => p.kind === 'route').length, 25);
assert.equal(new Set(places.map((p) => p.id)).size, places.length);
assert.equal(places.filter((p) => p.legendary).length, 4);
assert.equal(Object.keys(cityData).length, 11);
assert.equal(Object.keys(pokemonId).length, 151);
let encounters = 0,
  points = 0,
  floors = 0;
for (const place of places) {
  for (const id of place.connections)
    assert.ok(placeById[id], place.id + ' invalid connection ' + id);
  if (place.image)
    assert.ok(
      existsSync(resolve(root, 'public/maps', place.image)),
      place.image,
    );
  for (const f of place.floors ?? []) {
    const [x, y, w, h] = f.box;
    assert.ok(
      x >= 0 &&
        y >= 0 &&
        w > 0 &&
        h > 0 &&
        x + w <= place.size[0] &&
        y + h <= place.size[1],
      place.id + ' invalid floor ' + f.id,
    );
    floors++;
  }
  for (const e of place.encounters ?? []) {
    assert.ok(pokemonId[e.name], place.id + ' unknown Pokemon ' + e.name);
    assert.notEqual(
      e.version,
      'Eevee',
      place.id + ' wrong exclusive ' + e.name,
    );
    encounters++;
  }
  const unique = new Set(
    (place.encounters ?? []).map((e) => e.name + '|' + e.method),
  );
  assert.equal(
    unique.size,
    place.encounters?.length ?? 0,
    place.id + ' duplicate encounter',
  );
  for (const point of cityData[place.id]?.points ?? []) {
    if (point.target)
      assert.ok(placeById[point.target], point.name + ' target');
    if (point.x !== undefined)
      assert.ok(
        point.x >= 0 && point.x <= 4740 && point.y >= 0 && point.y <= 3374,
        point.name,
      );
    points++;
  }
  const legend = legendaryPosition[place.id];
  if (legend)
    assert.ok(
      place.floors?.some((f) => f.id === legend.floor),
      place.id + ' legendary floor',
    );
}
for (const [id, ladders] of Object.entries(ladderData)) {
  for (const ladder of ladders) {
    assert.ok(
      placeById[id].floors.some((f) => f.id === ladder.floor),
      id + ' ladder origin',
    );
    assert.ok(
      placeById[id].floors.some((f) => f.id === ladder.to),
      id + ' ladder destination',
    );
    assert.ok(
      ladders.some(
        (l) =>
          l.label === ladder.label &&
          l.floor === ladder.to &&
          l.to === ladder.floor,
      ),
      id + ' missing paired ladder ' + ladder.label,
    );
  }
}
for (let id = 1; id <= 151; id++) {
  const bytes = readFileSync(resolve(root, 'public/pokemon', id + '.png'));
  assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
}
assert.equal(cityData.cerulean.trade.npc, 'Tatianna');
assert.equal(cityData.indigo.trade.species, 'Exeggutor');
assert.ok(cityData.saffron.gifts.some((g) => g.name === 'Porygon'));
assert.ok(!cityData.celadon.gifts?.some((g) => g.name === 'Porygon'));
assert.ok(
  !cityData.pewter.points.some((p) =>
    p.rewards?.some((r) => r.includes('Magikarp')),
  ),
);
console.log(
  'Data verified: ' +
    places.length +
    ' locations; ' +
    floors +
    ' floors; ' +
    points +
    ' city points; ' +
    encounters +
    ' Pikachu encounter entries; 151 PNG icons.',
);
