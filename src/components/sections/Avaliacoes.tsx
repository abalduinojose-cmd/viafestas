import Image from "next/image";

import { avaliacoes } from "@/content/avaliacoes";
import { AVALIACOES, PERFIL_GOOGLE, site } from "@/content/site";

import { Botao } from "../ui/Botao";
import { Estrelas } from "../ui/Estrelas";
import { Section } from "../ui/Section";
import { Titulo } from "../ui/Titulo";
import { Trilho } from "../ui/Trilho";

/** Ramo de louro do selo de avaliações, em lavanda. */
function Louro({ espelhado = false }: { readonly espelhado?: boolean }) {
  return (
    <svg viewBox="0 0 24 56" aria-hidden focusable="false" className={`h-12 w-auto text-lilas-fundo ${espelhado ? "-scale-x-100" : ""}`} fill="currentColor">
      <path d="M20 2c-8 6-14 16-14 27 0 10 5 19 12 25l1-2C13 46 9 39 9 29 9 19 14 9 21 4Z" />
      {[10, 18, 26, 34, 42].map((y, i) => (
        <ellipse key={y} cx={8 - i * 0.5} cy={y} rx="4.5" ry="2.2" transform={`rotate(${-28 - i * 6} ${8 - i * 0.5} ${y})`} />
      ))}
    </svg>
  );
}

/**
 * Avaliações reais do Google. Sem nota média na tela nem aggregateRating
 * no JSON-LD, ver lib/json-ld.ts). No lugar das barras por categoria do
 * Airbnb, que o Google não tem, entra a contagem de temas dos comentários.
 */
export function Avaliacoes() {
  const maior = Math.max(...AVALIACOES.temas.map((t) => t.valor));
  return (
    <Section id={AVALIACOES.id} rotuloId="titulo-avaliacoes" sangra className="py-20 md:py-28">
      <div className="container-page">
        <Titulo id="titulo-avaliacoes" rotulo={AVALIACOES.rotulo} titulo={AVALIACOES.titulo} />

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="revela lg:col-span-4">
            <div className="cartao p-8 lg:sticky lg:top-24">
              <div className="flex items-center justify-center gap-3">
                <Louro />
                {/* Só o total: a nota média não aparece no site (pedido de 24/09). */}
                <p className="font-display text-7xl leading-none text-ink">{site.google.total}</p>
                <Louro espelhado />
              </div>
              <h3 className="mt-5 text-center text-[1.6rem] text-ink">{AVALIACOES.resumoTitulo}</h3>
              <p className="mt-2 text-center text-sm leading-relaxed text-ink-muted">{AVALIACOES.resumoTexto}</p>

              <p className="rotulo-caps mt-7 border-t border-ink/10 pt-6 text-[0.6rem] text-ink-muted">{AVALIACOES.temasTitulo}</p>
              <dl className="mt-4 space-y-3.5">
                {AVALIACOES.temas.map((t) => (
                  <div key={t.rotulo} className="flex items-center gap-4">
                    <dt className="w-32 shrink-0 text-[0.8125rem] text-ink-muted">{t.rotulo}</dt>
                    <dd className="flex flex-1 items-center gap-3">
                      <span aria-hidden className="h-1 flex-1 overflow-hidden rounded-full bg-ink/10">
                        <span className="block h-full rounded-full bg-gradient-to-r from-lilas-quente to-lilas-fundo" style={{ width: `${(t.valor / maior) * 100}%` }} />
                      </span>
                      <span className="w-24 text-right text-[0.8125rem] font-medium text-ink">{`${t.valor} ${AVALIACOES.temasUnidade}`}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="min-w-0 lg:col-span-8">
            <Trilho rotulo="Avaliações de clientes, role para o lado" setasClassName="mb-5 max-md:hidden">
              {avaliacoes.map((a) => (
                <li key={a.autor} className="w-[82vw] max-w-[22.5rem] shrink-0 snap-start sm:w-[22.5rem]">
                  <figure className="cartao cartao-vivo flex h-full flex-col p-7">
                    <figcaption className="flex items-center gap-3.5">
                      {a.avatar ? (
                        <Image src={a.avatar} alt="" width={48} height={48} className="size-12 shrink-0 rounded-full object-cover ring-1 ring-lilas ring-offset-2" />
                      ) : (
                        <span aria-hidden className="grid size-12 shrink-0 place-items-center rounded-full bg-noite font-display text-xl text-lilas">
                          {a.autor[0]}
                        </span>
                      )}
                      <span className="min-w-0">
                        <span className="block truncate font-medium text-ink">{a.autor}</span>
                        <span className="rotulo-caps mt-0.5 block text-[0.58rem] text-ink-muted">{a.quando}</span>
                      </span>
                    </figcaption>
                    <Estrelas rotulo="5 de 5 estrelas" className="mt-4" />
                    <blockquote className="mt-3 flex-1">
                      <p className="text-[0.95rem] leading-relaxed text-ink/80">{a.texto}</p>
                    </blockquote>
                    {a.foto ? (
                      <div className="relative mt-5 aspect-[4/3] overflow-hidden rounded-xl">
                        <Image src={a.foto.src} alt={a.foto.alt} fill placeholder="blur" sizes="360px" className="object-cover" />
                      </div>
                    ) : null}
                    <p className="rotulo-caps mt-5 text-[0.55rem] text-ink-muted">{AVALIACOES.via}</p>
                  </figure>
                </li>
              ))}
            </Trilho>

            <div className="revela mt-8 flex justify-center md:justify-start">
              <Botao href={PERFIL_GOOGLE} variante="contornoEscuro">
                {AVALIACOES.cta}
              </Botao>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
