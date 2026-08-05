'use client';
import { ReactLenis } from 'lenis/react';

// Only the sticky image gallery section — no header text, no footer
export default function StickyScrollGallery() {
  return (
    <ReactLenis root>
      <section className="text-white w-full bg-[#050505]">
        {/* Section label */}
        <div className="px-8 md:px-16 py-16 border-t border-zinc-900">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-600">
            Our Work In Motion
          </p>
        </div>

        {/* 3-column sticky scroll grid */}
        <div className="grid grid-cols-12 gap-2 px-2">
          {/* Left column — scrolls normally */}
          <div className="grid gap-2 col-span-4">
            <figure className="w-full">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&auto=format&fit=crop"
                alt="Agency work"
                className="transition-all duration-300 w-full h-96 align-bottom object-cover rounded-none grayscale hover:grayscale-0"
              />
            </figure>
            <figure className="w-full">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&auto=format&fit=crop"
                alt="Brand system"
                className="transition-all duration-300 w-full h-96 align-bottom object-cover rounded-none grayscale hover:grayscale-0"
              />
            </figure>
            <figure className="w-full">
              <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop"
                alt="Design system"
                className="transition-all duration-300 w-full h-96 align-bottom object-cover rounded-none grayscale hover:grayscale-0"
              />
            </figure>
            <figure className="w-full">
              <img
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&auto=format&fit=crop"
                alt="Creative direction"
                className="transition-all duration-300 w-full h-96 align-bottom object-cover rounded-none grayscale hover:grayscale-0"
              />
            </figure>
            <figure className="w-full">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&auto=format&fit=crop"
                alt="Digital strategy"
                className="transition-all duration-300 w-full h-96 align-bottom object-cover rounded-none grayscale hover:grayscale-0"
              />
            </figure>
          </div>

          {/* Center column — sticky while sidebars scroll */}
          <div className="sticky top-0 h-screen w-full col-span-4 gap-2 grid grid-rows-3">
            <figure className="w-full h-full">
              <img
                src="https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=500&auto=format&fit=crop"
                alt="Brand identity"
                className="transition-all duration-500 h-full w-full align-bottom object-cover rounded-none"
              />
            </figure>
            <figure className="w-full h-full">
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&auto=format&fit=crop"
                alt="Visual systems"
                className="transition-all duration-500 h-full w-full align-bottom object-cover rounded-none"
              />
            </figure>
            <figure className="w-full h-full">
              <img
                src="https://images.unsplash.com/photo-1582298538104-fc2c0e539d73?w=500&auto=format&fit=crop"
                alt="Campaign work"
                className="transition-all duration-500 h-full w-full align-bottom object-cover rounded-none"
              />
            </figure>
          </div>

          {/* Right column — scrolls normally */}
          <div className="grid gap-2 col-span-4">
            <figure className="w-full">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&auto=format&fit=crop"
                alt="Agency office"
                className="transition-all duration-300 w-full h-96 align-bottom object-cover rounded-none grayscale hover:grayscale-0"
              />
            </figure>
            <figure className="w-full">
              <img
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=500&auto=format&fit=crop"
                alt="Team collaboration"
                className="transition-all duration-300 w-full h-96 align-bottom object-cover rounded-none grayscale hover:grayscale-0"
              />
            </figure>
            <figure className="w-full">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&auto=format&fit=crop"
                alt="Brand photography"
                className="transition-all duration-300 w-full h-96 align-bottom object-cover rounded-none grayscale hover:grayscale-0"
              />
            </figure>
            <figure className="w-full">
              <img
                src="https://images.unsplash.com/photo-1542744094-3a31f272c490?w=500&auto=format&fit=crop"
                alt="Strategic planning"
                className="transition-all duration-300 w-full h-96 align-bottom object-cover rounded-none grayscale hover:grayscale-0"
              />
            </figure>
            <figure className="w-full">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop"
                alt="Digital marketing"
                className="transition-all duration-300 w-full h-96 align-bottom object-cover rounded-none grayscale hover:grayscale-0"
              />
            </figure>
          </div>
        </div>

        {/* Bottom spacer */}
        <div className="h-24" />
      </section>
    </ReactLenis>
  );
}
