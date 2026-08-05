"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AnimatedMarqueeHero } from "@/components/ui/hero-3";
import StickyScrollGallery from "@/components/ui/sticky-scroll";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import {
  ContainerAnimated,
  ContainerStagger,
  GalleryGrid,
  GalleryGridCell,
} from "@/components/ui/cta-section-with-gallery";
import { AuroraBackground } from "@/components/ui/aurora-background";

const ABOUT_IMAGES = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1582298538104-fc2c0e539d73?q=80&w=600&auto=format&fit=crop",
];

const GALLERY_GRID_IMAGES = [
  "https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1733680958774-39a0e8a64a54?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1548783307-f63adc3f200b?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1703622377707-29bc9409aaf2?q=80&w=600&auto=format&fit=crop",
];

const subTexts = [
  {
    boldText: "Creative Philosophy",
    regularText:
      "We believe design is not about decoration. It's about clarity, structure, and long-term impact.",
  },
  {
    boldText: "Strategic Execution",
    regularText:
      "Everything we do is built to help brands move with purpose, perform across touchpoints, and grow without losing direction.",
  },
];

export default function AboutPage() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-screen bg-[#050505] text-white"
    >
      {/* Fixed top nav */}
      <div className="fixed top-0 left-0 w-full px-8 md:px-16 py-10 flex justify-between items-center z-50 pointer-events-auto bg-gradient-to-b from-[#050505]/90 to-transparent">
        <button
          onClick={() => router.push("/")}
          className="font-bold text-2xl tracking-tighter text-white hover:text-[#3ca2fa] transition-colors"
        >
          MAXMARK
        </button>
        <div className="flex gap-4">
          <Button
            variant="outline"
            size="sm"
            className="rounded-none border-zinc-800 bg-zinc-950 font-mono text-[10px] tracking-widest text-zinc-400 hover:text-white hover:border-zinc-500 uppercase h-9 px-4"
            onClick={() => router.push("/menu")}
          >
            Menu
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-zinc-800 bg-zinc-950 text-white hover:bg-zinc-900 hover:text-[#3ca2fa] hover:border-[#3ca2fa] h-9 w-9"
            onClick={() => router.push("/")}
          >
            <X size={18} />
          </Button>
        </div>
      </div>

      {/* Section 1 — Hero */}
      <AnimatedMarqueeHero
        tagline="01. about us"
        title="We build systems that help brands lead."
        description="Maxmark is a creative agency focused on building brand, digital, and creative systems that work together — clearly, consistently, and at scale."
        subTexts={subTexts}
        ctaText="let's talk"
        ctaRoute="/#contact"
        onCtaClick={() => router.push("/#contact")}
        images={ABOUT_IMAGES}
      />

      {/* Section 2 — Sticky Scroll Gallery */}
      <StickyScrollGallery />

      {/* Section 3 — What We Do (CTA Section With Gallery layout) */}
      <section className="relative w-full bg-[#050505] border-t border-zinc-900 z-10 overflow-hidden">
        {/* Ambient background light leaking */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] left-[10%] w-[50%] h-[55%] rounded-full bg-white/[0.015] blur-[120px]" />
        </div>

        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-8 py-24 md:grid-cols-2 md:py-32 relative z-10">
          <ContainerStagger>
            {/* Tagline */}
            <ContainerAnimated className="mb-6 inline-block">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-500 border border-zinc-900 bg-zinc-950/80 px-4 py-1.5 backdrop-blur-sm">
                02. What We Do
              </span>
            </ContainerAnimated>

            {/* Main title */}
            <ContainerAnimated className="text-3xl sm:text-4xl md:text-[2.5rem] font-bold tracking-tight text-white leading-[1.2]">
              We don’t deliver isolated outputs. We build connected systems that support brands end-to-end.
            </ContainerAnimated>

            {/* Description */}
            <ContainerAnimated className="my-6 text-sm sm:text-base text-zinc-400 font-sans leading-relaxed tracking-wide font-light">
              Our work spans four connected areas — from defining brand strategy and identity, to building scalable digital platforms, creating systems for content and growth, and activating brands across digital and real-world touchpoints. Each system supports the next, ensuring nothing exists in isolation.
            </ContainerAnimated>

            {/* Interactive Stats Grid */}
            <ContainerAnimated className="grid grid-cols-2 gap-8 mt-10 pt-8 border-t border-zinc-900/60 w-full">
              {/* Stat 1 */}
              <div className="flex flex-col group cursor-default">
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-white font-mono leading-none group-hover:text-[#3ca2fa] transition-colors duration-300">
                  250+
                </div>
                <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase text-zinc-500 mt-3 leading-normal max-w-[180px]">
                  projects success rate 99%
                </span>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col group cursor-default">
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-white font-mono leading-none group-hover:text-[#3ca2fa] transition-colors duration-300">
                  30+
                </div>
                <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase text-zinc-500 mt-3 leading-normal max-w-[180px]">
                  years of experience
                </span>
              </div>
            </ContainerAnimated>
          </ContainerStagger>

          {/* Right Column — Offset Image Grid */}
          <GalleryGrid>
            {GALLERY_GRID_IMAGES.map((imageUrl, index) => (
              <GalleryGridCell index={index} key={index} className="group">
                <img
                  className="size-full object-cover object-center grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-in-out"
                  width="100%"
                  height="100%"
                  src={imageUrl}
                  alt={`Maxmark portfolio showcase ${index + 1}`}
                />
              </GalleryGridCell>
            ))}
          </GalleryGrid>
        </div>
      </section>

      {/* Section 4 — Aurora Background Call to Action */}
      <section className="relative w-full border-t border-zinc-900 z-10">
        <AuroraBackground>
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.2,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="relative flex flex-col gap-6 items-center justify-center px-6 text-center"
          >
            {/* Main Heading: Start your experience with us */}
            <div className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight leading-none">
              Start your experience with us
            </div>
            
            {/* Sub Heading: Let’s get in touch */}
            <div className="font-light text-base sm:text-lg md:text-2xl text-zinc-400 max-w-xl">
              Let’s get in touch
            </div>

            {/* Branded CTA button */}
            <button
              onClick={() => router.push("/#contact")}
              className="mt-4 px-8 py-3 rounded-none border border-zinc-800 bg-white text-black hover:bg-[#3ca2fa] hover:text-white hover:border-[#3ca2fa] font-mono text-xs tracking-widest uppercase font-semibold transition-all duration-300 shadow-lg hover:shadow-[#3ca2fa]/20"
            >
              contact us
            </button>
          </motion.div>
        </AuroraBackground>
      </section>
    </motion.div>
  );
}
