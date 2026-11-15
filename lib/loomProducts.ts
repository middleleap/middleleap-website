/**
 * How the Loom names relate. One method, three ways to use it.
 *
 * Shuttle and Estate live on their own site (loom.middleleap.com) and repo; this
 * file only carries the summary shown on /the-loom. Their copy mirrors what that
 * site states publicly: both run as demos on fictional banks with synthetic data.
 * Do not add customer, production or integration claims here without the founder.
 */
export const loomProductsUrl = "https://loom.middleleap.com/";

export const loomProducts = [
  {
    key: "toolkit",
    role: "Builds it",
    name: "Loom Toolkit",
    audience: "For engineering teams",
    detail:
      "The method installed in your repositories: the Discovery and Delivery harnesses, controls and evidence that govern each change.",
    href: "/ai-dlc",
    linkLabel: "View the Toolkit",
    external: false,
  },
  {
    key: "shuttle",
    role: "Takes it to approval",
    name: "Loom Shuttle",
    audience: "For the product owner and the committee",
    detail:
      "Takes one regulated product from idea to permission to launch, with every fact sourced, claimed or owed and every decision made by a named person.",
    href: loomProductsUrl,
    linkLabel: "See Loom Shuttle",
    external: true,
  },
  {
    key: "estate",
    role: "Shows it stays in control",
    name: "Loom Estate",
    audience: "For technology, compliance and risk",
    detail:
      "Shows what runs in the bank, who owns it and whether it is in control, read from recorded evidence. People decide; Estate never sets a status by itself.",
    href: loomProductsUrl,
    linkLabel: "See Loom Estate",
    external: true,
  },
] as const;

export const loomProductsBoundary =
  "Shuttle and Estate run as demos on fictional banks with synthetic data.";
