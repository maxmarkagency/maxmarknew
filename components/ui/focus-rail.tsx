"use client";

import * as React from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Simple class merger
const cn = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(" ");

export type FocusRailItem = {
  id: string | number;
  title: string;
  description?: string;
  imageSrc: string;
  href?: string;
  meta?: string;
};

interface FocusRailProps {
  items: FocusRailItem[];
  initialIndex?: number;
  loop?: boolean;
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

/**
 * Helper to wrap indices (e.g., -1 becomes length-1)
 */
function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

/**
 * Physics Configuration
 * Heavy, luxurious spring for the cinematic cards
 */
const BASE_SPRING = {
  type: "spring" as const,
  stiffness: 200,
  damping: 25,
  mass: 1.2,
};

/**
 * Scale Spring
 * Slightly bouncier but still heavy for the active center card "snap"
 */
const TAP_SPRING = {
  type: "spring" as const,
  stiffness: 250,
  damping: 20,
  mass: 1.2,
};

export function FocusRail({
  items,
  initialIndex = 0,
  loop = true,
  autoPlay = false,
  interval = 4000,
  className,
}: FocusRailProps) {
  const [active, setActive] = React.useState(initialIndex);
  const [isHovering, setIsHovering] = React.useState(false);
  const lastWheelTime = React.useRef<number>(0);

  const count = items.length;
  const activeIndex = wrap(0, count, active);
  const activeItem = items[activeIndex];

  // --- NAVIGATION HANDLERS ---
  const handlePrev = React.useCallback(() => {
    if (!loop && active === 0) return;
    setActive((p) => p - 1);
  }, [loop, active]);

  const handleNext = React.useCallback(() => {
    if (!loop && active === count - 1) return;
    setActive((p) => p + 1);
  }, [loop, active, count]);

  // --- MOUSE WHEEL / TRACKPAD LOGIC ---
  const onWheel = React.useCallback(
    (e: React.WheelEvent) => {
      const now = Date.now();
      // Debounce: prevent rapid firing from inertia scrolling (400ms lockout)
      if (now - lastWheelTime.current < 400) return;

      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      const delta = isHorizontal ? e.deltaX : e.deltaY;

      // Threshold to avoid accidental micro-scrolls
      if (Math.abs(delta) > 20) {
        if (delta > 0) {
          handleNext();
        } else {
          handlePrev();
        }
        lastWheelTime.current = now;
      }
    },
    [handleNext, handlePrev]
  );

  // Autoplay logic
  React.useEffect(() => {
    if (!autoPlay || isHovering) return;
    const timer = setInterval(() => handleNext(), interval);
    return () => clearInterval(timer);
  }, [autoPlay, isHovering, handleNext, interval]);

  // Keyboard navigation
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  };

  // --- SWIPE / DRAG LOGIC ---
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const onDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      handleNext();
    } else if (swipe > swipeConfidenceThreshold) {
      handlePrev();
    }
  };

  const visibleIndices = [-2, -1, 0, 1, 2];

  return (
    <div
      className={cn(
        "group relative flex min-h-[90vh] w-full flex-col overflow-hidden bg-[#050505] text-white outline-none select-none overflow-x-hidden pt-12 pb-24",
        className
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onWheel={onWheel}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`bg-${activeItem.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }} // Very subtle for deep charcoal theme
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={activeItem.imageSrc}
              alt=""
              fill
              className="object-cover blur-3xl saturate-150"
            />
            {/* Heavy gradient to ensure #050505 blending */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-[#050505]/50" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Stage */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-4 md:px-8">
        {/* DRAGGABLE RAIL CONTAINER */}
        <motion.div
          className="relative mx-auto flex h-[32vh] min-h-[260px] md:h-[50vh] md:min-h-[400px] w-full items-center justify-center perspective-[1500px] cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={onDragEnd}
        >
          {visibleIndices.map((offset) => {
            const absIndex = active + offset;
            const index = wrap(0, count, absIndex);
            const item = items[index];

            if (!loop && (absIndex < 0 || absIndex >= count)) return null;

            const isCenter = offset === 0;
            const dist = Math.abs(offset);

            // Responsive dynamic transforms
            const xOffset = `${offset * 105}%`; // 105% of its own width to space them out
            const zOffset = -dist * 250; // Deep Z-axis pushing
            const scale = isCenter ? 1 : 0.85;
            const rotateY = offset * -12; // Subtle rotation

            const opacity = isCenter ? 1 : Math.max(0, 1 - dist * 0.6);
            const blur = isCenter ? 0 : dist * 8;
            const brightness = isCenter ? 1 : 0.3;

            return (
              <motion.div
                key={absIndex}
                className={cn(
                  "absolute aspect-[4/3] md:aspect-[16/9] w-[70vw] max-w-[850px] rounded-[1.5rem] md:rounded-[2rem] border border-white/5 bg-neutral-900 shadow-2xl transition-shadow duration-500 overflow-hidden group/card",
                  isCenter ? "z-20 shadow-[0_0_80px_rgba(0,0,0,0.8)]" : "z-10"
                )}
                initial={false}
                animate={{
                  x: xOffset,
                  z: zOffset,
                  scale: scale,
                  rotateY: rotateY,
                  opacity: opacity,
                  filter: `blur(${blur}px) brightness(${brightness})`,
                }}
                transition={{
                  default: BASE_SPRING,
                  scale: TAP_SPRING,
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
                onClick={() => {
                  if (offset !== 0) setActive((p) => p + offset);
                }}
              >
                <Image
                  src={item.imageSrc}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 85vw, 1100px"
                  className="object-cover pointer-events-none transition-transform duration-[10s] ease-out group-hover/card:scale-105"
                  priority={isCenter}
                />

                {/* Lighting layers */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-black/10 pointer-events-none mix-blend-multiply" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Editorial Info & Controls */}
        <div className="mx-auto mt-16 md:mt-24 flex w-full max-w-[1100px] flex-col justify-between gap-12 lg:flex-row pointer-events-auto">
          {/* Project Details */}
          <div className="flex flex-1 flex-col items-start text-left min-h-[180px] justify-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                className="space-y-4 md:space-y-6"
              >
                {activeItem.meta && (
                  <span className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-neutral-500">
                    {activeItem.meta}
                  </span>
                )}
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
                  {activeItem.title}
                </h2>
                {activeItem.description && (
                  <p className="max-w-xl text-neutral-400 text-lg md:text-xl leading-relaxed font-medium">
                    {activeItem.description}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation & CTA */}
          <div className="flex flex-col items-start lg:items-end justify-between lg:justify-start gap-8">
            <div className="flex items-center gap-4 border border-white/10 rounded-full p-2 bg-[#0A0A0A]">
              <button
                onClick={handlePrev}
                className="rounded-full p-3 text-neutral-400 transition hover:bg-white/5 hover:text-white active:scale-95"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="min-w-[40px] text-center text-sm font-mono tracking-widest text-neutral-500">
                {activeIndex + 1} <span className="opacity-40">/</span> {count}
              </span>
              <button
                onClick={handleNext}
                className="rounded-full p-3 text-neutral-400 transition hover:bg-white/5 hover:text-white active:scale-95"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {activeItem.href && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={`link-${activeItem.id}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
                >
                  <Link
                    href={activeItem.href}
                    className="group flex items-center gap-3 text-lg font-bold text-white transition-all hover:text-neutral-300"
                  >
                    View Case Study
                    <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-white/20 transition-all group-hover:border-white/50 group-hover:bg-white/10">
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
