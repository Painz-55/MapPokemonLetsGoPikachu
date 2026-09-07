'use client';
import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Backpack,
  Building2,
  ChevronRight,
  Gift,
  House,
  Info,
  Repeat2,
  Sparkles,
  Users,
  Waves,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cityData } from '@/lib/city-data';
import { PokemonIcon } from '@/components/pokemon-icon';
import { placeById, type Place } from '@/lib/atlas-data';

type Props = {
  place: Place;
  poi: string;
  tab: string;
  onTabChange: (tab: string) => void;
  onNavigate: (id?: string, floor?: string, poi?: string) => void;
};
const noWild = new Set([
  'pallet',
  'viridian',
  'pewter',
  'cerulean',
  'vermilion',
  'lavender',
  'celadon',
  'saffron',
  'fuchsia',
  'cinnabar',
  'indigo',
  'rocket-hideout',
  'silph-co',
  'ss-anne',
]);
const routeGifts: Record<
  string,
  { name: string; level: number; note: string; method?: string }[]
> = {
  route4: [
    {
      name: 'Magikarp',
      level: 5,
      method: 'Compra',
      note: 'Vendedor no Centro Pokémon a oeste de Mt. Moon. Custa ₽500.',
    },
  ],
  route24: [
    {
      name: 'Charmander',
      level: 14,
      note: 'Treinador ao norte da Nugget Bridge. Exige 50 capturas totais, incluindo repetidos.',
    },
  ],
  'silph-co': [
    {
      name: 'Lapras',
      level: 34,
      note: 'Presente de um funcionário durante a libertação da Silph Co.',
    },
  ],
};
const extraItems: Record<string, { name: string; note: string }[]> = {
  'rocket-hideout': [
    {
      name: 'Silph Scope',
      note: 'Após derrotar Giovanni no B4F. Permite identificar os fantasmas na Pokémon Tower.',
    },
    {
      name: 'Lift Key',
      note: 'Recupere a chave do recruta Rocket para usar o elevador.',
    },
  ],
  'silph-co': [
    {
      name: 'Card Key',
      note: 'Obtida na sequência do 5F, com o rival. Abre as portas trancadas.',
    },
    {
      name: 'Master Ball',
      note: 'Presente do presidente após derrotar Giovanni no 11F.',
    },
  ],
  'ss-anne': [
    {
      name: 'Chop Down',
      note: 'Ajude o capitão. Visite as cabines antes: depois que você desembarca, o navio parte.',
    },
  ],
};
export function PlaceGuide({
  place,
  poi,
  tab,
  onTabChange,
  onNavigate,
}: Props) {
  const [method, setMethod] = useState('all');
  const city = cityData[place.id];
  const point = city?.points.find((p) => p.id === poi);
  const gifts = city?.gifts ?? routeGifts[place.id] ?? [];
  const items = place.items ?? extraItems[place.id] ?? [];
  const found = place.encounters ?? [];
  const visible = found.filter(
    (e) =>
      method === 'all' ||
      (method === 'water'
        ? e.method.includes('gua')
        : method === 'sky'
          ? e.method.includes('céu') || e.method.includes('Céu')
          : method === 'rare'
            ? e.method.includes('Especial')
            : e.method === 'Solo' || e.method === 'Encontro fixo'),
  );
  const grouped = visible.reduce<Record<string, typeof visible>>(
    (groups, e) => {
      (groups[e.method] ??= []).push(e);
      return groups;
    },
    {},
  );
  const homeCount = city?.points.filter((p) => p.type === 'casa').length ?? 0;
  return (
    <>
      <div className="detail-intro">
        <button className="back-link" onClick={() => onNavigate()}>
          <ArrowLeft size={16} /> Voltar a Kanto
        </button>
        <span className="eyebrow">
          {place.legendary
            ? 'EXPEDIÇÃO LENDÁRIA'
            : city
              ? 'GUIA DA CIDADE'
              : place.kind === 'route'
                ? 'ROTAS DE KANTO'
                : 'GUIA DE EXPLORAÇÃO'}
        </span>
        <h2>{place.name}</h2>
        <p>{place.summary}</p>
        {city && (
          <>
            <div className="city-stats">
              <span>
                <House size={17} />
                <strong>{homeCount}</strong> casas catalogadas
              </span>
              <span>
                <Building2 size={17} />
                <strong>{city.points.length}</strong> pontos de interesse
              </span>
            </div>
            <p className="coverage-note">
              Contagem dos locais documentados abaixo, não de todas as
              residências da cidade.
            </p>
          </>
        )}
      </div>
      <Tabs
        value={tab}
        onValueChange={(value) => onTabChange(String(value))}
        className="guide-tabs"
      >
        <TabsList className="guide-tab-list" aria-label="Conteúdo do guia">
          <TabsTrigger value="overview">{city ? 'Cidade' : 'Guia'}</TabsTrigger>
          <TabsTrigger value="pokemon">Pokémon</TabsTrigger>
          <TabsTrigger value="items">Itens</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="tab-body">
            {place.legendary && (
              <section className="legendary-card">
                <Sparkles />
                <span className="eyebrow">
                  ENCONTRO FIXO · NV. {place.legendary.level}
                </span>
                <div className="legendary-title">
                  <h3>{place.legendary.name}</h3>
                  <PokemonIcon name={place.legendary.name} />
                </div>
                <p>{place.legendary.requirement}</p>
                <p>{place.legendary.tip}</p>
                <button
                  onClick={() => onNavigate(place.id, place.legendary?.floor)}
                >
                  Ver andar do encontro <ChevronRight size={16} />
                </button>
              </section>
            )}
            {city && (
              <section className="city-directory">
                <h3>Casas, edifícios & NPCs</h3>
                <p className="directory-intro">
                  Selecione um local para consultar seus moradores, serviços e
                  recompensas.
                </p>
                {point && (
                  <section className="point-detail" aria-live="polite">
                    <span className="eyebrow">
                      {point.type === 'externo'
                        ? 'ÁREA EXTERNA'
                        : point.type.toUpperCase()}
                    </span>
                    <h4>{point.name}</h4>
                    <p>{point.description}</p>
                    {point.npcs.length > 0 && (
                      <div className="point-npcs">
                        <Users size={16} />
                        <span>{point.npcs.join(' · ')}</span>
                      </div>
                    )}
                    {!!point.rewards?.length && (
                      <ul className="reward-list">
                        {point.rewards.map((r) => (
                          <li key={r}>
                            <Backpack size={14} />
                            {r}
                          </li>
                        ))}
                      </ul>
                    )}
                    {point.target && (
                      <button
                        className="enter-button"
                        onClick={() => onNavigate(point.target)}
                      >
                        Entrar e abrir mapa <ArrowRight size={16} />
                      </button>
                    )}
                    {!point.target && (
                      <p className="small-note">
                        Guia deste ponto de interesse. Não há planta interna
                        individual disponível no atlas.
                      </p>
                    )}
                  </section>
                )}
                <div className="point-list">
                  {city.points.map((p, index) => (
                    <button
                      key={p.id}
                      className={poi === p.id ? 'active' : ''}
                      onClick={() => onNavigate(place.id, '', p.id)}
                      aria-pressed={poi === p.id}
                    >
                      <span className="point-number">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span>
                        <strong>{p.name}</strong>
                        <small>
                          {p.type === 'externo'
                            ? 'NPC / evento externo'
                            : p.type === 'acesso'
                              ? 'Acesso / subárea'
                              : p.type === 'npc'
                                ? 'NPC dentro de edifício'
                                : p.type}
                        </small>
                      </span>
                      <ChevronRight size={15} />
                    </button>
                  ))}
                </div>
              </section>
            )}
            {!city && place.note && (
              <div className="area-note">
                <Info size={17} />
                <p>{place.note}</p>
              </div>
            )}
            {place.id === 'silph-co' && (
              <div className="area-note">
                <Info size={17} />
                <p>
                  Os andares corretos são 2F–11F. A imagem imprime 1F–10F: use a
                  numeração corrigida nos botões. O lobby 1F não está
                  representado.
                </p>
              </div>
            )}
            {place.id === 'victory-road' && (
              <div className="area-note">
                <Info size={17} />
                <p>
                  Na imagem, “1F West / 1F East / 2F” correspondem a 1F / 2F /
                  3F do jogo. Os botões usam a numeração do jogo.
                </p>
              </div>
            )}
            {place.id === 'pokemon-tower' && (
              <p className="small-note">
                O mapa cobre 2F–7F. O lobby 1F não está incluído.
              </p>
            )}
            {place.floors && (
              <>
                <h3>Andares disponíveis</h3>
                <div className="floor-directory">
                  {place.floors.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => onNavigate(place.id, f.id)}
                    >
                      {f.name}
                      <ChevronRight size={15} />
                    </button>
                  ))}
                </div>
              </>
            )}
            <h3>Continue a jornada</h3>
            <div className="connections">
              {place.connections.map((id) => (
                <button key={id} onClick={() => onNavigate(id)}>
                  {placeById[id]?.name}
                  <ChevronRight size={16} />
                </button>
              ))}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="pokemon">
          <div className="tab-body">
            {city?.trade && (
              <section className="trade-card">
                <span className="eyebrow">
                  <Repeat2 size={14} /> TROCA COM NPC · REPETÍVEL
                </span>
                <h3>{city.trade.npc}</h3>
                <div className="trade-flow">
                  <span>
                    {city.trade.species}
                    <small>Forma de Kanto</small>
                  </span>
                  <ArrowRight size={18} />
                  <span>
                    {city.trade.species}
                    <small>Alola · Nv. {city.trade.level}</small>
                  </span>
                </div>
                <p>
                  No Centro Pokémon. Entregue a forma de Kanto para receber a
                  forma de Alola.
                  {city.trade.version ? ' Troca da versão Pikachu.' : ''}
                </p>
                <a
                  href="https://www.serebii.net/letsgopikachueevee/trade.shtml"
                  target="_blank"
                  rel="noreferrer"
                >
                  Referência da troca <ArrowUpRight size={13} />
                </a>
              </section>
            )}
            {gifts.length > 0 && (
              <section className="gift-section">
                <h3>
                  <Gift size={16} /> Presentes & outros métodos
                </h3>
                {gifts.map((g) => (
                  <article className="gift-card" key={g.name}>
                    <div>
                      <span className="gift-name">
                        <PokemonIcon name={g.name} />
                        <strong>{g.name}</strong>
                      </span>
                      <span>
                        {g.method ?? 'Presente'} · Nv. {g.level}
                      </span>
                    </div>
                    <p>{g.note}</p>
                  </article>
                ))}
              </section>
            )}
            <h3>Encontros selvagens</h3>
            {noWild.has(place.id) ? (
              <div className="empty-encounters">
                <Info size={18} />
                <p>
                  Não há tabela de capturas selvagens neste local. Pokémon das
                  rotas e interiores próximos ficam nas respectivas páginas,
                  separados dos presentes e trocas.
                </p>
              </div>
            ) : (
              <>
                <div
                  className="encounter-filters"
                  aria-label="Filtrar método de encontro"
                >
                  {[
                    ['all', 'Todos'],
                    ['ground', 'Solo'],
                    ['water', 'Água'],
                    ['rare', 'Raros'],
                    ['sky', 'Céu'],
                  ].map(([value, label]) => (
                    <button
                      key={value}
                      className={method === value ? 'active' : ''}
                      aria-pressed={method === value}
                      onClick={() => setMethod(value)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                {Object.entries(grouped).map(([name, entries]) => (
                  <section key={name} className="encounter-group">
                    <h4>
                      {name} <span>{entries?.length}</span>
                    </h4>
                    <div className="pokemon-grid">
                      {entries?.map((e) => (
                        <div className="pokemon-chip" key={e.name}>
                          <PokemonIcon name={e.name} />
                          <strong>{e.name}</strong>
                          {e.version === 'Pikachu' && (
                            <small>Versão Pikachu</small>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                ))}
                {!visible.length && (
                  <p className="empty">
                    Nenhum encontro documentado para este método nesta área.
                  </p>
                )}
                {place.floors && (
                  <p className="small-note">
                    A lista reúne os andares da área; uma espécie pode aparecer
                    só em parte deles. Consulte a fonte para níveis e taxas por
                    andar.
                  </p>
                )}
                <div className="water-note">
                  <Waves size={18} />
                  <p>
                    Água = Sea Skim. Let’s Go não tem pesca. Encontros especiais
                    são raros, não garantidos; as aves no céu exigem a Liga e as
                    três aves capturadas nos encontros fixos.
                  </p>
                </div>
              </>
            )}
          </div>
        </TabsContent>
        <TabsContent value="items">
          <div className="tab-body">
            <h3 className="tab-title">
              <Backpack size={17} /> Itens & recompensas
            </h3>
            <p className="directory-intro">
              Seleção documentada de itens importantes. Não representa todos os
              objetos, itens ocultos ou recompensas diárias.
            </p>
            {city
              ? city.points
                  .filter((p) => p.rewards?.length)
                  .map((p) => (
                    <article className="item-card" key={p.id}>
                      <strong>{p.name}</strong>
                      <ul>
                        {p.rewards?.map((r) => (
                          <li key={r}>{r}</li>
                        ))}
                      </ul>
                      <button
                        onClick={() => {
                          onTabChange('overview');
                          onNavigate(place.id, '', p.id);
                        }}
                      >
                        Ver local e condição <ChevronRight size={14} />
                      </button>
                    </article>
                  ))
              : items.map((i, index) => (
                  <article key={i.name + index} className="item-card">
                    <strong>{i.name}</strong>
                    <p>{i.note}</p>
                  </article>
                ))}
            {!city && !items.length && (
              <p className="empty">
                Nenhum item catalogado aqui. Consulte a referência do local.
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>
      <div className="detail-sources">
        <a href={place.source} target="_blank" rel="noreferrer">
          Encontros e itens · Serebii <ArrowUpRight size={13} />
        </a>
        {city && (
          <a href={city.source} target="_blank" rel="noreferrer">
            Cidade e NPCs · Bulbapedia <ArrowUpRight size={13} />
          </a>
        )}
      </div>
    </>
  );
}
