/**
 * Avaliações REAIS do perfil "Casa de Festas Via Festas" no Google
 * (388 avaliações). Em 25/09/2026 o Maps só abriu a visualização limitada,
 * com 3 avaliações: entram as 2 positivas, com o texto como o autor
 * escreveu. A do Ramon aparece cortada pelo próprio Google ("… Mais"), então
 * termina em reticências.
 *
 * PENDENTE: puxar mais avaliações, com avatar, pelo Apify
 * (Reviews-Scraper, personalData) ou pelo Chrome logado. O carrossel aceita
 * qualquer quantidade.
 */
import type { StaticImageData } from "next/image";

import type { Foto } from "@/assets/fotos";

export type Avaliacao = {
  autor: string;
  nota: 1 | 2 | 3 | 4 | 5;
  /** Data aproximada: o Google mostra só "há N meses". */
  quando: string;
  texto: string;
  avatar?: StaticImageData;
  foto?: Foto;
  fonte: "google";
};

export const avaliacoes: Avaliacao[] = [
  {
    autor: "Caroline Maricato",
    nota: 5,
    quando: "fevereiro de 2026",
    texto:
      "Casa de festa maravilhosa. Fui na festa essa semana e amei! Macarrão com molho branco é maravilhoso! As batatinhas são sensacionais! Super indico! Os minis hambúrgueres são maravilhosos! Meus filhos amaram a hora dos lanches infantis! Área de brinquedos sensacional! Funcionários super gentis e educados!",
    fonte: "google",
  },
  {
    autor: "Ramon Sixel",
    nota: 5,
    quando: "2022",
    texto:
      "A casa é muito bem localizada, apesar de não possuir estacionamento, mas as ruas ao redor possuem muitas vagas. Tanto o buffet como a equipe da casa são excelentes!…",
    fonte: "google",
  },
];
