/**
 * Avaliações REAIS do perfil "Casa de Festas Via Festas" no Google (388 no
 * total), coletadas em 25/09/2026 na janela de avaliações da busca,
 * ordenada por "Maior classificação". Entram 10 de 5 estrelas com foto de
 * perfil real e texto que ajuda quem está decidindo. Ficaram de fora as de
 * uma linha ("Top", "Adorei!!"), a assinada por nome de empresa e a que
 * acha o espaço pequeno para família grande.
 *
 * Textos como o autor escreveu, com correção mínima de digitação (palavra
 * repetida, "nós mostrou", "país" por "pais", "..Me"). O Google só mostra a data relativa ("há 3
 * anos"): o ano abaixo é a conta a partir de setembro de 2026. Fotos de
 * perfil baixadas para midia/avatares (npm run fotos as processa).
 */
import type { StaticImageData } from "next/image";

import andreMarques from "@/assets/avatares/andre-marques.jpg";
import carolineMaricato from "@/assets/avatares/caroline-maricato.jpg";
import fernandoMachado from "@/assets/avatares/fernando-machado.jpg";
import jessicaVasconcelos from "@/assets/avatares/jessica-vasconcelos.jpg";
import marceloMoreira from "@/assets/avatares/marcelo-moreira.jpg";
import moniqueBotelho from "@/assets/avatares/monique-botelho.jpg";
import paolaNicolay from "@/assets/avatares/paola-nicolay.jpg";
import priscilaSoares from "@/assets/avatares/priscila-soares.jpg";
import ramonSixel from "@/assets/avatares/ramon-sixel.jpg";
import raquelSilva from "@/assets/avatares/raquel-silva.jpg";
import type { Foto } from "@/assets/fotos";

export type Avaliacao = {
  autor: string;
  nota: 1 | 2 | 3 | 4 | 5;
  /** Data aproximada: o Google mostra só "há N meses/anos". */
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
    avatar: carolineMaricato,
    fonte: "google",
  },
  {
    autor: "Jéssica Vasconcelos",
    nota: 5,
    quando: "2025",
    texto:
      "Conheci a casa num aniversário na qual fui de convidada e gostei muito. Anos depois estava buscando um local pro aniversário de 1 ano do meu filho. Estava pensando em outra casa de festas, mais próxima a minha residência e fui fazer uma visita. Meu marido não conhecia a Via Festas então pedi pra fazer uma visita pra ele conhecer. Fomos muito bem recebidos pela Gabi, que nos mostrou a casa detalhadamente, nos sentou para conversar explicando todos os pacotes e nos deixou super à vontade pra decidir. O tema que escolhemos não tinha sido escolhido antes (Senninha) e tivemos todo o apoio pra pensar e organizar tudo, e foi um sonho realizado. Decoração perfeita, o painel ficou incrível, toda a organização do evento, a atenção aos convidados, o Buffet maravilhoso… foram só elogios dos convidados. Nós amamos e recomendo muito!",
    avatar: jessicaVasconcelos,
    fonte: "google",
  },
  {
    autor: "Marcelo Moreira",
    nota: 5,
    quando: "2023",
    texto:
      "Casa de festas muito boa, bem localizada no Pólo Gastronômico de Petrópolis. Espaço amplo, excelente buffet com comidinhas e salgadinhos muito gostosos. Funcionários atenciosos, cordiais e bem treinados. Peca apenas pela falta de um estacionamento, mas acha-se vaga facilmente nas proximidades, no rotativo da prefeitura.",
    avatar: marceloMoreira,
    fonte: "google",
  },
  {
    autor: "Monique Botelho",
    nota: 5,
    quando: "2022",
    texto:
      "Adorei a decoração e os brinquedos. Me diverti e vi que as crianças também! Funcionários super atenciosos e educados. Salgados e bolo deliciosos! Estão de parabéns!",
    avatar: moniqueBotelho,
    fonte: "google",
  },
  {
    autor: "Ramon Sixel",
    nota: 5,
    quando: "2022",
    texto:
      "A casa é muito bem localizada, apesar de não possuir estacionamento, mas as ruas ao redor possuem muitas vagas. Tanto o buffet como a equipe da casa são excelentes! Fomos em uma festa infantil que os docinhos de festa eram da Yaya Doces o que deixou tudo ainda mais especial.",
    avatar: ramonSixel,
    fonte: "google",
  },
  {
    autor: "Raquel Silva",
    nota: 5,
    quando: "2022",
    texto:
      "Gostei, tem muitas variedade de brinquedo onde as crianças possam se divertir e os pais ficam tranquilos porque tem funcionários tomando conta das crianças.",
    avatar: raquelSilva,
    fonte: "google",
  },
  {
    autor: "Fernando Machado",
    nota: 5,
    quando: "2023",
    texto: "Muito bom. Tem um ótimo serviço e acessibilidade, espaço e muitos brinquedos pra crianças.",
    avatar: fernandoMachado,
    fonte: "google",
  },
  {
    autor: "Priscila Lorena Soares",
    nota: 5,
    quando: "2019",
    texto:
      "Excelente serviço!!! Equipe nota 1000! A festa do meu filho foi um sucesso! Luciana e sua equipe são extremamente atenciosos e profissionais. Tudo muito gostoso e de muita qualidade! Amei!",
    avatar: priscilaSoares,
    fonte: "google",
  },
  {
    autor: "Paola Fávero Nicolay",
    nota: 5,
    quando: "2019",
    texto:
      "Excelente espaço, as crianças gostam bastante. Opção de brinquedos para crianças pequenas e também para as maiores. O serviço é bom, e a organização também.",
    avatar: paolaNicolay,
    fonte: "google",
  },
  {
    autor: "André Marques",
    nota: 5,
    quando: "2018",
    texto:
      "Fiz a festa de um ano de meu filho nessa casa de festas. Muito bom! São muito caprichosos e dedicados. Todos os convidados se divertiram. Um festão!",
    avatar: andreMarques,
    fonte: "google",
  },
];
