"use client";
import { cn } from "@/lib/utils";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

const PLACEHOLDER_LOGOS = [
  {
    src: "https://svgl.app/library/nvidia-wordmark-light.svg",
    alt: "Nvidia Logo",
  },
  {
    src: "https://svgl.app/library/supabase_wordmark_light.svg",
    alt: "Supabase Logo",
  },
  {
    src: "https://svgl.app/library/openai_wordmark_light.svg",
    alt: "OpenAI Logo",
  },
  {
    src: "https://svgl.app/library/turso-wordmark-light.svg",
    alt: "Turso Logo",
  },
  {
    src: "https://svgl.app/library/vercel_wordmark.svg",
    alt: "Vercel Logo",
  },
  {
    src: "https://svgl.app/library/github_wordmark_light.svg",
    alt: "GitHub Logo",
  },
  {
    src: "https://svgl.app/library/claude-ai-wordmark-icon_light.svg",
    alt: "Claude AI Logo",
  },
  {
    src: "https://svgl.app/library/clerk-wordmark-light.svg",
    alt: "Clerk Logo",
  },
];

export function TrustedBySection() {
  return (
    <section className="relative w-full bg-[#050505] text-white pt-16 pb-20 md:pt-20 md:pb-28 lg:pt-24 lg:pb-32 overflow-hidden font-sans antialiased">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 mb-16 md:mb-24 flex flex-col items-center text-center">
        <h2 className="text-xs md:text-sm font-bold tracking-[0.4em] uppercase text-neutral-500 mb-8">
          Trusted By
        </h2>
        <h3 className="text-4xl md:text-5xl lg:text-[4.5rem] font-bold tracking-tighter leading-[1.05] text-white mb-8">
          Brands That Trust Our Work
        </h3>
        <p className="text-neutral-400 text-lg md:text-xl font-medium tracking-wide max-w-2xl leading-relaxed">
          Partnering with ambitious brands to create meaningful digital experiences through strategy, design, and technology.
        </p>
      </div>

      <div className="relative mx-auto w-full max-w-[1600px] py-12 md:py-16">
        {/* Top subtle border */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen max-w-[100vw] border-t border-white/5 pointer-events-none" />

        <InfiniteSlider gap={64} reverse duration={50} durationOnHover={120} className="px-4">
          {PLACEHOLDER_LOGOS.map((logo) => (
            <div key={`logo-${logo.alt}`} className="flex items-center justify-center h-16 md:h-20 px-8 transition-opacity duration-500 opacity-40 hover:opacity-100">
              {/* Note: In Next.js using standard <img> is fine for SVGs, but we apply invert/brightness to ensure they fit the dark theme perfectly */}
              <img
                alt={logo.alt}
                className="pointer-events-none select-none h-6 md:h-8 w-auto brightness-0 invert"
                loading="lazy"
                src={logo.src}
              />
            </div>
          ))}
        </InfiniteSlider>

        {/* Edge blurring to match the #050505 background precisely */}
        <ProgressiveBlur
          blurIntensity={1}
          className="pointer-events-none absolute top-0 left-0 h-full w-[100px] md:w-[200px]"
          direction="left"
        />
        <ProgressiveBlur
          blurIntensity={1}
          className="pointer-events-none absolute top-0 right-0 h-full w-[100px] md:w-[200px]"
          direction="right"
        />

        {/* Bottom subtle border */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-screen max-w-[100vw] border-b border-white/5 pointer-events-none" />
      </div>
    </section>
  );
}
