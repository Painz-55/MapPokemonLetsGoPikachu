'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowUpRight,
  BookOpen,
  ChevronRight,
  Compass,
  Map as MapIcon,
  MapPin,
  Mountain,
  Search,
  Sparkles,
  X,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { PlaceGuide } from '@/components/place-guide';
import { PokemonIcon } from '@/components/pokemon-icon';
import { cityData } from '@/lib/city-data';
import { AtlasMap } from '@/components/atlas-map';
import {
  places,
  placeById,
  normalize,
  mapSource,
  walkthrough,
} from '@/lib/atlas-data';

export default function AtlasPage() {
  const [route, setRoute] = useState({ id: '', floor: '', poi: '' });
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [sources, setSources] = useState(false);
  const [mobileList, setMobileList] = useState(false);
  const [detailTab, setDetailTab] = useState('overview');
  const guideRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const read = () => {
      const [id, params] = window.location.hash.slice(1).split('?');
      const search = new URLSearchParams(params);
      setDetailTab('overview');
      setRoute({
        id: placeById[id] ? id : '',
        floor: search.get('floor') ?? '',
        poi: search.get('poi') ?? '',
      });
    };
    read();
    window.addEventListener('hashchange', read);
    return () => window.removeEventListener('hashchange', read);
  }, []);
  const go = (id = '', floor = '', poi = '') => {
    const params = new URLSearchParams();
    if (floor) params.set('floor', floor);
    if (poi) params.set('poi', poi);
    window.location.assign(
      '#' + id + (params.size ? '?' + params.toString() : ''),
    );
    setDetailTab('overview');
    setMobileList(false);
  };
  const selected = placeById[route.id];
  useEffect(() => {
    guideRef.current?.scrollTo({ top: 0 });
    document.title =
      (selected?.name ? selected.name + ' · ' : '') +
      'Atlas de Kanto | Let’s Go, Pikachu!';
  }, [route.id, route.poi, selected?.name]);
  const results = useMemo(
    () =>
      places.filter((p) => {
        const term = normalize(query);
        return (
          (filter === 'all' ||
            (filter === 'legendary' ? !!p.legendary : p.kind === filter)) &&
          normalize(
            [
              p.name,
              p.summary,
              p.legendary?.name,
              ...(p.encounters ?? []).map((e) => e.name),
              ...(p.items ?? []).map((i) => i.name),
              ...(cityData[p.id]?.points ?? []).flatMap((point) => [
                point.name,
                ...point.npcs,
                ...(point.rewards ?? []),
              ]),
              ...(cityData[p.id]?.gifts ?? []).map((gift) => gift.name),
              cityData[p.id]?.trade?.species,
              cityData[p.id]?.trade?.npc,
            ].join(' '),
          ).includes(term)
        );
      }),
    [query, filter],
  );
  const navigation = (
    <div className="location-browser">
      <div className="browser-heading">
        <span className="eyebrow">EXPLORE KANTO</span>
        <span className="count">{places.length}</span>
      </div>
      <label className="search-box">
        <Search size={18} />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Local, Pokémon ou item"
          aria-label="Buscar no atlas"
        />
        {query && (
          <button onClick={() => setQuery('')} aria-label="Limpar busca">
            <X size={15} />
          </button>
        )}
      </label>
      <div className="filters" aria-label="Filtrar locais">
        {[
          ['all', 'Todos'],
          ['city', 'Cidades'],
          ['route', 'Rotas'],
          ['legendary', 'Lendários'],
        ].map(([id, label]) => (
          <button
            key={id}
            className={filter === id ? 'active' : ''}
            aria-pressed={filter === id}
            onClick={() => setFilter(id)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="result-count" aria-live="polite">
        {results.length} locais encontrados
      </div>
      <nav className="location-list" aria-label="Locais de Kanto">
        {results.map((p) => (
          <button
            key={p.id}
            onClick={() => go(p.id)}
            className={
              'location-row ' + (selected?.id === p.id ? 'selected' : '')
            }
            aria-current={selected?.id === p.id ? 'location' : undefined}
          >
            <span
              className={'place-symbol ' + (p.legendary ? 'legendary' : p.kind)}
            >
              {p.legendary ? (
                <Sparkles size={17} />
              ) : p.kind === 'city' ? (
                <MapPin size={17} />
              ) : p.kind === 'route' ? (
                p.name.split(' ')[1]
              ) : (
                <Mountain size={17} />
              )}
            </span>
            <span>
              <strong>{p.name}</strong>
              <small>
                {p.legendary
                  ? p.legendary.name + ' · Nv. ' + p.legendary.level
                  : p.kind === 'city'
                    ? 'Cidade & pontos de interesse'
                    : p.kind === 'route'
                      ? 'Encontros & itens'
                      : 'Explorar o interior'}
              </small>
            </span>
            <ChevronRight size={15} />
          </button>
        ))}
        {!results.length && (
          <p className="empty">
            Nenhum local encontrado. Experimente outro nome ou selecione
            “Todos”.
          </p>
        )}
      </nav>
      <button className="source-button" onClick={() => setSources(true)}>
        <BookOpen size={17} /> Fontes & sobre o atlas <ArrowUpRight size={16} />
      </button>
    </div>
  );
  return (
    <div className="app-shell">
      <a className="skip-link" href="#atlas-content">
        Pular para o mapa e o guia
      </a>
      <header className="topbar">
        <button
          className="brand"
          onClick={() => go()}
          aria-label="Atlas de Kanto, início"
        >
          <span className="brand-icon">
            <Compass size={27} />
          </span>
          <span>
            KANTO<span className="brand-sub">ATLAS DO TREINADOR</span>
          </span>
        </button>
        <div className="edition">
          <span className="edition-dot" /> LET’S GO, PIKACHU!
          <span className="edition-platform">Nintendo Switch</span>
        </div>
        <button className="mobile-explore" onClick={() => setMobileList(true)}>
          <Search size={18} /> Explorar
        </button>
        <a
          className="guide-link"
          href={walkthrough}
          target="_blank"
          rel="noreferrer"
        >
          Detonado <ArrowUpRight size={16} />
        </a>
      </header>
      <aside className="sidebar">{navigation}</aside>
      <main className="workspace" id="atlas-content">
        <div className="map-heading">
          <div className="breadcrumbs">
            <button onClick={() => go()}>
              <MapIcon size={15} /> Kanto
            </button>
            {selected && (
              <>
                <ChevronRight size={14} />
                <span>{selected.name}</span>
              </>
            )}
          </div>
          <div className="heading-line">
            <h1>{selected?.name ?? 'Uma região. Muitas descobertas.'}</h1>
            <span className="map-status">
              <span /> Mapas do jogo
            </span>
          </div>
        </div>
        <AtlasMap
          key={route.id + ':' + route.floor}
          place={selected}
          floor={route.floor}
          poi={route.poi}
          onNavigate={go}
        />
      </main>
      <aside ref={guideRef} className="guide-panel" aria-label="Guia do local">
        {selected ? (
          <PlaceGuide
            key={selected.id}
            place={selected}
            poi={route.poi}
            tab={detailTab}
            onTabChange={setDetailTab}
            onNavigate={go}
          />
        ) : (
          <>
            <div className="detail-intro">
              <span className="eyebrow">SEU GUIA DE CAMPO</span>
              <h2>Para onde vamos?</h2>
              <p>
                Selecione uma cidade, siga uma rota ou entre em uma caverna. Seu
                próximo encontro está no mapa.
              </p>
            </div>
            <div className="home-guide">
              <div className="section-label">
                <Sparkles size={17} />
                <h3>Encontros lendários</h3>
                <span>04</span>
              </div>
              {places
                .filter((p) => p.legendary)
                .map((p) => (
                  <button
                    key={p.id}
                    className="legend-destination"
                    onClick={() => go(p.id)}
                  >
                    <span
                      className={
                        'legend-mon ' + p.legendary!.name.toLowerCase()
                      }
                    >
                      <PokemonIcon name={p.legendary!.name} />
                    </span>
                    <span>
                      <strong>{p.legendary!.name}</strong>
                      <small>{p.name}</small>
                    </span>
                    <ChevronRight size={17} />
                  </button>
                ))}
              <div className="field-note">
                <span className="eyebrow">BOM SABER</span>
                <h3>Na água, use Sea Skim.</h3>
                <p>
                  Não existem varas de pesca em Let’s Go. Os Pokémon aquáticos
                  aparecem enquanto você navega.
                </p>
              </div>
              <div className="map-legend">
                <span>
                  <i className="city" /> Cidades
                </span>
                <span>
                  <i className="route" /> Rotas
                </span>
                <span>
                  <i className="cave" /> Interiores
                </span>
                <span>
                  <i className="legendary" /> Lendários
                </span>
              </div>
            </div>
          </>
        )}
      </aside>
      <Dialog open={sources} onOpenChange={setSources}>
        <DialogContent className="sources-dialog" showCloseButton={false}>
          <DialogClose className="dialog-close" aria-label="Fechar fontes">
            <X size={18} />
          </DialogClose>
          <DialogTitle>Fontes & créditos</DialogTitle>
          <DialogDescription>
            Um atlas de fãs, independente, dedicado a Pokémon: Let’s Go,
            Pikachu! e sem vínculo com Nintendo, Game Freak ou The Pokémon
            Company.
          </DialogDescription>
          <div className="source-links">
            <a
              href="https://github.com/PokeAPI/sprites"
              target="_blank"
              rel="noreferrer"
            >
              PokéAPI — ícones das espécies <ArrowUpRight size={16} />
            </a>
            <a href={mapSource} target="_blank" rel="noreferrer">
              MewMaps — mapas montados a partir do jogo{' '}
              <ArrowUpRight size={16} />
            </a>
            <a
              href="https://bulbapedia.bulbagarden.net/wiki/Town_Map"
              target="_blank"
              rel="noreferrer"
            >
              Bulbapedia — Town Map de Let’s Go <ArrowUpRight size={16} />
            </a>
            <a
              href="https://www.serebii.net/pokearth/kanto/"
              target="_blank"
              rel="noreferrer"
            >
              Serebii Pokéarth — encontros e itens <ArrowUpRight size={16} />
            </a>
            <a href={walkthrough} target="_blank" rel="noreferrer">
              Pokémon Mythology — detonado em português{' '}
              <ArrowUpRight size={16} />
            </a>
          </div>
          <p>
            Imagens e marcas pertencem aos respectivos titulares. A
            disponibilidade pública não significa licença livre. Créditos dos
            mapas foram preservados.
          </p>
        </DialogContent>
      </Dialog>
      <Dialog open={mobileList} onOpenChange={setMobileList}>
        <DialogContent className="mobile-navigation" showCloseButton={false}>
          <DialogClose
            className="dialog-close"
            aria-label="Fechar lista de locais"
          >
            <X size={18} />
          </DialogClose>
          <DialogTitle className="sr-only">Explorar Kanto</DialogTitle>
          {navigation}
        </DialogContent>
      </Dialog>
    </div>
  );
}
