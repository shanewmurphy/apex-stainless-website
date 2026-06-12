"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Header() {
  const stripesContainerRef = useRef(null);
  const stripesRef = useRef([]);
  const heroImgRef = useRef(null);

  useEffect(() => {
    // GSAP context helps with clean up and prevents issues in React Strict Mode / Fast Refresh
    const ctx = gsap.context(() => {
      // 1. Initial State Setup
      gsap.set(stripesRef.current, { yPercent: 0 });
      gsap.set(heroImgRef.current, { scale: 1.15, opacity: 0 });

      const tl = gsap.timeline({ delay: 1 });

      // 2. Stripe Reveal Animation (from bottom to top, staggered from right to left)
      tl.to(stripesRef.current, {
        yPercent: -102,
        duration: 1.6,
        ease: "power4.inOut",
        stagger: {
          each: 0.15,
          from: "end", // Starts from the rightmost stripe and moves left
        },
        onComplete: () => {
          // Hide stripes container completely after animation finishes to free up pointer events
          if (stripesContainerRef.current) {
            stripesContainerRef.current.style.display = "none";
          }
        },
      });

      // 3. Hero Image Zoom-out and Fade-in (starts shortly after stripes start sliding)
      tl.to(
        heroImgRef.current,
        {
          scale: 1,
          opacity: 1,
          duration: 2.2,
          ease: "power3.out",
        },
        0.3,
      ); // Starts at 0.3s of the timeline
    });

    return () => ctx.revert();
  }, []);

  return (
    <header className="relative w-full h-screen min-h-[600px] overflow-hidden bg-zinc-950 flex flex-col text-white">
      {/* 1. STAGGERED REVEAL STRIPES */}
      <div
        ref={stripesContainerRef}
        className="absolute inset-0 z-50 flex pointer-events-none"
      >
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) stripesRef.current[i] = el;
            }}
            className="h-full flex-1 bg-black border-r border-zinc-100/5 last:border-r-0"
          />
        ))}
      </div>

      {/* 2. HERO BACKGROUND IMAGE (Natural full-color display) */}
      <div className="absolute inset-0 z-0">
        <img
          ref={heroImgRef}
          src="/homepage-imgs/Hero-b.jpg"
          alt="Apex Stainless Hero Workspace"
          className="w-full h-full object-cover"
        />
      </div>
    </header>
  );
}
