import { siteOrigin } from "./seo";

export type Breadcrumb = {
  href?: string;
  label: string;
};

type ListItem = {
  "@type": "ListItem";
  position: number;
  name: string;
  item?: string;
};

export type BreadcrumbListSchema = {
  "@type": "BreadcrumbList";
  itemListElement: ListItem[];
};

/** Resolve a site-relative path (including one carrying a #fragment) to an absolute URL. */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${siteOrigin}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Build BreadcrumbList markup from the same array SiteHeader renders visibly, so
 * the markup cannot drift from the trail a user sees (Google requires they match).
 *
 * Returns null for trails shorter than two crumbs: a single-item breadcrumb carries
 * no navigational information, and the homepage renders no breadcrumbs at all.
 * The final crumb is the current page and is intentionally emitted without `item`.
 */
export function breadcrumbList(breadcrumbs: Breadcrumb[]): BreadcrumbListSchema | null {
  if (breadcrumbs.length < 2) return null;

  return {
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => {
      const entry: ListItem = {
        "@type": "ListItem",
        position: index + 1,
        name: crumb.label,
      };
      if (crumb.href) entry.item = absoluteUrl(crumb.href);
      return entry;
    }),
  };
}

/** Stamp a schema.org @context onto a node so it can stand alone in a script tag. */
export function withContext<T extends object>(node: T): T & { "@context": string } {
  return { "@context": "https://schema.org", ...node };
}

/**
 * Serialize for embedding in <script type="application/ld+json">. Escaping `<`
 * prevents a `</script>` sequence inside any string value from closing the tag.
 */
export function jsonLdScript(node: unknown): string {
  return JSON.stringify(node).replace(/</g, "\\u003c");
}
