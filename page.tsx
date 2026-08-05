"use client";

import { useState } from "react";
import IntroSequence from "@/components/IntroSequence";
import Hero from "@/components/Hero";
import { CinematicHero } from "@/components/ui/cinematic-hero";
import { ParallaxScrollFeatureSection } from "@/components/ui/parallax-scroll-feature-section";
import { ProcessCarousel } from "@/components/ui/process-carousel";
import { SelectedWorkSection } from "@/components/ui/selected-work-section";
import ScrollMorphHero from "@/components/ui/scroll-morph-hero";
import { TrustedBySection } from "@/components/ui/trusted-by-section";
import HoverFooter from "@/components/ui/hover-footer";
import ParticleBackground from "@/components/ui/particle-background";

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <main className="bg-[#050505] selection:bg-[#ed3c69] selection:text-white overflow-x-hidden relative">
      {/* Ambient floating particle dust — fixed behind all content at z-1 */}
      <ParticleBackground />
      {/* Intro Sequence sits on top and slides away when done */}
      {!introFinished && <IntroSequence onComplete={() => setIntroFinished(true)} />}
      
      {/* Hero component sits underneath and handles its entrance timing */}
      <Hero />

      {/* Cinematic Philosophy Scroll Section (Phase 3) */}
      <div id="about">
        <CinematicHero />
      </div>

      {/* What We Do / Capabilities (Phase 4) */}
      <div id="services">
        <ParallaxScrollFeatureSection />
      </div>

      {/* Process Section (Phase 5) */}
      <div id="products">
        <ProcessCarousel />
      </div>

      {/* Selected Work Section (Phase 6) */}
      <div id="work">
        <SelectedWorkSection />
      </div>

      {/* Interactive Scroll Morph CTA Section */}
      <ScrollMorphHero />

      {/* Trusted By / Pricing Section (Phase 7) */}
      <div id="pricing">
        <TrustedBySection />
      </div>

      {/* Footer / Contact Section */}
      <div id="contact">
        <HoverFooter />
      </div>
    </main>
  );
}
