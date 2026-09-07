export type CityPoint = {
  id: string;
  name: string;
  type: 'casa' | 'serviço' | 'ginásio' | 'acesso' | 'externo' | 'npc';
  description: string;
  npcs: string[];
  rewards?: string[];
  target?: string;
  x?: number;
  y?: number;
};
export type Gift = {
  name: string;
  level: number;
  note: string;
  method?: 'Presente' | 'Compra' | 'Fóssil';
};
export type Trade = {
  npc: string;
  species: string;
  level: number;
  version?: string;
};
export type CityGuide = {
  points: CityPoint[];
  gifts?: Gift[];
  trade?: Trade;
  source: string;
  note?: string;
};
const p = (
  id: string,
  name: string,
  type: CityPoint['type'],
  description: string,
  npcs: string[] = [],
  rewards: string[] = [],
  xy?: [number, number],
  target?: string,
): CityPoint => ({
  id,
  name,
  type,
  description,
  npcs,
  rewards,
  x: xy?.[0],
  y: xy?.[1],
  target,
});
const center = (xy?: [number, number], extra: string[] = []) =>
  p(
    'center',
    'Centro Pokémon',
    'serviço',
    'Recupere a equipe gratuitamente. O Pokémon Box é levado na mochila; não há PC de armazenamento.',
    ['Enfermeira Joy', ...extra],
    [],
    xy,
  );
const mart = (xy?: [number, number]) =>
  p(
    'mart',
    'Poké Mart',
    'serviço',
    'Compre Poké Balls, itens de cura e outros suprimentos. O estoque cresce conforme o progresso.',
    ['Atendente'],
    [],
    xy,
  );
const gym = (
  name: string,
  description: string,
  npc: string,
  rewards: string[],
  xy?: [number, number],
) => p('gym', name, 'ginásio', description, [npc], rewards, xy);
const source = (name: string) =>
  'https://bulbapedia.bulbagarden.net/wiki/' + name;
export const cityData: Record<string, CityGuide> = {
  pallet: {
    source: source('Pallet_Town'),
    points: [
      p(
        'player-house',
        'Casa do jogador',
        'casa',
        'O quarto fica no andar superior. Fale com sua mãe para descansar. Ela entrega o Town Map fora do laboratório no início.',
        ['Mãe'],
        ['Town Map'],
        [1055, 2170],
      ),
      p(
        'rival-house',
        'Casa de Trace',
        'casa',
        'Casa do rival e de sua irmã. A irmã entrega Sportswear para o parceiro depois da entrega da encomenda.',
        ['Trace', 'Irmã de Trace'],
        ['Sportswear'],
        [1180, 2160],
      ),
      p(
        'oak-lab',
        'Laboratório de Oak',
        'serviço',
        'Conheça seu parceiro e receba a Pokédex. Volte aqui após sete insígnias para o evento de Mega Evolução com Blue.',
        ['Professor Oak', 'Assistentes', 'Trace', 'Blue'],
        ['Pokédex', 'Venusaurite', 'Charizardite X e Y', 'Blastoisinite'],
        [1175, 2230],
      ),
    ],
    gifts: [
      {
        name: 'Pikachu',
        level: 5,
        note: 'Parceiro inicial. Esta forma não evolui e não pode ser transferida.',
      },
    ],
  },
  viridian: {
    source: source('Viridian_City'),
    points: [
      center([1166, 1663]),
      mart([1295, 1610]),
      gym(
        'Ginásio de Viridian',
        'Oitavo ginásio. Só fica disponível perto do final da campanha. Blue assume depois de Giovanni.',
        'Giovanni',
        ['Earth Badge', 'TM41 Earthquake'],
        [1285, 1530],
      ),
      p(
        'school',
        'Trainers’ School',
        'serviço',
        'Confira o quadro para aprender sobre condições de status.',
        ['Professor', 'Estudantes'],
      ),
      p(
        'resident-house',
        'Casa da família',
        'casa',
        'Residência da cidade, próxima à escola. Converse com os moradores.',
        ['Moradores'],
      ),
      p(
        'parcel',
        'Atendente da encomenda',
        'externo',
        'O atendente fica diante do Mart e pede a entrega da encomenda ao Professor Oak.',
        ['Atendente do Mart'],
        ['Parcel'],
      ),
      p(
        'will-o-wisp',
        'Treinador no sudoeste',
        'externo',
        'Alcance o homem no sudoeste usando Chop Down. Ele não fica dentro de uma casa.',
        ['Homem descansando'],
        ['TM11 Will-O-Wisp'],
      ),
    ],
  },
  pewter: {
    source: source('Pewter_City'),
    points: [
      center([1016, 788]),
      mart([1178, 757]),
      gym(
        'Ginásio de Pewter',
        'Mostre um Pokémon de tipo Planta ou Água para entrar. Brock usa Geodude e Onix.',
        'Brock',
        ['Boulder Badge', 'TM01 Headbutt'],
        [967, 706],
      ),
      p(
        'museum',
        'Museu de Ciências',
        'serviço',
        'A exposição principal cobra ingresso. Use Chop Down para chegar à entrada traseira e obter Old Amber. Restaure o fóssil em Cinnabar.',
        ['Cientistas'],
        ['Old Amber'],
        [996, 625],
      ),
      p(
        'slowpoke',
        'Cuidadora de Slowpoke',
        'externo',
        'A senhora a oeste do museu pede que você cuide de Slowpoke por um momento. A recompensa é diária.',
        ['Senhora com Slowpoke'],
        ['Big Pearl diária'],
      ),
      p(
        'blue',
        'Blue, após o ginásio',
        'externo',
        'Encontre Blue ao sair do ginásio após vencer Brock.',
        ['Blue'],
        ['Great Ball ×5'],
      ),
      p(
        'house',
        'Residência de Pewter',
        'casa',
        'Converse com os moradores da cidade. Não confunda o Centro daqui com o da Rota 4: o vendedor de Magikarp fica na rota.',
        ['Moradores'],
      ),
    ],
  },
  cerulean: {
    source: source('Cerulean_City'),
    trade: { npc: 'Tatianna', species: 'Rattata', level: 12 },
    gifts: [
      {
        name: 'Bulbasaur',
        level: 12,
        note: 'Mulher na casa ao lado do Centro Pokémon; exige pelo menos 30 capturas totais, incluindo repetidos.',
      },
    ],
    points: [
      center([3065, 562], ['Tatianna — troca de Alola', 'Tutor do parceiro']),
      mart([3180, 647]),
      gym(
        'Ginásio de Cerulean',
        'Apresente um Pokémon de nível 15 ou superior. Misty usa Psyduck e Starmie.',
        'Misty',
        ['Cascade Badge', 'TM29 Scald'],
        [3165, 565],
      ),
      p(
        'bulbasaur-house',
        'Casa do Bulbasaur',
        'casa',
        'A cuidadora entrega Bulbasaur depois de você registrar 30 capturas totais.',
        ['Cuidadora de Bulbasaur'],
        ['Bulbasaur, Nv. 12'],
      ),
      p(
        'burgled-house',
        'Casa assaltada',
        'casa',
        'Atravesse o buraco na parede e enfrente o Rocket no quintal.',
        ['Casal da casa', 'Oficial de polícia', 'Recruta Rocket'],
        ['TM10 Dig'],
      ),
      p(
        'badge-house',
        'Casa do especialista em insígnias',
        'casa',
        'O morador explica as insígnias. Examine o jardim atrás da casa.',
        ['Especialista em insígnias'],
        ['Rare Candy no jardim'],
      ),
      p(
        'bike-house',
        'Casa do Bike Maniac',
        'casa',
        'Ouça a descrição de todas as bicicletas para receber a recompensa. Não existe Bike Voucher em Let’s Go.',
        ['Bike Maniac'],
        ['Heart Scale ×5'],
      ),
      p(
        'cave-access',
        'Acesso à Cerulean Cave',
        'acesso',
        'Pelo lado da Rota 24, navegue com Sea Skim até a entrada. A caverna só abre após a Liga.',
        ['Guarda da caverna'],
        [],
        undefined,
        'cerulean-cave',
      ),
    ],
  },
  vermilion: {
    source: source('Vermilion_City'),
    trade: { npc: 'Higeo', species: 'Geodude', level: 16 },
    gifts: [
      {
        name: 'Squirtle',
        level: 16,
        note: 'Oficial Jenny, na rua; exige 60 capturas totais, incluindo repetidos.',
      },
      {
        name: 'Persian',
        level: 16,
        note: 'Na versão Pikachu, capture cinco Growlithe e converse novamente com o fã de Pokémon da cidade.',
      },
    ],
    points: [
      center([2990, 1800], ['Higeo — troca de Alola']),
      mart([3133, 1891]),
      gym(
        'Ginásio de Vermilion',
        'Use Chop Down para alcançar o ginásio e resolva o quebra-cabeça dos interruptores.',
        'Lt. Surge',
        ['Thunder Badge', 'TM36 Thunderbolt'],
        [2972, 1935],
      ),
      p(
        'fan-club',
        'Pokémon Fan Club',
        'serviço',
        'Ouça o presidente falar de seu Pokémon favorito. A recompensa é um conjunto de roupas do parceiro, não um vale de bicicleta.',
        ['Presidente do fã-clube'],
        ['Pikachu Set'],
      ),
      p(
        'jenny',
        'Oficial Jenny',
        'externo',
        'Converse com Jenny depois de realizar 60 capturas para receber Squirtle. Ela fica na rua.',
        ['Oficial Jenny'],
        ['Squirtle, Nv. 16'],
      ),
      p(
        'persian',
        'Fã de Growlithe e Meowth',
        'externo',
        'Em Let’s Go, Pikachu!, o pedido é capturar cinco Growlithe. Na versão Eevee, o pedido e o presente são diferentes.',
        ['Fã de Pokémon'],
        ['Persian, Nv. 16'],
      ),
      p(
        'pier',
        'Cais e S.S. Anne',
        'acesso',
        'Bill entrega o S.S. Ticket na Rota 25. Visite todas as cabines antes de concluir a tarefa do capitão.',
        ['Capitão', 'Mina no cais'],
        ['Chop Down'],
        [3100, 2150],
        'ss-anne',
      ),
    ],
  },
  lavender: {
    source: source('Lavender_Town'),
    trade: { npc: 'Digette', species: 'Diglett', level: 25 },
    points: [
      center([4136, 1139], ['Digette — troca de Alola']),
      mart([4316, 1260]),
      p(
        'tower',
        'Pokémon Tower',
        'acesso',
        'Obtenha o Silph Scope no esconderijo Rocket para identificar os fantasmas. Resgate Mr. Fuji no topo.',
        ['Mr. Fuji', 'Channelers', 'Equipe Rocket'],
        [],
        [4301, 1167],
        'pokemon-tower',
      ),
      p(
        'fuji-house',
        'Volunteer Pokémon House',
        'casa',
        'Depois do resgate, fale com Mr. Fuji em sua casa. A Poké Flute acorda os Snorlax das Rotas 12 e 16.',
        ['Mr. Fuji', 'Voluntários'],
        ['Poké Flute'],
      ),
      p(
        'name-house',
        'Casa do antigo Name Rater',
        'casa',
        'Em Let’s Go, o morador apenas comenta sobre nomes. Você pode mudar apelidos pelo menu do próprio Pokémon.',
        ['Morador'],
      ),
      p(
        'cubone-house',
        'Residência de Lavender',
        'casa',
        'Converse com os moradores para conhecer a história da cidade e de Cubone.',
        ['Moradores'],
      ),
    ],
  },
  celadon: {
    source: source('Celadon_City'),
    trade: {
      npc: 'Nicholice',
      species: 'Sandshrew',
      level: 27,
      version: 'Pikachu',
    },
    points: [
      center([2579, 1120], ['Nicholice — troca de Alola', 'Madam Celadon']),
      gym(
        'Ginásio de Celadon',
        'Mostre um Pokémon considerado fofo para entrar. Erika é especialista em Planta.',
        'Erika',
        ['Rainbow Badge', 'TM53 Mega Drain'],
        [2109, 1320],
      ),
      p(
        'department',
        'Department Store',
        'serviço',
        'Loja de vários andares. Compre pedras evolutivas no 4F. No terraço, ofereça bebidas à garota.',
        ['Atendentes', 'Garota do terraço'],
        [
          'TM03 Helping Hand — 3F',
          'Fresh Water → TM06 Light Screen',
          'Soda Pop → TM09 Reflect',
          'Lemonade → TM07 Protect',
        ],
        [2096, 1128],
      ),
      p(
        'condominiums',
        'Celadon Condominiums',
        'casa',
        'Encontre Brock diante do edifício para receber Tea e liberar os portões de Saffron.',
        ['Brock', 'Equipe GAME FREAK'],
        ['Tea'],
        undefined,
      ),
      p(
        'game-corner',
        'Game Corner',
        'acesso',
        'Examine o pôster protegido pelo Rocket para revelar o acesso ao esconderijo.',
        ['Equipe Rocket'],
        ['Silph Scope no esconderijo'],
        [2396, 1219],
        'rocket-hideout',
      ),
      p(
        'hotel',
        'Hotel de Celadon',
        'serviço',
        'Converse com os hóspedes. O hotel não funciona como Centro Pokémon.',
        ['Hóspedes'],
      ),
      p(
        'madam',
        'Madam Celadon',
        'npc',
        'Serviço dentro do Centro Pokémon. Por ₽10.000, determina a Nature dos encontros até o fim do dia.',
        ['Madam Celadon'],
      ),
      p(
        'sky-dash',
        'Instrutor de Sky Dash',
        'externo',
        'Depois de concluir o esconderijo Rocket, encontre o homem com a máquina voadora perto do Game Corner.',
        ['Instrutor de Sky Dash'],
        ['Sky Dash'],
      ),
    ],
  },
  saffron: {
    source: source('Saffron_City'),
    trade: { npc: 'Psytrice', species: 'Raichu', level: 30 },
    gifts: [
      {
        name: 'Lapras',
        level: 34,
        note: 'Funcionário dentro da Silph Co., durante o resgate da empresa.',
      },
      {
        name: 'Porygon',
        level: 34,
        note: 'Funcionário na cidade, após a libertação da Silph Co.',
      },
      {
        name: 'Hitmonlee',
        level: 30,
        note: 'Escolha entre Hitmonlee e Hitmonchan após vencer o Fighting Dojo. Você recebe somente um.',
      },
      {
        name: 'Hitmonchan',
        level: 30,
        note: 'Alternativa a Hitmonlee no Fighting Dojo; não é um segundo presente.',
      },
    ],
    points: [
      center([3007, 1308], ['Psytrice — troca de Alola']),
      mart([3203, 1155]),
      gym(
        'Ginásio de Saffron',
        'Entre com um Pokémon de nível 45 ou superior. Use os teleportadores para chegar a Sabrina.',
        'Sabrina',
        ['Marsh Badge', 'TM33 Calm Mind'],
        [3200, 1065],
      ),
      p(
        'dojo',
        'Fighting Dojo',
        'ginásio',
        'Vença os treinadores e escolha um dos dois Pokémon de luta.',
        ['Mestre do Dojo'],
        ['Hitmonlee OU Hitmonchan, Nv. 30'],
        [3147, 1070],
      ),
      p(
        'silph',
        'Silph Co.',
        'acesso',
        'Derrote a Equipe Rocket. O presidente entrega a Master Ball depois da libertação.',
        ['Presidente', 'Giovanni', 'Funcionário de Lapras'],
        ['Master Ball', 'Lapras, Nv. 34'],
        [3087, 1210],
        'silph-co',
      ),
      p(
        'copycat',
        'Casa de Copycat',
        'casa',
        'Mostre um Clefairy a Copycat. Não é necessário entregar Poké Doll nesta versão.',
        ['Copycat'],
        ['TM08 Substitute'],
      ),
      p(
        'psychic',
        'Casa de Mr. Psychic',
        'casa',
        'Converse com o morador para receber um TM Psíquico.',
        ['Mr. Psychic'],
        ['TM40 Psychic'],
      ),
      p(
        'porygon',
        'Funcionário na rua',
        'externo',
        'Retorne após libertar a Silph Co. para receber o Pokémon do funcionário.',
        ['Funcionário da Silph'],
        ['Porygon, Nv. 34'],
      ),
    ],
  },
  fuchsia: {
    source: source('Fuchsia_City'),
    trade: { npc: 'Genmar', species: 'Marowak', level: 38 },
    points: [
      center([2414, 2687], ['Genmar — troca de Alola']),
      mart([2394, 2596]),
      gym(
        'Ginásio de Fuchsia',
        'Tenha 50 espécies registradas na Pokédex. Observe as paredes invisíveis e encontre Koga.',
        'Koga',
        ['Soul Badge', 'TM27 Toxic'],
        [2244, 2680],
      ),
      p(
        'go-park',
        'GO Park Complex',
        'serviço',
        'Transfira Pokémon compatíveis de Pokémon GO. Os Pokémon no cenário do parque não equivalem a encontros selvagens na cidade.',
        ['Recepcionistas do GO Park'],
        [],
        [2480, 2480],
      ),
      p(
        'warden',
        'Casa do Warden',
        'casa',
        'Entregue os Gold Teeth obtidos de Jessie e James na Rota 19. Depois de mover a pedra da casa, fale com Diglett.',
        ['Warden', 'Diglett'],
        ['Strong Push', 'Safari Set', 'Nugget diária'],
      ),
      p(
        'sea-skim',
        'Instrutor de Sea Skim',
        'externo',
        'Converse com o homem ao lado de Lapras e da prancha, na área externa da cidade.',
        ['Instrutor com Lapras'],
        ['Sea Skim'],
      ),
      p(
        'neighbor',
        'Casa vizinha ao Warden',
        'casa',
        'Residência ao lado da casa do diretor. Em Let’s Go não há vara de pesca para receber.',
        ['Moradores'],
      ),
      p(
        'old-deleter',
        'Antiga casa do Move Deleter',
        'casa',
        'Nesta versão, a casa abriga um casal; não oferece o antigo serviço de apagar golpes.',
        ['Casal'],
      ),
    ],
  },
  cinnabar: {
    source: source('Cinnabar_Island'),
    trade: { npc: 'Darko', species: 'Grimer', level: 44, version: 'Pikachu' },
    gifts: [
      {
        name: 'Omanyte',
        level: 44,
        method: 'Fóssil',
        note: 'Restaure Helix Fossil no Cinnabar Lab.',
      },
      {
        name: 'Kabuto',
        level: 44,
        method: 'Fóssil',
        note: 'Restaure Dome Fossil no Cinnabar Lab.',
      },
      {
        name: 'Aerodactyl',
        level: 44,
        method: 'Fóssil',
        note: 'Restaure Old Amber obtido no Museu de Pewter.',
      },
    ],
    points: [
      center([1040, 3200], ['Darko — troca de Alola']),
      mart([1120, 3210]),
      gym(
        'Ginásio de Cinnabar',
        'Encontre a Secret Key na mansão para abrir a porta. Responda ao quiz de Blaine.',
        'Blaine',
        ['Volcano Badge', 'TM46 Fire Blast'],
        [1130, 3090],
      ),
      p(
        'lab',
        'Cinnabar Lab',
        'serviço',
        'Entregue um fóssil ao pesquisador para restaurar um Pokémon. As salas internas pertencem ao mesmo laboratório, não são casas separadas.',
        ['Pesquisador de fósseis', 'Cientistas'],
        ['Restauração de fósseis'],
        [923, 3195],
      ),
      p(
        'mansion',
        'Pokémon Mansion',
        'acesso',
        'Explore os diários sobre Mew e Mewtwo e procure a Secret Key no B1F.',
        ['Pesquisadores', 'Treinadores'],
        ['Secret Key'],
        [947, 3070],
        'pokemon-mansion',
      ),
    ],
  },
  indigo: {
    source: source('Indigo_Plateau'),
    trade: { npc: 'Exemann', species: 'Exeggutor', level: 46 },
    points: [
      center(undefined, ['Exemann — troca de Alola', 'Madame Memorial']),
      mart(),
      p(
        'league',
        'Liga Pokémon',
        'acesso',
        'Prepare itens de cura e uma equipe equilibrada antes da sequência de batalhas. Não é possível sair entre os membros para usar o Centro.',
        ['Lorelei', 'Bruno', 'Agatha', 'Lance', 'Trace'],
        ['Título de Campeão'],
        [561, 425],
      ),
      p(
        'reminder',
        'Madame Memorial',
        'npc',
        'Dentro do Centro Pokémon, ensina novamente golpes em troca de Heart Scales.',
        ['Madame Memorial'],
        ['Relembrar golpes'],
      ),
    ],
  },
};
