import type { Floor } from './atlas-data';
export type Ladder = {
  label: string;
  floor: string;
  x: number;
  y: number;
  to: string;
};
const f = (
  id: string,
  name: string,
  box: [number, number, number, number],
): Floor => ({ id, name, box });
export const floorData: Record<string, Floor[]> = {
  'silph-co': [
    f('2f', '2F', [75, 390, 1010, 500]),
    f('3f', '3F', [1155, 390, 1000, 500]),
    f('4f', '4F', [75, 965, 995, 490]),
    f('5f', '5F · Card Key', [1150, 955, 1005, 500]),
    f('6f', '6F', [75, 1490, 990, 525]),
    f('7f', '7F · Lapras', [1155, 1500, 930, 515]),
    f('8f', '8F', [75, 2050, 960, 505]),
    f('9f', '9F · Descanso', [1155, 2050, 925, 505]),
    f('10f', '10F', [100, 2610, 925, 900]),
    f('11f', '11F · Presidente', [1170, 2610, 880, 900]),
  ],
  'rocket-hideout': [
    f('b1f', 'B1F · Entrada', [990, 60, 1085, 1020]),
    f('b2f', 'B2F · Setas', [180, 1150, 1660, 940]),
    f('b3f', 'B3F', [65, 2120, 975, 1000]),
    f('b4f', 'B4F · Giovanni', [1130, 2120, 1010, 1000]),
  ],
  'ss-anne': [
    f('main', 'Convés principal', [65, 350, 1590, 620]),
    f('upper', 'Convés superior · Capitão', [65, 1040, 1590, 620]),
    f('lower', 'Convés inferior', [20, 1670, 1680, 640]),
    f('deck', 'Convés de observação', [65, 2350, 660, 550]),
    f('galley', 'Cozinha', [740, 2360, 920, 550]),
  ],
  'pokemon-mansion': [
    f('1f', '1F · Entrada', [35, 350, 1240, 920]),
    f('2f', '2F', [1320, 350, 1110, 920]),
    f('3f', '3F', [35, 1390, 1240, 670]),
    f('b1f', 'B1F · Secret Key', [1320, 1390, 1120, 800]),
  ],
  'pokemon-tower': [
    f('2f', '2F', [110, 455, 1040, 705]),
    f('3f', '3F', [125, 1190, 1025, 710]),
    f('4f', '4F', [110, 1950, 1040, 720]),
    f('5f', '5F · Cura', [110, 2720, 1040, 715]),
    f('6f', '6F', [110, 3460, 1040, 720]),
    f('7f', '7F · Mr. Fuji', [110, 4200, 1040, 715]),
  ],
  'power-plant': [f('1f', '1F · Zapdos', [10, 220, 1490, 1020])],
  'mt-moon': [
    f('1f', '1F · Entrada', [210, 580, 2440, 1500]),
    f('b1f', 'B1F · Passagens', [80, 2160, 2760, 880]),
    f('b2f', 'B2F · Fósseis', [60, 3180, 2800, 1710]),
  ],
  'rock-tunnel': [
    f('1f', '1F · Entradas', [15, 235, 990, 740]),
    f('b1f', 'B1F · Subsolo', [15, 940, 990, 680]),
  ],
  'seafoam-islands': [
    f('outside', 'Exterior', [60, 665, 2080, 1130]),
    f('1f', '1F · Entradas', [2310, 665, 2070, 1210]),
    f('b1f', 'B1F', [60, 1890, 2070, 1210]),
    f('b2f', 'B2F', [2310, 1890, 2070, 1210]),
    f('b3f', 'B3F · Correntes', [210, 3070, 1810, 1210]),
    f('b4f', 'B4F · Articuno', [2400, 3070, 1900, 1210]),
  ],
  'victory-road': [
    f('1f', '1F · Entrada', [90, 830, 2080, 1630]),
    f('2f', '2F · Moltres', [2200, 795, 3800, 1610]),
    f('3f', '3F · Interruptores', [1210, 2440, 3300, 1570]),
  ],
};
export const legendaryPosition: Record<
  string,
  { floor: string; x: number; y: number }
> = {
  'power-plant': { floor: '1f', x: 330, y: 317 },
  'cerulean-cave': { floor: 'b1f', x: 630, y: 3940 },
  'seafoam-islands': { floor: 'b4f', x: 2875, y: 3280 },
  'victory-road': { floor: '2f', x: 3370, y: 910 },
};
export const ladderData: Record<string, Ladder[]> = {
  'pokemon-tower': [
    { label: 'A', floor: '2f', x: 190, y: 837, to: '3f' },
    { label: 'A', floor: '3f', x: 217, y: 1608, to: '2f' },
    { label: 'B', floor: '3f', x: 1070, y: 1590, to: '4f' },
    { label: 'B', floor: '4f', x: 1035, y: 2380, to: '3f' },
    { label: 'C', floor: '4f', x: 180, y: 2350, to: '5f' },
    { label: 'C', floor: '5f', x: 165, y: 3130, to: '4f' },
    { label: 'D', floor: '5f', x: 1075, y: 3110, to: '6f' },
    { label: 'D', floor: '6f', x: 1020, y: 3870, to: '5f' },
    { label: 'E', floor: '6f', x: 555, y: 4140, to: '7f' },
    { label: 'E', floor: '7f', x: 635, y: 4870, to: '6f' },
  ],
  'cerulean-cave': [
    { label: 'A', floor: '1f', x: 2368, y: 638, to: '2f' },
    { label: 'A', floor: '2f', x: 2445, y: 2135, to: '1f' },
    { label: 'B', floor: '1f', x: 390, y: 895, to: '2f' },
    { label: 'B', floor: '2f', x: 405, y: 2180, to: '1f' },
    { label: 'C', floor: '1f', x: 330, y: 1055, to: 'b1f' },
    { label: 'C', floor: 'b1f', x: 551, y: 3570, to: '1f' },
    { label: 'D', floor: '1f', x: 2058, y: 1078, to: '2f' },
    { label: 'D', floor: '2f', x: 1950, y: 2413, to: '1f' },
    { label: 'E', floor: '1f', x: 1725, y: 1128, to: '2f' },
    { label: 'E', floor: '2f', x: 1735, y: 2460, to: '1f' },
    { label: 'F', floor: '1f', x: 893, y: 742, to: '2f' },
    { label: 'F', floor: '2f', x: 1033, y: 2130, to: '1f' },
    { label: 'G', floor: '1f', x: 613, y: 1295, to: '2f' },
    { label: 'G', floor: '2f', x: 615, y: 2663, to: '1f' },
  ],
  'rock-tunnel': [
    { label: 'A', floor: '1f', x: 951, y: 345, to: 'b1f' },
    { label: 'A', floor: 'b1f', x: 832, y: 1430, to: '1f' },
    { label: 'B', floor: '1f', x: 102, y: 344, to: 'b1f' },
    { label: 'B', floor: 'b1f', x: 729, y: 1036, to: '1f' },
    { label: 'C', floor: '1f', x: 435, y: 510, to: 'b1f' },
    { label: 'C', floor: 'b1f', x: 604, y: 1170, to: '1f' },
    { label: 'D', floor: '1f', x: 953, y: 640, to: 'b1f' },
    { label: 'D', floor: 'b1f', x: 91, y: 1033, to: '1f' },
  ],
  'mt-moon': [
    { label: 'A', floor: '1f', x: 715, y: 895, to: 'b1f' },
    { label: 'A', floor: 'b1f', x: 1740, y: 2420, to: '1f' },
    { label: 'D', floor: '1f', x: 1900, y: 1200, to: 'b1f' },
    { label: 'D', floor: 'b1f', x: 1220, y: 2350, to: '1f' },
    { label: 'F', floor: '1f', x: 1305, y: 1080, to: 'b1f' },
    { label: 'F', floor: 'b1f', x: 2580, y: 2410, to: '1f' },
    { label: 'B', floor: 'b1f', x: 2440, y: 2910, to: 'b2f' },
    { label: 'B', floor: 'b2f', x: 1560, y: 3975, to: 'b1f' },
    { label: 'C', floor: 'b1f', x: 567, y: 2460, to: 'b2f' },
    { label: 'C', floor: 'b2f', x: 570, y: 3540, to: 'b1f' },
    { label: 'E', floor: 'b1f', x: 617, y: 2910, to: 'b2f' },
    { label: 'E', floor: 'b2f', x: 1140, y: 4330, to: 'b1f' },
    { label: 'G', floor: 'b1f', x: 2275, y: 2500, to: 'b2f' },
    { label: 'G', floor: 'b2f', x: 1830, y: 3630, to: 'b1f' },
  ],
};
