import { ACasa } from "@/components/sections/ACasa";
import { Avaliacoes } from "@/components/sections/Avaliacoes";
import { ChamadaFinal } from "@/components/sections/ChamadaFinal";
import { Contato } from "@/components/sections/Contato";
import { CtaFixo } from "@/components/sections/CtaFixo";
import { Destaques } from "@/components/sections/Destaques";
import { Eventos } from "@/components/sections/Eventos";
import { Frase } from "@/components/sections/Frase";
import { Galeria } from "@/components/sections/Galeria";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Localizacao } from "@/components/sections/Localizacao";
import { OSalao } from "@/components/sections/OSalao";
import { Perguntas } from "@/components/sections/Perguntas";
import { Prova } from "@/components/sections/Prova";
import { Rodape } from "@/components/sections/Rodape";
import { Silhueta } from "@/components/ui/Silhueta";

/**
 * Ordem e ritmo do layout do Cabana Afrodite (pedido em 24/09), com o
 * conteúdo e a identidade da Via Festas: seções claras e escuras costuradas
 * pela silhueta do casarão do selo.
 */
export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <Prova />

        <Silhueta de="noite" para="creme" />
        <ACasa />
        <Destaques />

        <Frase />

        <OSalao />

        <Silhueta de="branco" para="noite" />
        <Eventos />

        <Silhueta de="noite" para="creme" />
        <Galeria />
        <Avaliacoes />
        <Localizacao />
        <Contato />
        <Perguntas />

        <ChamadaFinal />
      </main>
      <Rodape />
      <CtaFixo />
    </>
  );
}
