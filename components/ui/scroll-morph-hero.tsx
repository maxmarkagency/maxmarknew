"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export type AnimationPhase = "idle" | "burst" | "circle";

interface FlipCardProps {
    src: string;
    index: number;
    total: number;
    phase: AnimationPhase;
    target: { x: number; y: number; rotation: number; scale: number; opacity: number };
    introCompleted: boolean;
}

// --- FlipCard Component ---
const IMG_WIDTH = 60;  
const IMG_HEIGHT = 85; 

function FlipCard({
    src,
    index,
    total,
    phase,
    target,
    introCompleted,
}: FlipCardProps) {
    return (
        <motion.div
            initial={{ x: 0, y: 0, rotate: 0, scale: 0, opacity: 0 }}
            animate={{
                x: target.x,
                y: target.y,
                rotate: target.rotation,
                scale: target.scale,
                opacity: target.opacity,
            }}
            transition={
                phase === "burst"
                    ? {
                        type: "spring",
                        stiffness: 280,
                        damping: 18,
                        delay: index * 0.025,
                    }
                    : phase === "circle"
                    ? {
                        type: "spring",
                        stiffness: introCompleted ? 50 : 55,
                        damping: introCompleted ? 15 : 20,
                        delay: introCompleted ? 0 : index * 0.035,
                    }
                    : { duration: 0 }
            }
            style={{
                position: "absolute",
                marginLeft: -IMG_WIDTH / 2,
                marginTop: -IMG_HEIGHT / 2,
                width: IMG_WIDTH,
                height: IMG_HEIGHT,
                transformStyle: "preserve-3d",
                perspective: "1000px",
            }}
            className="cursor-pointer group"
        >
            <motion.div
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                whileHover={{ rotateY: 180 }}
            >
                {/* Front Face */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-2xl bg-zinc-900 border border-zinc-800/50"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <img
                        src={src}
                        alt={`hero-${index}`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-transparent" />
                </div>

                {/* Back Face */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-2xl bg-zinc-950 flex flex-col items-center justify-center p-2 border border-zinc-700"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                    <div className="text-center">
                        <p className="text-[7px] font-mono font-bold text-zinc-500 uppercase tracking-widest mb-1">Portfolio</p>
                        <p className="text-[10px] font-medium text-white">MAXMARK</p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

const TOTAL_IMAGES = 20;
const MAX_SCROLL = 2400; // Virtual scroll range

const IMAGES = [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&q=80",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=300&q=80",
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=300&q=80",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=300&q=80",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=300&q=80",
    "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=300&q=80",
    "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=300&q=80",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&q=80",
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=300&q=80",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=300&q=80",
    "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=300&q=80",
    "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=300&q=80",
    "https://images.unsplash.com/photo-1503694978374-8a2fa686963a?w=300&q=80",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=300&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&q=80",
    "https://images.unsplash.com/photo-1481026469463-66327c86e544?w=300&q=80",
    "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=300&q=80",
    "https://images.unsplash.com/photo-1473172081514-ce52e6900f6b?w=300&q=80",
    "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=300&q=80",
];

const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

export default function ScrollMorphHero() {
    const [introPhase, setIntroPhase] = useState<AnimationPhase>("idle");
    const [introCompleted, setIntroCompleted] = useState(false);
    const [containerSize, setContainerSize] = useState({ width: typeof window !== "undefined" ? window.innerWidth : 1200, height: 750 });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const handleResize = (entries: ResizeObserverEntry[]) => {
            for (const entry of entries) {
                setContainerSize({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height,
                });
            }
        };

        const observer = new ResizeObserver(handleResize);
        observer.observe(containerRef.current);

        // Read actual size immediately
        setContainerSize({
            width: containerRef.current.offsetWidth,
            height: containerRef.current.offsetHeight,
        });

        return () => observer.disconnect();
    }, []);

    const virtualScroll = useMotionValue(0);
    const scrollRef = useRef(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            const rect = container.getBoundingClientRect();
            const isInView = rect.top <= window.innerHeight && rect.bottom >= 0;
            if (!isInView) return;

            if (scrollRef.current > 0 && scrollRef.current < MAX_SCROLL) {
                e.preventDefault();
            } else if (e.deltaY > 0 && scrollRef.current === 0) {
                e.preventDefault();
            } else if (e.deltaY < 0 && scrollRef.current === MAX_SCROLL) {
                e.preventDefault();
            }

            const newScroll = Math.min(Math.max(scrollRef.current + e.deltaY * 0.8, 0), MAX_SCROLL);
            scrollRef.current = newScroll;
            virtualScroll.set(newScroll);
        };

        let touchStartY = 0;
        const handleTouchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY;
        };
        const handleTouchMove = (e: TouchEvent) => {
            const rect = container.getBoundingClientRect();
            const isInView = rect.top <= window.innerHeight && rect.bottom >= 0;
            if (!isInView) return;

            const touchY = e.touches[0].clientY;
            const deltaY = (touchStartY - touchY) * 1.2;
            touchStartY = touchY;

            if (scrollRef.current > 0 && scrollRef.current < MAX_SCROLL) {
                e.preventDefault();
            }

            const newScroll = Math.min(Math.max(scrollRef.current + deltaY, 0), MAX_SCROLL);
            scrollRef.current = newScroll;
            virtualScroll.set(newScroll);
        };

        container.addEventListener("wheel", handleWheel, { passive: false });
        container.addEventListener("touchstart", handleTouchStart, { passive: false });
        container.addEventListener("touchmove", handleTouchMove, { passive: false });

        return () => {
            container.removeEventListener("wheel", handleWheel);
            container.removeEventListener("touchstart", handleTouchStart);
            container.removeEventListener("touchmove", handleTouchMove);
        };
    }, [virtualScroll]);

    const morphProgress = useTransform(virtualScroll, [0, 500], [0, 1]);
    const smoothMorph = useSpring(morphProgress, { stiffness: 45, damping: 22 });

    const scrollRotate = useTransform(virtualScroll, [500, 2400], [0, 240]);
    const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 45, damping: 22 });

    const mouseX = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const relativeX = e.clientX - rect.left;
            const normalizedX = (relativeX / rect.width) * 2 - 1;
            mouseX.set(normalizedX * 80);
        };
        container.addEventListener("mousemove", handleMouseMove);
        return () => container.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX]);

    const hasAnimated = useRef(false);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;

                    // Step 1: Vortex burst outward
                    setIntroPhase("burst");

                    // Step 2: Spiral inward into the circle ring
                    const t1 = setTimeout(() => setIntroPhase("circle"), 650);

                    // Step 3: Enable instant mouse parallax response
                    const t2 = setTimeout(() => setIntroCompleted(true), 2400);

                    return () => { clearTimeout(t1); clearTimeout(t2); };
                }
            },
            { threshold: 0.25 }
        );

        observer.observe(container);
        return () => observer.disconnect();
    }, []);

    // Burst positions: large vortex radius, each card rotated further along to create spiral
    const burstPositions = useMemo(() => {
        return IMAGES.map((_, i) => {
            // Offset angle by half a rotation so burst goes opposite direction before snapping back
            const angle = (i / TOTAL_IMAGES) * 360 + 180;
            const rad = (angle * Math.PI) / 180;
            // Vary radius slightly per card for depth
            const radius = 320 + (i % 5) * 35;
            return {
                x: Math.cos(rad) * radius,
                y: Math.sin(rad) * radius,
                // Cards spin a full extra turn as they burst
                rotation: angle + (i % 2 === 0 ? 540 : -540),
                scale: 0.75 + (i % 3) * 0.1,
                opacity: 0.9,
            };
        });
    }, []);

    const [morphValue, setMorphValue] = useState(0);
    const [rotateValue, setRotateValue] = useState(0);
    const [parallaxValue, setParallaxValue] = useState(0);

    useEffect(() => {
        const unsubscribeMorph = smoothMorph.on("change", setMorphValue);
        const unsubscribeRotate = smoothScrollRotate.on("change", setRotateValue);
        const unsubscribeParallax = smoothMouseX.on("change", setParallaxValue);
        return () => {
            unsubscribeMorph();
            unsubscribeRotate();
            unsubscribeParallax();
        };
    }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

    const introOpacity = useTransform(smoothMorph, [0, 0.4], [1, 0]);
    const introY = useTransform(smoothMorph, [0, 0.4], [0, -40]);

    const contentOpacity = useTransform(smoothMorph, [0.75, 1], [0, 1]);
    const contentY = useTransform(smoothMorph, [0.75, 1], [30, 0]);

    return (
        <div ref={containerRef} className="relative w-full h-[750px] bg-[#050505] overflow-hidden border-y border-zinc-900/60 my-16">
            {/* Ambient background glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.015),transparent_70%)] pointer-events-none" />

            <div className="flex h-full w-full flex-col items-center justify-center perspective-1000">

                {/* Ready to create what's next? (Fades out on scroll) */}
                <div className="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[240px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[440px] pointer-events-none">
                    <motion.div 
                        style={{ opacity: introOpacity, y: introY }}
                        className="flex flex-col items-center justify-center text-center px-4 w-full"
                    >
                        <motion.h2
                            initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
                            animate={introPhase === "circle" ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-tight sm:leading-tight md:leading-tight lg:leading-tight text-balance"
                        >
                            Ready to create what’s next?
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            animate={introPhase === "circle" ? { opacity: 0.5, y: 0 } : {}}
                            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                            className="mt-6 sm:mt-8 text-[10px] sm:text-xs font-mono tracking-[0.3em] text-zinc-300 uppercase"
                        >
                            Scroll to explore
                        </motion.p>
                    </motion.div>
                </div>

                {/* Let's build together / Let's get in touch (Fades in) */}
                <motion.div
                    style={{ opacity: contentOpacity, y: contentY }}
                    className="absolute top-[18%] z-20 flex flex-col items-center justify-center text-center px-4 pointer-events-auto"
                >
                    <h2 className="text-4xl md:text-6xl font-medium text-white tracking-tight mb-5">
                        Let’s build together.
                    </h2>
                    <p className="text-sm md:text-base text-zinc-400 max-w-lg leading-relaxed mb-8">
                        We partner with ambitious teams to engineer high-end digital solutions. Reach out to start your project.
                    </p>
                    <a 
                        href="mailto:hello@maxmark.co" 
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold text-sm tracking-wider uppercase hover:bg-zinc-200 transition-all duration-300 shadow-xl"
                    >
                        Let’s get in touch
                        <ArrowUpRight className="w-4 h-4" />
                    </a>
                </motion.div>

                {/* All images share one center-anchor. After intro: slow ring spin + gentle float. */}
                <motion.div
                    style={{ position: "absolute", left: "50%", top: "50%" }}
                    animate={
                        introCompleted && morphValue < 0.05
                            ? { rotate: [0, 360], y: [0, -10, 0, 10, 0] }
                            : {}
                    }
                    transition={
                        introCompleted
                            ? {
                                rotate: { duration: 70, repeat: Infinity, ease: "linear" },
                                y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                            }
                            : {}
                    }
                >
                    {IMAGES.slice(0, TOTAL_IMAGES).map((src, i) => {
                        let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

                        if (introPhase === "idle") {
                            // Hidden at center — waits for scroll trigger
                            target = { x: 0, y: 0, rotation: 0, scale: 0, opacity: 0 };
                        } else if (introPhase === "burst") {
                            // Vortex explosion outward
                            target = burstPositions[i];
                        } else {
                            const isMobile = containerSize.width < 768;
                            const minDimension = Math.min(containerSize.width, containerSize.height);

                            // Circle layout
                            const circleRadius = Math.min(minDimension * 0.4, 320);
                            const circleAngle = (i / TOTAL_IMAGES) * 360;
                            const circleRad = (circleAngle * Math.PI) / 180;
                            const circlePos = {
                                x: Math.cos(circleRad) * circleRadius,
                                y: Math.sin(circleRad) * circleRadius,
                                rotation: circleAngle + 90,
                            };

                            // Bottom Arc layout
                            const baseRadius = Math.min(containerSize.width, containerSize.height * 1.4);
                            const arcRadius = baseRadius * (isMobile ? 1.3 : 1.05);
                            const arcApexY = containerSize.height * (isMobile ? 0.42 : 0.32);
                            const arcCenterY = arcApexY + arcRadius;

                            const spreadAngle = isMobile ? 95 : 120;
                            const startAngle = -90 - (spreadAngle / 2);
                            const step = spreadAngle / (TOTAL_IMAGES - 1);

                            const scrollProgress = Math.min(Math.max(rotateValue / 240, 0), 1);
                            const maxRotation = spreadAngle * 0.75;
                            const boundedRotation = -scrollProgress * maxRotation;

                            const currentArcAngle = startAngle + (i * step) + boundedRotation;
                            const arcRad = (currentArcAngle * Math.PI) / 180;

                            const arcPos = {
                                x: Math.cos(arcRad) * arcRadius + parallaxValue,
                                y: Math.sin(arcRad) * arcRadius + arcCenterY,
                                rotation: currentArcAngle + 90,
                                scale: isMobile ? 1.3 : 1.6,
                            };

                            target = {
                                x: lerp(circlePos.x, arcPos.x, morphValue),
                                y: lerp(circlePos.y, arcPos.y, morphValue),
                                rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                                scale: lerp(1, arcPos.scale, morphValue),
                                opacity: 1,
                            };
                        }

                        return (
                            <FlipCard
                                key={i}
                                src={src}
                                index={i}
                                total={TOTAL_IMAGES}
                                phase={introPhase}
                                target={target}
                                introCompleted={introCompleted}
                            />
                        );
                    })}
                </motion.div>
            </div>
        </div>
    );
}
