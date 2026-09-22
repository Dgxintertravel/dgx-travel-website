# Refinamento de componentes da V2

Direção aprovada preservada: Montserrat, azul DGX, conteúdo, hero, fotografias existentes e composição do Portfólio da Home. Alterações feitas na branch develop.

- Header: seletor de idioma compacto, dropdown com Escape/clique externo, menu com ícone CSS. ES/EN continuam indisponíveis. Vídeos mantêm autoplay, muted, loop e playsinline, sem controle visual; preferência por movimento reduzido continua respeitada.
- CTAs: sistema compartilhado de link editorial, CTA sobre imagem e ação principal. Setas em SVG.
- Serviços: seis botões sem cartões preenchidos, painel editorial no desktop e accordion no mobile. Clique, hover de mouse e navegação por teclado. Conteúdo original mantido no HTML.
- Processo: quatro etapas selecionáveis, leitura única e linha de progressão.
- Mapa: contornos geográficos reais das Américas; coordenadas de Cidade do México (-99.1332, 19.4326) e São Paulo (-46.6333, -23.5505). SVG local, sem serviço externo em tempo de execução. Fonte cartográfica: Natural Earth, ne_110m_land, https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_land.geojson .
- Cases: rolagem horizontal nativa com snap, teclado e controles SVG. A primeira fotografia é mostrada integralmente com object-fit:contain. Próximo case parcialmente visível no desktop. Nenhuma fotografia substituída.
- Contato: campos transparentes, linhas finas, foco visível e selects estilizados. O formulário continua preparando uma mensagem no aplicativo de e-mail; não existe envio de backend nesta etapa.
- Destinos: subnav sticky com seção ativa; fotografias amplas já existentes, composições alternadas, formatos verticais e galerias horizontais. Novos espaços para fotografia temática estão identificados como seleção de imagens em breve; não foram usadas fotos sem confirmação do destino ou da experiência.

Editar os templates em scripts/build.mjs e gerar os quatro HTMLs com node scripts/build.mjs. O arquivo assets/css/refinement.css concentra o novo sistema de componentes; assets/js/site.js cuida das interações progressivas.

Validação: páginas e assets, tamanhos individuais abaixo de 25 MiB, desktop/tablet/mobile, dropdown, accordion, processo, alinhamento dos cases, subnav ativa, menu mobile, formulário e movimento reduzido.
