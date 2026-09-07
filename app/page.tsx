'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Backpack, Building2, ChevronRight, ExternalLink, Fish, House, Info, Map, MapPin, Search, Sparkles, Users, X } from 'lucide-react';
import { cityData } from '@/lib/city-data';

type Place = { id:string; name:string; x:number; y:number; kind:'city'|'area'|'cave'|'legendary'; level:string; pokemon:string[]; items:string[]; note:string; tip:string };
type CaveSpot = { x:number; y:number; type:'item'|'legendary'|'ladder'|'entrance'; label:string };

const places: Place[] = [
  { id:'pallet', name:'Pallet Town', x:23, y:78, kind:'city', level:'Início', pokemon:['Pikachu parceiro','Eevee','Oddish'], items:['Town Map','Pokédex','Razz Berry'], note:'Onde a jornada começa, com o Laboratório do Professor Oak.', tip:'Volte ao laboratório depois da Liga para liberar a Mega Evolução.' },
  { id:'viridian', name:'Viridian City', x:23, y:67, kind:'city', level:'Ginásio 8', pokemon:['Pidgey','Rattata','Spearow'], items:['Oak’s Parcel','TM11 Will-O-Wisp','TM41 Earthquake'], note:'Cidade verde entre a Rota 1 e a Floresta de Viridian.', tip:'O Ginásio só abre no fim da campanha.' },
  { id:'viridian-forest', name:'Floresta de Viridian', x:24, y:53, kind:'area', level:'Nv. 3–6', pokemon:['Pikachu','Caterpie','Bulbasaur'], items:['Poké Ball ×5','Antídoto','Lure'], note:'Uma floresta-labirinto ao norte de Viridian. Bulbasaur aparece como encontro raro.', tip:'Use Lure para aumentar a chance de spawns raros e shiny.' },
  { id:'pewter', name:'Pewter City', x:25, y:40, kind:'city', level:'Ginásio 1', pokemon:['Aerodactyl','Kabuto','Omanyte'], items:['Old Amber','Pewter Crunchies','TM01 Headbutt'], note:'Cidade de Brock, do Museu de Ciências e do primeiro Ginásio.', tip:'O acesso aos fósseis do museu exige Chop Down.' },
  { id:'moon', name:'Mt. Moon', x:38, y:28, kind:'cave', level:'Nv. 5–10', pokemon:['Clefairy','Zubat','Geodude'], items:['Moon Stone','TM01 Headbutt','Fóssil'], note:'Primeira grande caverna da jornada, com dois andares subterrâneos.', tip:'As crateras escondem Moon Stones que podem reaparecer diariamente.' },
  { id:'cerulean', name:'Cerulean City', x:55, y:30, kind:'city', level:'Ginásio 2', pokemon:['Psyduck','Goldeen','Magikarp'], items:['Rare Candy','Nugget','TM29 Scald'], note:'Cidade do Ginásio de Misty e acesso às Rotas 24 e 25.', tip:'Receba um Bulbasaur na casa ao lado do Centro Pokémon depois de 30 capturas.' },
  { id:'cerulean-cave', name:'Cerulean Cave', x:50, y:22, kind:'legendary', level:'Pós-jogo', pokemon:['Mewtwo','Rhydon','Ditto','Snorlax'], items:['PP Max','Rare Candy','Mewtwonite X/Y'], note:'Caverna pós-jogo com Pokémon de alto nível. Mewtwo está no ponto mais profundo.', tip:'Leve Ultra Balls e a Master Ball. Itens brilhantes podem reaparecer após 256 passos.' },
  { id:'power-plant', name:'Usina de Força', x:72, y:34, kind:'legendary', level:'Nv. 39–45', pokemon:['Zapdos','Electabuzz','Magneton','Electrode'], items:['Thunder Stone','TM38 Thunder','Rare Candy ×6'], note:'Instalação abandonada na Rota 10. Zapdos espera na sala final.', tip:'Alguns itens no chão são Electrode disfarçados.' },
  { id:'rock-tunnel', name:'Rock Tunnel', x:77, y:42, kind:'cave', level:'Nv. 22–27', pokemon:['Onix','Rhyhorn','Charmander'], items:['Super Potion','Revive','TM47 Surf'], note:'Túneis escuros entre a Rota 10 e Lavender Town.', tip:'Light Up torna o caminho muito mais fácil.' },
  { id:'saffron', name:'Saffron City', x:55, y:49, kind:'city', level:'Ginásio 6', pokemon:['Lapras','Porygon','Hitmonlee'], items:['Master Ball','TM40 Psychic','Porygon'], note:'Centro de Kanto. Abriga Silph Co. e o Ginásio de Sabrina.', tip:'Complete Silph Co. para receber a Master Ball.' },
  { id:'celadon', name:'Celadon City', x:40, y:49, kind:'city', level:'Ginásio 4', pokemon:['Eevee','Porygon','Charmander'], items:['Tea','Leaf Stone','TM53 Mega Drain'], note:'Metrópole comercial com a loja de departamentos e o esconderijo Rocket.', tip:'Compre pedras evolutivas no 4º andar da loja.' },
  { id:'lavender', name:'Lavender Town', x:72, y:50, kind:'city', level:'Torre Pokémon', pokemon:['Gastly','Haunter','Cubone'], items:['Poké Flute','Elixir','Ice Stone'], note:'A Torre Pokémon domina a paisagem e guarda encontros do tipo Fantasma.', tip:'Você precisa do Silph Scope para identificar os fantasmas.' },
  { id:'vermilion', name:'Vermilion City', x:57, y:67, kind:'city', level:'Ginásio 3', pokemon:['Squirtle','Drowzee','Mr. Mime'], items:['S.S. Ticket','Sailor Set','TM36 Thunderbolt'], note:'Cidade portuária, casa do S.S. Anne e do Ginásio de Lt. Surge.', tip:'Receba um Squirtle da Oficial Jenny depois de 60 capturas.' },
  { id:'fuchsia', name:'Fuchsia City', x:43, y:80, kind:'city', level:'Ginásio 5', pokemon:['Chansey','Kangaskhan','Tauros'], items:['Gold Teeth','Safari Set','TM27 Toxic'], note:'Porta de entrada do GO Park e ponto de acesso às rotas marítimas.', tip:'Entregue os Gold Teeth ao diretor para aprender Strong Push.' },
  { id:'seafoam', name:'Ilhas Seafoam', x:27, y:88, kind:'legendary', level:'Nv. 39–46', pokemon:['Articuno','Jynx','Slowbro','Dewgong'], items:['Ice Stone','Super Lure','TM55 Ice Beam'], note:'Caverna gelada entre Fuchsia e Cinnabar. Articuno aguarda no quarto subsolo.', tip:'Use Strong Push nos blocos de pedra para controlar a correnteza.' },
  { id:'cinnabar', name:'Cinnabar Island', x:13, y:86, kind:'city', level:'Ginásio 7', pokemon:['Magmar','Ditto','Grimer'], items:['Secret Key','Fire Stone','TM22 Rock Slide'], note:'Ilha vulcânica com o Laboratório e a Mansão Pokémon.', tip:'A Secret Key da mansão abre o Ginásio.' },
  { id:'victory-road', name:'Victory Road', x:13, y:35, kind:'legendary', level:'Nv. 41–46', pokemon:['Moltres','Machoke','Onix','Hitmonchan'], items:['TM56 Stealth Rock','Max Revive','Golden Nanab Berry'], note:'Prova final antes da Liga. Moltres está escondido em uma plataforma interna.', tip:'Leve um Pokémon com Strong Push para abrir as passagens.' },
  { id:'indigo', name:'Indigo Plateau', x:8, y:23, kind:'area', level:'Liga Pokémon', pokemon:['Elite Four','Campeão','Master Trainers'], items:['Elite Four','Hall da Fama','Mega Stones'], note:'Destino final da campanha principal e lar da Liga Pokémon.', tip:'Estoque Full Restore, Revive e itens de PP antes de entrar.' },
];

const caveData: Record<string,{legendary:string; floors:{name:string; spots:CaveSpot[]}[]}> = {
  'cerulean-cave': { legendary:'Mewtwo · Nv. 70', floors:[
    {name:'1F',spots:[{x:18,y:78,type:'entrance',label:'Entrada'},{x:23,y:52,type:'item',label:'Full Heal'},{x:48,y:37,type:'item',label:'Max Revive'},{x:76,y:22,type:'item',label:'PP Max'},{x:70,y:63,type:'ladder',label:'Escada para 2F'}]},
    {name:'2F',spots:[{x:18,y:23,type:'ladder',label:'Escada oeste'},{x:46,y:48,type:'item',label:'Ultra Ball ×5'},{x:70,y:24,type:'item',label:'Max Lure'},{x:78,y:69,type:'item',label:'Max Revive'},{x:28,y:73,type:'ladder',label:'Descida para B1F'}]},
    {name:'B1F',spots:[{x:16,y:25,type:'ladder',label:'Escada para 2F'},{x:41,y:35,type:'item',label:'Max Elixir'},{x:72,y:20,type:'item',label:'Escape Rope'},{x:71,y:68,type:'legendary',label:'Mewtwo · Nv. 70'}]},
  ]},
  'power-plant': { legendary:'Zapdos · Nv. 50', floors:[{name:'Térreo',spots:[{x:13,y:80,type:'entrance',label:'Entrada'},{x:22,y:50,type:'item',label:'Max Revive'},{x:53,y:72,type:'item',label:'TM38 Thunder'},{x:72,y:30,type:'item',label:'Thunder Stone'},{x:83,y:18,type:'legendary',label:'Zapdos · Nv. 50'}]}]},
  seafoam: { legendary:'Articuno · Nv. 50', floors:[
    {name:'1F',spots:[{x:17,y:78,type:'entrance',label:'Entrada oeste'},{x:36,y:45,type:'item',label:'Ice Heal'},{x:72,y:30,type:'ladder',label:'Escada para B1F'}]},
    {name:'B1F',spots:[{x:23,y:28,type:'ladder',label:'Escada para 1F'},{x:45,y:62,type:'item',label:'Super Lure'},{x:75,y:70,type:'ladder',label:'Escada para B2F'}]},
    {name:'B2F',spots:[{x:25,y:70,type:'ladder',label:'Escada para B1F'},{x:55,y:28,type:'item',label:'Ice Stone'},{x:78,y:55,type:'ladder',label:'Escada para B3F'}]},
    {name:'B3F',spots:[{x:18,y:25,type:'ladder',label:'Escada para B2F'},{x:51,y:58,type:'item',label:'Hyper Potion'},{x:75,y:75,type:'ladder',label:'Escada para B4F'}]},
    {name:'B4F',spots:[{x:17,y:27,type:'ladder',label:'Escada para B3F'},{x:50,y:35,type:'item',label:'Big Pearl'},{x:68,y:64,type:'legendary',label:'Articuno · Nv. 50'}]},
  ]},
  'victory-road': { legendary:'Moltres · Nv. 50', floors:[
    {name:'1F',spots:[{x:16,y:82,type:'entrance',label:'Entrada'},{x:40,y:53,type:'item',label:'TM56 Stealth Rock'},{x:74,y:24,type:'ladder',label:'Escada para 2F'}]},
    {name:'2F',spots:[{x:19,y:29,type:'ladder',label:'Escada para 1F'},{x:48,y:67,type:'item',label:'Full Restore'},{x:74,y:42,type:'legendary',label:'Moltres · Nv. 50'},{x:83,y:20,type:'ladder',label:'Escada para 3F'}]},
    {name:'3F',spots:[{x:20,y:72,type:'ladder',label:'Escada para 2F'},{x:55,y:34,type:'item',label:'Max Revive'},{x:82,y:18,type:'entrance',label:'Saída para a Liga'}]},
  ]},
};

declare global { interface Document { modelContext?: { registerTool:(tool:unknown,options?:{signal?:AbortSignal})=>void|Promise<void> } } }

export default function Home(){
  const [selectedId,setSelectedId]=useState('cerulean-cave');
  const [inside,setInside]=useState<string|null>(null);
  const [cityId,setCityId]=useState<string|null>(null);
  const [buildingId,setBuildingId]=useState<string|null>(null);
  const [floor,setFloor]=useState(0);
  const [query,setQuery]=useState('');
  const [filter,setFilter]=useState<'all'|'legendary'>('all');
  const [activeSpot,setActiveSpot]=useState<CaveSpot|null>(null);
  const selected=places.find(p=>p.id===selectedId)??places[0];
  const cave=inside?caveData[inside]:null;
  const city=cityId?cityData[cityId]:null;
  const building=city?.buildings.find(item=>item.id===buildingId)??null;
  const normalized=query.trim().toLocaleLowerCase('pt-BR');
  const visiblePlaces=useMemo(()=>places.filter(p=>(filter==='all'||p.kind==='legendary')&&(!normalized||[p.name,...p.pokemon,...p.items].some(v=>v.toLocaleLowerCase('pt-BR').includes(normalized)))),[filter,normalized]);

  const selectPlace=(id:string)=>{setSelectedId(id);setInside(null);setCityId(null);setBuildingId(null);setActiveSpot(null)};
  const openCity=(id:string)=>{if(cityData[id]){setSelectedId(id);setCityId(id);setInside(null);setBuildingId(null);setActiveSpot(null)}};
  const enterPlace=(id:string)=>{if(caveData[id]){setSelectedId(id);setInside(id);setCityId(null);setBuildingId(null);setFloor(0);setActiveSpot(null)}};
  const returnToKanto=()=>{setInside(null);setCityId(null);setBuildingId(null);setActiveSpot(null)};

  useEffect(()=>{
    const context=document.modelContext;if(!context?.registerTool)return;const lifecycle=new AbortController();
    try{void Promise.resolve(context.registerTool({name:'navigate_kanto_atlas',title:'Navegar no Atlas de Kanto',description:'Seleciona um local e pode abrir o mapa interno de uma cidade ou área lendária.',inputSchema:{type:'object',properties:{placeId:{type:'string',enum:places.map(p=>p.id)},enter:{type:'boolean'}},required:['placeId'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute(input:unknown){const data=input as {placeId?:string;enter?:boolean};const place=places.find(p=>p.id===data.placeId);if(!place)throw new Error('Local desconhecido');setSelectedId(place.id);if(data.enter&&cityData[place.id])openCity(place.id);else if(data.enter&&caveData[place.id])enterPlace(place.id);else{setInside(null);setCityId(null)}return{selected:place.name,view:data.enter?(cityData[place.id]?'cidade':'interior'):'kanto'}}},{signal:lifecycle.signal})).catch(()=>{});}catch{}
    return()=>lifecycle.abort();
  },[]);

  return <main className="app-shell">
    <header className="topbar">
      <button className="brand brand-button" aria-label="Voltar ao mapa de Kanto" onClick={()=>{returnToKanto();setQuery('')}}><span className="pokeball"/><span className="brand-copy"><strong>Atlas de Kanto</strong><small>Let&apos;s Go, Pikachu!</small></span></button>
      <label className="search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} aria-label="Buscar local, item ou Pokémon" placeholder="Buscar local, item ou Pokémon"/>{query&&<button onClick={()=>setQuery('')} aria-label="Limpar busca"><X size={16}/></button>}</label>
      <div className="edition"><span/> Edição Pikachu</div>
    </header>
    <section className="workspace">
      <aside className="left-rail" aria-label="Filtros do mapa">
        <button onClick={()=>setFilter('all')} className={`rail-button ${filter==='all'?'active':''}`} aria-label="Mostrar todos"><Map size={21}/></button>
        <button onClick={()=>setFilter('legendary')} className={`rail-button ${filter==='legendary'?'active danger':''}`} aria-label="Mostrar covis lendários"><Sparkles size={21}/></button>
        <div className="rail-line"/><span className="rail-label">LEGENDA</span><div className="legend-dot city" title="Cidade"/><div className="legend-dot area" title="Área"/><div className="legend-dot legendary" title="Lendário"/>
      </aside>

      <div className="map-stage">
        <div className="map-heading">
          <div>{(inside||city)&&<button className="back-link" onClick={returnToKanto}><ArrowLeft size={15}/> Kanto</button>}<span>{city?'MAPA DA CIDADE':inside?'MAPA INTERNO':'REGIÃO'}</span><h1>{city?.name??(inside?selected.name:'Kanto')}</h1></div>
          {!inside&&!city&&<p>{visiblePlaces.length} locais · cidades abrem mapas próprios</p>}
          {inside&&cave&&<div className="floor-tabs" role="tablist" aria-label="Andares">{cave.floors.map((f,i)=><button key={f.name} className={floor===i?'active':''} onClick={()=>{setFloor(i);setActiveSpot(null)}}>{f.name}</button>)}</div>}
          {city&&<div className="city-counter"><Building2 size={15}/><span>{city.accessible} locais visitáveis</span></div>}
        </div>

        {!inside&&!city?<section className="kanto-map" aria-label="Mapa interativo de Kanto">
          <svg className="terrain" viewBox="0 0 1000 720" aria-hidden="true"><path className="land-shadow" d="M112 212L212 125 342 129 402 72 550 92 607 153 782 162 887 272 832 386 895 457 802 567 672 550 603 643 448 624 355 683 222 638 145 548 82 415Z"/><path className="land" d="M105 196L205 109 335 113 395 56 543 76 600 137 775 146 880 256 825 370 888 441 795 551 665 534 596 627 441 608 348 667 215 622 138 532 75 399Z"/><path className="route" d="M240 555L237 250 374 197 532 216 533 351 405 352 532 351 544 480 420 575 230 575M532 351L704 362 710 247M544 480L700 515 795 551M420 575L135 610M205 109L90 165"/><path className="water-line" d="M76 440C191 479 215 555 215 622M596 627C657 581 718 584 795 551"/></svg>
          {visiblePlaces.map(place=><button key={place.id} className={`marker ${place.kind} ${selectedId===place.id?'selected':''}`} style={{left:`${place.x}%`,top:`${place.y}%`}} onClick={()=>cityData[place.id]?openCity(place.id):selectPlace(place.id)} aria-label={`${place.name}${cityData[place.id]?' — abrir mapa da cidade':''}`}><span className="marker-pulse"/><MapPin size={place.kind==='legendary'?27:21} fill="currentColor"/><b>{place.name}</b></button>)}
          {visiblePlaces.length===0&&<div className="no-results"><Search size={24}/><strong>Nenhum ponto encontrado</strong><span>Tente o nome de um local, item ou Pokémon.</span></div>}
        </section>:city?<section className="city-map" aria-label={`Mapa navegável de ${city.name}`}>
          <Image fill priority src={`${process.env.NEXT_PUBLIC_BASE_PATH??''}/maps/${city.image}`} alt={`Vista de ${city.name} em Pokémon Let’s Go`} sizes="(max-width: 760px) 100vw, 60vw"/>
          <div className="city-map-shade"/>
          {city.buildings.map((item,index)=><button key={item.id} style={{left:`${item.x}%`,top:`${item.y}%`}} className={`building-marker ${item.category} ${buildingId===item.id?'selected':''}`} onClick={()=>setBuildingId(item.id)} aria-label={item.name}><span>{index+1}</span><b>{item.name}</b></button>)}
          <div className="city-map-caption"><span>VISTA DO JOGO</span><p>Selecione os pontos numerados para abrir cada local.</p></div>
          <a className="map-source" href={city.source} target="_blank" rel="noreferrer">Fonte do mapa <ExternalLink size={12}/></a>
        </section>:cave&&<div className={`interior-map interior-${inside}`} role="tabpanel" aria-label={`${selected.name}, ${cave.floors[floor].name}`}>
          <div className="cave-glow"/><svg className="floor-plan" viewBox="0 0 800 520" aria-hidden="true"><path className="floor-shadow" d="M64 405L100 168 184 110 312 129 385 78 557 99 688 186 723 338 646 441 504 462 387 422 266 473 139 450Z"/><path className="floor-land" d="M70 388L106 151 190 93 318 112 391 61 563 82 694 169 729 321 652 424 510 445 393 405 272 456 145 433Z"/><path className="floor-path" d={floor%3===0?'M115 370L179 273 286 304 334 178 469 207 578 144 674 196 621 337 503 354 393 405':'M124 194L224 164 296 247 401 159 543 205 660 169 619 302 525 385 384 347 260 409 145 367'}/><path className="floor-water" d={inside==='seafoam'||inside==='cerulean-cave'?'M112 343C221 317 260 377 366 339S539 260 685 303':''}/></svg>
          {cave.floors[floor].spots.map((spot,i)=><button key={`${spot.label}-${i}`} style={{left:`${spot.x}%`,top:`${spot.y}%`}} className={`cave-marker ${spot.type} ${activeSpot===spot?'selected':''}`} onClick={()=>setActiveSpot(spot)} aria-label={spot.label}><span>{spot.type==='item'?'◆':spot.type==='legendary'?'★':spot.type==='entrance'?'↑':'⇵'}</span><b>{spot.label}</b></button>)}
          <div className="map-compass"><span>N</span><i/></div>
          <div className="interior-legend"><span><i className="item"/> Item</span><span><i className="ladder"/> Escada</span><span><i className="legendary"/> Lendário</span></div>
        </div>}
      </div>

      <aside className="detail-panel">
        {city?<div className="detail-scroll city-details">
          <div className="eyebrow">{building?'LOCAL DA CIDADE':'GUIA DA CIDADE'}</div>
          <h2>{building?.name??city.name}</h2>
          {building?<>
            <span className={`category-label ${building.category}`}>{building.category}</span>
            <p className="note">{building.description}</p>
            <section><h3><span className="title-icon"><Users size={15}/> NPCs neste local</span><span>{building.npcs.length}</span></h3><ul className="npc-list">{building.npcs.map(npc=><li key={npc}><span className="npc-avatar">{npc.charAt(0)}</span>{npc}</li>)}</ul></section>
            {building.rewards&&<section><h3>Recompensas e serviços <span>{building.rewards.length}</span></h3><ul className="item-list">{building.rewards.map(item=><li key={item}><span className="item-orb"/>{item}</li>)}</ul></section>}
            <button className="inline-back" onClick={()=>setBuildingId(null)}><ArrowLeft size={15}/> Ver todos os locais</button>
          </>:<>
            <div className="city-stats"><div><Building2/><strong>{city.accessible}</strong><span>locais visitáveis</span></div><div><House/><strong>{city.houses}</strong><span>casas</span></div><div><Users/><strong>{city.importantNpcs.length}</strong><span>NPCs-chave</span></div></div>
            <section><h3>Locais e edifícios <span>{city.buildings.length}</span></h3><div className="building-list">{city.buildings.map((item,index)=><button key={item.id} onClick={()=>setBuildingId(item.id)}><span className={`building-number ${item.category}`}>{index+1}</span><span><strong>{item.name}</strong><small>{item.category}</small></span><ChevronRight size={15}/></button>)}</div></section>
            {city.trade&&<section className="trade-section"><h3>Troca com NPC <span>REPETÍVEL</span></h3><div className="trade-card"><div><small>ENTREGUE</small><strong>{city.trade.give}</strong></div><ArrowRight size={18}/><div><small>RECEBA · NV. {city.trade.level}</small><strong>{city.trade.receive}</strong></div></div><p>{city.trade.npc}, no {city.trade.location}. A troca pode ser repetida e o Pokémon pode vir shiny.</p></section>}
            <section className="water-section"><h3><span className="title-icon"><Fish size={15}/> Pokémon aquáticos</span><span>{city.water.method}</span></h3><p className="water-area">{city.water.area}</p>{city.water.pokemon.length>0?<div className="chip-list">{city.water.pokemon.map(name=><span className="pokemon-chip" key={name}>{name}</span>)}</div>:<div className="empty-water">Nenhum encontro aquático neste mapa.</div>}<p className="micro-note">{city.water.note}</p></section>
            <section><h3>NPCs importantes <span>{city.importantNpcs.length}</span></h3><ul className="npc-list compact">{city.importantNpcs.map(npc=><li key={npc}>{npc}</li>)}</ul></section>
          </>}
        </div>:<div className="detail-scroll">
          <div className="eyebrow">{inside?`${cave?.floors[floor].name} · ${activeSpot?.type==='item'?'ITEM SELECIONADO':'MAPA DA ÁREA'}`:selected.kind==='legendary'?'ÁREA LENDÁRIA':'LOCAL SELECIONADO'}</div>
          <h2>{activeSpot?.label??selected.name}</h2>
          {inside&&activeSpot?<p className="note">{activeSpot.type==='legendary'?`Encontro único: ${activeSpot.label}. Salve o jogo antes da batalha.`:activeSpot.type==='item'?`Item localizado em ${cave?.floors[floor].name}. Confira o ponto destacado no mapa.`:'Use este acesso para continuar entre os andares.'}</p>:<p className="note">{selected.note}</p>}
          {!activeSpot&&<><div className="stat-row"><span>{selected.level}</span>{selected.kind==='legendary'&&<span className="danger-tag"><Sparkles size={12}/> Lendário</span>}</div>
          <section><h3>Pokémon em destaque <span>{selected.pokemon.length}</span></h3><div className="pokemon-list">{selected.pokemon.map((name,i)=><div className={`pokemon-card type-${i%4}`} key={name}><span className="pokemon-index">{String(i+1).padStart(2,'0')}</span><strong>{name}</strong>{i===0&&selected.kind==='legendary'&&<small>ENCONTRO ÚNICO</small>}</div>)}</div></section>
          <section><h3>Itens importantes <span>{selected.items.length}</span></h3><ul className="item-list">{selected.items.map(item=><li key={item}><span className="item-orb"/>{item}</li>)}</ul></section>
          <div className="tip-card"><Info size={17}/><p><strong>Dica do treinador</strong>{selected.tip}</p></div></>}
        </div>}
        {!inside&&!city&&caveData[selected.id]&&<button onClick={()=>enterPlace(selected.id)} className="enter-button">Entrar no mapa <ArrowRight size={18}/></button>}
        {(inside||city)&&<button onClick={returnToKanto} className="enter-button secondary"><ArrowLeft size={18}/> Voltar para Kanto</button>}
      </aside>
    </section>
    <nav className="mobile-nav" aria-label="Navegação móvel"><button className="active" onClick={()=>setFilter('all')}><Map size={19}/>Mapa</button><button onClick={()=>setFilter('legendary')}><Sparkles size={19}/>Lendários</button><button onClick={()=>document.querySelector('.detail-panel')?.scrollIntoView({behavior:'smooth'})}><Backpack size={19}/>Detalhes</button></nav>
    <footer className="source-note">Guia independente, não oficial. Vistas do jogo: arquivo Bulbapedia. Dados: Bulbapedia e Serebii. Pokémon pertence à Nintendo, Game Freak, Creatures e The Pokémon Company. <ChevronRight size={12}/></footer>
  </main>
}
