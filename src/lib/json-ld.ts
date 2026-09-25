import { SITE_URL, site } from "@/content/site";

/**
 * EventVenue + LocalBusiness. SEM aggregateRating de propósito: nota do
 * próprio negócio marcada no próprio site é "self-serving" para o Google
 * e pode gerar ação manual. O site mostra só o total de avaliações, com
 * link para o perfil. Sem openingHoursSpecification: o perfil do Google
 * não tem horário cadastrado (TODO).
 */
export const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["EventVenue", "LocalBusiness"],
  "@id": `${SITE_URL}/#viafestas`,
  name: site.nome,
  alternateName: site.nomeGoogle,
  slogan: site.tagline,
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image.png`,
  logo: `${SITE_URL}/marca/selo.webp`,
  telephone: "+55-24-2231-9051",
  priceRange: "$$", // TODO: confirmar faixa com o cliente
  address: {
    "@type": "PostalAddress",
    streetAddress: site.endereco.rua,
    addressLocality: site.endereco.cidade,
    addressRegion: site.endereco.uf,
    postalCode: site.endereco.cep,
    addressCountry: "BR",
  },
  geo: { "@type": "GeoCoordinates", latitude: site.endereco.lat, longitude: site.endereco.lng },
  hasMap: site.social.googleMaps,
  areaServed: [
    { "@type": "City", name: "Petrópolis" },
    { "@type": "AdministrativeArea", name: "Região Serrana do Rio de Janeiro" },
  ],
  sameAs: [site.social.instagram, site.social.facebook],
};
