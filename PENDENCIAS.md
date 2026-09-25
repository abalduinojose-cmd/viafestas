# Pendências: Via Festas Buffet

Levantado em 25/09/2026. O site não inventa capacidade, preço, cardápio,
horário nem tipos de evento que o cliente não confirmou.

## Avaliações (principal pendência)

O perfil tem **388 avaliações** no Google, mas o Maps só abriu a
visualização limitada: entraram só **2 avaliações reais** (Caroline
Maricato e Ramon Sixel, esta cortada pelo próprio Google). Para puxar as
melhores, com foto de quem avaliou:

- religar o conector **Apify** (Reviews-Scraper, `personalData: true`), ou
- conectar a extensão **Claude no Chrome** com a conta Google logada.

A nota média (4,6) **não aparece no site**, como na Celebrare: só o total.
Atenção: há avaliação negativa recente (fev/2026) no perfil.

## Dados para o cliente confirmar

- **Horário de atendimento**: o Google não tem horário cadastrado.
- **Tipos de evento**: o site oferece Festa infantil, Primeiro aninho,
  Aniversário e Outro evento. Confirmar se fazem 15 anos, casamento,
  corporativo, e se fazem festa **fora do espaço**.
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
  foto!), cozinha/buffet servido, equipe. Vídeos: a pasta `videos/` está
  vazia.

## Publicação

`next.config.ts` usa `REPO = "viafestas"` como nome do repositório. Trocar
pelo nome exato do repo criado, depois `npm run build:pages`, commit e push.
