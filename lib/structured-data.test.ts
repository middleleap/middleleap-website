import { describe, expect, it } from "vitest";
import { absoluteUrl, breadcrumbList, jsonLdScript, withContext } from "./structured-data";

describe("breadcrumbList", () => {
  it("emits nothing for trails too short to be navigational", () => {
    expect(breadcrumbList([])).toBeNull();
    expect(breadcrumbList([{ label: "Advisory" }])).toBeNull();
  });

  it("numbers positions 1..n in array order and preserves labels verbatim", () => {
    const schema = breadcrumbList([
      { href: "/", label: "Advisory" },
      { href: "/ventures", label: "Ventures" },
      { label: "Parqo" },
    ]);

    expect(schema?.itemListElement.map((item) => item.position)).toEqual([1, 2, 3]);
    expect(schema?.itemListElement.map((item) => item.name)).toEqual([
      "Advisory",
      "Ventures",
      "Parqo",
    ]);
  });

  it("omits item on the unlinked current-page crumb", () => {
    const schema = breadcrumbList([
      { href: "/", label: "Advisory" },
      { label: "Privacy" },
    ]);
    const last = schema!.itemListElement[schema!.itemListElement.length - 1];

    expect(last).not.toHaveProperty("item");
    expect(schema!.itemListElement[0].item).toBe("https://www.middleleap.com/");
  });
});

describe("absoluteUrl", () => {
  it("resolves paths and fragments against the canonical origin", () => {
    expect(absoluteUrl("/")).toBe("https://www.middleleap.com/");
    expect(absoluteUrl("/#method")).toBe("https://www.middleleap.com/#method");
    expect(absoluteUrl("/ventures#portfolio")).toBe(
      "https://www.middleleap.com/ventures#portfolio",
    );
  });

  it("passes through URLs that are already absolute", () => {
    expect(absoluteUrl("https://example.com/x")).toBe("https://example.com/x");
  });
});

describe("jsonLdScript", () => {
  it("escapes < so a value can never close the script tag", () => {
    expect(jsonLdScript({ a: "</script>" })).not.toContain("</");
  });

  it("stamps the schema.org context", () => {
    expect(withContext({ "@type": "Thing" })["@context"]).toBe("https://schema.org");
  });
});
