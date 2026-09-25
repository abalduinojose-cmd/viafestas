/**
 * Todo o texto e todo dado do negócio moram aqui, na ordem das seções da
 * página. Nenhum componente inventa texto.
 *
 * Fontes: bio do Instagram (@viafestas: "18 anos realizando sonhos",
 * "Espaço com buffet completo e decoração"), perfil do Google (endereço,
 * telefone, 388 avaliações e os temas que ele destaca) e as fotos enviadas.
 * Nada de capacidade, preço, cardápio nem horário que o cliente não tenha
 * confirmado: o que falta está marcado com TODO e listado em PENDENCIAS.md.
 */
import {
  Baby,
  Cake,
  CakeSlice,
  Car,
  Clock,
  Flower2,
  Gift,
  HeartHandshake,
  MapPin,
  PartyPopper,
  Phone,
  Sparkles,
  Sprout,
  ToyBrick,
  UtensilsCrossed,
  Users,
  type LucideIcon,
} from "lucide-react";

import type { ChaveFoto } from "@/assets/fotos";

export const site = {
  nome: "Via Festas Buffet",
  nomeGoogle: "Casa de Festas Via Festas",
  tagline: "18 anos realizando sonhos",
  subtagline: "Espaço com buffet completo e decoração",
  anos: 18,
  telefone: "(24) 2231-9051",
  whatsapp: "552422319051",
  endereco: {
    rua: "Rua Gonçalves Dias, 628",
    bairro: "Valparaíso",
    cidade: "Petrópolis",
    uf: "RJ",
    cep: "25655-122",
    lat: -22.5170231,
    lng: -43.1912147,
  },
  /* TODO: o perfil do Google não tem horário cadastrado. Confirmar com o
     cliente; enquanto isso o site fala só em "atendimento pelo WhatsApp". */
  horarios: null as null | { semana: string; sabado: string; domingo: string },
  social: {
    instagram: "https://www.instagram.com/viafestas/",
    instagramArroba: "@viafestas",
    facebook: "https://www.facebook.com/casadefestasviafestas/",
    googleMaps: "https://share.google/Q1l0sZ3jKRC5BUf1l",
  },
  /* A nota média não aparece no site, seguindo a regra da Celebrare: só o
     total de avaliações e os comentários. */
  google: { total: 388 },
  cnpj: null as string | null, // TODO: CNPJ, se o cliente quiser no rodapé
  /* TODO: confirmar com o cliente que tipos de evento a casa faz. As fotos
     e as avaliações mostram festa infantil e aniversário. */
  servicos: [
    { slug: "infantil", titulo: "Festa infantil" },
    { slug: "aninho", titulo: "Primeiro aninho" },
    { slug: "aniversario", titulo: "Aniversário" },
    { slug: "outro", titulo: "Outro evento" },
  ],
} as const;

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.viafestas.com.br"; // TODO: domínio definitivo

export const linkWhatsApp = (texto: string) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(texto)}`;

export const PERFIL_GOOGLE = site.social.googleMaps;

export const WHATSAPP = {
  padrao: linkWhatsApp("Olá! Vim pelo site da Via Festas e queria saber mais sobre o espaço."),
  visita: linkWhatsApp("Olá! Vim pelo site e queria agendar uma visita ao espaço da Via Festas."),
};

export const NAV = [
  { href: "#a-casa", rotulo: "A casa" },
  { href: "#o-espaco", rotulo: "O espaço" },
  { href: "#servicos", rotulo: "Serviços" },
  { href: "#galeria", rotulo: "Galeria" },
  { href: "#avaliacoes", rotulo: "Avaliações" },
  { href: "#localizacao", rotulo: "Localização" },
  { href: "#contato", rotulo: "Orçamento" },
] as const;

export const HERO = {
  foto: "casteloNoite" satisfies ChaveFoto,
  titulo: "18 anos realizando",
  destaque: "sonhos",
  final: "",
  texto: "Espaço com buffet completo e decoração no Valparaíso, em Petrópolis. Você escolhe o tema, a Via Festas monta a festa.",
  ctaPrincipal: "Pedir orçamento",
  ctaWhatsApp: "Falar no WhatsApp",
  local: "Valparaíso, Petrópolis",
  localApoio: "Buffet e decoração",
  atalhoTitulo: "Que festa você está planejando?",
  atalhoApoio: "Toque e a conversa abre no WhatsApp da Via Festas.",
  atalhos: ["Festa infantil", "Primeiro aninho", "Aniversário", "Outro evento"],
} as const;

export const PROVA = {
  numeros: [
    { valor: String(site.anos), rotulo: "Anos realizando sonhos" },
    { valor: String(site.google.total), rotulo: "Avaliações no Google" },
    { valor: "3 em 1", rotulo: "Espaço, buffet e decoração" },
    { valor: "20", rotulo: "Avaliações citam os brinquedos" },
  ],
  faixa: "Espaço, buffet e decoração num lugar só, para a família aproveitar a festa.",
} as const;

export type Chip = { rotulo: string; icone: LucideIcon };

export const A_CASA = {
  id: "a-casa",
  rotulo: "A casa",
  titulo: "Festa boa é festa sem preocupação.",
  destaque: "Espaço, buffet e decoração no mesmo lugar",
  /* TODO: texto escrito a partir da bio e das avaliações. O cliente deve
     ajustar com a história da casa (quem fundou, como começou). */
  paragrafos: [
    "Há 18 anos a Via Festas recebe famílias no Valparaíso, em Petrópolis, para comemorar os dias que ficam na memória. O espaço já vem com buffet completo e decoração, então você não precisa correr atrás de fornecedor.",
    "Você escolhe o tema, a equipe monta o cenário, a mesa de doces e cuida do buffet. As crianças ficam na área de brinquedos, e a família aproveita a festa.",
  ],
  chips: [
    { rotulo: "Buffet completo", icone: UtensilsCrossed },
    { rotulo: "Decoração temática", icone: Sparkles },
    { rotulo: "Área de brinquedos", icone: ToyBrick },
    { rotulo: "Mesas postas", icone: Users },
    { rotulo: "Ambiente com jardim", icone: Sprout },
    { rotulo: "No Valparaíso", icone: MapPin },
  ] satisfies Chip[],
  fotos: ["salaoMesasPostas", "minnieMesa", "jardimLilasMesa", "leaoMesa", "casteloNoite", "abelhinhaMesa"] satisfies ChaveFoto[],
} as const;

/** Os três temas que o Google mais destaca nas avaliações do perfil. */
export const DESTAQUES = {
  rotulo: "Por que escolhem a Via Festas",
  itens: [
    {
      titulo: "Brinquedos para a criançada",
      texto: "É o tema mais citado nas avaliações do Google: as crianças se divertem do começo ao fim da festa.",
      icone: ToyBrick,
    },
    {
      titulo: "Buffet que as crianças amam",
      texto: "Lanches, doces e bolo que aparecem nos comentários de quem já comemorou aqui.",
      icone: CakeSlice,
    },
    {
      titulo: "Equipe gentil e atenciosa",
      texto: "Funcionários educados e presentes, do começo ao fim, segundo quem avalia a casa.",
      icone: HeartHandshake,
    },
  ] satisfies { titulo: string; texto: string; icone: LucideIcon }[],
} as const;

/** Faixa de foto em tela cheia com a frase de uma cliente real. */
export const FRASE = {
  foto: "minnieMesa" satisfies ChaveFoto,
  citacao: "Área de brinquedos sensacional! Funcionários super gentis e educados!",
  autora: "Caroline Maricato, no Google",
  mencoes: [
    { valor: "20", rotulo: "citam os brinquedos" },
    { valor: "20", rotulo: "falam das crianças" },
    { valor: "15", rotulo: "elogiam o buffet" },
    { valor: "9", rotulo: "falam da equipe" },
  ],
  nota: "Temas que o Google destaca nas avaliações do perfil da Via Festas, em setembro de 2026.",
} as const;

export type Ambiente = { id: string; titulo: string; texto: string; fotos: ChaveFoto[] };

/** O espaço por dentro: cada cartão abre a galeria daquele canto. */
export const O_SALAO = {
  id: "o-espaco",
  rotulo: "O espaço",
  titulo: "Cada detalhe pronto para a festa.",
  texto: "Do salão com mesas postas ao cenário do tema, o que você encontra na Rua Gonçalves Dias.",
  ambientes: [
    {
      id: "salao",
      titulo: "O salão",
      texto: "Mesas postas para os convidados e um ambiente com jardim e lustre de folhagem.",
      fotos: ["salaoMesasPostas", "salaoJardimInterno"],
    },
    {
      id: "cenario",
      titulo: "Cenário do tema",
      texto: "Stitch, Rei Leão, Minnie, castelo: o tema escolhido vira cenário completo.",
      fotos: ["minnieMesa", "leaoCenario", "casteloNoite", "abelhinhaMesa", "fazendinhaMesa", "stitchFamilia"],
    },
    {
      id: "doces",
      titulo: "Doces e bolo",
      texto: "Mesa de doces montada no tema, do bolo de andar aos pirulitos e cupcakes.",
      fotos: ["docesLilas", "docesLilasDetalhe", "leaoBolo", "leaoPirulitos", "leaoCupcakes", "jardimLilasFlores"],
    },
    {
      id: "detalhes",
      titulo: "Os detalhes",
      texto: "Lembrancinhas, arranjos e cada item da mesa combinando com a festa.",
      fotos: ["stitchLembrancinhas", "leaoLembrancinha", "jardimLilasMesa", "leaoMesa"],
    },
    {
      id: "familia",
      titulo: "A família em festa",
      texto: "O que fica depois: o aniversariante no centro e a família reunida.",
      fotos: ["minnieAniversariante", "leaoMaeEBebe", "leaoIrmaos", "stitchAbraco", "minnieFamilia", "leaoFamilia"],
    },
  ] satisfies Ambiente[],
} as const;

export type GrupoServico = { id: string; titulo: string; itens: { rotulo: string; icone: LucideIcon }[] };

/** O que a Via Festas faz. TODO: detalhar pacotes e cardápio com o cliente. */
export const EVENTOS = {
  id: "servicos",
  rotulo: "Serviços",
  titulo: "Tudo o que a festa precisa.",
  grupos: [
    {
      id: "festas",
      titulo: "Festas",
      itens: [
        { rotulo: "Festa infantil", icone: PartyPopper },
        { rotulo: "Primeiro aninho", icone: Baby },
        { rotulo: "Aniversário", icone: Cake },
        { rotulo: "Outros eventos", icone: Gift },
      ],
    },
    {
      id: "buffet",
      titulo: "Buffet",
      itens: [
        { rotulo: "Buffet completo", icone: UtensilsCrossed },
        { rotulo: "Lanches que as crianças amam", icone: PartyPopper },
        { rotulo: "Doces e bolo da festa", icone: CakeSlice },
      ],
    },
    {
      id: "decoracao",
      titulo: "Decoração",
      itens: [
        { rotulo: "Cenário no tema escolhido", icone: Sparkles },
        { rotulo: "Mesa de doces e bolo", icone: Cake },
        { rotulo: "Arranjos de flores", icone: Flower2 },
      ],
    },
    {
      id: "espaco",
      titulo: "Espaço",
      itens: [
        { rotulo: "Salão com mesas postas", icone: Users },
        { rotulo: "Área de brinquedos", icone: ToyBrick },
        { rotulo: "Ambiente com jardim", icone: Sprout },
        { rotulo: "Vagas na rua ao redor", icone: Car },
      ],
    },
  ] satisfies GrupoServico[],
  nota: "Cardápio, número de convidados e valores variam com cada festa: conte o que você imagina e a Via Festas responde com as opções.",
} as const;

export const GALERIA = {
  id: "galeria",
  rotulo: "Galeria",
  titulo: "Festas que já aconteceram aqui.",
  texto: "Temas de verdade, montados no espaço da Via Festas. Toque em uma foto para ver maior.",
  fotos: [
    "minnieMesa",
    "leaoMaeEBebe",
    "jardimLilasMesa",
    "stitchFamilia",
    "leaoBolo",
    "casteloNoite",
    "minnieAniversariante",
    "docesLilas",
    "abelhinhaMesa",
    "leaoIrmaos",
    "fazendinhaMesa",
    "salaoMesasPostas",
  ] satisfies ChaveFoto[],
  dica: "Arraste para o lado para ver mais.",
} as const;

export const AVALIACOES = {
  id: "avaliacoes",
  rotulo: "Avaliações",
  titulo: "Quem comemorou, conta.",
  resumoTitulo: "avaliações no Google",
  resumoTexto: "Os temas mais citados pelos clientes no perfil da Via Festas.",
  /* Contagem que o próprio Google mostra nos filtros de tema do perfil. */
  temas: [
    { rotulo: "Brinquedos", valor: 20 },
    { rotulo: "Crianças", valor: 20 },
    { rotulo: "Buffet", valor: 15 },
    { rotulo: "Equipe", valor: 9 },
  ],
  temasTitulo: "O que mais aparece nos comentários",
  temasUnidade: "avaliações",
  via: "Via Google",
  cta: `Ler as ${site.google.total} avaliações no Google`,
} as const;

export type ItemComIcone = { rotulo: string; icone: LucideIcon };

export const LOCALIZACAO = {
  id: "localizacao",
  rotulo: "Localização",
  titulo: "No Valparaíso, em Petrópolis.",
  texto: `${site.endereco.rua}, ${site.endereco.bairro}, ${site.endereco.cidade}, ${site.endereco.uf}. CEP ${site.endereco.cep}.`,
  mapaAcao: "Abrir no Google Maps",
  rota: "Traçar rota",
  cartaoTitulo: "Como chegar e falar",
  itens: [
    { rotulo: `${site.endereco.rua}, ${site.endereco.bairro}`, icone: MapPin },
    { rotulo: "Orçamentos e agendamentos pelo WhatsApp", icone: Clock },
    { rotulo: `WhatsApp e telefone: ${site.telefone}`, icone: Phone },
    { rotulo: "Sem estacionamento próprio, com vagas nas ruas ao redor", icone: Car },
  ] satisfies ItemComIcone[],
  aviso: "Visitas ao espaço com hora marcada pelo WhatsApp.",
} as const;

export const CONTATO = {
  id: "contato",
  rotulo: "Orçamento",
  titulo: "Monte o pedido da sua festa.",
  texto: "Leva um minuto. A mensagem chega pronta no WhatsApp da Via Festas, e nada fica gravado aqui no site.",
  passos: [
    { titulo: "Conte a festa", texto: "Tipo de festa, data e quantos convidados, se já souber." },
    { titulo: "A Via Festas responde", texto: "No WhatsApp, com as opções de buffet e decoração." },
    { titulo: "Visite o espaço", texto: "Com hora marcada, para ver tudo de perto antes de fechar." },
  ],
  direto: "Prefere falar direto?",
  horario: "Orçamentos e agendamentos pelo WhatsApp.",
  enviar: "Pedir orçamento pelo WhatsApp",
  aviso: "Você revisa a mensagem antes de enviar.",
} as const;

export const contato = {
  sucesso: `Abrimos o WhatsApp para você. Se nada aconteceu, chame no ${site.telefone}.`,
} as const;

export const PERGUNTAS = {
  id: "perguntas",
  rotulo: "Antes de agendar",
  titulo: "O que perguntam antes da primeira conversa.",
  itens: [
    {
      id: "completo",
      pergunta: "O buffet e a decoração já estão incluídos?",
      resposta: "A Via Festas é um espaço com buffet completo e decoração: você não precisa contratar fornecedor separado para isso. Os detalhes de cada pacote a equipe passa no WhatsApp.",
    },
    {
      id: "brinquedos",
      pergunta: "Tem brinquedos para as crianças?",
      resposta: "Tem área de brinquedos, e é o tema mais elogiado nas avaliações do Google.",
    },
    {
      id: "estacionamento",
      pergunta: "Tem estacionamento?",
      resposta: "Não há estacionamento próprio, mas as ruas ao redor, no Valparaíso, têm bastante vaga.",
    },
    {
      id: "visita",
      pergunta: "Como faço para conhecer o espaço?",
      resposta: `Chame no WhatsApp ${site.telefone} e combine um horário para visitar.`,
    },
    {
      id: "valores",
      pergunta: "Qual a capacidade e quanto custa?",
      resposta: "Depende do formato da festa. Conte a data e o número de convidados pelo formulário ou no WhatsApp, e a Via Festas responde com as opções.",
    },
  ],
} as const;

export const FINAL = {
  foto: "jardimLilasMesa" satisfies ChaveFoto,
  titulo: "O próximo sonho pode ser o seu.",
  cta: "Falar com a Via Festas",
  apoio: `Ou ligue: ${site.telefone}`,
} as const;

export const RODAPE = {
  frase: "Espaço com buffet completo e decoração. 18 anos realizando sonhos em Petrópolis.",
  direitos: "Todos os direitos reservados.",
  regiao: "Valparaíso · Petrópolis, RJ",
} as const;

export const CTA_FIXO = {
  selo: "18 anos realizando sonhos",
  rotulo: "Pedir orçamento",
} as const;
