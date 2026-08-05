"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Floating, { FloatingElement } from "@/components/ui/parallax-floating";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INJECTED_STYLES = `
  .gsap-reveal { visibility: hidden; }

  /* Environment Overlays */
  .film-grain {
      position: absolute; inset: 0; width: 100%; height: 100%;
      pointer-events: none; z-index: 50; opacity: 0.05; mix-blend-mode: overlay;
      background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
  }

  .bg-grid-theme {
      background-size: 60px 60px;
      background-image: 
          linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
      mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
      -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }

  /* Text Styles */
  .text-3d-matte {
      color: #FFFFFF;
      text-shadow: 
          0 10px 30px rgba(0,0,0,0.8), 
          0 2px 4px rgba(0,0,0,0.5);
  }

  .text-silver-matte {
      background: linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.6) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0); 
      filter: 
          drop-shadow(0px 10px 20px rgba(0,0,0,0.8)) 
          drop-shadow(0px 2px 4px rgba(0,0,0,0.5));
  }

  /* Deep Physical Card with Dynamic Mouse Lighting */
  .premium-depth-card {
      background: linear-gradient(145deg, #111111 0%, #050505 100%);
      box-shadow: 
          0 40px 100px -20px rgba(0, 0, 0, 0.9),
          0 20px 40px -20px rgba(0, 0, 0, 0.8),
          inset 0 1px 2px rgba(255, 255, 255, 0.05),
          inset 0 -2px 4px rgba(0, 0, 0, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.04);
      position: relative;
  }

  .card-sheen {
      position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
      background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.03) 0%, transparent 40%);
      mix-blend-mode: screen; transition: opacity 0.3s ease;
  }

  /* Cinematic Showcase Canvas */
  .showcase-canvas {
      background-color: #050505;
      box-shadow: 
          inset 0 0 0 1px rgba(255,255,255,0.05), 
          0 40px 80px -15px rgba(0,0,0,0.9),
          0 15px 25px -5px rgba(0,0,0,0.7);
      transform-style: preserve-3d;
  }
  
  .screen-glare {
      background: linear-gradient(110deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 45%);
  }

  .floating-ui-badge {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%);
      backdrop-filter: blur(24px); 
      -webkit-backdrop-filter: blur(24px);
      box-shadow: 
          0 0 0 1px rgba(255, 255, 255, 0.1),
          0 25px 50px -12px rgba(0, 0, 0, 0.8),
          inset 0 1px 1px rgba(255,255,255,0.1),
          inset 0 -1px 1px rgba(0,0,0,0.5);
  }

  /* Physical Tactile Buttons */
  .btn-modern-light {
      transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
      background: linear-gradient(180deg, #FFFFFF 0%, #E5E5E5 100%);
      color: #000000;
      box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.1), 0 12px 24px -4px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,1), inset 0 -3px 6px rgba(0,0,0,0.06);
  }
  .btn-modern-light:hover {
      transform: translateY(-3px);
      box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 6px 12px -2px rgba(0,0,0,0.15), 0 20px 32px -6px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,1), inset 0 -3px 6px rgba(0,0,0,0.06);
  }
  .btn-modern-light:active {
      transform: translateY(1px);
      background: linear-gradient(180deg, #E5E5E5 0%, #CCCCCC 100%);
      box-shadow: 0 0 0 1px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.1), inset 0 3px 6px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(0,0,0,0.02);
  }
`;

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  headlineParts?: string[];
  cardHeading?: string;
  cardDescription?: React.ReactNode;
  ctaHeading?: string;
  ctaDescription?: string;
}

export function CinematicHero({ 
  headlineParts = ["Creative Intelligence", "for the Brands", "Defining Tomorrow."],
  cardHeading = "The future isn't coming — we're creating it.",
  cardDescription = "We merge strategic clarity, global-standard design, and AI-powered production to build brands that lead markets and shape culture.",
  ctaHeading = "Partner with MAXMARK",
  ctaDescription = "Let's build the brand of tomorrow, today.",
  className, 
  ...props 
}: CinematicHeroProps) {
  
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Don't calculate if scrolled way past
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect || rect.top > window.innerHeight || rect.bottom < 0) return;

      cancelAnimationFrame(requestRef.current);
      
      requestRef.current = requestAnimationFrame(() => {
        if (mainCardRef.current && mockupRef.current) {
          const cardRect = mainCardRef.current.getBoundingClientRect();
          const mouseX = e.clientX - cardRect.left;
          const mouseY = e.clientY - cardRect.top;
          mainCardRef.current.style.setProperty("--mouse-x", `${mouseX}px`);
          mainCardRef.current.style.setProperty("--mouse-y", `${mouseY}px`);

          const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
          const yVal = (e.clientY / window.innerHeight - 0.5) * 2;

          gsap.to(mockupRef.current, {
            rotationY: xVal * 8, // Subtle rotation for a huge cinematic canvas
            rotationX: -yVal * 8,
            ease: "power3.out",
            duration: 1.2,
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  },[]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      gsap.set(".text-track", { autoAlpha: 0, y: 60, scale: 0.9, filter: "blur(15px)", rotationX: -15 });
      gsap.set(".main-card", { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set([".card-left-text", ".card-right-text", ".mockup-scroll-wrapper", ".floating-badge"], { autoAlpha: 0 });
      gsap.set(".cta-wrapper", { autoAlpha: 0, scale: 0.8, filter: "blur(30px)" });

      // Staggered Intro for the massive headline
      const introTl = gsap.timeline({ scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }});
      
      introTl.to(".text-track", { 
        duration: 1.8, 
        autoAlpha: 1, 
        y: 0, 
        scale: 1, 
        filter: "blur(0px)", 
        rotationX: 0, 
        ease: "expo.out",
        stagger: 0.2
      });

      // The main scroll-driven cinematic sequence
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=5000",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      scrollTl
        // 1. Push headline back, blur it, pull the massive card up
        .to([".hero-text-wrapper", ".bg-grid-theme"], { scale: 1.1, filter: "blur(20px)", opacity: 0.1, ease: "power2.inOut", duration: 2 }, 0)
        .to(".main-card", { y: 0, ease: "power3.inOut", duration: 2 }, 0)
        .to(".main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1.5 })
        
        // 2. Fly the cinematic canvas forward from the depths
        .fromTo(".mockup-scroll-wrapper",
          { y: 300, z: -800, rotationX: 45, rotationY: -15, autoAlpha: 0, scale: 0.7 },
          { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2.5 }, "-=0.8"
        )
        
        // 3. Float in the agency badges
        .fromTo(".floating-badge", 
          { y: 80, autoAlpha: 0, scale: 0.8, rotationZ: -5 }, 
          { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: "back.out(1.2)", duration: 1.5, stagger: 0.15 }, "-=1.5"
        )
        
        // 4. Reveal the philosophy typography on the sides
        .fromTo(".card-left-text", { x: -40, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.5 }, "-=1.5")
        
        // Let it rest for the user to admire
        .to({}, { duration: 2.5 })
        
        // 5. Hide hero text and fade out card content
        .set(".hero-text-wrapper", { autoAlpha: 0 })
        .to({}, { duration: 1.5 })
        .to([".mockup-scroll-wrapper", ".floating-badge", ".card-left-text"], {
          scale: 0.9, y: -40, z: -200, autoAlpha: 0, ease: "power3.in", duration: 1.2, stagger: 0.05,
        })
        
        // 6. Squeeze card back to original shape
        .to(".main-card", { 
          width: isMobile ? "92vw" : "85vw", 
          height: isMobile ? "92vh" : "85vh", 
          borderRadius: isMobile ? "32px" : "40px", 
          ease: "expo.inOut", 
          duration: 1.8 
        })
        
        // 7. Slide card away up — THEN reveal CTA so there's no overlap
        .to(".main-card", { y: -window.innerHeight - 300, ease: "power3.in", duration: 1.5 })
        .set(".cta-wrapper", { autoAlpha: 1 })
        .to(".cta-wrapper", { scale: 1, filter: "blur(0px)", ease: "expo.out", duration: 1.2 });

    }, containerRef);

    return () => ctx.revert();
  },[]); 

  return (
    <div
      ref={containerRef}
      className={`relative w-screen h-screen overflow-hidden flex items-center justify-center bg-[#000000] text-white font-sans antialiased ${className || ""}`}
      style={{ perspective: "2000px" }}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      <div className="film-grain" aria-hidden="true" />
      <div className="bg-grid-theme absolute inset-0 z-0 pointer-events-none opacity-40" aria-hidden="true" />

      {/* BACKGROUND LAYER 1: Massive Editorial Headline */}
      <div className="hero-text-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 will-change-transform transform-style-3d">
        {headlineParts.map((part, i) => (
          <h1 key={i} className="text-track gsap-reveal text-3d-matte text-5xl md:text-7xl lg:text-[7rem] font-bold tracking-tighter leading-[1.1] md:leading-[1.05]">
            {i === headlineParts.length - 1 ? (
              <span className="text-silver-matte">{part}</span>
            ) : (
              part
            )}
          </h1>
        ))}
      </div>

      {/* BACKGROUND LAYER 2: Tactile CTA End Screen */}
      <div className="cta-wrapper absolute z-10 flex items-center justify-center w-screen h-screen gsap-reveal pointer-events-auto will-change-transform">
        {/* Parallax Floating Background Images */}
        <Floating sensitivity={-1} easingFactor={0.04} className="overflow-hidden pointer-events-none">
          <FloatingElement depth={0.5} className="top-[12%] left-[12%]">
            <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop" alt="" className="w-20 h-20 md:w-28 md:h-28 object-cover rounded-xl shadow-2xl opacity-30" />
          </FloatingElement>
          <FloatingElement depth={1.5} className="top-[8%] left-[58%]">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop" alt="" className="w-24 h-32 md:w-32 md:h-44 object-cover rounded-xl shadow-2xl opacity-25" />
          </FloatingElement>
          <FloatingElement depth={2} className="top-[42%] left-[10%]">
            <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=600&auto=format&fit=crop" alt="" className="w-28 h-28 md:w-36 md:h-36 object-cover rounded-xl shadow-2xl opacity-20" />
          </FloatingElement>
          <FloatingElement depth={1} className="top-[22%] left-[75%]">
            <img src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=600&auto=format&fit=crop" alt="" className="w-20 h-20 md:w-28 md:h-28 object-cover rounded-xl shadow-2xl opacity-25" />
          </FloatingElement>
          <FloatingElement depth={3} className="top-[70%] left-[16%]">
            <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600&auto=format&fit=crop" alt="" className="w-32 h-20 md:w-44 md:h-28 object-cover rounded-xl shadow-2xl opacity-20" />
          </FloatingElement>
          <FloatingElement depth={0.8} className="top-[68%] left-[55%]">
            <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=600&auto=format&fit=crop" alt="" className="w-20 h-20 md:w-28 md:h-28 object-cover rounded-xl shadow-2xl opacity-25" />
          </FloatingElement>
          <FloatingElement depth={1.8} className="top-[52%] left-[76%]">
            <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop" alt="" className="w-16 h-16 md:w-24 md:h-24 object-cover rounded-xl shadow-2xl opacity-15" />
          </FloatingElement>
          <FloatingElement depth={2.5} className="top-[75%] left-[32%]">
            <img src="https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600&auto=format&fit=crop" alt="" className="w-20 h-24 md:w-28 md:h-32 object-cover rounded-xl shadow-2xl opacity-15" />
          </FloatingElement>
        </Floating>

        {/* CTA Content (centered above floating images) */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-4xl md:text-6xl lg:text-[5rem] font-bold mb-6 tracking-tight text-silver-matte leading-tight">
            {ctaHeading}
          </h2>
          <p className="text-neutral-400 text-lg md:text-2xl mb-8 max-w-2xl mx-auto font-medium tracking-wide">
            {ctaDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <a href="#" className="btn-modern-light flex items-center justify-center px-10 py-5 rounded-[1.5rem] group font-bold tracking-widest uppercase text-sm">
              Contact Us
            </a>
          </div>
        </div>
      </div>

      {/* FOREGROUND LAYER: The Physical Deep Agency Card */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "2000px" }}>
        <div
          ref={mainCardRef}
          className="main-card premium-depth-card relative overflow-hidden gsap-reveal flex items-center justify-center pointer-events-auto w-[92vw] md:w-[85vw] h-[92vh] md:h-[85vh] rounded-[32px] md:rounded-[40px]"
        >
          <div className="card-sheen" aria-hidden="true" />

          {/* DYNAMIC RESPONSIVE GRID */}
          <div className="relative w-full h-full max-w-[1400px] mx-auto px-4 lg:px-12 flex flex-col justify-evenly lg:grid lg:grid-cols-12 items-center lg:gap-12 z-10 py-6 lg:py-0">
            
            {/* LEFT TEXT (Philosophy & Subtext) */}
            <div className="card-left-text gsap-reveal order-3 lg:order-1 lg:col-span-4 flex flex-col justify-center text-center lg:text-left z-20 w-full lg:max-w-none px-4 lg:px-0">
              <h3 className="text-white text-2xl md:text-3xl lg:text-[2.5rem] font-bold mb-4 lg:mb-8 tracking-tighter leading-tight">
                {cardHeading}
              </h3>
              <p className="hidden md:block text-neutral-400 text-sm md:text-base lg:text-lg font-medium leading-relaxed max-w-md lg:max-w-none">
                {cardDescription}
              </p>
            </div>

            {/* CENTER/RIGHT MASSIVE CANVAS (Replaced iPhone Mockup) */}
            <div className="mockup-scroll-wrapper order-2 lg:order-2 lg:col-span-8 relative w-full h-[400px] lg:h-[700px] flex items-center justify-center z-10" style={{ perspective: "1500px" }}>
              
              {/* Inner wrapper for safe CSS scaling */}
              <div className="relative w-full h-full flex items-center justify-center">
                
                {/* The Huge Cinematic Showcase Screen */}
                <div
                  ref={mockupRef}
                  className="showcase-canvas relative w-full h-full max-h-[600px] rounded-[1.5rem] md:rounded-[2rem] flex flex-col will-change-transform transform-style-3d overflow-hidden"
                >
                  {/* Premium Abstract Placeholder Asset */}
                  <div className="absolute inset-[2px] rounded-[1.4rem] md:rounded-[1.9rem] overflow-hidden bg-zinc-900 shadow-[inset_0_0_50px_rgba(0,0,0,1)]">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] ease-out hover:scale-105"
                      style={{ 
                        backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')",
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute inset-0 screen-glare z-40 pointer-events-none" aria-hidden="true" />
                  </div>
                </div>

                {/* Floating Agency Badges */}
                <div className="floating-badge absolute flex top-4 lg:top-12 left-[-10px] lg:left-[-40px] floating-ui-badge rounded-xl p-3 lg:px-5 lg:py-3 items-center gap-3 z-30">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                  <p className="text-white text-xs lg:text-sm font-bold tracking-widest uppercase">AI Animation</p>
                </div>

                <div className="floating-badge absolute flex top-24 lg:top-36 right-[-10px] lg:right-[-40px] floating-ui-badge rounded-xl p-3 lg:px-5 lg:py-3 items-center gap-3 z-30">
                  <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                  <p className="text-white text-xs lg:text-sm font-bold tracking-widest uppercase">Advertising</p>
                </div>

                <div className="floating-badge absolute flex bottom-12 lg:bottom-20 left-4 lg:left-[-20px] floating-ui-badge rounded-xl p-3 lg:px-5 lg:py-3 items-center gap-3 z-30">
                  <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                  <p className="text-white text-xs lg:text-sm font-bold tracking-widest uppercase">Branding & Identity</p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
