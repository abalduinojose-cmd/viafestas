import Image from "next/image";

import { fotos } from "@/assets/fotos";
import { FINAL, WHATSAPP, site } from "@/content/site";

import selo from "../../../public/marca/selo.webp";
import { Botao } from "../ui/Botao";

/** Fecho sobre foto: o selo real da casa, o título e a pílula de lilas. */
export function ChamadaFinal() {
  const foto = fotos[FINAL.foto];
  return (
    <section aria-labelledby="titulo-final" className="on-dark relative isolate flex min-h-[36rem] items-center overflow-hidden py-24 text-branco md:min-h-[42rem]">
      <Image src={foto.src} alt={foto.alt} fill placeholder="blur" sizes="100vw" className="deriva-foto -z-20 object-cover object-center" />
      <div aria-hidden className="veu-foto absolute inset-0 -z-10" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-noite/35" />
      <div aria-hidden className="ponte-topo-creme absolute inset-x-0 top-0 -z-10 h-24 md:h-32" />
      <div aria-hidden className="ponte-base-noite absolute inset-x-0 bottom-0 -z-10 h-44 md:h-64" />

      <div className="container-page">
        <div className="revela mx-auto flex max-w-3xl flex-col items-center text-center">
          <Image src={selo} alt="Logo da Via Festas: o nome em lavanda e branco sobre um losango preto, com a frase Realizando Sonhos" sizes="176px" className="size-36 [filter:drop-shadow(0_0_1.5px_rgb(255_255_255/0.9))_drop-shadow(0_0_30px_rgb(193_142_246/0.55))] md:size-44" />
          <h2 id="titulo-final" className="mt-8 text-[clamp(2.6rem,6vw,4.6rem)] text-branco">
            {FINAL.titulo}
          </h2>
          <Botao href={WHATSAPP.padrao} tamanho="lg" seta whatsapp className="mt-9">
            {FINAL.cta}
          </Botao>
          <Botao href={`tel:+${site.whatsapp}`} variante="discreto" tamanho="sm" className="mt-6">
            {FINAL.apoio}
          </Botao>
        </div>
      </div>
    </section>
  );
}
