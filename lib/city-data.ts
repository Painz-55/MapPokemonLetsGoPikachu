export type CityBuilding = {
  id: string;
  name: string;
  category: 'casa' | 'serviço' | 'ginásio' | 'especial';
  x: number;
  y: number;
  description: string;
  npcs: string[];
  rewards?: string[];
};

export type CityGuide = {
  name: string;
  image: string;
  source: string;
  accessible: number;
  houses: number;
  buildings: CityBuilding[];
  importantNpcs: string[];
  trade?: { give: string; receive: string; level: number; npc: string; location: string };
  water: { method: 'Sea Skim' | 'Sem encontros'; area: string; pokemon: string[]; note: string };
};

const source = 'https://bulbapedia.bulbagarden.net/wiki/Category:Kanto_locations';

export const cityData: Record<string, CityGuide> = {
  pallet: {
    name: 'Pallet Town', image: 'pallet.png', source, accessible: 3, houses: 2,
    buildings: [
      { id:'player-house', name:'Casa do jogador', category:'casa', x:31, y:38, description:'Casa inicial. O quarto fica no andar superior.', npcs:['Mãe'], rewards:['Descanso gratuito'] },
      { id:'rival-house', name:'Casa de Trace', category:'casa', x:66, y:37, description:'Residência do rival e de sua irmã.', npcs:['Daisy','Trace'], rewards:['Town Map'] },
      { id:'oak-lab', name:'Laboratório do Prof. Oak', category:'especial', x:50, y:75, description:'Centro da pesquisa Pokémon e ponto inicial da aventura.', npcs:['Professor Oak','Assistentes','Trace'], rewards:['Pokédex','Pikachu parceiro','Mega Stones (pós-jogo)'] },
    ],
    importantNpcs:['Professor Oak — Pokédex e parceiro','Daisy — entrega o Town Map','Mãe — cura a equipe'],
    water:{method:'Sea Skim',area:'Rota 21, imediatamente ao sul',pokemon:['Tentacool','Tentacruel','Magikarp','Staryu'],note:'A água navegável pertence à Rota 21, não ao mapa interno de Pallet.'},
  },
  viridian: {
    name:'Viridian City', image:'viridian.png', source, accessible:6, houses:2,
    buildings:[
      {id:'viridian-center',name:'Centro Pokémon',category:'serviço',x:30,y:42,description:'Cura, PC e comunicação.',npcs:['Enfermeira Joy']},
      {id:'viridian-mart',name:'Poké Mart',category:'serviço',x:68,y:34,description:'Primeira loja da jornada e ponto da encomenda de Oak.',npcs:['Atendente'],rewards:['Oak’s Parcel']},
      {id:'academy',name:'Academia Pokémon',category:'especial',x:71,y:62,description:'Tutoriais sobre status e batalhas.',npcs:['Professor da academia','Alunos']},
      {id:'viridian-gym',name:'Ginásio de Viridian',category:'ginásio',x:47,y:20,description:'Oitavo Ginásio; torna-se acessível no fim da campanha.',npcs:['Giovanni','Blue (pós-jogo)'],rewards:['Earth Badge','TM41 Earthquake']},
      {id:'viridian-house-1',name:'Casa sudoeste',category:'casa',x:19,y:70,description:'Residência próxima à saída sul.',npcs:['Moradores']},
      {id:'viridian-house-2',name:'Casa noroeste',category:'casa',x:23,y:20,description:'Residência na parte alta da cidade.',npcs:['Homem adormecido'],rewards:['TM11 Will-O-Wisp']},
    ],
    importantNpcs:['Atendente do Mart — entrega Oak’s Parcel','Giovanni — líder do oitavo Ginásio','Blue — assume o Ginásio no pós-jogo'],
    water:{method:'Sem encontros',area:'Lagos decorativos da cidade',pokemon:[],note:'Os pequenos lagos de Viridian não possuem uma tabela própria de encontros.'},
  },
  pewter: {
    name:'Pewter City', image:'pewter.png', source, accessible:7, houses:2,
    buildings:[
      {id:'pewter-center',name:'Centro Pokémon',category:'serviço',x:29,y:62,description:'Cura a equipe antes do primeiro Ginásio.',npcs:['Enfermeira Joy','Vendedor de Magikarp'],rewards:['Magikarp por $500']},
      {id:'pewter-mart',name:'Poké Mart',category:'serviço',x:55,y:62,description:'Loja de suprimentos da cidade.',npcs:['Atendentes']},
      {id:'pewter-gym',name:'Ginásio de Pewter',category:'ginásio',x:77,y:55,description:'Ginásio de tipo Pedra.',npcs:['Brock'],rewards:['Boulder Badge','TM01 Headbutt']},
      {id:'museum',name:'Museu de Ciências',category:'especial',x:42,y:18,description:'Exposições de fósseis e espaço. A entrada lateral exige Chop Down.',npcs:['Cientistas'],rewards:['Old Amber']},
      {id:'slowpoke-yard',name:'Quintal do Slowpoke',category:'especial',x:17,y:37,description:'Ajude a cuidar do Slowpoke.',npcs:['Senhora do Slowpoke'],rewards:['Big Pearl (diária)']},
      {id:'pewter-house-1',name:'Casa leste',category:'casa',x:80,y:27,description:'Residência na parte leste.',npcs:['Moradores']},
      {id:'pewter-house-2',name:'Casa sul',category:'casa',x:72,y:79,description:'Residência próxima à Rota 3.',npcs:['Moradores']},
    ],
    importantNpcs:['Brock — Boulder Badge','Senhora do Slowpoke — Big Pearl diária','Cientista do museu — Old Amber'],
    water:{method:'Sem encontros',area:'Pewter City',pokemon:[],note:'Não há área aquática capturável dentro da cidade.'},
  },
  cerulean: {
    name:'Cerulean City', image:'cerulean.png', source, accessible:8, houses:3,
    buildings:[
      {id:'cerulean-center',name:'Centro Pokémon',category:'serviço',x:43,y:29,description:'Cura, PC e a troca repetível por Rattata de Alola.',npcs:['Enfermeira Joy','Tatianna — troca Pokémon']},
      {id:'cerulean-mart',name:'Poké Mart',category:'serviço',x:19,y:76,description:'Loja ao sul do Ginásio.',npcs:['Atendentes']},
      {id:'cerulean-gym',name:'Ginásio de Cerulean',category:'ginásio',x:77,y:60,description:'Ginásio aquático com piscina interna.',npcs:['Misty'],rewards:['Cascade Badge','TM29 Scald']},
      {id:'bike-shop',name:'Loja de bicicletas',category:'serviço',x:73,y:25,description:'Exibe bicicletas; o Bike Voucher rende acessórios, não uma bicicleta utilizável.',npcs:['Dono da loja'],rewards:['Heart Scale ×5']},
      {id:'bulbasaur-house',name:'Casa do Bulbasaur',category:'casa',x:20,y:27,description:'Uma cuidadora entrega Bulbasaur após 30 capturas.',npcs:['Cuidadora'],rewards:['Bulbasaur']},
      {id:'burgled-house',name:'Casa assaltada',category:'casa',x:83,y:38,description:'A Equipe Rocket abriu uma passagem nos fundos.',npcs:['Moradores','Rocket Grunt'],rewards:['TM10 Dig']},
      {id:'badge-house',name:'Casa das Insígnias',category:'casa',x:56,y:74,description:'Morador explica os efeitos das insígnias.',npcs:['Especialista em insígnias']},
      {id:'cerulean-cave-gate',name:'Acesso à Cerulean Cave',category:'especial',x:8,y:20,description:'Acesso pós-jogo ao covil de Mewtwo, via Sea Skim.',npcs:['Coach Trainer Harjit'],rewards:['TM60 Megahorn']},
    ],
    importantNpcs:['Misty — Cascade Badge','Tatianna — troca Rattata por Rattata de Alola','Cuidadora — Bulbasaur após 30 capturas'],
    trade:{give:'Rattata',receive:'Rattata de Alola',level:12,npc:'Tatianna',location:'Centro Pokémon'},
    water:{method:'Sea Skim',area:'Canal de Cerulean e acesso à caverna',pokemon:['Psyduck','Golduck','Poliwag','Poliwhirl','Magikarp'],note:'Os encontros surgem sobre a água depois de aprender Sea Skim.'},
  },
  vermilion: {
    name:'Vermilion City', image:'vermilion.png', source, accessible:8, houses:3,
    buildings:[
      {id:'vermilion-center',name:'Centro Pokémon',category:'serviço',x:37,y:43,description:'Contém a troca repetível por Geodude de Alola.',npcs:['Enfermeira Joy','Higeo — troca Pokémon']},
      {id:'vermilion-mart',name:'Poké Mart',category:'serviço',x:62,y:43,description:'Loja central próxima à saída da Rota 11.',npcs:['Atendentes']},
      {id:'vermilion-gym',name:'Ginásio de Vermilion',category:'ginásio',x:79,y:72,description:'Ginásio elétrico de Lt. Surge; exige Chop Down.',npcs:['Lt. Surge'],rewards:['Thunder Badge','TM36 Thunderbolt']},
      {id:'fan-club',name:'Pokémon Fan Club',category:'especial',x:22,y:61,description:'Ouça a história do presidente.',npcs:['Presidente do Fan Club'],rewards:['Pikachu Set','Bike Voucher']},
      {id:'jenny-post',name:'Posto da Oficial Jenny',category:'especial',x:68,y:22,description:'Jenny entrega Squirtle quando você alcança 60 capturas.',npcs:['Oficial Jenny'],rewards:['Squirtle']},
      {id:'vermilion-house-1',name:'Casa do pescador',category:'casa',x:18,y:32,description:'Casa de um entusiasta de Pokémon aquáticos.',npcs:['Pescador']},
      {id:'vermilion-house-2',name:'Casa de Diglett',category:'casa',x:82,y:30,description:'Residência próxima à Rota 11.',npcs:['Moradores']},
      {id:'ss-anne',name:'Cais do S.S. Anne',category:'especial',x:50,y:86,description:'Navio da história principal. O capitão ensina Chop Down.',npcs:['Capitão','Marinheiros','Rival'],rewards:['Chop Down']},
    ],
    importantNpcs:['Higeo — troca Geodude por Geodude de Alola','Oficial Jenny — Squirtle após 60 capturas','Capitão — ensina Chop Down'],
    trade:{give:'Geodude',receive:'Geodude de Alola',level:16,npc:'Higeo',location:'Centro Pokémon'},
    water:{method:'Sem encontros',area:'Porto de Vermilion',pokemon:[],note:'O porto é cenário do S.S. Anne; use as rotas marítimas para encontros aquáticos.'},
  },
  lavender: {
    name:'Lavender Town', image:'lavender.png', source, accessible:6, houses:2,
    buildings:[
      {id:'lavender-center',name:'Centro Pokémon',category:'serviço',x:26,y:62,description:'Contém a troca repetível por Diglett de Alola.',npcs:['Enfermeira Joy','Diggette — troca Pokémon']},
      {id:'lavender-mart',name:'Poké Mart',category:'serviço',x:68,y:67,description:'Loja no sudeste da cidade.',npcs:['Atendentes']},
      {id:'pokemon-tower',name:'Torre Pokémon',category:'especial',x:77,y:25,description:'Masmorra vertical com Gastly, Haunter e a história de Cubone.',npcs:['Mr. Fuji','Channelers','Jessie e James'],rewards:['Poké Flute']},
      {id:'volunteer-house',name:'Casa dos Voluntários',category:'casa',x:30,y:29,description:'Lar de Mr. Fuji e dos Pokémon resgatados.',npcs:['Mr. Fuji','Voluntários']},
      {id:'name-rater',name:'Casa do Name Rater',category:'casa',x:51,y:66,description:'Permite alterar apelidos de Pokémon elegíveis.',npcs:['Name Rater']},
      {id:'memorial',name:'Memorial Pokémon',category:'especial',x:49,y:35,description:'Pequeno memorial no centro da cidade.',npcs:['Moradores']},
    ],
    importantNpcs:['Diggette — troca Diglett por Diglett de Alola','Mr. Fuji — entrega a Poké Flute','Name Rater — altera apelidos'],
    trade:{give:'Diglett',receive:'Diglett de Alola',level:25,npc:'Diggette',location:'Centro Pokémon'},
    water:{method:'Sem encontros',area:'Lavender Town',pokemon:[],note:'A cidade não possui água navegável; consulte as Rotas 10 e 12.'},
  },
  celadon: {
    name:'Celadon City', image:'celadon.png', source, accessible:9, houses:1,
    buildings:[
      {id:'celadon-center',name:'Centro Pokémon',category:'serviço',x:28,y:58,description:'Troca exclusiva da versão Pikachu por Sandshrew de Alola.',npcs:['Enfermeira Joy','Nicholice — troca Pokémon','Tutor de movimentos']},
      {id:'department-store',name:'Loja de Departamentos',category:'serviço',x:27,y:23,description:'Seis andares de itens, TMs, pedras evolutivas e acessórios.',npcs:['Atendentes','Girl no terraço'],rewards:['TM06 Light Screen','TM09 Reflect']},
      {id:'celadon-gym',name:'Ginásio de Celadon',category:'ginásio',x:15,y:77,description:'Ginásio de tipo Grama.',npcs:['Erika'],rewards:['Rainbow Badge','TM53 Mega Drain']},
      {id:'game-corner',name:'Rocket Game Corner',category:'especial',x:57,y:66,description:'Fachada do esconderijo subterrâneo da Equipe Rocket.',npcs:['Rocket Grunts','Archer','Giovanni'],rewards:['Silph Scope']},
      {id:'condominiums',name:'Celadon Condominiums',category:'especial',x:76,y:30,description:'Prédio residencial com Game Freak e acesso ao telhado.',npcs:['Diretor da Game Freak','Fortune Teller'],rewards:['Diplomas da Pokédex']},
      {id:'celadon-hotel',name:'Hotel de Celadon',category:'serviço',x:78,y:69,description:'Hotel frequentado por visitantes.',npcs:['Hóspedes']},
      {id:'restaurant',name:'Restaurante',category:'serviço',x:43,y:66,description:'Restaurante no centro comercial.',npcs:['Clientes']},
      {id:'tea-house',name:'Casa da amizade',category:'casa',x:63,y:33,description:'Residência junto aos condomínios.',npcs:['Moradores'],rewards:['Tea']},
      {id:'porygon-spot',name:'Ponto do Porygon',category:'especial',x:40,y:52,description:'Depois de expulsar a Equipe Rocket, converse com o NPC para receber Porygon.',npcs:['Homem assustado'],rewards:['Porygon']},
    ],
    importantNpcs:['Nicholice — troca Sandshrew por Sandshrew de Alola','Erika — Rainbow Badge','Fortune Teller — define Nature dos encontros'],
    trade:{give:'Sandshrew',receive:'Sandshrew de Alola',level:27,npc:'Nicholice',location:'Centro Pokémon'},
    water:{method:'Sem encontros',area:'Celadon City',pokemon:[],note:'As fontes e canais urbanos não possuem tabela de encontros.'},
  },
  saffron: {
    name:'Saffron City', image:'saffron.png', source, accessible:8, houses:2,
    buildings:[
      {id:'saffron-center',name:'Centro Pokémon',category:'serviço',x:62,y:58,description:'Troca repetível por Raichu de Alola.',npcs:['Enfermeira Joy','Psytrice — troca Pokémon']},
      {id:'saffron-mart',name:'Poké Mart',category:'serviço',x:77,y:46,description:'Loja no lado leste.',npcs:['Atendentes']},
      {id:'saffron-gym',name:'Ginásio de Saffron',category:'ginásio',x:74,y:22,description:'Labirinto de teletransportadores e Pokémon Psíquicos.',npcs:['Sabrina'],rewards:['Marsh Badge','TM33 Calm Mind']},
      {id:'fighting-dojo',name:'Fighting Dojo',category:'especial',x:57,y:20,description:'Desafio opcional de tipo Lutador.',npcs:['Mestre do Dojo'],rewards:['Hitmonlee ou Hitmonchan']},
      {id:'silph',name:'Silph Co.',category:'especial',x:39,y:42,description:'Prédio de onze andares ocupado pela Equipe Rocket.',npcs:['Presidente da Silph','Archer','Giovanni','Funcionário do Lapras'],rewards:['Master Ball','Lapras']},
      {id:'copycat-house',name:'Casa da Copycat',category:'casa',x:25,y:68,description:'Entregue uma Poké Doll para a Copycat.',npcs:['Copycat'],rewards:['TM08 Substitute']},
      {id:'mr-psychic',name:'Casa do Mr. Psychic',category:'casa',x:78,y:70,description:'Moradia ao sudeste da cidade.',npcs:['Mr. Psychic'],rewards:['TM40 Psychic']},
      {id:'station',name:'Estação ferroviária',category:'especial',x:19,y:34,description:'Estação sem uso durante a aventura.',npcs:['Funcionários']},
    ],
    importantNpcs:['Psytrice — troca Raichu por Raichu de Alola','Presidente da Silph — Master Ball','Funcionário da Silph — Lapras'],
    trade:{give:'Raichu',receive:'Raichu de Alola',level:30,npc:'Psytrice',location:'Centro Pokémon'},
    water:{method:'Sem encontros',area:'Saffron City',pokemon:[],note:'Não há área aquática capturável dentro da cidade.'},
  },
  fuchsia: {
    name:'Fuchsia City', image:'fuchsia.png', source, accessible:7, houses:2,
    buildings:[
      {id:'fuchsia-center',name:'Centro Pokémon',category:'serviço',x:32,y:65,description:'Troca repetível por Marowak de Alola.',npcs:['Enfermeira Joy','Genmar — troca Pokémon']},
      {id:'fuchsia-mart',name:'Poké Mart',category:'serviço',x:18,y:55,description:'Loja a oeste do zoológico.',npcs:['Atendentes']},
      {id:'fuchsia-gym',name:'Ginásio de Fuchsia',category:'ginásio',x:75,y:55,description:'Ginásio de tipo Veneno com paredes invisíveis.',npcs:['Koga'],rewards:['Soul Badge','TM27 Toxic']},
      {id:'go-park',name:'GO Park Complex',category:'especial',x:52,y:22,description:'Transfere Pokémon de Pokémon GO para o jogo.',npcs:['Recepcionistas do GO Park']},
      {id:'warden-house',name:'Casa do Diretor',category:'casa',x:74,y:76,description:'Devolva os Gold Teeth ao diretor.',npcs:['Diretor do GO Park'],rewards:['Safari Set','Strong Push']},
      {id:'sea-skim',name:'Instrutor de Sea Skim',category:'especial',x:46,y:77,description:'Homem ao lado de Lapras ensina a técnica secreta.',npcs:['Instrutor de Sea Skim','Lapras'],rewards:['Sea Skim']},
      {id:'fuchsia-house',name:'Casa nordeste',category:'casa',x:82,y:27,description:'Residência próxima ao portão da Rota 15.',npcs:['Moradores']},
    ],
    importantNpcs:['Genmar — troca Marowak por Marowak de Alola','Instrutor — ensina Sea Skim','Diretor — ensina Strong Push'],
    trade:{give:'Marowak',receive:'Marowak de Alola',level:38,npc:'Genmar',location:'Centro Pokémon'},
    water:{method:'Sea Skim',area:'Lago ao sul do GO Park',pokemon:['Magikarp'],note:'Sea Skim é aprendido nesta cidade; os grandes encontros aquáticos ficam nas Rotas 19 e 20.'},
  },
  cinnabar: {
    name:'Cinnabar Island', image:'cinnabar.png', source, accessible:6, houses:0,
    buildings:[
      {id:'cinnabar-center',name:'Centro Pokémon',category:'serviço',x:31,y:67,description:'Troca repetível por Grimer de Alola na versão Pikachu.',npcs:['Enfermeira Joy','Darko — troca Pokémon']},
      {id:'cinnabar-mart',name:'Poké Mart',category:'serviço',x:55,y:67,description:'Loja ao sul da ilha.',npcs:['Atendentes']},
      {id:'cinnabar-gym',name:'Ginásio de Cinnabar',category:'ginásio',x:78,y:62,description:'Quiz show de tipo Fogo; exige a Secret Key.',npcs:['Blaine'],rewards:['Volcano Badge','TM46 Fire Blast']},
      {id:'pokemon-lab',name:'Laboratório Pokémon',category:'especial',x:28,y:27,description:'Ressuscita fósseis e o Old Amber.',npcs:['Cientista dos fósseis'],rewards:['Omanyte ou Kabuto','Aerodactyl']},
      {id:'mansion',name:'Mansão Pokémon',category:'especial',x:72,y:28,description:'Masmorra em ruínas com pistas sobre Mewtwo.',npcs:['Coach Trainer Rita'],rewards:['Secret Key','TM22 Rock Slide']},
      {id:'fossil-room',name:'Sala de pesquisa',category:'especial',x:42,y:29,description:'Setor interno do laboratório dedicado a fósseis.',npcs:['Pesquisadores']},
    ],
    importantNpcs:['Darko — troca Grimer por Grimer de Alola','Cientista — ressuscita fósseis','Blaine — Volcano Badge'],
    trade:{give:'Grimer',receive:'Grimer de Alola',level:44,npc:'Darko',location:'Centro Pokémon'},
    water:{method:'Sea Skim',area:'Rotas 20 e 21 ao redor da ilha',pokemon:['Tentacool','Tentacruel','Magikarp','Staryu','Starmie'],note:'Os encontros estão nas rotas marítimas adjacentes, não no solo da ilha.'},
  },
};
