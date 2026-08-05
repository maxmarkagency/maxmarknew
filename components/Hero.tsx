"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  // Easing function for premium cinematic feel
  const customEase: [number, number, number, number] = [0.76, 0, 0.24, 1];
  
  // Base delay synced with IntroSequence (3.2s before it starts sliding up)
  const baseDelay = 3.2;

  return (
    <div className="w-screen h-screen relative bg-[#050505] text-white overflow-hidden">
      
      {/* Full-Bleed 100vw/100vh Canvas Area */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: customEase, delay: baseDelay + 0.2 }}
        className="absolute inset-0 w-full h-full"
      >
        {/* High-end Abstract Dark Placeholder Image */}
        <div 
          className="absolute inset-0 w-full h-full bg-zinc-900 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')",
          }}
        />
        {/* Subtle Dark Gradient Overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
      </motion.div>

      {/* Floating Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: customEase, delay: baseDelay + 0.8 }}
        className="absolute top-0 left-0 w-full px-8 md:px-16 py-10 flex justify-between items-center z-40"
      >
        <div className="font-bold text-2xl tracking-tighter cursor-pointer">
          MAXMARK
        </div>
        <Link href="/menu" className="text-sm font-medium tracking-widest uppercase cursor-pointer hover:opacity-70 transition-opacity">
          Menu
        </Link>
      </motion.nav>

      {/* Floating Supporting Typography at the bottom */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: customEase, delay: baseDelay + 1 }}
        className="absolute bottom-10 left-0 w-full flex flex-col md:flex-row justify-between items-start md:items-end px-8 md:px-16 z-40"
      >
        <div className="text-white/80 text-[10px] sm:text-xs md:text-sm tracking-[0.3em] md:tracking-[0.4em] uppercase font-medium">
          Brand <span className="mx-2 md:mx-4 text-white/30">|</span> 
          Digital <span className="mx-2 md:mx-4 text-white/30">|</span> 
          Campaigns <span className="mx-2 md:mx-4 text-white/30">|</span> 
          Motion <span className="mx-2 md:mx-4 text-white/30">|</span> 
          AI <span className="mx-2 md:mx-4 text-white/30">|</span> 
          Growth
        </div>

        <div className="mt-6 md:mt-0 flex items-center gap-4 text-white hover:opacity-70 cursor-pointer transition-opacity">
          <span className="text-xs md:text-sm tracking-widest uppercase font-medium">Explore Showcase</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
