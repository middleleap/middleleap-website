// Read-only, client-specific evidence. This does not impersonate or verify a bot.
// Never print response bodies, cookies, IPs, edge IDs or security-rule details.
import { createHash } from "node:crypto";
import { pathToFileURL } from "node:url";
import { JSDOM } from "jsdom";

export const origin = "https://www.middleleap.com";
const pages = ["/", "/ventures", "/ventures/hivemind"];
const canonical = (route) => route === "/" ? origin : `${origin}${route}`;
const signals = ["search=yes", "ai-input=yes", "ai-train=no"];
const safeHeaders = ["content-type", "vary", "content-signal", "x-robots-tag"];

export const retrievalCases = [
  ...pages.map((route) => ({ url: `${origin}${route}`, kind: "html", route })),
  ...pages.map((route) => ({ url: `${origin}${route}`, kind: "markdown", route })),
  ...["robots.txt", "sitemap.xml", "llms.txt"].map((file) => ({ url: `${origin}/${file}`, kind: file })),
  ...["http://middleleap.com/", "https://middleleap.com/", "http://www.middleleap.com/"].map((url) => ({ url, kind: "redirect" })),
  { url: `${origin}/index.md`, kind: "direct-markdown" },
  { url: `${origin}/ventures/hivemind.md`, kind: "direct-markdown" },
];

/** Validate public representations without interpreting client access as bot identity. */
export function inspectRetrieval(probe, status, headers, body) {
  const findings = [];
  if (probe.kind === "redirect") {
    const location = headers.get("location");
    if (![301, 308].includes(status)) findings.push("expected a permanent canonical redirect");
    // An HTTP apex may first redirect to HTTPS apex; verify that hop separately.
    const destinations = [`${origin}/`];
    if (probe.url === "http://middleleap.com/") destinations.push("https://middleleap.com/");
    if (!location || !destinations.includes(new URL(location, probe.url).href)) {
      findings.push("unexpected canonical redirect destination");
    }
    return findings;
  }
  if (status !== 200) return [`HTTP ${status}; representation checks unavailable`];
  const contentType = headers.get("content-type") ?? "";
  const robots = headers.get("x-robots-tag") ?? "";
  const hasNoindex = (value) => /(?:^|[\s,:])(?:noindex|none)(?:$|[\s,;])/i.test(value);
  if (probe.kind === "direct-markdown") {
    if (!contentType.startsWith("text/markdown")) findings.push("direct twin is not Markdown");
    if (!hasNoindex(robots)) findings.push("direct Markdown twin is missing noindex");
    return findings;
  }
  if (hasNoindex(robots)) findings.push("canonical response carries noindex");
  if (probe.kind === "html") {
    if (!contentType.startsWith("text/html")) findings.push("HTML request did not receive HTML");
    if (!(headers.get("vary") ?? "").split(",").some((value) => value.trim().toLowerCase() === "accept")) {
      findings.push("negotiated response is missing Vary: Accept");
    }
    const document = new JSDOM(body).window.document;
    if (document.querySelector('link[rel="canonical"]')?.getAttribute("href") !== canonical(probe.route)) {
      findings.push("HTML canonical differs from the intended URL");
    }
    if (!document.querySelector("h1")) findings.push("HTML page content is missing");
    if ([...document.querySelectorAll('meta[name="robots"], meta[name="googlebot"]')].some((meta) => hasNoindex(meta.content))) {
      findings.push("canonical HTML declares noindex");
    }
  } else if (probe.kind === "markdown") {
    if (!contentType.startsWith("text/markdown")) findings.push("Markdown request did not receive Markdown");
    if (!body.includes(`url: ${JSON.stringify(canonical(probe.route))}`) || !/^# .+/m.test(body)) {
      findings.push("Markdown canonical or page content is missing");
    }
    if (!(headers.get("vary") ?? "").split(",").some((value) => value.trim().toLowerCase() === "accept")) {
      findings.push("negotiated response is missing Vary: Accept");
    }
    const policy = (headers.get("content-signal") ?? "").split(",").map((value) => value.trim());
    if (policy.length !== signals.length || signals.some((signal) => !policy.includes(signal))) {
      findings.push("negotiated Content-Signal differs from the intended policy");
    }
  } else if (probe.kind === "robots.txt") {
    if (!contentType.startsWith("text/plain")) findings.push("robots response is not plain text");
    const groups = body.split(/\n\s*\n/).filter((group) => /^User-Agent:/im.test(group));
    for (const agent of ["*", "OAI-SearchBot", "ChatGPT-User", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User", "GPTBot", "ClaudeBot"]) {
      const group = groups.find((entry) => entry.split("\n").some((line) => line.trim().toLowerCase() === `user-agent: ${agent}`.toLowerCase()));
      const declared = group?.match(/^Content-Signal:\s*(.+)$/im)?.[1].split(",").map((value) => value.trim());
      if (!group || !/^Allow:\s*\/\s*$/im.test(group) || /^Disallow:\s*\S+/im.test(group) || declared?.length !== signals.length || signals.some((signal) => !declared?.includes(signal))) {
        findings.push(`robots policy mismatch for ${agent}`);
      }
    }
    if (!body.includes(`Sitemap: ${origin}/sitemap.xml`)) findings.push("robots sitemap differs from the canonical origin");
  } else if (probe.kind === "sitemap.xml") {
    if (!/(?:application|text)\/xml/.test(contentType)) findings.push("sitemap response is not XML");
    const urls = [...body.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
    if (pages.some((route) => !urls.includes(canonical(route))) || urls.some((url) => new URL(url).origin !== origin)) {
      findings.push("sitemap canonical inventory mismatch");
    }
  } else if (probe.kind === "llms.txt") {
    if (!contentType.startsWith("text/plain")) findings.push("llms response is not plain text");
    if (!body.includes(`Canonical website: ${origin}/`) || pages.some((route) => !body.includes(`](${canonical(route)}${route === "/" ? "/" : ""})`))) {
      findings.push("llms canonical source map mismatch");
    }
  }
  return findings;
}

export async function probePublicRetrieval(fetcher = fetch) {
  const results = [];
  for (const probe of retrievalCases) {
    /** @type {{url: string, kind: string, timestamp: string, findings: string[], status?: number, headers?: Record<string, string | null>, bodySha256?: string, redirectTo?: string}} */
    const result = { url: probe.url, kind: probe.kind, timestamp: new Date().toISOString(), findings: [] };
    try {
      const response = await fetcher(probe.url, {
        method: "GET",
        redirect: "manual",
        headers: {
          "user-agent": "MiddleLeap-Public-Verification/1.0",
          accept: probe.kind.includes("markdown") ? "text/markdown" : probe.kind === "html" ? "text/html" : "*/*",
        },
        signal: AbortSignal.timeout(15_000),
      });
      const body = await response.text();
      result.status = response.status;
      result.headers = Object.fromEntries(safeHeaders.filter((header) => response.headers.has(header)).map((header) => [header, response.headers.get(header)]));
      if (response.status === 200) result.bodySha256 = createHash("sha256").update(body).digest("hex");
      result.findings = inspectRetrieval(probe, response.status, response.headers, body);
      if (probe.kind === "redirect" && !result.findings.length) {
        // Only publish validated public destinations, never arbitrary challenge URLs.
        result.redirectTo = new URL(response.headers.get("location"), probe.url).href;
      }
    } catch {
      // Do not print exception messages: they can contain network/private context.
      result.findings = ["request or representation validation unavailable"];
    }
    results.push(result);
  }
  return {
    scope: "Single identified HTTP client; does not verify crawler identity, edge/origin cause, deployment revision or accepted commercial outcomes.",
    results,
  };
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  const report = await probePublicRetrieval();
  console.log(JSON.stringify(report, null, 2));
  if (report.results.some((result) => result.findings.length)) process.exitCode = 1;
}
