import type { MetadataRoute } from "next";

import { SITE_URL } from "@/content/site";

export const dynamic = "force-static";

/* Prévia em subpasta (GitHub Pages) não compete no Google com o domínio. */
export default function robots(): MetadataRoute.Robots {
  if (process.env.NEXT_PUBLIC_BASE_PATH) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${SITE_URL}/sitemap.xml` };
}
