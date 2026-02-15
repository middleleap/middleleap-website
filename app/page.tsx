import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Shift from "@/components/Shift";
import WhatThisMeans from "@/components/WhatThisMeans";
import Divider from "@/components/Divider";
import CustomCursor from "@/components/CustomCursor";
import ParticleNetwork from "@/components/ParticleNetwork";
import ScrollReveal from "@/components/ScrollReveal";

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
const StatusBar = dynamic(() => import("@/components/StatusBar"));

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
      <Divider />
      <Mechanics />
      <Divider />
      <Governance />
      <Divider />
      <Roadmap />
      <Divider />
      <Results />
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
