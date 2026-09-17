import { siteOrigin } from "./seo";

/**
 * Founder record shared by `/founder`, the homepage founder block, the footer and
 * the machine-readable company record (`public/llms.txt`, Person JSON-LD).
 *
 * Every string here is sourced from the founder's CV and public LinkedIn profile.
 * Two boundaries are deliberate and guarded by app/disclosure.test.ts: no claim of a
 * personal seat on the national platform operator's governing body, and prior-role
 * work is always dated so it cannot be read as a MiddleLeap engagement.
 */

export const founder = {
  name: "Michael Ryberg Hartmann",
  alternateName: "Michael Hartmann",
  jobTitle: "Founder and Principal Adviser",
  base: "Dubai, United Arab Emirates",
  path: "/founder",
  portrait: {
    onInk: "/founder/michael-ryberg-hartmann-on-ink.webp",
    onLight: "/founder/michael-ryberg-hartmann-on-light.webp",
    schemaImage: "/founder/michael-ryberg-hartmann-on-light.jpg",
    alt: "Michael Ryberg Hartmann, founder of MiddleLeap",
  },
  links: {
    linkedin: "https://www.linkedin.com/in/michael-ryberg-hartmann",
    middleleapGithub: "https://github.com/middleleap",
    openFinanceOsGithub: "https://github.com/openfinance-os",
  },
} as const;

/** ~30 words. Footer, speaker bios, social. */
export const founderBioShort =
  "Michael Ryberg Hartmann is the founder of MiddleLeap, a Dubai-based advisory practice for regulated platform businesses. He previously led Open Finance at ADCB Group, taking it to the first bank certification under the UAE Open Finance framework.";

/** ~70 words. Homepage founder block. */
export const founderBioMedium =
  "He led Open Finance for ADCB Group, taking it to the first bank certification under the UAE Open Finance framework and the country's first live transactions with a licensed TPP. Before that he scaled Fintech Galaxy across MENA and spent fifteen years building platforms at Danske Bank, TDC Group and Danish scale-ups. He takes every mandate from strategy through delivery, and he still writes code.";

/** Founder page. Three paragraphs. */
export const founderBioLong = [
  "Michael Ryberg Hartmann founded MiddleLeap to help regulated platform businesses get through major operating-model shifts. Over twenty years he has worked through three of them: digital transformation, platform and ecosystem business models, and now AI-native operating models.",
  "Most recently he led Open Finance for ADCB Group. He took the bank to the first certification under the UAE Open Finance framework and delivered the country's first live Open Finance transactions with a licensed third-party provider, directing the bank's dual LFI/TPP programme. Before that he scaled Fintech Galaxy into Bahrain, Saudi Arabia and Jordan. In Denmark he built Danske Bank's District platform as open banking arrived in Europe and led the delivery organisation behind the split of TDC Group into a broadband-as-a-service business and its consumer brands.",
  "He covers both product and technology, and he still writes code. AI has closed the gap between deciding what to build and building it, so MiddleLeap handles both with one accountable lead. He is based in Dubai.",
] as const;

/** Numbers over adjectives. All four are prior-role facts, dated in `founderCareer`. */
export const founderCredentials = [
  { figure: "20+", label: "years in platform transformation" },
  { figure: "1st", label: "UAE bank certified under Open Finance" },
  { figure: "250,000", label: "business customers migrated to Danske Bank District" },
  { figure: "3", label: "MENA markets entered with Fintech Galaxy" },
] as const;

export const founderCareer = [
  {
    years: "2021 – now",
    title: "Founder and Principal Adviser, MiddleLeap",
    detail: "Dubai · AI-native operating models, platform strategy and transformation delivery for banks, telcos, fintechs and platform businesses.",
  },
  {
    years: "2024 – 2026",
    title: "Head of Open Finance, ADCB Group",
    detail: "Abu Dhabi · Dual LFI/TPP programme · BIS Innovation Hub Project Aperta · CBUAE eKYC initiative · Embedded Finance and BaaS strategy.",
  },
  {
    years: "2023 – now",
    title: "Associate Partner, TFPA",
    detail: "The Fintech and Payments Advisory Network, UK · Open Finance strategy, regulatory readiness and MENA market entry.",
  },
  {
    years: "2022 – 2023",
    title: "Chief Technology Officer and Chief Business Officer, Fintech Galaxy",
    detail: "Dubai · thefinx.io open banking platform · Market entry into Bahrain, Saudi Arabia and Jordan · Central Bank of Bahrain TPP licence.",
  },
  {
    years: "2019 – 2021",
    title: "Head of Digital Delivery and Transformation, TDC Group",
    detail: "Copenhagen · Top-25 leadership team · 70+ person delivery organisation · API-first Telco-as-a-Service platform for TDC NET.",
  },
  {
    years: "2016 – 2019",
    title: "Head of Digital Channels, Danske Bank",
    detail: "Copenhagen · Post-PSD2 District business-banking platform · 250,000 SMEs, corporates and institutions migrated · Open Banking Developer Portal.",
  },
  {
    years: "2005 – 2016",
    title: "Earlier career, Copenhagen",
    detail: "VP Engineering, Planday (acquired by Xero) · VP Messaging, Unwire · Formpipe · Telmore.",
  },
] as const;

export const founderBeyond = [
  {
    label: "Education",
    detail: "MSc Information Technology, IT University of Copenhagen, 2005 · BComp (Hons) Computer Science, Deakin University, 2003 · MIT Sloan Executive Education, Platform Strategies for Success, 2018.",
  },
  {
    label: "Boards",
    detail: "Board Member, VL94, The Danish Management Society, since 2022 · Core Committee, MENA Fintech Association Open Finance Working Group.",
  },
  {
    label: "Speaking",
    detail: "GITEX and other conferences on AI, APIs and platforms · CFTE expert trainer for a sovereign investor's AI Academy · Finalist, C:\\>DIR Agentic Regulator Hackathon 2026 (36 of 942 applicants) with Ozone and Nebras.",
  },
] as const;

/**
 * The one Person node for the founder. Rendered on the homepage graph and as the
 * `/founder` ProfilePage main entity. One `@id` everywhere: two Person nodes for the
 * same human would split the entity search engines resolve.
 */
export const founderPersonId = `${siteOrigin}/#michael-ryberg-hartmann`;

export const founderPerson = {
  "@type": "Person",
  "@id": founderPersonId,
  name: founder.name,
  alternateName: founder.alternateName,
  jobTitle: founder.jobTitle,
  description: founderBioShort,
  url: `${siteOrigin}${founder.path}`,
  image: `${siteOrigin}${founder.portrait.schemaImage}`,
  sameAs: [founder.links.linkedin],
  worksFor: { "@id": `${siteOrigin}/#organization` },
  address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
  alumniOf: [
    { "@type": "Organization", name: "Abu Dhabi Commercial Bank" },
    { "@type": "Organization", name: "Fintech Galaxy" },
    { "@type": "Organization", name: "TDC Group" },
    { "@type": "Organization", name: "Danske Bank" },
    { "@type": "CollegeOrUniversity", name: "IT University of Copenhagen" },
    { "@type": "CollegeOrUniversity", name: "Deakin University" },
  ],
  knowsAbout: [
    "Open Finance",
    "Open Banking",
    "Platform strategy",
    "Embedded finance",
    "AI-native operating models",
    "Product and technology strategy",
    "Transformation delivery",
  ],
} as const;
