"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Simple class merger
const cn = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(" ");

const TOTAL_STEPS = 4;

const steps = [
  {
    id: "01",
    title: "Discovery",
    description:
      "Every exceptional digital experience begins with understanding. We immerse ourselves in your business, audience, and goals to uncover opportunities that create meaningful impact.",
    deliverables: ["Research Workshops", "Audience Mapping", "Competitive Analysis"],
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
  },
  {
    id: "02",
    title: "Strategy",
    description:
      "A clear strategy turns ideas into measurable results. We define the roadmap, positioning, and user experience that guide every creative and technical decision.",
    deliverables: ["Positioning", "Content Architecture", "Growth Roadmap"],
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2560&auto=format&fit=crop",
  },
  {
    id: "03",
    title: "Design",
    description:
      "Design that captures attention and earns trust. Through thoughtful visuals, motion, and interaction design, we create experiences that feel premium, memorable, and effective.",
    deliverables: ["Brand Identity", "UI Systems", "Motion Direction"],
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2560&auto=format&fit=crop",
  },
  {
    id: "04",
    title: "Development",
    description:
      "Built for performance, scalability, and growth. We transform concepts into fast, responsive, and reliable digital experiences that deliver real business value.",
    deliverables: ["Engineering", "Optimization", "Launch Support"],
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2560&auto=format&fit=crop",
  },
];

function useNumberCycler(totalSteps: number = TOTAL_STEPS, interval: number = 8000) {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timerId = setTimeout(() => {
      setCurrentNumber((prev) => (prev + 1) % totalSteps);
    }, interval);
    return () => clearTimeout(timerId);
  }, [currentNumber, totalSteps, interval, isHovered]);

  const setStep = useCallback(
    (stepIndex: number) => {
      setCurrentNumber(stepIndex % totalSteps);
    },
    [totalSteps]
  );

  return { currentNumber, setStep, setIsHovered };
}

export function ProcessCarousel() {
  const { currentNumber: step, setStep, setIsHovered } = useNumberCycler();

  return (
    <section className="relative bg-[#050505] text-white pt-16 pb-24 md:pt-20 md:pb-32 lg:pt-28 lg:pb-40 font-sans antialiased overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
        {/* Section Header */}
        <div className="mb-16 md:mb-24 max-w-4xl">
          <h2 className="text-xs md:text-sm font-bold tracking-[0.4em] uppercase text-neutral-500 mb-6">
            Our Approach
          </h2>
          <h3 className="text-4xl md:text-6xl lg:text-[5.5rem] font-bold tracking-tighter leading-[1.05] mb-8 text-white">
            From Vision to Execution
          </h3>
          <p className="text-neutral-400 text-xl md:text-2xl font-medium tracking-wide max-w-2xl leading-relaxed">
            A collaborative process that transforms ambitious ideas into exceptional digital
            experiences.
          </p>
        </div>

        {/* Process Content Grid */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left Column: Interactive Accordion Steps */}
          <div className="lg:col-span-5 flex flex-col justify-start w-full">
            <div className="flex flex-col w-full">
              {steps.map((s, idx) => {
                const isActive = step === idx;
                return (
                  <div
                    key={s.id}
                    onClick={() => setStep(idx)}
                    className="cursor-pointer group flex flex-col border-b border-neutral-900 py-6 md:py-8 overflow-hidden"
                  >
                    {/* Accordion Header */}
                    <div className="flex items-center gap-6 md:gap-10">
                      <span
                        className={cn(
                          "text-sm md:text-base font-mono tracking-widest transition-colors duration-500",
                          isActive
                            ? "text-white"
                            : "text-neutral-700 group-hover:text-neutral-500"
                        )}
                      >
                        {s.id}
                      </span>
                      <h4
                        className={cn(
                          "text-2xl md:text-4xl font-bold tracking-tight transition-all duration-500 flex-1",
                          isActive
                            ? "text-white"
                            : "text-neutral-600 group-hover:text-neutral-400 group-hover:translate-x-2"
                        )}
                      >
                        {s.title}
                      </h4>

                      {/* Premium Plus/Minus Indicator */}
                      <div className="relative w-4 h-4 flex items-center justify-center shrink-0">
                        <div className="absolute w-full h-[2px] bg-neutral-600 transition-colors duration-500 group-hover:bg-neutral-400" />
                        <div
                          className={cn(
                            "absolute w-[2px] h-full bg-neutral-600 transition-all duration-500 group-hover:bg-neutral-400",
                            isActive ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                          )}
                        />
                      </div>
                    </div>

                    {/* Expandable Content Area */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pt-6 pb-4 md:pl-[4.5rem] flex flex-col gap-8">
                            <p className="text-neutral-400 text-lg md:text-xl leading-relaxed font-medium">
                              {s.description}
                            </p>
                            <div className="space-y-4 pt-4 border-t border-white/5">
                              <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-neutral-600">
                                Deliverables
                              </p>
                              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                                {s.deliverables.map((item, i) => (
                                  <li
                                    key={i}
                                    className="flex items-center text-neutral-300 font-medium text-sm md:text-base"
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 mr-4 shrink-0" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Premium Image Showcase */}
          <div className="lg:col-span-7 relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[800px] w-full rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-[#0A0A0A] shadow-2xl mt-12 lg:mt-0">
            {/* Subtle inner border for the glassmorphism aesthetic without heavy blur */}
            <div className="absolute inset-0 border border-white/5 rounded-[1.5rem] md:rounded-[2rem] z-20 pointer-events-none" />
            
            <AnimatePresence>
              <motion.div
                key={step}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0 z-10"
              >
                <Image
                  src={steps[step].image}
                  alt={steps[step].title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                {/* Minimal, luxury overlay - no heavy gradients, just enough to ensure premium contrast */}
                <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
                <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.6)] pointer-events-none" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
