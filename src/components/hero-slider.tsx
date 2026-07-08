"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Core, { type CoreConfig } from "smooothy";

const AUTOPLAY_DELAY = 3500;

const slides = [
  { src: "/img-1.png", series: "Klok Series", number: "-01", name: "Record Cabinet" },
  { src: "/img-2.png", series: "Klok Series", number: "-02", name: "Wave Chair" },
  { src: "/img-3.png", series: "Klok Series", number: "-03", name: "Lounge Chair" },
  { src: "/img-4.png", series: "Klok Series", number: "-04", name: "Dining Chair" },
  { src: "/img-5.png", series: "Klok Series", number: "-05", name: "Armchair" },
];

function useSmooothy(config: Partial<CoreConfig> = {}) {
  const [slider, setSlider] = useState<Core | null>(null);
  const configRef = useRef(config);

  const ref = (node: HTMLElement | null) => {
    if (node && !slider) {
      setSlider(new Core(node, configRef.current));
    }
  };

  useEffect(() => {
    if (!slider) return;
    const update = slider.update.bind(slider);
    gsap.ticker.add(update);
    return () => {
      gsap.ticker.remove(update);
      slider.destroy();
    };
  }, [slider]);

  return { ref, slider };
}

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const hoverPaused = useRef(false);

  const { ref, slider } = useSmooothy({
    infinite: true,
    snap: true,
    onSlideChange: (current) => {
      setActiveIndex(((current % slides.length) + slides.length) % slides.length);
    },
  });

  useEffect(() => {
    if (!slider) return;
    const id = setInterval(() => {
      if (!hoverPaused.current && !slider.isDragging) {
        slider.goToNext();
      }
    }, AUTOPLAY_DELAY);
    return () => clearInterval(id);
  }, [slider]);

  return (
    <div
      ref={ref}
      className="relative w-full h-full flex items-start overflow-x-hidden px-[calc(50%-42.5vw)] md:px-[calc(50%-12.5vw)] cursor-grab active:cursor-grabbing select-none"
      onMouseEnter={() => (hoverPaused.current = true)}
      onMouseLeave={() => (hoverPaused.current = false)}
    >
      {slides.map((slide, i) => {
        const isActive = i === activeIndex;
        return (
          <div
            key={slide.src}
            className="shrink-0 w-[85vw] md:w-[25vw] h-full flex items-start justify-center"
          >
            <div
              className={`relative aspect-9/10 p-5 flex flex-col justify-between transition-all duration-500 ease-out ${
                isActive ? "h-[90%]" : "h-[65%]"
              }`}
            >
              <Image
                src={slide.src}
                alt={slide.name}
                fill
                priority
                sizes="(max-width: 768px) 85vw, 25vw"
                draggable={false}
                className="object-cover"
              />
              {/* dim overlay on inactive slides */}
              <div
                className={`absolute inset-0 bg-muted/70 transition-opacity duration-500 ${
                  isActive ? "opacity-0" : "opacity-100"
                }`}
              />
              {/* top fade so the text stays readable on the active slide */}
              <div
                className={`absolute inset-0 transition-opacity duration-500 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  background:
                    "linear-gradient(180deg, #F9FAFB -9.77%, rgba(249, 250, 251, 0.00) 43.23%)",
                }}
              />
              <div
                className={`relative flex flex-col gap-1.5 text-sm font-medium leading-none tracking-[-0.02em] transition-opacity duration-500 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span>{slide.series}</span>
                  <span>{slide.number}</span>
                </div>
                <span className="opacity-50">{slide.name}</span>
              </div>
              <div
                className={`relative flex justify-between items-center transition-opacity duration-500 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image src="/plus.svg" alt="" width={14} height={14} />
                <Image src="/plus.svg" alt="" width={14} height={14} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
