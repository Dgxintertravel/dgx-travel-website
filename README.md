# DGX Travel website

Site estático, sem build. A branch main preserva byte a byte o HTML aprovado; develop contém a organização do projeto.

## Estrutura
- index.html: entrada PT/ES/EN; apenas português disponível. Preferência local; /?choose permite reabrir a seleção.
- pt/index.html: Home em português, com a estética original preservada.
- assets/css/home.css e assets/js/home.js: código original extraído sem alterações.
- assets/images e assets/video: arquivos decodificados sem recompressão, deduplicados por SHA-256.
- docs/assets.json: inventário e hashes.
- docs/pages.json: rotas futuras; não há páginas vazias nem links para rotas inexistentes.

## Prévia local
Sirva esta pasta com um servidor HTTP estático (por exemplo: npx serve .). Não é necessário instalar dependências no projeto.

## Limitações herdadas
O anexo tinha marcação incompleta de seleção de idioma, sem estilos nem ações. A entrada foi isolada na raiz e completada usando a identidade existente. A Home começa no hero. O menu mobile e as setas das galerias não têm ações; filtros só alteram estado visual. Contato usa mailto. Esses ajustes funcionais ficam para a próxima etapa. Mapa e fontes dependem de Google Fonts e jsDelivr, como no original. Não houve tradução.

## Cloudflare Pages — próxima etapa
Conectar o repositório GitHub apenas após revisar a prévia e autorizar a primeira publicação. Usar site estático, sem framework, comando de build vazio e diretório de saída na raiz. Produção: main; previews: develop. A conexão pode disparar a primeira publicação automaticamente. Nada foi conectado ou publicado nesta etapa.

## Fluxo
Trabalhar em develop, revisar preview e promover a main somente após aprovação. Antes disso, main é apenas o arquivo original de apresentação, ainda sem a estrutura de produção.
