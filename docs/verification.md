# Verificação da estrutura

- Baseline em `main`: conteúdo de `index.html` comparado byte a byte com o anexo aprovado; idêntico.
- CSS e JavaScript da Home: comparação literal com os blocos originais; idênticos.
- Assets: extraídos sem recompressão e registrados com SHA-256 em `assets.json`.
- Comparação no Edge headless: desktop 1440 × 900 e mobile 390 × 900, página completa. A marcação órfã da entrada de idioma foi removida somente da referência usada na comparação da Home. Vídeo parado no poster e animações estabilizadas.
- Layout e dimensões preservados. As capturas apresentam pequenas diferenças de rasterização de imagens entre carregamentos; a primeira comparação desktop teve zero pixels diferentes. Não se afirma igualdade de pixels em todas as execuções.
- Dependências externas de mapa e fontes não puderam ser validadas integralmente neste ambiente; a rodada controlada bloqueou requisições externas em ambas as versões. Revisar também com rede disponível antes do lançamento.
- A entrada de idioma foi reconstruída separadamente usando cores, tipografia e texto existentes; esta é uma correção visual intencional a revisar.

Não houve publicação no Cloudflare. Menu mobile, galerias, filtros e contato continuam com as limitações da apresentação, descritas no README.
