import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Shift from "@/components/Shift";
import WhatThisMeans from "@/components/WhatThisMeans";
import Mechanics from "@/components/Mechanics";
import Governance from "@/components/Governance";
import Roadmap from "@/components/Roadmap";
import Results from "@/components/Results";
import Built from "@/components/Built";
import Lab from "@/components/Lab";
import Toolkit from "@/components/Toolkit";
import Signal from "@/components/Signal";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import StatusBar from "@/components/StatusBar";
import Divider from "@/components/Divider";
import CustomCursor from "@/components/CustomCursor";
import ParticleNetwork from "@/components/ParticleNetwork";
import ScrollReveal from "@/components/ScrollReveal";

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
