# Fontes e critérios editoriais

Revisão: 7 de setembro de 2026. Escopo: Pokémon: Let’s Go, Pikachu! (Nintendo Switch, geração VII).

## Mapas

- [MewMaps — coleção Let’s Go](https://www.mewmaps.org/lets-go-pikachu-eevee): mosaico regional e plantas montadas com imagens do jogo. Os arquivos originais não foram alterados; os enquadramentos e marcadores são camadas da interface. O crédito fica visível no rodapé do visualizador.
- [Bulbapedia — Town Map](https://bulbapedia.bulbagarden.net/wiki/Town_Map): fundo regional de LGPE.
- URLs individuais, dimensões e ressalvas em `public/maps/sources.json`.
- Nenhuma planta verificada de Diglett’s Cave LGPE foi localizada. O atlas informa a ausência explicitamente.

## Encontros e itens

- [Serebii Pokéarth Kanto](https://www.serebii.net/pokearth/kanto/): páginas padrão de LGPE para 25 rotas e 10 áreas com encontros. Cada registro de local mantém a URL exata em `lib/encounters.json`.
- [Trocas com NPCs](https://www.serebii.net/letsgopikachueevee/trade.shtml), [presentes](https://www.serebii.net/letsgopikachueevee/gift.shtml), [técnicas secretas](https://www.serebii.net/letsgopikachueevee/secrettechniques.shtml) e [encontros no céu](https://www.serebii.net/letsgopikachueevee/sky.shtml).
- [Pokémon Mythology — detonado em português](https://www.pokemythology.net/detonados/detonado-lets-go-pikachu-lets-go-eevee/): conferência da sequência de eventos.
- As espécies exclusivas de Eevee permanecem identificadas no arquivo de pesquisa, mas não aparecem no guia padrão de Pikachu. Os métodos de encontro são separados de presentes, compras e trocas.
- Não foram inventadas probabilidades. Itens aleatórios ou especiais não são apresentados como garantidos.

## Cidades e NPCs

As páginas de cada cidade na Bulbapedia estão vinculadas individualmente em `lib/city-data.ts`. Foram usadas as seções de geração VII e conferências com Serebii/Pokémon Mythology. Informações de outros jogos, como estação ferroviária em Saffron, Bike Voucher, Name Rater funcional e pesca, foram removidas.

Contagens urbanas expressam apenas o catálogo de locais documentados, não um censo completo de casas ou NPCs. Coordenadas de prédios identificados são aproximações visuais no mosaico regional; pontos sem posição confirmada continuam acessíveis pelo menu, sem pino inventado.

## Ícones e direitos

[PokéAPI sprites](https://github.com/PokeAPI/sprites) fornece os 151 ícones PNG de espécies. São ilustrações identificadoras das espécies, não capturas de modelos LGPE. Arquivos obtidos sem alteração; veja também a [licença do repositório](https://github.com/PokeAPI/sprites/blob/master/LICENCE.txt).

Os mapas MewMaps não apresentam licença de reutilização explícita nas páginas consultadas. Atribuição não substitui permissão. Marcas e arte Pokémon permanecem dos respectivos titulares. Não se afirma licença livre, domínio público ou vínculo oficial.
