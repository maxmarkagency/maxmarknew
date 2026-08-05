"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface IntroSequenceProps {
  onComplete?: () => void;
}

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Total intro duration before sliding up
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Notify parent component that intro is done after exit animation completes
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 1200); 
    }, 3200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Fantasy.co style smooth easing curve
  const customEase = [0.76, 0, 0.24, 1] as const;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="intro"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.2, ease: customEase }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505] overflow-hidden"
        >
          {/* Subtle Atmospheric Light */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-[#050505] to-[#050505] pointer-events-none"
          />

          {/* Typography Animation */}
          <motion.div
            exit={{ opacity: 0, y: -40, filter: "blur(10px)", scale: 0.95 }}
            transition={{ duration: 0.8, ease: customEase }}
            className="relative flex flex-col items-center justify-center text-center z-10"
          >
            {/* "MAXMARK" Mask Reveal */}
            <div className="overflow-hidden pb-2">
              <motion.h1 
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.2, ease: customEase, delay: 0.2 }}
                className="text-white font-bold text-[12vw] sm:text-8xl md:text-9xl tracking-tighter leading-none"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                MAXMARK
              </motion.h1>
            </div>
            
            {/* "AGENCY" Fade & Slide */}
            <div className="overflow-hidden mt-2 md:mt-4">
              <motion.p
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 1.2, ease: customEase, delay: 0.4 }}
                className="text-zinc-400 uppercase tracking-[0.4em] sm:tracking-[0.6em] text-sm sm:text-lg md:text-xl font-medium ml-2 sm:ml-4"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Agency
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
