# Integração de fotos — 24/09/2026

Pacote recebido: `Pacote de imagens para site dgx.zip` (1.213.070.453 bytes; 63 fotografias). Foram selecionadas 28 fotos para preencher os espaços existentes e atualizar os três retratos solicitados. As demais fotos permanecem disponíveis nos originais como alternativas, sem carregar o site com arquivos sem uso.

## Aplicação

- Equipe: Diana Pomar, Raquel Ramirez e Mário Araujo. Mantida a apresentação em preto e branco e o enquadramento comum dos cinco colaboradores.
- SECTUR México: três fotos; encontro institucional, participantes e estande.
- Xcaret Festuris: três fotos; grupo, apresentação e estande.
- Los Cabos MICE & Wedding: as duas fotos fornecidas para esse evento, sem duplicação para preencher um terceiro quadro.
- Los Cabos: seis experiências (Luxo, Gastronomia, MICE, Weddings, Wellness, LGBTQIA+) e duas fotos complementares na galeria (Hospitalidade & arquitetura; Gastronomia & encontros).
- Xcaret: quatro experiências (Gastronomia, Natureza, Cultura mexicana, Parques), três hotéis e duas fotos complementares na galeria.

Os nomes e as pastas fornecidos orientaram a seleção. Os arquivos de origem, nomes de publicação, textos alternativos, dimensões e hashes estão em `photo-assets.json`.

## Preparação

Os originais selecionados somam 442.782.061 bytes. As 28 versões principais WebP e suas 28 versões menores somam 9.877.576 bytes — redução de aproximadamente 97,8% em relação aos originais selecionados, mesmo incluindo ambas as resoluções. O maior arquivo novo tem 698.248 bytes, abaixo de 700 KiB e do limite de 25 MiB do Pages.

Foram aplicados orientação EXIF, redimensionamento sem ampliação, conversão para sRGB e compressão WebP. Nenhuma foto foi recriada ou alterada por geração de imagem. Os originais não foram modificados nem enviados ao repositório. Os recortes são definidos pelo layout; as fotos principais dos Cases e complementares verticais usam contain para preservar participantes.

As imagens têm versões responsivas via srcset, dimensões declaradas e carregamento lazy. Os heroes e a composição aprovada da Home foram preservados. Os textos dos Cases, incluindo campos de ano/local ainda em atualização, não foram completados por suposição.

## Verificação

- Quatro páginas em desktop, notebook, tablet e mobile: sem imagens quebradas, erros de JavaScript ou overflow horizontal da página.
- Revisão dos retratos, três Cases, experiências, hotéis e galerias em desktop e celular.
- Nenhum placeholder de imagem nos HTMLs finais; todos os arquivos do site abaixo de 25 MiB.
- Publicação de revisão exclusivamente em develop; main permanece produção.
