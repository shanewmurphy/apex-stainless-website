"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Typography } from "@/components/ui/typography";

export default function Header() {
  const stripesContainerRef = useRef(null);
  const stripesRef = useRef([]);
  const heroImgRef = useRef(null);
  const titleRef = useRef(null);
  const logoContainerRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    // GSAP context helps with clean up and prevents issues in React Strict Mode / Fast Refresh
    const ctx = gsap.context(() => {
      // 1. Initial State Setup
      gsap.set(stripesRef.current, { yPercent: 0 });
      gsap.set(heroImgRef.current, { scale: 1.15, opacity: 0 });
      gsap.set(titleRef.current, { opacity: 0, y: 35 });
      gsap.set(logoRef.current, { opacity: 1, scale: 1 });

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
          if (logoContainerRef.current) {
            logoContainerRef.current.style.display = "none";
          }
        },
      });

      // 3. Logo Out Animation (fades and scales down slightly, starting at the same time as stripes)
      tl.to(
        logoRef.current,
        {
          opacity: 0,
          scale: 0.85,
          duration: 1.0,
          ease: "power3.inOut",
        },
        0,
      );

      // 3. Hero Image Zoom-out and Fade-in (starts shortly after stripes start sliding)
      tl.to(
        heroImgRef.current,
        {
          scale: 1,
          opacity: 1,
          duration: 2.2,
          ease: "power3.out",
        },
        0.2,
      );

      // 4. Typography Text Animation (fades/slides up as stripes clear the center)
      tl.to(
        titleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: "power3.out",
        },
        0.8, // Starts at 0.8s into the timeline
      );
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

      {/* 1.1. INTRO LOGO (Centered on top of stripes, animating out) */}
      <div
        ref={logoContainerRef}
        style={{ zIndex: 60 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div ref={logoRef} className="w-[168px] h-[122px]">
          <Image
            src="/Intro-header-logo.svg"
            width={128}
            height={102}
            priority
            alt="Apex Stainless Logo"
          />
        </div>
      </div>

      {/* 2. HERO BACKGROUND IMAGE (Natural full-color display) */}
      <div className="absolute inset-0 z-0">
        {/* Isolated absolute wrapper to center typography without transform conflicts */}
        <div className="absolute bottom-18 left-32 z-10 w-full max-w-4xl px-4">
          <h1 ref={titleRef} className="font-semibold text-5xl text-white">
            Forging Strength With Absolute Precision
          </h1>
        </div>
        <Image
          ref={heroImgRef}
          src="/homepage-imgs/Hero-b.jpg"
          width={1920}
          height={1080}
          priority
          quality={100}
          alt="Apex Stainless Hero Workspace"
          className="w-full h-full object-cover"
        />
      </div>
    </header>
  );
}
