import encounterData from './encounters.json';
import { floorData } from './floor-data';
export type Rect = [number, number, number, number];
export type Encounter = {
  name: string;
  method: string;
  version?: string;
  note?: string;
};
export type Item = { name: string; note: string };
export type Floor = { id: string; name: string; box: Rect; note?: string };
export type Place = {
  id: string;
  name: string;
  kind: 'city' | 'route' | 'dungeon' | 'forest';
  x: number;
  y: number;
  box: Rect;
  summary: string;
  connections: string[];
  source: string;
  encounters?: Encounter[];
  items?: Item[];
  image?: string;
  size?: [number, number];
  floors?: Floor[];
  note?: string;
  legendary?: {
    name: string;
    level: number;
    requirement: string;
    floor: string;
    tip: string;
  };
};
export const mapSource = 'https://www.mewmaps.org/lets-go-pikachu-eevee';
export const walkthrough =
  'https://www.pokemythology.net/detonados/detonado-lets-go-pikachu-lets-go-eevee/';
export const asset = (name: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/maps/${name}`;
const source = (slug: string) =>
  `https://www.serebii.net/pokearth/kanto/${slug}.shtml`;

const city = (
  id: string,
  name: string,
  x: number,
  y: number,
  box: Rect,
  summary: string,
  connections: string[],
): Place => ({
  id,
  name,
  kind: 'city',
  x,
  y,
  box,
  summary,
  connections,
  source: source(
    id === 'pallet'
      ? 'pallettown'
      : id === 'lavender'
        ? 'lavendertown'
        : id === 'cinnabar'
          ? 'cinnabarisland'
          : id === 'indigo'
            ? 'indigoplateau'
            : `${id}city`,
  ),
});
export const cities: Place[] = [
  city(
    'pallet',
    'Pallet Town',
    180,
    480,
    [790, 2030, 640, 415],
    'O começo da jornada. Conheça o Professor Oak, encontre seu parceiro e receba a Pokédex.',
    ['route1', 'route21'],
  ),
  city(
    'viridian',
    'Viridian City',
    180,
    360,
    [865, 1450, 545, 360],
    'A primeira cidade da aventura também guarda o último desafio de ginásio.',
    ['route1', 'route2', 'route22'],
  ),
  city(
    'pewter',
    'Pewter City',
    180,
    160,
    [820, 535, 595, 390],
    'O Museu de Ciências e o ginásio de Brock, especialista em Pedra.',
    ['route2', 'route3'],
  ),
  city(
    'cerulean',
    'Cerulean City',
    500,
    120,
    [2810, 415, 540, 320],
    'A cidade de Misty, do Bulbasaur de presente e da ponte para as Rotas 24 e 25.',
    ['route4', 'route5', 'route9', 'route24', 'cerulean-cave'],
  ),
  city(
    'vermilion',
    'Vermilion City',
    500,
    400,
    [2720, 1700, 690, 580],
    'Um porto cheio de encontros: Lt. Surge, o fã-clube Pokémon e o S.S. Anne.',
    ['route6', 'route11', 'diglett-cave', 'ss-anne'],
  ),
  city(
    'lavender',
    'Lavender Town',
    660,
    240,
    [4020, 920, 390, 455],
    'Resgate Mr. Fuji na Pokémon Tower e obtenha a Poké Flute.',
    ['route8', 'route10', 'route12', 'pokemon-tower'],
  ),
  city(
    'celadon',
    'Celadon City',
    380,
    240,
    [1970, 975, 735, 465],
    'Compras, pedras evolutivas, Erika e os segredos da Equipe Rocket.',
    ['route7', 'route16', 'rocket-hideout'],
  ),
  city(
    'saffron',
    'Saffron City',
    500,
    240,
    [2820, 1000, 580, 415],
    'O centro de Kanto reúne Sabrina, o Fighting Dojo e a sede da Silph Co.',
    ['route5', 'route6', 'route7', 'route8', 'silph-co'],
  ),
  city(
    'fuchsia',
    'Fuchsia City',
    420,
    560,
    [2120, 2420, 590, 455],
    'Aprenda Sea Skim e Strong Push. Visite Koga e o GO Park Complex.',
    ['route15', 'route18', 'route19'],
  ),
  city(
    'cinnabar',
    'Cinnabar Island',
    180,
    640,
    [840, 3010, 415, 265],
    'A ilha de Blaine: restaure fósseis no laboratório e explore a Pokémon Mansion.',
    ['route20', 'route21', 'pokemon-mansion'],
  ),
  city(
    'indigo',
    'Indigo Plateau',
    100,
    120,
    [400, 55, 320, 470],
    'Enfrente Lorelei, Bruno, Agatha, Lance e o Campeão. Prepare sua equipe antes de entrar.',
    ['route23', 'victory-road'],
  ),
];

const routeRows: [number, number, number, string, string[], Rect][] = [
  [
    1,
    180,
    426,
    'Entre Pallet e Viridian. Os primeiros encontros da jornada.',
    ['pallet', 'viridian'],
    [975, 1760, 355, 430],
  ],
  [
    2,
    180,
    295,
    'A floresta divide esta rota. A passagem leste conecta Diglett’s Cave ao assistente de Oak.',
    ['viridian', 'viridian-forest', 'pewter', 'diglett-cave'],
    [965, 860, 355, 640],
  ],
  [
    3,
    240,
    160,
    'Treinadores e campos a leste de Pewter, a caminho de Mt. Moon.',
    ['pewter', 'route4'],
    [1340, 520, 800, 355],
  ],
  [
    4,
    416,
    120,
    'O Centro Pokémon a oeste de Mt. Moon abriga o vendedor de Magikarp; a saída leste segue para Cerulean.',
    ['route3', 'mt-moon', 'cerulean'],
    [2140, 450, 750, 245],
  ],
  [
    5,
    500,
    183,
    'Ao sul de Cerulean, com Day Care e uma entrada do Underground Path.',
    ['cerulean', 'saffron', 'route6'],
    [2920, 670, 300, 370],
  ],
  [
    6,
    500,
    323,
    'Campos entre Saffron e Vermilion; a passagem subterrânea conecta à Rota 5.',
    ['saffron', 'vermilion', 'route5'],
    [2930, 1380, 280, 390],
  ],
  [
    7,
    440,
    240,
    'A curta ligação entre Celadon e Saffron.',
    ['celadon', 'saffron', 'route8'],
    [2680, 1060, 190, 270],
  ],
  [
    8,
    580,
    240,
    'Treinadores entre Lavender e Saffron; Underground Path para a Rota 7.',
    ['lavender', 'saffron', 'route7'],
    [3380, 1090, 730, 220],
  ],
  [
    9,
    580,
    120,
    'A leste de Cerulean. Use Chop Down para alcançar o caminho de Rock Tunnel.',
    ['cerulean', 'route10'],
    [3310, 470, 880, 195],
  ],
  [
    10,
    660,
    196,
    'Rock Tunnel liga as duas metades. Sea Skim dá acesso à Power Plant pelo canal.',
    ['route9', 'rock-tunnel', 'power-plant', 'lavender'],
    [4010, 490, 420, 890],
  ],
  [
    11,
    580,
    400,
    'Campos a leste de Vermilion, perto de Diglett’s Cave e do Snorlax.',
    ['vermilion', 'diglett-cave', 'route12'],
    [3260, 1740, 925, 280],
  ],
  [
    12,
    660,
    424,
    'Passarelas na costa leste. Use a Poké Flute para acordar Snorlax.',
    ['lavender', 'route11', 'route13'],
    [4150, 1330, 280, 950],
  ],
  [
    13,
    590,
    480,
    'Um labirinto de cercas entre o litoral e a Rota 14.',
    ['route12', 'route14'],
    [3370, 2290, 930, 170],
  ],
  [
    14,
    540,
    516,
    'Siga ao sul pelo caminho de treinadores rumo a Fuchsia.',
    ['route13', 'route15'],
    [3350, 2390, 340, 270],
  ],
  [
    15,
    480,
    560,
    'A entrada leste de Fuchsia, com treinadores e um posto de passagem.',
    ['route14', 'fuchsia'],
    [2650, 2530, 780, 170],
  ],
  [
    16,
    260,
    274,
    'A oeste de Celadon. Há outro Snorlax bloqueando a passagem.',
    ['celadon', 'route17'],
    [1550, 1070, 480, 275],
  ],
  [
    17,
    260,
    410,
    'Pokémon Road: uma longa rota vertical. Não é necessário obter bicicleta em Let’s Go.',
    ['route16', 'route18'],
    [1540, 1280, 250, 1270],
  ],
  [
    18,
    340,
    560,
    'A curva ao fim da Pokémon Road leva à entrada oeste de Fuchsia.',
    ['route17', 'fuchsia'],
    [1550, 2510, 620, 195],
  ],
  [
    19,
    420,
    605,
    'Rota marítima ao sul de Fuchsia. Explore a água com Sea Skim.',
    ['fuchsia', 'route20'],
    [2180, 2800, 475, 475],
  ],
  [
    20,
    351,
    640,
    'Mar entre Fuchsia e Cinnabar, dividido pelas Seafoam Islands.',
    ['route19', 'seafoam-islands', 'cinnabar'],
    [1220, 3030, 1040, 270],
  ],
  [
    21,
    180,
    565,
    'O mar entre Pallet e Cinnabar inclui uma pequena área de grama.',
    ['pallet', 'cinnabar'],
    [790, 2400, 620, 670],
  ],
  [
    22,
    130,
    360,
    'A oeste de Viridian, a caminho dos portões da Liga Pokémon.',
    ['viridian', 'route23'],
    [440, 1500, 475, 180],
  ],
  [
    23,
    100,
    290,
    'Os portões verificam as oito insígnias no caminho para a Liga.',
    ['route22', 'victory-road', 'indigo'],
    [425, 800, 265, 750],
  ],
  [
    24,
    500,
    69,
    'Nugget Bridge ao norte de Cerulean e o treinador que oferece Charmander.',
    ['cerulean', 'route25', 'cerulean-cave'],
    [2920, 120, 245, 400],
  ],
  [
    25,
    560,
    40,
    'Treinadores e a casa de Bill no extremo nordeste.',
    ['route24'],
    [3100, 80, 890, 170],
  ],
];
export const routes: Place[] = routeRows.map(
  ([n, x, y, summary, connections, box]) => ({
    id: `route${n}`,
    name: `Rota ${n}`,
    kind: 'route',
    x,
    y,
    box,
    summary,
    connections,
    source: source(`route${n}`),
  }),
);
const dungeon = (
  id: string,
  name: string,
  x: number,
  y: number,
  summary: string,
  connections: string[],
  slug: string,
  image?: string,
  size?: [number, number],
): Place => ({
  id,
  name,
  x,
  y,
  summary,
  connections,
  kind: 'dungeon',
  box: [0, 0, 4740, 3374],
  source: source(slug),
  image,
  size,
});
export const dungeons: Place[] = [
  {
    ...dungeon(
      'viridian-forest',
      'Viridian Forest',
      180,
      240,
      'Uma floresta entre Viridian e Pewter. Pikachu aparece na área e Bulbasaur é um encontro raro.',
      ['route2'],
      'viridianforest',
      'mewmaps-viridian-forest.jpg',
      [1000, 1200],
    ),
    kind: 'forest',
  },
  dungeon(
    'mt-moon',
    'Mt. Moon',
    340,
    120,
    'Explore os três andares e escolha entre Helix Fossil e Dome Fossil. Moon Stones podem ser encontradas nas crateras.',
    ['route4'],
    'mtmoon',
    'mewmaps-mt-moon.jpg',
    [3000, 5100],
  ),
  dungeon(
    'diglett-cave',
    'Diglett’s Cave',
    220,
    200,
    'Uma passagem que conecta as Rotas 2 e 11. Não há um mapa completo LGPE verificado nesta edição do atlas.',
    ['route2', 'route11'],
    'diglettscave',
  ),
  dungeon(
    'rock-tunnel',
    'Rock Tunnel',
    660,
    160,
    'Use Light Up para iluminar o túnel entre os trechos norte e sul da Rota 10.',
    ['route10'],
    'rocktunnel',
    'mewmaps-rock-tunnel.jpg',
    [1035, 1800],
  ),
  {
    ...dungeon(
      'cerulean-cave',
      'Cerulean Cave',
      452,
      94,
      'Uma expedição pós-Liga. Os andares são ligados por escadas identificadas por letras no mapa.',
      ['route24', 'cerulean'],
      'ceruleancave',
      'mewmaps-cerulean.jpg',
      [2777, 4750],
    ),
    legendary: {
      name: 'Mewtwo',
      level: 70,
      requirement: 'Tornar-se Campeão e usar Sea Skim.',
      floor: 'b1f',
      tip: 'No 1F, procure a escada C a oeste para descer ao B1F. Atravesse a água até Mewtwo. Derrote-o antes do fim do tempo para iniciar a captura.',
    },
    floors: [
      { id: '1f', name: '1F · Entrada', box: [245, 555, 2335, 1200] },
      { id: '2f', name: '2F · Cristais', box: [245, 1960, 2335, 1125] },
      { id: 'b1f', name: 'B1F · Mewtwo', box: [245, 3270, 2335, 1220] },
    ],
  },
  {
    ...dungeon(
      'power-plant',
      'Power Plant',
      700,
      200,
      'A usina abandonada é acessível pelo canal da Rota 10. Cuidado com Electrode disfarçados de itens.',
      ['route10'],
      'powerplant',
      'mewmaps-power-plant.jpg',
      [1517, 1400],
    ),
    legendary: {
      name: 'Zapdos',
      level: 50,
      requirement: 'Sea Skim, a partir da Rota 10.',
      floor: 'all',
      tip: 'Percorra a usina até a sala final. Salve antes de interagir e leve Pokémon que resistam a golpes Elétricos.',
    },
  },
  {
    ...dungeon(
      'seafoam-islands',
      'Seafoam Islands',
      300,
      640,
      'Use Strong Push para resolver o quebra-cabeça das pedras e modificar as correntes de água.',
      ['route20'],
      'seafoamislands',
      'mewmaps-seafoam.jpg',
      [4472, 4500],
    ),
    legendary: {
      name: 'Articuno',
      level: 50,
      requirement: 'Sea Skim e Strong Push.',
      floor: 'all',
      tip: 'Articuno está no B4F. Derrube as pedras pelos buracos para bloquear as correntes antes de atravessar a água.',
    },
  },
  {
    ...dungeon(
      'victory-road',
      'Victory Road',
      100,
      200,
      'O último desafio antes do Indigo Plateau. Mova as pedras sobre os interruptores com Strong Push.',
      ['route23', 'indigo'],
      'victoryroad',
      'mewmaps-victory-road.jpg',
      [6100, 4264],
    ),
    legendary: {
      name: 'Moltres',
      level: 50,
      requirement: 'Oito insígnias e Strong Push.',
      floor: 'all',
      tip: 'Moltres está no 2F, em uma área alcançada a partir do 3F. Confira as conexões identificadas no mapa.',
    },
  },
  dungeon(
    'pokemon-mansion',
    'Pokémon Mansion',
    150,
    618,
    'Acione as estátuas para alternar as portas. A Secret Key no B1F abre o ginásio de Blaine.',
    ['cinnabar'],
    'pokemonmansion',
    'mewmaps-pokemon-mansion.jpg',
    [2500, 2304],
  ),
  dungeon(
    'pokemon-tower',
    'Pokémon Tower',
    687,
    258,
    'É preciso obter o Silph Scope para identificar os fantasmas e concluir o resgate de Mr. Fuji.',
    ['lavender'],
    'pokemontower',
    'mewmaps-pokemon-tower.jpg',
    [1277, 4986],
  ),
  dungeon(
    'rocket-hideout',
    'Rocket Hideout',
    380,
    270,
    'A entrada fica atrás do pôster no Game Corner de Celadon. Recupere o Silph Scope.',
    ['celadon'],
    'rockethideout',
    'mewmaps-rocket-hideout.jpg',
    [2200, 3300],
  ),
  dungeon(
    'silph-co',
    'Silph Co.',
    526,
    262,
    'Libere os onze andares da invasão Rocket. A Card Key permite abrir as portas trancadas.',
    ['saffron'],
    'silphco',
    'mewmaps-silph-co.jpg',
    [2250, 3700],
  ),
  dungeon(
    'ss-anne',
    'S.S. Anne',
    522,
    438,
    'Explore as cabines antes de ajudar o capitão: o navio parte quando você desembarca após aprender Chop Down.',
    ['vermilion'],
    'ssanne',
    'mewmaps-ss-anne.jpg',
    [1719, 3100],
  ),
];
const dataKeys: Record<string, string> = {
  'viridian-forest': 'viridianforest',
  'mt-moon': 'mtmoon',
  'diglett-cave': 'diglettscave',
  'rock-tunnel': 'rocktunnel',
  'cerulean-cave': 'ceruleancave',
  'power-plant': 'powerplant',
  'seafoam-islands': 'seafoamislands',
  'victory-road': 'victoryroad',
  'pokemon-mansion': 'pokemonmansion',
  'pokemon-tower': 'pokemontower',
};
type ResearchedArea = {
  encounters: Encounter[];
  items: Item[];
  note: string;
  source: string;
};
export const places: Place[] = [...cities, ...routes, ...dungeons].map(
  (place) => {
    place = { ...place, floors: floorData[place.id] ?? place.floors };
    if (place.legendary && place.id === 'seafoam-islands')
      place.legendary = { ...place.legendary, floor: 'b4f' };
    if (place.legendary && place.id === 'victory-road')
      place.legendary = { ...place.legendary, floor: '2f' };
    const data = (encounterData as Record<string, ResearchedArea>)[
      dataKeys[place.id] ?? place.id
    ];
    return data
      ? {
          ...place,
          encounters: data.encounters.filter((e) => e.version !== 'Eevee'),
          items: data.items,
          note: data.note,
          source: data.source,
        }
      : place;
  },
);
export const placeById = Object.fromEntries(
  places.map((p) => [p.id, p]),
) as Record<string, Place>;
export const normalize = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
