# Pendências: Via Festas Buffet

Levantado em 25/09/2026. O site não inventa capacidade, preço, cardápio,
horário nem tipos de evento que o cliente não confirmou.

## Avaliações

Resolvido em 25/09: **10 avaliações reais de 5 estrelas**, com a foto de
perfil de quem avaliou, coletadas na janela de avaliações do Google
ordenada por "Maior classificação". A nota média (4,6) **não aparece no
site**, como na Celebrare: só o total de 388.
Atenção: há avaliações negativas no perfil (bolo, salgado, cabelo na
comida, barulho para a vizinhança). Vale o cliente responder no Google.

## Dados para o cliente confirmar

- **Horário de atendimento**: o Google não tem horário cadastrado.
- **Tipos de evento**: o site oferece Festa infantil, Primeiro aninho,
  15 anos (comprovado pelo reel da debutante), Aniversário e Outro evento.
  Confirmar se fazem casamento, corporativo e festa **fora do espaço**.
- **Capacidade**, cardápio e o que cada pacote inclui.
- **WhatsApp**: o número (24) 2231-9051 é fixo. Confirmar que ele tem
  WhatsApp (o link wa.me depende disso).
- Texto da seção "A casa" (TODO em `src/content/site.ts`): história real.
- CNPJ (opcional) e domínio definitivo.

## Fotos e direitos

- 25 das 29 fotos entraram. De fotógrafos: @gabriellecamillo,
  @karenmedeiirosfotografia, @raianevichetifotografia; o resto de @viafestas.
- Há **crianças identificáveis**: confirmar autorização das famílias.
- Faltam: fachada, área de brinquedos (é o que mais elogiam e não tem
  foto!), cozinha/buffet servido, equipe.
- Reels: 4 vídeos na seção Instagram (1 de @gabriellecamillo). Confirmar
  autorização da influenciadora. Os originais ficam em `videos/` (fora do
  Git); `npm run videos` gera as versões do site.

## Publicação

`next.config.ts` usa `REPO = "viafestas"` como nome do repositório. Trocar
pelo nome exato do repo criado, depois `npm run build:pages`, commit e push.
