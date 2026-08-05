"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface SubTextItem {
  boldText: string;
  regularText: string;
}

interface AnimatedMarqueeHeroProps {
  tagline: string;
  title: React.ReactNode;
  description: string;
  subTexts: SubTextItem[];
  ctaText: string;
  ctaRoute?: string;
  images: string[];
  className?: string;
  onCtaClick?: () => void;
}

const ActionButton = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
  <motion.button
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    className="mt-8 px-8 py-3 rounded-none border border-zinc-800 bg-white text-black hover:bg-[#3ca2fa] hover:text-white hover:border-[#3ca2fa] font-mono text-xs tracking-widest uppercase font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-[#3ca2fa]/20"
  >
    {children}
    <ArrowRight size={14} />
  </motion.button>
);

export const AnimatedMarqueeHero: React.FC<AnimatedMarqueeHeroProps> = ({
  tagline,
  title,
  description,
  subTexts,
  ctaText,
  images,
  className,
  onCtaClick,
}) => {
  const FADE_IN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } },
  };

  const duplicatedImages = [...images, ...images];

  return (
    <section
      className={cn(
        "relative w-full min-h-screen overflow-hidden bg-[#050505] flex flex-col items-center justify-between text-center pt-28 pb-10 px-6",
        className
      )}
    >
      {/* Background ambient light leaking */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] left-[10%] w-[60%] h-[60%] rounded-full bg-white/[0.02] blur-[130px]" />
      </div>

      <div className="z-10 flex flex-col items-center max-w-4xl w-full my-auto">
        {/* Tagline */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={FADE_IN_ANIMATION_VARIANTS}
          className="mb-6 inline-block rounded-none border border-zinc-800 bg-zinc-950/80 px-4 py-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400 backdrop-blur-sm"
        >
          {tagline}
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
          className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] max-w-3xl"
        >
          {typeof title === 'string' ? (
            title.split(" ").map((word, i) => (
              <motion.span
                key={i}
                variants={FADE_IN_ANIMATION_VARIANTS}
                className="inline-block"
              >
                {word}&nbsp;
              </motion.span>
            ))
          ) : (
            title
          )}
        </motion.h1>

        {/* Description / Main Paragraph */}
        <motion.p
          initial="hidden"
          animate="show"
          variants={FADE_IN_ANIMATION_VARIANTS}
          transition={{ delay: 0.4 }}
          className="mt-8 max-w-2xl text-sm md:text-base text-zinc-400 font-sans leading-relaxed tracking-wide"
        >
          {description}
        </motion.p>

        {/* Spacious, structured grid of subtexts for a professional & clean layout */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={FADE_IN_ANIMATION_VARIANTS}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-12 max-w-3xl w-full text-left pt-8 border-t border-zinc-900"
        >
          {subTexts.map((sub, idx) => (
            <div key={idx} className="flex flex-col space-y-2">
              <span className="text-zinc-200 text-xs font-mono tracking-wider uppercase font-semibold border-l-2 border-zinc-700 pl-3">
                {sub.boldText}
              </span>
              <p className="text-zinc-500 text-xs font-sans leading-relaxed pl-3">
                {sub.regularText}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Call to Action Button */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={FADE_IN_ANIMATION_VARIANTS}
          transition={{ delay: 0.8 }}
        >
          <ActionButton onClick={onCtaClick}>{ctaText}</ActionButton>
        </motion.div>
      </div>

      {/* Animated Image Marquee (positioned cleanly at the bottom without overlapping the text) */}
      <div className="relative w-full h-32 md:h-44 mt-16 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] select-none pointer-events-none">
        <motion.div
          className="flex gap-6 absolute left-0"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            ease: "linear",
            duration: 35,
            repeat: Infinity,
          }}
        >
          {duplicatedImages.map((src, index) => (
            <div
              key={index}
              className="relative aspect-[4/3] h-20 md:h-28 flex-shrink-0 rounded-none overflow-hidden border border-zinc-800"
              style={{
                transform: `rotate(${(index % 2 === 0 ? -1 : 1.5)}deg)`,
              }}
            >
              <img
                src={src}
                alt={`Showcase image ${index + 1}`}
                className="w-full h-full object-cover grayscale opacity-40 hover:grayscale-0 hover:opacity-80 transition-all duration-500"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
