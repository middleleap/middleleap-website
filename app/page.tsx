import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Shift from "@/components/Shift";
import WhatThisMeans from "@/components/WhatThisMeans";
import Divider from "@/components/Divider";
import InlineCTA from "@/components/InlineCTA";

// Lazy load non-critical client components
const CustomCursor = dynamic(() => import("@/components/CustomCursor"));
const ParticleNetwork = dynamic(() => import("@/components/ParticleNetwork"));
const ScrollReveal = dynamic(() => import("@/components/ScrollReveal"));
const StatusBar = dynamic(() => import("@/components/StatusBar"));

// Lazy load below-the-fold sections to reduce initial JS
const Mechanics = dynamic(() => import("@/components/Mechanics"));
const Governance = dynamic(() => import("@/components/Governance"));
const Roadmap = dynamic(() => import("@/components/Roadmap"));
const Results = dynamic(() => import("@/components/Results"));
const Built = dynamic(() => import("@/components/Built"));
const Lab = dynamic(() => import("@/components/Lab"));
const Toolkit = dynamic(() => import("@/components/Toolkit"));
const Signal = dynamic(() => import("@/components/Signal"));
const CTA = dynamic(() => import("@/components/CTA"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <>
      <CustomCursor />
      <ParticleNetwork />
      <Nav />
      <Hero />
      <Problem />
      <Divider />
      <Shift />
      <Divider />
      <WhatThisMeans />
      <InlineCTA
        label="// Find your stage"
        text="Take the 2-minute self-assessment to identify where you are on the maturity model — and what to do next."
        href="#roadmap"
        buttonText="Start the assessment"
      />
      <Divider />
      <Mechanics />
      <Divider />
      <Governance />
      <Divider />
      <Roadmap />
      <Divider />
      <Results />
      <InlineCTA
        label="// Ready to move?"
        text="Schedule a 30-minute diagnostic session. We'll map your current maturity stage and identify your highest-leverage next step."
        href="#cta"
        buttonText="Schedule a diagnostic"
      />
      <Divider />
      <Built />
      <Divider />
      <Lab />
      <Divider />
      <Toolkit />
      <Divider />
      <Signal />
      <Divider />
      <CTA />
      <Footer />
      <StatusBar />
      <ScrollReveal />
    </>
  );
}
