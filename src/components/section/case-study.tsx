"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const BG_STRENGTH = { x: 42, y: 32 };
const EYE_STRENGTH = { x: 18, y: 14 };

export default function CaseStudy() {
    const sectionRef = useRef<HTMLElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const eyeIconRef = useRef<HTMLDivElement>(null);

    useGSAP(
        (context, contextSafe) => {
            const section = sectionRef.current;
            const bg = bgRef.current;
            const eye = eyeIconRef.current;
            if (!section || !bg || !eye) return;

            const wrapHandler = <T extends (...args: never[]) => void>(fn: T) =>
                contextSafe ? contextSafe(fn) : fn;

            const bgX = gsap.quickTo(bg, "x", { duration: 0.7, ease: "power3.out" });
            const bgY = gsap.quickTo(bg, "y", { duration: 0.7, ease: "power3.out" });
            const eyeX = gsap.quickTo(eye, "x", { duration: 0.55, ease: "power3.out" });
            const eyeY = gsap.quickTo(eye, "y", { duration: 0.55, ease: "power3.out" });

            const onMove = wrapHandler((event: MouseEvent) => {
                const rect = section.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width - 0.5;
                const y = (event.clientY - rect.top) / rect.height - 0.5;

                bgX(x * BG_STRENGTH.x);
                bgY(y * BG_STRENGTH.y);
                eyeX(x * EYE_STRENGTH.x);
                eyeY(y * EYE_STRENGTH.y);
            });

            const onLeave = wrapHandler(() => {
                bgX(0);
                bgY(0);
                eyeX(0);
                eyeY(0);
            });

            section.addEventListener("mousemove", onMove);
            section.addEventListener("mouseleave", onLeave);

            return () => {
                section.removeEventListener("mousemove", onMove);
                section.removeEventListener("mouseleave", onLeave);
            };
        },
        { scope: sectionRef },
    );

    return (
        <section
            ref={sectionRef}
            className="relative h-dvh w-full overflow-hidden py-15 text-background"
        >
            <div ref={bgRef} className="absolute inset-0 scale-110 will-change-transform">
                <Image
                    src="/case.png"
                    alt=""
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                />
            </div>
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "linear-gradient(189deg, rgba(36, 19, 11, 0.80) 10.87%, rgba(36, 19, 11, 0.10) 30.87%, rgba(36, 19, 11, 0.00) 50.87%, rgba(36, 19, 11, 0.10) 70.86%, rgba(36, 19, 11, 0.90) 90.86%)",
                }}
            />
            <div className="relative mx-auto h-full w-full max-w-8xl px-5 sm:px-6 md:px-8 lg:px-10">
                <div className="relative flex h-full w-full flex-col justify-between">
                    <div className="flex justify-between gap-2">
                        <span className="text-lg font-medium uppercase">VR Case Study</span>
                        <h2 className="max-w-[8em] text-[3.5rem] leading-[1.1] font-medium tracking-[-0.03em]">
                            Experience Your Space, Reimagined
                        </h2>
                    </div>
                    <div className="flex items-end justify-between gap-2">
                        <p className="w-full max-w-[24.5em] text-lg leading-normal tracking-[-0.04em] text-background/80">
                            Eliminate the guesswork. Through our VR Case Study integration, you can
                            virtually place Klok masterpieces in your own home. See the scale, feel
                            the texture, and find the perfect fit before it ever leaves our
                            workshop.
                        </p>
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-3">
                                <button className="inline-flex gap-2 text-lg leading-none font-medium tracking-[-0.06em] opacity-40 hover:opacity-100 transition-opacity">
                                    <span className="h-fit">01</span>
                                    <span className="text-[1.75rem]">Material Customization</span>
                                </button>
                                <Image src="/or.svg" alt="" width={13} height={28} />
                                <button className="inline-flex gap-2 text-lg leading-none font-medium tracking-[-0.06em] opacity-40 hover:opacity-100 transition-opacity">
                                    <span className="h-fit">02</span>
                                    <span className="text-[1.75rem]">Lighting Simulation</span>
                                </button>
                            </div>
                            <div className="flex gap-3">
                                <button className="inline-flex gap-2 text-lg leading-none font-medium tracking-[-0.06em]">
                                    <span className="h-fit">03</span>
                                    <span className="text-[1.75rem]">Spatial Visualization</span>
                                </button>
                                <Image src="/or.svg" alt="" width={13} height={13} />
                                <button className="inline-flex gap-2 text-lg leading-none font-medium tracking-[-0.06em] opacity-40 hover:opacity-100 transition-opacity">
                                    <span className="h-fit">04</span>
                                    <span className="text-[1.75rem]">Bespoke Engineering</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-4">
                        <div
                            className="absolute top-1/2 left-1/2 -z-1 aspect-square size-84 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30"
                            style={{
                                background:
                                    "radial-gradient(50% 50% at 50% 50%, #24130B 0%, rgba(36, 19, 11, 0.80) 50%, rgba(36, 19, 11, 0.00) 100%)",
                            }}
                        />
                        <div className="flex flex-col items-center -space-y-2">
                            <div className="flex size-24 items-center justify-center rounded-full border-[1.64px] border-background backdrop-blur-sm">
                                <div ref={eyeIconRef} className="will-change-transform">
                                    <Image src="/eye.svg" alt="" width={39} height={34} />
                                </div>
                            </div>
                            <Image src="/arrow-start-end.svg" alt="" width={108} height={22} />
                        </div>
                        <span className="text-lg leading-normal font-medium tracking-[-0.04em]">
                            Swipe to discover more products.
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
