/**
 * Catálogo de fotos. Os arquivos saem de `npm run fotos` (scripts/fotos.mjs),
 * que dá nome de cena a cada original do Instagram. O alt descreve O QUE a
 * foto mostra, nunca "foto do salão" genérico.
 *
 * Origem: posts de @viafestas e dos fotógrafos @gabriellecamillo,
 * @karenmedeiirosfotografia e @raianevichetifotografia. Ver PENDENCIAS.md.
 */
import type { StaticImageData } from "next/image";

import abelhinhaMesa from "./abelhinha-mesa.jpg";
import casteloNoite from "./castelo-noite.jpg";
import docesLilas from "./doces-lilas.jpg";
import docesLilasDetalhe from "./doces-lilas-detalhe.jpg";
import fazendinhaMesa from "./fazendinha-mesa.jpg";
import jardimLilasFlores from "./jardim-lilas-flores.jpg";
import jardimLilasMesa from "./jardim-lilas-mesa.jpg";
import leaoBolo from "./leao-bolo.jpg";
import leaoCenario from "./leao-cenario.jpg";
import leaoCupcakes from "./leao-cupcakes.jpg";
import leaoFamilia from "./leao-familia.jpg";
import leaoIrmaos from "./leao-irmaos.jpg";
import leaoLembrancinha from "./leao-lembrancinha.jpg";
import leaoMaeEBebe from "./leao-mae-e-bebe.jpg";
import leaoMesa from "./leao-mesa.jpg";
import leaoPirulitos from "./leao-pirulitos.jpg";
import minnieAniversariante from "./minnie-aniversariante.jpg";
import minnieFamilia from "./minnie-familia.jpg";
import minnieMesa from "./minnie-mesa.jpg";
import salaoJardimInterno from "./salao-jardim-interno.jpg";
import salaoMesasPostas from "./salao-mesas-postas.jpg";
import stitchAbraco from "./stitch-abraco.jpg";
import stitchAniversariante from "./stitch-aniversariante.jpg";
import stitchFamilia from "./stitch-familia.jpg";
import stitchLembrancinhas from "./stitch-lembrancinhas.jpg";

export type Foto = { src: StaticImageData; alt: string };

export const fotos = {
  stitchFamilia: {
    src: stitchFamilia,
    alt: "Pai, mãe e a aniversariante no colo diante da mesa temática do Stitch, com teto de balões rosa e azul",
  },
  stitchAniversariante: {
    src: stitchAniversariante,
    alt: "Aniversariante de vestido azul entre a mãe e a avó na festa do Stitch",
  },
  stitchAbraco: {
    src: stitchAbraco,
    alt: "Mãe abraçando a aniversariante diante do painel do Stitch e da Angel",
  },
  stitchLembrancinhas: {
    src: stitchLembrancinhas,
    alt: "Estante de lembrancinhas e cilindros decorados com o Stitch e a Angel",
  },
  leaoMaeEBebe: {
    src: leaoMaeEBebe,
    alt: "Mãe erguendo o bebê aniversariante na festa com tema Rei Leão",
  },
  leaoFamilia: {
    src: leaoFamilia,
    alt: "Pai e mãe com o bebê no colo na festa Hakuna Matata",
  },
  leaoIrmaos: {
    src: leaoIrmaos,
    alt: "Irmã mais velha e o bebê sentados numa poltrona de palha na festa do Rei Leão",
  },
  leaoLembrancinha: {
    src: leaoLembrancinha,
    alt: "Sacola de lembrancinha personalizada com o Simba e laço verde",
  },
  leaoMesa: {
    src: leaoMesa,
    alt: "Mesa de doces do Rei Leão com o painel Hakuna Matata e bolhas no teto",
  },
  leaoBolo: {
    src: leaoBolo,
    alt: "Bolo de três andares com a savana e o Rafiki, ao lado do painel do Simba",
  },
  leaoPirulitos: {
    src: leaoPirulitos,
    alt: "Pirulitos de chocolate com patinhas e a placa Hakuna Matata, amarrados com laço dourado",
  },
  leaoCupcakes: {
    src: leaoCupcakes,
    alt: "Cupcakes decorados com o Timão e o Pumba",
  },
  minnieMesa: {
    src: minnieMesa,
    alt: "Mesa da Minnie com castelo encantado, balões lilás e piso cintilante",
  },
  minnieFamilia: {
    src: minnieFamilia,
    alt: "Família reunida com a aniversariante de vestido lilás na festa da Minnie",
  },
  minnieAniversariante: {
    src: minnieAniversariante,
    alt: "Aniversariante de vestido lilás sentada entre arranjos de flores rosa",
  },
  jardimLilasMesa: {
    src: jardimLilasMesa,
    alt: "Mesa de doces com arranjos de flores lilás diante de uma parede verde com luzinhas",
  },
  jardimLilasFlores: {
    src: jardimLilasFlores,
    alt: "Composição de doces, flores lilás e margaridas sob um arranjo suspenso",
  },
  docesLilas: {
    src: docesLilas,
    alt: "Bandeja de doces finos em forminhas lilás com um arranjo alto de flores",
  },
  docesLilasDetalhe: {
    src: docesLilasDetalhe,
    alt: "Detalhe dos doces em forminhas de pétala lilás e um pote de vidro",
  },
  leaoCenario: {
    src: leaoCenario,
    alt: "Cenário completo do Rei Leão com grama, painéis de girafa e bichos de pelúcia",
  },
  abelhinhaMesa: {
    src: abelhinhaMesa,
    alt: "Mesa de primeiro aniversário com tema abelhinha, balões amarelos e margaridas",
  },
  fazendinhaMesa: {
    src: fazendinhaMesa,
    alt: "Mesa rosa com tema fazendinha, carroça e cavalinho, sob teto de vidro",
  },
  salaoMesasPostas: {
    src: salaoMesasPostas,
    alt: "Salão da Via Festas com mesas postas, sousplats dourados e arranjos de flores",
  },
  salaoJardimInterno: {
    src: salaoJardimInterno,
    alt: "Ambiente com mesa comprida, cadeiras brancas e lustre de folhagem iluminado",
  },
  casteloNoite: {
    src: casteloNoite,
    alt: "Cenário noturno de castelo iluminado com balões azuis e lustres, pronto para a festa",
  },
} satisfies Record<string, Foto>;

export type ChaveFoto = keyof typeof fotos;
