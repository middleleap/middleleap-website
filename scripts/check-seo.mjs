import { access, readFile } from "node:fs/promises";
import path from "node:path";

const outputDirectory = path.resolve("out");
const siteUrl = "https://www.middleleap.com";
const failures = [];

function decode(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function match(html, expression) {
  return expression.exec(html)?.[1];
}

function outputFileFor(url) {
  const pathname = new URL(url).pathname.replace(/\/$/, "");
  return pathname
    ? path.join(outputDirectory, `${pathname}.html`)
    : path.join(outputDirectory, "index.html");
}

const sitemapXml = await readFile(path.join(outputDirectory, "sitemap.xml"), "utf8");
const urls = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)].map((entry) => entry[1]);
const sitemapPaths = new Set(
  urls.map((url) => new URL(url).pathname.replace(/\/$/, "") || "/"),
);
const titles = new Map();
const descriptions = new Map();

for (const url of urls) {
  const file = outputFileFor(url);
  const route = new URL(url).pathname.replace(/\/$/, "") || "/";

  try {
    await access(file);
  } catch {
    failures.push(`${route}: missing static HTML at ${path.relative(process.cwd(), file)}`);
    continue;
  }

  const html = await readFile(file, "utf8");
  const title = decode(match(html, /<title>(.*?)<\/title>/s) ?? "");
  const description = decode(
    match(html, /<meta name="description" content="(.*?)"\s*\/>/s) ?? "",
  );
  const canonical = decode(
    match(html, /<link rel="canonical" href="(.*?)"\s*\/>/s) ?? "",
  );
  const h1Count = (html.match(/<h1(?:\s|>)/g) ?? []).length;
  const expectedCanonical = route === "/" ? siteUrl : `${siteUrl}${route}`;
  const jsonLdScripts = [
    ...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs),
  ];

  if (!title) failures.push(`${route}: missing title`);
  if (!description) failures.push(`${route}: missing meta description`);
  if (canonical !== expectedCanonical) {
    failures.push(`${route}: canonical is ${canonical || "missing"}`);
  }
  if (h1Count !== 1) failures.push(`${route}: expected one h1, found ${h1Count}`);
  if (!html.includes('<meta property="og:title"')) {
    failures.push(`${route}: missing Open Graph title`);
  }
  if (!html.includes('<meta name="twitter:card"')) {
    failures.push(`${route}: missing Twitter card`);
  }
  if (jsonLdScripts.length === 0) failures.push(`${route}: missing JSON-LD`);

  if (titles.has(title)) failures.push(`${route}: duplicate title shared with ${titles.get(title)}`);
  else titles.set(title, route);
  if (descriptions.has(description)) {
    failures.push(`${route}: duplicate description shared with ${descriptions.get(description)}`);
  } else descriptions.set(description, route);

  for (const script of jsonLdScripts) {
    try {
      JSON.parse(decode(script[1]));
    } catch (error) {
      failures.push(`${route}: invalid JSON-LD (${error.message})`);
    }
  }

  for (const anchor of html.matchAll(/<a[^>]+href="(\/[^"?#]*)(?:[?#][^"]*)?"/g)) {
    const target = anchor[1].replace(/\/$/, "") || "/";
    if (
      !sitemapPaths.has(target) &&
      !target.startsWith("/_next/") &&
      !["/icon.svg", "/opengraph-image", "/twitter-image"].includes(target)
    ) {
      failures.push(`${route}: internal link target is not in the public route inventory: ${target}`);
    }
  }
}

if (failures.length > 0) {
  console.error(`SEO check failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`SEO check passed for ${urls.length} canonical routes.`);
}
