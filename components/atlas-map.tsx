'use client';
/* oxlint-disable jsx-a11y/prefer-tag-over-role -- SVG markers cannot contain native HTML buttons. They implement focus, button roles and Enter/Space activation. */
/* oxlint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex -- The SVG is a custom pan/zoom application: focus, arrow keys, +/-, Home, and separate labeled controls are implemented. The rule does not model interactive SVG maps. */
import { useRef, useState } from 'react';
import {
  ExternalLink,
  Maximize,
  Minus,
  Mountain,
  Plus,
  RotateCcw,
} from 'lucide-react';
import {
  asset,
  mapSource,
  places,
  type Place,
  type Rect,
} from '@/lib/atlas-data';
import { cityData } from '@/lib/city-data';
import { ladderData, legendaryPosition } from '@/lib/floor-data';

type Props = {
  place?: Place;
  floor: string;
  poi: string;
  onNavigate: (id?: string, floor?: string, poi?: string) => void;
};
const world: Rect = [30, 0, 740, 690];
const labelOffsets: Record<string, [number, number]> = {
  'cerulean-cave': [-64, -21],
  'rock-tunnel': [8, -22],
  'power-plant': [0, 30],
};
export function AtlasMap({ place, floor, poi, onNavigate }: Props) {
  const [detailed, setDetailed] = useState(false);
  const isInterior = !!place?.image;
  const currentFloor =
    floor ||
    place?.floors?.find((f) => f.id === '1f')?.id ||
    place?.floors?.[0]?.id ||
    'all';
  const legend = place && legendaryPosition[place.id];
  const initial: Rect = isInterior
    ? (place.floors?.find((f) => f.id === currentFloor)?.box ??
      ([0, 0, ...place.size!] as Rect))
    : place
      ? place.box
      : detailed
        ? [0, 0, 4740, 3374]
        : world;
  const [box, setBox] = useState<Rect>(initial);
  const [failed, setFailed] = useState(false);
  const svg = useRef<SVGSVGElement>(null);
  const drag = useRef<{
    x: number;
    y: number;
    box: Rect;
    scale: number;
  } | null>(null);
  const switchMode = (next: boolean) => {
    setDetailed(next);
    setBox(next ? [0, 0, 4740, 3374] : world);
    setFailed(false);
  };
  const image = isInterior
    ? place.image!
    : place || detailed
      ? 'mewmaps-region.jpg'
      : 'kanto-town-map-pe.png';
  const size = isInterior
    ? place.size!
    : place || detailed
      ? [4740, 3374]
      : [1280, 720];
  const reset = () => setBox(initial);
  const zoom = (factor: number) =>
    setBox(([x, y, w, h]) => {
      const nw = Math.min(initial[2] * 2, Math.max(initial[2] / 8, w * factor));
      const nh = (nw * h) / w;
      return [x + (w - nw) / 2, y + (h - nh) / 2, nw, nh];
    });
  if (place && !isInterior && place.kind === 'dungeon')
    return (
      <div className="map-container">
        <div className="map-unavailable">
          <Mountain size={36} />
          <h2>Guia da passagem</h2>
          <p>
            Não encontramos uma planta completa de Diglett’s Cave específica de
            Let’s Go para incluir com segurança. Consulte os encontros e as duas
            saídas no guia.
          </p>
          <a href={place.source} target="_blank" rel="noreferrer">
            Abrir referência <ExternalLink size={16} />
          </a>
        </div>
      </div>
    );
  return (
    <div className="map-container">
      {!place && (
        <div className="map-toolbar">
          <div className="map-mode">
            <button
              className={!detailed ? 'active' : ''}
              onClick={() => switchMode(false)}
              aria-pressed={!detailed}
            >
              Mapa de Kanto
            </button>
            <button
              className={detailed ? 'active' : ''}
              onClick={() => switchMode(true)}
              aria-pressed={detailed}
            >
              Mapa detalhado
            </button>
          </div>
        </div>
      )}
      {isInterior && (
        <div className="floor-selector" aria-label="Andares">
          <button
            className={currentFloor === 'all' ? 'active' : ''}
            onClick={() => onNavigate(place.id, 'all')}
          >
            Mapa completo
          </button>
          {place.floors?.map((f) => (
            <button
              key={f.id}
              className={currentFloor === f.id ? 'active' : ''}
              onClick={() => onNavigate(place.id, f.id)}
              aria-pressed={currentFloor === f.id}
            >
              {f.name}
            </button>
          ))}
        </div>
      )}
      {failed ? (
        <div className="map-unavailable">
          <h2>Não foi possível carregar o mapa.</h2>
          <p>Verifique sua conexão e tente novamente.</p>
          <button onClick={() => setFailed(false)}>Tentar novamente</button>
        </div>
      ) : (
        <svg
          ref={svg}
          className="map-canvas"
          viewBox={box.join(' ')}
          role="application"
          aria-roledescription="mapa interativo"
          aria-label={
            'Mapa interativo de ' +
            (place?.name ?? 'Kanto') +
            '. Arraste para mover. Use os botões para aproximar.'
          }
          tabIndex={0}
          onKeyDown={(e) => {
            if ((e.target as Element).closest('[data-marker]')) return;
            const moves: Record<string, [number, number]> = {
              ArrowLeft: [-1, 0],
              ArrowRight: [1, 0],
              ArrowUp: [0, -1],
              ArrowDown: [0, 1],
            };
            if (moves[e.key]) {
              e.preventDefault();
              const [dx, dy] = moves[e.key];
              setBox(([x, y, w, h]) => [
                x + dx * w * 0.1,
                y + dy * h * 0.1,
                w,
                h,
              ]);
            } else if (e.key === '+' || e.key === '=') {
              e.preventDefault();
              zoom(0.8);
            } else if (e.key === '-') {
              e.preventDefault();
              zoom(1.25);
            } else if (e.key === 'Home') {
              e.preventDefault();
              reset();
            }
          }}
          onPointerDown={(e) => {
            if ((e.target as Element).closest('[data-marker]')) return;
            const rect = e.currentTarget.getBoundingClientRect();
            drag.current = {
              x: e.clientX,
              y: e.clientY,
              box,
              scale: Math.min(rect.width / box[2], rect.height / box[3]),
            };
            e.currentTarget.setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => {
            const d = drag.current;
            if (d)
              setBox([
                d.box[0] - (e.clientX - d.x) / d.scale,
                d.box[1] - (e.clientY - d.y) / d.scale,
                d.box[2],
                d.box[3],
              ]);
          }}
          onPointerUp={() => {
            drag.current = null;
          }}
          onPointerCancel={() => {
            drag.current = null;
          }}
        >
          <image
            href={asset(image)}
            x="0"
            y="0"
            width={size[0]}
            height={size[1]}
            onError={() => setFailed(true)}
          />
          {!place &&
            !detailed &&
            places
              .filter(
                (p) =>
                  ![
                    'rocket-hideout',
                    'silph-co',
                    'ss-anne',
                    'pokemon-mansion',
                    'pokemon-tower',
                  ].includes(p.id),
              )
              .map((p) => (
                <g
                  key={p.id}
                  className="map-marker"
                  data-marker="true"
                  role="button"
                  tabIndex={0}
                  aria-label={
                    'Explorar ' +
                    p.name +
                    (p.legendary ? ' — ' + p.legendary.name : '')
                  }
                  onClick={() => onNavigate(p.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onNavigate(p.id);
                    }
                  }}
                >
                  <title>
                    {p.name + (p.legendary ? ' — ' + p.legendary.name : '')}
                  </title>
                  <circle cx={p.x} cy={p.y} r={22} fill="transparent" />
                  <circle
                    className="marker-dot"
                    cx={p.x}
                    cy={p.y}
                    r={p.kind === 'route' ? 12 : p.legendary ? 12 : 9}
                    fill={
                      p.legendary
                        ? '#ffdb56'
                        : p.kind === 'city'
                          ? '#1c708d'
                          : p.kind === 'route'
                            ? '#f3fff6'
                            : '#405766'
                    }
                    stroke="#fff"
                    strokeWidth="2"
                  />
                  {p.kind === 'route' ? (
                    <text x={p.x} y={p.y + 4} className="route-label">
                      {p.name.split(' ')[1]}
                    </text>
                  ) : (
                    <text
                      x={p.x + (labelOffsets[p.id]?.[0] ?? 0)}
                      y={p.y + (labelOffsets[p.id]?.[1] ?? 27)}
                      className="marker-label"
                      textAnchor="middle"
                    >
                      {p.name}
                    </text>
                  )}
                </g>
              ))}
          {!place &&
            detailed &&
            places
              .filter((p) => p.kind === 'city' || p.kind === 'route')
              .sort(
                (a, b) => Number(a.kind === 'city') - Number(b.kind === 'city'),
              )
              .map((p) => (
                <g
                  key={p.id}
                  data-marker="true"
                  role="button"
                  tabIndex={0}
                  aria-label={'Explorar ' + p.name}
                  onClick={() => onNavigate(p.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onNavigate(p.id);
                    }
                  }}
                >
                  <rect
                    x={p.box[0]}
                    y={p.box[1]}
                    width={p.box[2]}
                    height={p.box[3]}
                    fill="transparent"
                    stroke="#fff"
                    strokeOpacity=".65"
                    strokeWidth="4"
                    rx="12"
                  />
                  <title>{p.name}</title>
                </g>
              ))}
          {place &&
            cityData[place.id]?.points.map(
              (point, index) =>
                point.x !== undefined &&
                point.y !== undefined && (
                  <g
                    key={point.id}
                    className="city-map-point"
                    data-marker="true"
                    role="button"
                    tabIndex={0}
                    aria-label={point.name}
                    onClick={() => onNavigate(place.id, '', point.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onNavigate(place.id, '', point.id);
                      }
                    }}
                  >
                    <title>{point.name}</title>
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={16}
                      fill={poi === point.id ? '#ffda57' : '#123d4e'}
                      stroke="#fff"
                      strokeWidth="3"
                    />
                    <text
                      x={point.x}
                      y={point.y + 5}
                      textAnchor="middle"
                      fontSize="13"
                      fill={poi === point.id ? '#173c49' : '#fff'}
                      fontWeight="700"
                    >
                      {index + 1}
                    </text>
                  </g>
                ),
            )}
          {place &&
            ladderData[place.id]
              ?.filter(
                (l) => currentFloor === 'all' || l.floor === currentFloor,
              )
              .map((l) => (
                <g
                  key={l.floor + l.label}
                  className="ladder-marker"
                  data-marker="true"
                  role="button"
                  tabIndex={0}
                  aria-label={
                    'Escada ' + l.label + ': ir para ' + l.to.toUpperCase()
                  }
                  onClick={() => onNavigate(place.id, l.to)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onNavigate(place.id, l.to);
                    }
                  }}
                >
                  <title>
                    {'Escada ' + l.label + ' → ' + l.to.toUpperCase()}
                  </title>
                  <circle
                    cx={l.x}
                    cy={l.y}
                    r={size[0] * 0.014}
                    fill="#fff9df"
                    stroke="#cb9c22"
                    strokeWidth={size[0] * 0.002}
                  />
                  <text
                    x={l.x}
                    y={l.y + size[0] * 0.004}
                    textAnchor="middle"
                    fontSize={size[0] * 0.012}
                    fill="#5d4612"
                    fontWeight="800"
                  >
                    {l.label}
                  </text>
                </g>
              ))}
          {place?.legendary &&
            legend &&
            (currentFloor === 'all' || currentFloor === legend.floor) && (
              <g pointerEvents="none">
                <circle
                  cx={legend.x}
                  cy={legend.y}
                  r={size[0] * 0.027}
                  fill="none"
                  stroke="#ffdb57"
                  strokeWidth={size[0] * 0.003}
                  strokeDasharray={size[0] * 0.009}
                />
                <title>
                  {place.legendary.name + ' · Nv. ' + place.legendary.level}
                </title>
              </g>
            )}
        </svg>
      )}
      <div className="map-controls" aria-label="Controles do mapa">
        <button onClick={() => zoom(0.75)} aria-label="Aproximar mapa">
          <Plus size={18} />
        </button>
        <button onClick={() => zoom(1.333)} aria-label="Afastar mapa">
          <Minus size={18} />
        </button>
        <button onClick={reset} aria-label="Enquadrar mapa">
          <Maximize size={17} />
        </button>
        {place && (
          <button
            onClick={() => onNavigate()}
            aria-label="Voltar ao mapa de Kanto"
          >
            <RotateCcw size={16} />
          </button>
        )}
      </div>
      <div className="map-caption">
        <span>Arraste para explorar · + / − para zoom</span>
        <a
          href={
            isInterior || place || detailed
              ? mapSource
              : 'https://bulbapedia.bulbagarden.net/wiki/Town_Map'
          }
          target="_blank"
          rel="noreferrer"
        >
          {isInterior || place || detailed
            ? 'Mapa: MewMaps'
            : 'Town Map · LGPE'}
        </a>
      </div>
    </div>
  );
}
