# DGX Travel — V2 estrutural

Site estático em português com identidade Montserrat / azul DGX `#1e3c6e` / branco e composição editorial. Baseado nos assets da produção `06d5e74`. Nenhuma imagem existente foi renomeada ou recomprimida.

## Páginas

- `/`: entrada independente de idioma, vídeo fullscreen escurecido e logo pequeno.
- `/pt/`: Home institucional, serviços, metodologia, Brasil ↔ México, portfólio, cases, equipe e contato.
- `/pt/portfolio/los-cabos/`: página do destino.
- `/pt/portfolio/xcaret/`: página de Hoteles Xcaret.

A entrada lembra apenas a escolha de português. `/?choose=1` reabre a seleção; está acessível pelo PT do header e pelo footer. ES e EN estão desativados e identificados como futuros; não há traduções ou rotas vazias. O catálogo em `docs/pages.json` define as rotas futuras.

## Manutenção

- `scripts/build.mjs`: conteúdo e templates compartilhados de header, footer, imagens, galerias e páginas. Após editar, rode `node scripts/build.mjs` e revise os HTMLs gerados.
- `assets/css/site.css`: sistema visual e composições responsivas.
- `assets/js/site.js`: menu, preferência de idioma, controle do vídeo e preparação de mensagem.
- `assets/images/` e `assets/video/`: assets originais, sem renomeação. `docs/assets.json` mantém seus hashes.

Os HTMLs gerados são versionados. Não há framework, instalação de pacotes ou build obrigatório no Cloudflare. Para prévia local, sirva a raiz por HTTP; por exemplo, `npx serve .`.

## Cloudflare Pages

Framework: None. Build command vazio. Build output directory: `/`. Root directory vazio. `main` é produção; `develop` é a prévia da V2. O push nesta entrega fica em `develop`. A promoção para `main` depende da revisão da V2.

## Escopo e pendências editoriais

Esta é uma V2 estrutural. Cases sem material definitivo e imagens de segmentos/hotéis usam placeholders explícitos. Anos, locais e serviços atribuídos aos novos cases são conteúdo-base para validação; não há indicadores ou resultados inventados. As fotos da equipe foram preservadas.

O formulário valida campos e consentimento e prepara um link `mailto:info@dgxtravel.com`. Nada é enviado ou salvo em banco pelo site. O usuário conclui o envio em seu próprio aplicativo de e-mail. A versão sem JavaScript disponibiliza o contato direto. Backend, política de privacidade definitiva, copy final, fotos, SEO, performance e traduções ficam para as próximas etapas.

Fontes continuam vindo de Google Fonts. O mapa dependente de serviços externos foi substituído por um diagrama local de conexão São Paulo ↔ Cidade do México, sem simular geografia. Vídeos têm controle de pausa e respeitam redução de movimento.

Referências de conteúdo: briefing V2 do usuário, apresentação aprovada e [conceito oficial All-Fun Inclusive](https://www.hotelxcaret.com/en/all-fun-inclusive/). Não foram inseridos horários, tarifas, voos ou condições comerciais específicas.
