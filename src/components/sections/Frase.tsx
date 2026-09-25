import Image from "next/image";

import { fotos } from "@/assets/fotos";
import { FRASE } from "@/content/site";

/**
 * Full-bleed com a frase de uma cliente real sobre a foto do parabéns.
 * Pontes de gradiente fazem o creme de cima e o branco de baixo vazarem
 * sobre a imagem, então o corte entre as seções deixa de existir.
 */
export function Frase() {
  const foto = fotos[FRASE.foto];
  return (
    <section aria-label="O que dizem da Via Festas" className="on-dark relative isolate flex min-h-[72svh] items-end overflow-hidden py-16 text-branco md:min-h-[80svh]">
      <Image src={foto.src} alt={foto.alt} fill placeholder="blur" sizes="100vw" className="deriva-foto -z-20 object-cover object-[50%_35%]" />
      <div aria-hidden className="veu-foto absolute inset-0 -z-10" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-3/4 bg-gradient-to-t from-noite/85 via-noite/45 to-transparent" />
      <div aria-hidden className="ponte-topo-creme absolute inset-x-0 top-0 -z-10 h-28 md:h-36" />
      <div aria-hidden className="ponte-base-branco absolute inset-x-0 bottom-0 -z-10 h-20 md:h-28" />

      <div className="container-page">
        <figure className="revela max-w-3xl">
          <blockquote className="poetico text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.08] text-branco [text-shadow:0_2px_28px_rgb(11_10_16/0.65)]">
            “{FRASE.citacao}”
          </blockquote>
          <figcaption className="mt-4 text-lg">
            <span className="marca-texto">{FRASE.autora}</span>
          </figcaption>
        </figure>

        <div className="revela mb-10 md:mb-14">
          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-branco/20 pt-6">
            {FRASE.mencoes.map((m) => (
              <div key={m.rotulo} className="flex items-baseline gap-2.5">
                <dd className="font-display text-4xl text-lilas-claro">{m.valor}</dd>
                <dt className="text-sm text-branco/80">{m.rotulo}</dt>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-xs text-branco/60">{FRASE.nota}</p>
        </div>
      </div>
    </section>
  );
}
