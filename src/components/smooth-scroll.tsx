"use client";

import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

type SmoothScrollProps = {
  children: ReactNode;
};

function LenisScrollTriggerSync() {
  const lenis = useLenis();

  useGSAP(
    () => {
      if (!lenis) return;

      const lenisInstance = lenis;
      const scrollRoot = document.documentElement;

      ScrollTrigger.scrollerProxy(scrollRoot, {
        scrollTop(value) {
          if (arguments.length) {
            lenisInstance.scrollTo(value as number, { immediate: true });
          }
          return lenisInstance.scroll;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        pinType: scrollRoot.style.transform ? "transform" : "fixed",
      });

      lenisInstance.on("scroll", ScrollTrigger.update);

      function update(time: number) {
        lenisInstance.raf(time * 1000);
      }

      gsap.ticker.add(update);
      gsap.ticker.lagSmoothing(0);

      ScrollTrigger.refresh();

      return () => {
        lenisInstance.off("scroll", ScrollTrigger.update);
        gsap.ticker.remove(update);
        ScrollTrigger.scrollerProxy(scrollRoot, {});
      };
    },
    { dependencies: [lenis] },
  );

  return null;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<LenisRef>(null);

  return (
    <ReactLenis
      root
      options={{ autoRaf: false, anchors: true, duration: 0.5 }}
      ref={lenisRef}
    >
      <LenisScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}
