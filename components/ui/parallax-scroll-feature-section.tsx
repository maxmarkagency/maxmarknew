"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface SectionData {
  id: number;
  title: string;
  description: string;
  bullets: string[];
  imageUrl: string;
  reverse: boolean;
}

const sections: SectionData[] = [
  {
    id: 1,
    title: "Brand Strategy & Identity",
    description: "Build a brand that is clear, distinctive, and built for growth.",
    bullets: [
      "Brand Strategy & Positioning",
      "Brand Audits",
      "Naming & Brand Architecture",
      "Logo Design",
      "Visual Identity Systems",
      "Typography & Color Systems",
      "Brand Guidelines",
      "Rebranding & Brand Evolution"
    ],
    imageUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2560&auto=format&fit=crop",
    reverse: false
  },
  {
    id: 2,
    title: "Web & Digital Infrastructure",
    description: "Create digital experiences that look exceptional and perform at scale.",
    bullets: [
      "Website Design & Development",
      "UX/UI Design",
      "Product & Platform Design",
      "Design Systems",
      "Landing Pages",
      "Dashboards & Internal Tools",
      "Digital Interfaces",
      "Scalable Web Experiences"
    ],
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2560&auto=format&fit=crop",
    reverse: true
  },
  {
    id: 3,
    title: "Creative & Growth Systems",
    description: "Turn attention into engagement with creative built for modern platforms.",
    bullets: [
      "Content Design",
      "Social Media Systems",
      "Motion Graphics",
      "AI Animation",
      "Video Production",
      "Creative Campaigns",
      "Advertising Design",
      "AI-Powered Creative Production"
    ],
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2560&auto=format&fit=crop",
    reverse: false
  }
];

function FeatureSection({ section }: { section: SectionData }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  // Animate opacity based on scroll
  const opacityContent = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  // Animate clipping path (reveal image from right to left)
  const clipProgress = useTransform(scrollYProgress, [0, 0.5], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  // Slight upward parallax for the text content
  const translateContent = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <div 
      ref={ref} 
      className={`flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 w-full ${section.reverse ? 'lg:flex-row-reverse' : ''}`}
    >
      <motion.div 
        style={{ y: translateContent }} 
        className="w-full lg:w-[45%] flex flex-col justify-center order-2 lg:order-none py-4"
      >
        <span className="text-xs font-mono text-zinc-500 tracking-widest mb-3 block uppercase">
          0{section.id} // CAPABILITY
        </span>
        <h3 className="text-3xl md:text-4xl lg:text-[2.75rem] font-medium tracking-tight leading-[1.2] mb-5 text-white">
          {section.title}
        </h3>
        <motion.p 
          style={{ opacity: opacityContent }} 
          className="text-neutral-400 text-base md:text-lg leading-relaxed max-w-xl mb-8 font-normal"
        >
          {section.description}
        </motion.p>
        
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 w-full border-t border-zinc-800/80 pt-6">
          {section.bullets.map((bullet, i) => (
            <li key={i} className="flex items-center text-neutral-400 text-xs md:text-sm font-normal tracking-wide hover:text-white transition-colors duration-200">
              <span className="text-[10px] font-mono text-zinc-600 mr-3">{(i + 1).toString().padStart(2, '0')}</span>
              {bullet}
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div 
        style={{ 
          opacity: opacityContent,
          clipPath: clipProgress,
        }}
        className="w-full lg:w-[50%] relative aspect-[16/10] rounded-[1.5rem] overflow-hidden shadow-2xl order-1 lg:order-none bg-zinc-950 border border-zinc-800/30"
      >
        <Image 
          src={section.imageUrl} 
          alt={section.title}
          fill
          priority
          className="object-cover transition-transform duration-[20s] hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent mix-blend-overlay" />
        <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.6)] pointer-events-none" />
      </motion.div>
    </div>
  );
}

export function ParallaxScrollFeatureSection() {
  return (
    <section className="relative bg-[#000000] text-white pt-16 pb-20 md:pt-24 md:pb-28 lg:pt-32 lg:pb-36 overflow-hidden w-full font-sans antialiased">
      {/* Intro to the section */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 mb-28 md:mb-36 lg:mb-44 flex flex-col lg:flex-row lg:items-start justify-between gap-8 lg:gap-16">
        <div className="lg:w-1/4 pt-2">
          <h2 className="text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-zinc-500 flex items-center gap-4">
            <span className="w-8 h-[1px] bg-zinc-800 inline-block"></span>
            What We Do
          </h2>
        </div>
        <div className="lg:w-3/4">
          <p className="text-2xl md:text-3xl lg:text-4xl xl:text-[2.75rem] font-normal tracking-tight leading-[1.4] text-white max-w-4xl">
            We build the systems that help brands launch, grow, and scale with confidence <span className="text-zinc-700">—</span> <span className="text-neutral-400">from strategy and identity to digital experiences and creative execution.</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto gap-24 md:gap-36 lg:gap-48">
        {sections.map((section) => (
          <FeatureSection key={section.id} section={section} />
        ))}
      </div>
    </section>
  );
}
