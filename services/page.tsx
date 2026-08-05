"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Hero08 } from "@/components/ui/hero-08";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const SERVICES_AVATARS = [
  {
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&q=80",
    fallback: "MM",
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&q=80",
    fallback: "AX",
  },
  {
    src: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=64&q=80",
    fallback: "MK",
  },
];

const SERVICES_CARDS = [
  {
    title: "Brand Architecture",
    subtitle: "Identity, voice, and system design",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Brand architecture and visual systems work",
    invert: true,
    cta: {
      ctaEnabled: true,
      text: "Start Your Project",
      link: "/#contact",
      size: "default" as const,
    },
  },
  {
    title: "Digital Platforms",
    subtitle: "Interactive web experiences and systems engineering",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Digital platform design and implementation",
    invert: true,
    cta: {
      ctaEnabled: true,
      text: "Start Your Project",
      link: "/#contact",
      size: "default" as const,
    },
  },
];

export default function ServicesPage() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-screen h-screen bg-[#050505] text-white overflow-y-auto"
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

      {/* Hero 08 component integration */}
      <div className="pt-20">
        <Hero08
          title="Creative Intelligence for the Brands Defining Tomorrow."
          description="We merge strategic clarity, global-standard design, and AI-powered production to build brands that lead markets and shape culture."
          socialProof="The future isn’t coming — we’re creating it."
          avatars={SERVICES_AVATARS}
          cards={SERVICES_CARDS}
          animation="subtle"
          variant="standard"
        />
      </div>
    </motion.div>
  );
}
