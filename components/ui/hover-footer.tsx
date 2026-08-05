"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Mail, Phone, MapPin } from "lucide-react";

// ─── Text Hover Effect ────────────────────────────────────────────────────────

export const TextHoverEffect = ({
  text,
  duration,
  className,
}: {
  text: string;
  duration?: number;
  automatic?: boolean;
  className?: string;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={cn("select-none uppercase cursor-pointer", className)}
    >
      <defs>
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor="#ed3c69" />
              <stop offset="25%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#a78bfa" />
              <stop offset="75%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#ed3c69" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#revealMask)" />
        </mask>
      </defs>

      {/* Outline stroke (shows on hover) */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-zinc-800 font-[helvetica] text-7xl font-bold"
        style={{ opacity: hovered ? 0.7 : 0 }}
      >
        {text}
      </text>

      {/* Animated draw-on stroke */}
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-zinc-700 font-[helvetica] text-7xl font-bold"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
        transition={{ duration: 4, ease: "easeInOut" }}
      >
        {text}
      </motion.text>

      {/* Color reveal on cursor */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.3"
        mask="url(#textMask)"
        className="fill-transparent font-[helvetica] text-7xl font-bold"
      >
        {text}
      </text>
    </svg>
  );
};

// ─── Background Gradient ──────────────────────────────────────────────────────

export const FooterBackgroundGradient = () => (
  <div
    className="absolute inset-0 z-0 pointer-events-none"
    style={{
      background:
        "radial-gradient(125% 125% at 50% 10%, #05050566 50%, #ed3c6922 100%)",
    }}
  />
);

// ─── Main Footer ──────────────────────────────────────────────────────────────

function HoverFooter() {
  const serviceLinks = [
    { label: "Web Design", href: "#" },
    { label: "Social Media", href: "#" },
    { label: "Branding", href: "#" },
    { label: "Video Animation", href: "#" },
    { label: "Marketing / SEO", href: "#" },
  ];

  const companyLinks = [
    { label: "About", href: "#" },
    { label: "Services", href: "#" },
    { label: "Work", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Contact", href: "#" },
  ];

  const contactInfo = [
    {
      icon: <MapPin size={15} className="text-[#ed3c69] shrink-0 mt-0.5" />,
      text: "77 Ogudu Ojota, Ogudu, Lagos.",
    },
    {
      icon: <Phone size={15} className="text-[#ed3c69] shrink-0" />,
      text: "+234 8160582474",
      href: "tel:+2348160582474",
    },
    {
      icon: <Mail size={15} className="text-[#ed3c69] shrink-0" />,
      text: "info@maxmarkagency.com",
      href: "mailto:info@maxmarkagency.com",
    },
  ];

  const socialLinks = [
    {
      icon: (
        <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
      label: "Facebook",
      href: "#",
    },
    {
      icon: (
        <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
      label: "LinkedIn",
      href: "#",
    },
    {
      icon: (
        <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
      label: "Instagram",
      href: "#",
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#080808] border-t border-zinc-900/60">
      {/* Subtle top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#ed3c69]/40 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-8 pt-20 pb-8">

        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">

          {/* Brand */}
          <div className="flex flex-col space-y-5 lg:col-span-1">
            <div className="flex items-center gap-2">
              <span className="text-[#ed3c69] font-black text-2xl tracking-tight">MAXMARK</span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-[220px]">
              We build the systems that help brands launch, grow, and scale with confidence.
            </p>

            {/* Social icons */}
            <div className="flex gap-4 pt-2">
              {socialLinks.map(({ icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="w-9 h-9 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:border-[#ed3c69]/50 transition-colors duration-300"
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-[0.2em] mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-zinc-500 text-sm hover:text-white transition-colors duration-200 group flex items-center gap-2"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-[#ed3c69] transition-all duration-300 inline-block" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-[0.2em] mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-zinc-500 text-sm hover:text-white transition-colors duration-200 group flex items-center gap-2"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-[#ed3c69] transition-all duration-300 inline-block" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Address */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-[0.2em] mb-6">
              Address
            </h4>
            <ul className="space-y-4">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  {item.icon}
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-zinc-500 text-sm hover:text-white transition-colors duration-200"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-zinc-500 text-sm">{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8">
          <p className="text-zinc-600 text-xs tracking-wider">
            © 2025 Maxmark Agency. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service"].map((t) => (
              <a key={t} href="#" className="text-zinc-600 text-xs hover:text-zinc-400 transition-colors">
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* MAXMARK text hover effect — large decorative wordmark */}
      <div className="lg:flex hidden h-[28rem] -mt-48 -mb-32 select-none pointer-events-auto">
        <TextHoverEffect text="MAXMARK" className="z-10" />
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}

export default HoverFooter;
