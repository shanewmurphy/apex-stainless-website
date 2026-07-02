"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const IndustriesData = [
  {
    id: 1,
    title: "Food Processing",
    description:
      "Hygienic vessels and systems engineered to meet the rigorous demands of modern food production, from raw material handling to finished product storage.",
    image: "/industries-imgs/Food-processing.jpg",
  },
  {
    id: 2,
    title: "Dairy",
    description:
      "Equipment built for the unique challenges of dairy processing — temperature control, CIP compatibility, and surface finishes that protect product integrity at every stage.",
    image: "/industries-imgs/Dairy.jpg", // Code will handle the mapping to /industries-imgs/Diary.jpg below
  },
  {
    id: 3,
    title: "Beverage",
    description:
      "Process vessels and systems designed for consistency, cleanliness, and efficiency across beverage blending, storage, and packaging lines.",
    image: "/industries-imgs/Beverage.jpg",
  },
  {
    id: 4,
    title: "Pharmaceutical",
    description:
      "Precision-engineered equipment manufactured to pharmaceutical-grade standards, supporting validation, traceability, and the highest levels of contamination control.",
    image: "/industries-imgs/Pharmaceutical.jpg",
  },
];

export default function IndustriesScrollTriggerSection() {
  const sectionRef = useRef(null);
  const pinWrapRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sec = sectionRef.current;
    const pinWrap = pinWrapRef.current;
    if (!sec || !pinWrap) return;

    let pinWrapWidth;
    let horizontalScrollLength;

    function refresh() {
      if (pinWrap) {
        pinWrapWidth = pinWrap.scrollWidth;
        horizontalScrollLength = pinWrapWidth - window.innerWidth;
      }
    }

    refresh();

    const ctx = gsap.context(() => {
      gsap.to(pinWrap, {
        scrollTrigger: {
          trigger: sec,
          pin: sec,
          scrub: true,
          start: "center center",
          end: () => `+=${pinWrapWidth}`,
          invalidateOnRefresh: true,
        },
        x: () => -horizontalScrollLength,
        ease: "none",
      });
    });

    ScrollTrigger.addEventListener("refreshInit", refresh);

    return () => {
      ctx.revert();
      ScrollTrigger.removeEventListener("refreshInit", refresh);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="horiz-gallery-wrapper relative overflow-hidden bg-zinc-950 h-screen flex items-center"
    >
      <div
        ref={pinWrapRef}
        className="horiz-gallery-strip flex flex-row flex-nowrap items-center px-12 md:px-24 gap-12 md:gap-16"
      >
        {IndustriesData.map((item) => {
          // Adjust image path for Dairy/Diary filename mismatch in public folder
          const imagePath =
            item.id === 2 ? "/industries-imgs/Diary.jpg" : item.image;

          return (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center justify-center shrink-0 w-[95vw] h-[90vh] gap-6 md:gap-8"
            >
              {/* Left card - Text description */}
              <div className="w-full md:w-[35vw] h-[40vh] md:h-[86vh] bg-[#d9d9d9] rounded-[2rem] md:rounded-[2vw] py-12 px-8 flex flex-col justify-between text-black">
                <span className="text-zinc-600 font-medium text-xl tracking-wider">
                  Industries We Serve
                </span>
                <div className="mt-auto">
                  <h2 className="text-4xl md:text-4xl font-bold tracking-tight text-zinc-950 leading-tight">
                    {item.title}
                  </h2>
                  <p className="text-zinc-800 text-xl md:text-2xl mt-4 font-semibold leading-[1.1] max-w-md">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Right card - Image */}
              <div className="w-full md:w-[55vw] h-[45vh] md:h-[86vh] relative rounded-[2rem] md:rounded-[3vw] overflow-hidden bg-zinc-900">
                <Image
                  src={imagePath}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 55vw"
                  priority={item.id === 1}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
