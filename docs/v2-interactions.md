# V2.1 — experiência web

Esta rodada preserva a direção visual aprovada e trabalha ritmo, navegação e feedback.

- A seção **Uma operação. Dois mercados** agora recebe um mapa SVG local, sem dependência externa. Os dois mercados são botões acessíveis; o nó correspondente recebe foco visual e a rota animada representa a operação binacional.
- **Serviços** funciona como um índice editorial explorável. Cada linha pode ser ativada por clique, Enter ou Espaço; o primeiro serviço começa aberto e os demais ficam compactos até serem escolhidos.
- **Cases** foram agrupados em um carrossel editorial horizontal controlado. Setas, pontos, teclado e contador permitem navegar sem transformar a seção em uma sequência de slides verticais.
- Revelações por scroll, header com seção ativa, transições de CTAs e imagens, hover suave e navegação interna sticky foram adicionados como uma camada progressiva.
- As headlines foram reduzidas moderadamente por `clamp()`; textos descritivos e de leitura mantêm o tamanho acessível.
- Los Cabos e Xcaret mantêm sua estrutura editorial. A camada compartilhada acrescenta apenas movimento, navegação e microinterações.

O mapa, as transições e o carrossel funcionam sem biblioteca adicional. Fontes continuam usando a declaração Montserrat existente; a validação local bloqueia a rede externa de propósito, enquanto a prévia publicada pode carregar a fonte normalmente.
