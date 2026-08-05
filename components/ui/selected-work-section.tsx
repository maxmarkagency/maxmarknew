"use client";

import React from "react";
import { FocusRail, type FocusRailItem } from "@/components/ui/focus-rail";

const SELECTED_WORK_ITEMS: FocusRailItem[] = [
  {
    id: 1,
    title: "Climate Governance Initiative",
    description: "Helping an international organization communicate climate leadership through a modern digital experience that balances clarity, trust, and innovation.",
    meta: "Brand Identity • Website • Motion",
    imageSrc: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2560&auto=format&fit=crop", // Clean laptop/desk mockup
    href: "#climate",
  },
  {
    id: 2,
    title: "MAXMARK",
    description: "Building a premium digital presence for a modern creative agency focused on strategy, design, and technology.",
    meta: "Brand Strategy • UI/UX • Development",
    imageSrc: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop", // Branding presentation
    href: "#maxmark",
  },
  {
    id: 3,
    title: "Club Abraham International",
    description: "Crafting a timeless visual identity and digital platform that reflects heritage, leadership, and global community.",
    meta: "Brand Identity • Website • Motion",
    imageSrc: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2560&auto=format&fit=crop", // Editorial / Identity
    href: "#club-abraham",
  }
];

export function SelectedWorkSection() {
  return (
    <section className="relative bg-[#050505] text-white pt-16 pb-24 md:pt-20 md:pb-32 overflow-hidden w-full font-sans antialiased">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 mb-16 md:mb-24">
        <h2 className="text-xs md:text-sm font-bold tracking-[0.4em] uppercase text-neutral-500 mb-8">
          Selected Work
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <h3 className="text-4xl md:text-5xl lg:text-[4.5rem] font-bold tracking-tighter leading-[1.05] text-white">
            Creating Digital Experiences That Inspire
          </h3>
          <div className="flex flex-col justify-end">
            <p className="text-neutral-400 text-lg md:text-xl font-medium tracking-wide max-w-lg leading-relaxed lg:pb-4">
              Every project represents a collaboration driven by strategy, creativity, and craftsmanship. Explore some of our featured work and discover how thoughtful design transforms ambitious ideas into meaningful digital experiences.
            </p>
          </div>
        </div>
      </div>

      <FocusRail 
        items={SELECTED_WORK_ITEMS} 
        autoPlay={false} 
        loop={true} 
      />
    </section>
  );
}
