import { jsonLdScript, withContext } from "@/lib/structured-data";

/**
 * Renders a schema.org node as a JSON-LD script tag.
 *
 * This is used from SiteHeader, a client component. Verified: React renders the
 * script into the prerendered HTML of the static export, so the markup is present
 * for crawlers without any client-side JavaScript running. Do not "fix" this by
 * moving it server-side on the assumption that it is client-only.
 */
export function JsonLd({ node }: { node: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdScript(withContext(node)) }}
    />
  );
}
