# Atlas de Kanto · Let’s Go, Pikachu!

Atlas estático em português, compatível com GitHub Pages. Exploração regional, cidades, rotas, interiores e guias de encontros, itens e NPCs.

## Conteúdo desta edição

- 49 locais: 10 cidades, Indigo Plateau, 25 rotas e 13 outras áreas.
- Town Map real de Let’s Go, com nomes e números de rotas interativos.
- Mapa regional detalhado MewMaps, com enquadramento de cidades e rotas.
- 12 mapas de interiores/áreas, 47 enquadramentos por andar ou setor.
- 71 pontos de interesse nas cidades, incluindo casas catalogadas, ginásios, serviços e eventos.
- 512 registros espécie/método para a versão Pikachu (não são 512 espécies).
- Trocas de Alola nos oito Centros relevantes, presentes, fósseis e compra de Magikarp separados dos encontros selvagens.
- Destaques de Mewtwo, Articuno, Zapdos e Moltres.
- Escadas interativas em Cerulean Cave, Mt. Moon, Rock Tunnel e Pokémon Tower; seleção de andares nos demais mapas.
- Busca por local, Pokémon, NPC ou recompensa. Rotas por hash preservam links diretos, recarregamento e o voltar/avançar do navegador.

## Limites documentados

Não é uma reprodução jogável nem um inventário exaustivo de todo o jogo.

- Diglett’s Cave possui guia e conexões, mas ainda não possui planta completa **específica de LGPE** verificada. Não foi substituída por um mapa de outro jogo.
- Casas comuns têm fichas de consulta; não há planta individual de cada interior.
- “Casas catalogadas” conta apenas residências documentadas no catálogo, não o número total de casas da cidade. NPCs externos e dependências internas não são contabilizados como casas.
- Os marcadores urbanos são referências visuais aproximadas aos edifícios identificados, não coordenadas de personagens.
- Itens são uma seleção importante, não uma lista de todos os objetos e itens ocultos.
- Encontros de cavernas consolidam andares. Consulte a fonte de cada local para níveis e taxas por andar.
- MewMaps imprime alguns andares com numeração diferente. Silph Co.: 1F–10F impressos correspondem a 2F–11F do jogo. Victory Road: “1F West / 1F East / 2F” correspondem a 1F / 2F / 3F. A interface usa a numeração corrigida. O lobby 1F de Silph e Pokémon Tower não está nos mapas.
- Não existe pesca em Let’s Go. Encontros aquáticos são identificados por Sea Skim.

## Desenvolvimento local

Requer Node.js 22.13 ou superior e npm.

```sh
npm ci
npm run dev
```

A aplicação abre no endereço informado no terminal. Os mapas, ícones e dados estão incluídos no repositório; o site não depende de uma API para consultar o conteúdo.

```sh
npm run check
npm run build
npm start
```

O último comando serve a exportação de `dist/client` em `http://127.0.0.1:4173/`. O preview estático usa o resultado da última compilação.

### Simular exatamente o GitHub Pages no PowerShell

```powershell
$env:GITHUB_ACTIONS='true'
$env:GITHUB_REPOSITORY='painz-55/MapPokemonLetsGoPikachu'
npm run build
npm start -- --base /MapPokemonLetsGoPikachu
```

Abra `http://127.0.0.1:4173/MapPokemonLetsGoPikachu/`. Essas variáveis valem para a sessão do terminal; feche-a ou remova as duas variáveis antes de voltar à compilação local sem prefixo.

## Publicar pelo GitHub Desktop

1. Use este repositório no GitHub Desktop.
2. Revise as alterações, faça **Commit to main** e depois **Push origin**.
3. No GitHub, em **Settings → Pages → Build and deployment**, selecione **GitHub Actions** como fonte.
4. Aguarde o workflow **Publicar no GitHub Pages** terminar.
5. Acesse [o atlas publicado](https://painz-55.github.io/MapPokemonLetsGoPikachu/).

Salvar arquivos localmente não faz push automaticamente. Nenhum commit ou push é necessário para executar a aplicação local.

### Correção do carregamento

O exportador Vinext estava gravando o prefixo do repositório também no caminho físico dos arquivos. O Pages já adiciona esse prefixo à URL, resultando em diretório duplicado e erros 404 de CSS, JavaScript e fontes.

O processo de compilação agora normaliza o diretório `_next` e verifica cada arquivo local referenciado no HTML antes de aceitar o pacote. `.nojekyll` está incluído. Apenas `dist/client` é enviado ao Pages, sem servidor ou Worker.

No Windows, esta versão beta do Vinext pode emitir uma asserção nativa de encerramento **depois** de concluir a exportação. O processo tolera somente a mensagem específica, após confirmar conclusão e validar uma exportação nova. Qualquer outro erro continua interrompendo a compilação.

## Organização

- `app/page.tsx`: navegação, busca e estrutura.
- `components/atlas-map.tsx`: mapa, zoom, deslocamento, marcadores e escadas.
- `components/place-guide.tsx`: cidades, encontros, trocas, presentes e itens.
- `lib/atlas-data.ts`: locais, conexões e enquadramentos.
- `lib/city-data.ts`: pontos urbanos e condições dos eventos.
- `lib/encounters.json`: tabelas e fontes da pesquisa.
- `lib/floor-data.ts`: andares, escadas e posições lendárias.
- `scripts/check-data.mjs`: integridade de dados, conexões, andares e ícones.
- `scripts/verify-export.mjs`: verificação dos arquivos publicados.
- `public/maps/sources.json`: origem dos mapas originais, sem modificar as imagens.
- `SOURCES.md`: créditos e critérios editoriais.

## Créditos

Mapas e anotações: [MewMaps](https://www.mewmaps.org/lets-go-pikachu-eevee). Town Map: [Bulbapedia](https://bulbapedia.bulbagarden.net/wiki/Town_Map). Ícones: [PokéAPI sprites](https://github.com/PokeAPI/sprites). Dados: Serebii, Bulbapedia e Pokémon Mythology.

Pokémon e a arte dos jogos pertencem aos respectivos titulares, incluindo Nintendo, Creatures e GAME FREAK. Projeto independente de fãs, sem afiliação oficial. Não foi encontrada uma licença livre para os mapas MewMaps; seus créditos e arquivos originais foram preservados. Disponibilidade na internet e ausência de fins lucrativos não equivalem a uma licença de reutilização.
