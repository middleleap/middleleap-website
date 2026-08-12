/**
 * Practice copy shared by the homepage `#experience` section and `/practice`.
 *
 * Every string here already appears on the site; nothing asserts a new fact about
 * the firm, its founder or any client. Extracting it means the two surfaces cannot
 * drift, and it keeps the one disclosure rule in force: prior-role work names
 * "a leading UAE bank" and never the institution (see app/disclosure.test.ts).
 */

export const practicePrinciples = [
  {
    number: "01",
    title: "Senior accountability",
    detail:
      "A senior lead stays accountable from mandate framing through the decisions, operating model and route to execution.",
  },
  {
    number: "02",
    title: "Specialists around the problem",
    detail:
      "Regulation, strategy, product, technology, ecosystem and delivery expertise is brought in where the mandate requires it.",
  },
  {
    number: "03",
    title: "Client ownership by design",
    detail:
      "Client leaders remain part of the working system so decisions, institutional context and delivery capability stay inside the organization.",
  },
] as const;

export const practiceEvidence = [
  {
    label: "MENA Open Banking & Open Finance",
    detail:
      "Built and expanded an Open Banking platform across MENA, then led a dual LFI/TPP programme with a 15-person core and 100+ contributors that helped a leading UAE bank achieve first-bank certification under the UAE framework and deliver the country's first live transactions with a licensed TPP.",
  },
  {
    label: "Business banking ecosystems",
    detail:
      "Led the build-out of Danske Bank's District platform and marketplace across the Nordics and UK, including the migration of 250,000 SMEs, corporates and institutions and the development of API-based partner channels.",
  },
  {
    label: "Enterprise transformation",
    detail:
      "Led a 70+ person digital delivery organization at TDC, with a DKK 200m+ annual budget, through BSS/OSS modernisation and an API-first Telco-as-a-Service transformation within a 140-year-old enterprise, including CI/CD and DevOps operating-model change.",
  },
  {
    label: "Product to boardroom",
    detail:
      "Experience spanning software engineering and architecture through product, commercial and executive transformation leadership.",
  },
] as const;

/**
 * Load-bearing disclaimer. The quantified items above are prior-role work, not
 * MiddleLeap engagements. Render this wherever `practiceEvidence` is rendered.
 */
export const experienceProvenanceNote =
  "The experience below was built in prior executive roles and is brought into MiddleLeap's advisory practice. It is distinguished from work contracted directly by MiddleLeap.";

export const practiceFacts = {
  foundedYear: "2021",
  base: "Dubai, United Arab Emirates",
  primaryMarket: "Middle East and North Africa",
  contactEmail: "contact@middleleap.com",
  principal: "Michael Ryberg Hartmann",
  principalRole: "Founder and Principal Adviser",
  linkedIn: "https://www.linkedin.com/in/michael-ryberg-hartmann",
  model: "Senior-led, networked advisory practice rather than a fixed consulting bench",
} as const;

export const founderBio = [
  "Michael founded MiddleLeap after more than 20 years across banking, fintech, telecommunications and SaaS, including senior roles at a leading UAE bank, Fintech Galaxy, TDC Group, Danske Bank and Planday.",
  "He leads selected mandates and assembles the senior specialists required around each client and problem.",
] as const;

/** Organisation names only. The repo holds no dates or titles for these roles. */
export const careerContext = [
  "A leading UAE bank",
  "Fintech Galaxy",
  "TDC Group",
  "Danske Bank",
  "Planday",
] as const;

export const practiceExpertise = [
  "Open Finance",
  "Platform strategy",
  "AI-native operating models",
  "Product and technology strategy",
  "Transformation delivery",
] as const;
