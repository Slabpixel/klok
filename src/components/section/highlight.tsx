"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

const blurLayers = [
    { blur: "blur-none", mask: "mask-[linear-gradient(to_bottom,black_0%,black_25%,transparent_45%)]" },
    { blur: "blur-[1px]", mask: "mask-[linear-gradient(to_bottom,transparent_5%,black_25%,black_45%,transparent_65%)]" },
    { blur: "blur-[2px]", mask: "mask-[linear-gradient(to_bottom,transparent_25%,black_45%,black_65%,transparent_85%)]" },
    { blur: "blur-[3.5px]", mask: "mask-[linear-gradient(to_bottom,transparent_45%,black_65%,black_85%,transparent_105%)]" },
    { blur: "blur-[5px]", mask: "mask-[linear-gradient(to_bottom,transparent_65%,black_85%)]" },
];

const slides = [
    { text: "Built for Generations", image: "/badge.png" },
    { text: "Precision in Touch", image: "/img-5.png" },
    { text: "Honoring the Past", image: "/img-1.png" },
];

function ProgressiveText({ text, active }: { text: string; active: boolean }) {
    return (
        <div
            className={`relative shrink-0 text-[10.5cqw] font-medium text-center leading-[1.1] transition-opacity duration-300 ${
                active
                    ? "opacity-100"
                    : "opacity-40 mask-[linear-gradient(to_bottom,transparent_-32%,black_81%)]"
            }`}
        >
            <span className={active ? "" : "text-transparent"}>{text}</span>
            {!active &&
                blurLayers.map((layer) => (
                    <span
                        key={layer.blur}
                        aria-hidden
                        className={`absolute inset-0 ${layer.blur} ${layer.mask}`}
                    >
                        {text}
                    </span>
                ))}
        </div>
    );
}

function getTextOffsets(textTrack: HTMLDivElement, viewport: HTMLElement) {
    const textItems = gsap.utils.toArray<HTMLDivElement>(
        "[data-highlight-text-item]",
        textTrack,
    );
    const viewportCenter = viewport.clientHeight / 2;

    return textItems.map((item) => {
        const itemCenter = textTrack.offsetTop + item.offsetTop + item.offsetHeight / 2;
        return viewportCenter - itemCenter;
    });
}

export default function Highlight() {
    const sectionRef = useRef<HTMLElement>(null);
    const maskRef = useRef<HTMLDivElement>(null);
    const textViewportRef = useRef<HTMLDivElement>(null);
    const textTrackRef = useRef<HTMLDivElement>(null);
    const controlsRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const topButtonRef = useRef<HTMLButtonElement>(null);
    const bottomButtonRef = useRef<HTMLButtonElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useGSAP(
        () => {
            const section = sectionRef.current;
            const mask = maskRef.current;
            const textTrack = textTrackRef.current;
            const textViewport = textViewportRef.current;
            const controls = controlsRef.current;
            const line = lineRef.current;
            const topButton = topButtonRef.current;
            const bottomButton = bottomButtonRef.current;

            if (!section || !mask || !textTrack || !textViewport || !controls || !line || !topButton || !bottomButton) return;

            const images = gsap.utils.toArray<HTMLDivElement>(
                "[data-highlight-image]",
                section,
            );
            const chromeItems = gsap.utils.toArray<HTMLElement>(
                "[data-highlight-chrome-item]",
                controls,
            );
            const textItems = gsap.utils.toArray<HTMLElement>(
                "[data-highlight-text-item]",
                textTrack,
            );

            if (images.length !== slides.length || chromeItems.length !== 4 || textItems.length !== slides.length) return;

            const offsets = getTextOffsets(textTrack, textViewport);
            const clipHidden = "inset(100% 0% 0% 0%)";
            const clipVisible = "inset(0% 0% 0% 0%)";

            gsap.set(textTrack, { y: offsets[0] });
            gsap.set(line, { width: "100%" });
            gsap.set(mask, { scale: 0, transformOrigin: "center center" });
            gsap.set(images[0], { clipPath: clipVisible });
            gsap.set(images.slice(1), { clipPath: clipHidden });
            gsap.set([topButton, bottomButton, ...chromeItems, ...textItems], { clipPath: clipHidden });

            const tl = gsap.timeline({
                defaults: { ease: "power2.inOut" },
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "+=550%",
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                    scrub: 1,
                    invalidateOnRefresh: true,
                    onUpdate: () => {
                        const time = tl.time();
                        if (time < tl.labels["item-1"]) setActiveIndex(0);
                        else if (time < tl.labels["item-2"]) setActiveIndex(1);
                        else setActiveIndex(2);
                    },
                },
            });

            tl.addLabel("intro");
            tl.to(line, {
                width: 3,
                duration: 0.8,
                ease: "power3.inOut",
            });
            tl.to(mask, {
                scale: 1,
                duration: 1,
                ease: "power3.out",
            });
            tl.to(
                textItems,
                {
                    clipPath: clipVisible,
                    duration: 0.35,
                    stagger: 0.05,
                    ease: "power2.out",
                },
                "<+=0.2",
            );
            tl.to(
                topButton,
                {
                    clipPath: clipVisible,
                    duration: 0.4,
                    ease: "power2.out",
                },
                "<+=0.05",
            );
            tl.to(
                bottomButton,
                {
                    clipPath: clipVisible,
                    duration: 0.4,
                    ease: "power2.out",
                },
                "<+=0.1",
            );
            tl.to(
                chromeItems,
                {
                    clipPath: clipVisible,
                    duration: 0.35,
                    stagger: 0.05,
                    ease: "power2.out",
                },
                "<+=0.08",
            );

            tl.addLabel("item-0");
            tl.to({}, { duration: 0.6 });

            tl.addLabel("item-1");
            tl.to(textTrack, {
                y: () => getTextOffsets(textTrack, textViewport)[1],
                duration: 1,
            });
            tl.to(
                images[1],
                { clipPath: clipVisible, duration: 0.8, ease: "power2.inOut" },
                "<+=0.1",
            );
            tl.to({}, { duration: 0.6 });

            tl.addLabel("item-2");
            tl.to(textTrack, {
                y: () => getTextOffsets(textTrack, textViewport)[2],
                duration: 1,
            });
            tl.to(
                images[2],
                { clipPath: clipVisible, duration: 0.8, ease: "power2.inOut" },
                "<+=0.1",
            );
            tl.to({}, { duration: 0.6 });

            tl.addLabel("item-2-end");

            requestAnimationFrame(() => ScrollTrigger.refresh());
        },
        { scope: sectionRef },
    );

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-10 h-dvh bg-primary text-background"
        >
            <div className="mx-auto w-full h-full max-w-8xl px-5 sm:px-6 md:px-8 lg:px-10">
                <div className="flex items-center justify-center w-full h-full">
                    <div ref={controlsRef} className="absolute w-full h-full flex justify-center">
                        <div className="absolute h-full w-full flex justify-between flex-col max-w-8xl px-5 sm:px-6 md:px-8 lg:px-10 py-10">
                            <div className="flex justify-between items-center w-full text-lg font-medium">
                                <div data-highlight-chrome-item>-0{activeIndex + 1}</div>
                                <div data-highlight-chrome-item className="opacity-30">/08</div>
                            </div>
                            <div className="flex justify-between items-center w-full">
                                <Image data-highlight-chrome-item src="/minus.svg" alt="" width={14} height={3} />
                                <Image data-highlight-chrome-item src="/minus.svg" alt="" width={14} height={3} />
                            </div>
                        </div>
                        <div
                            ref={lineRef}
                            className="absolute left-1/2 h-full w-[3px] -translate-x-1/2 bg-background will-change-[width]"
                        />
                        <button
                            ref={topButtonRef}
                            type="button"
                            className="absolute z-1 top-[8%] size-11 outline-8 outline-primary bg-accent flex justify-center items-center cursor-pointer overflow-hidden"
                        >
                            <Image
                                src="/arrows.svg"
                                alt=""
                                width={17}
                                height={20}
                                className="-rotate-90"
                            />
                        </button>
                        <button
                            ref={bottomButtonRef}
                            type="button"
                            className="absolute z-1 bottom-[8%] size-11 outline-8 outline-primary bg-foreground flex justify-center items-center cursor-pointer overflow-hidden"
                        >
                            <Image
                                src="/arrows.svg"
                                alt=""
                                width={17}
                                height={20}
                                className="rotate-90"
                            />
                        </button>
                    </div>

                    <div
                        ref={maskRef}
                        className="@container relative h-[80%] aspect-9/10 mask-[url('/mask.svg')] mask-no-repeat mask-contain mask-center will-change-transform"
                    >
                        {slides.map((slide, index) => (
                            <div
                                key={slide.image}
                                data-highlight-image
                                className="absolute inset-0"
                                style={{
                                    zIndex: index,
                                    clipPath:
                                        index === 0 ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
                                }}
                            >
                                <Image
                                    src={slide.image}
                                    alt=""
                                    fill
                                    priority={index === 0}
                                    sizes="(max-width: 768px) 80vw, 40vw"
                                    className="object-cover"
                                />
                            </div>
                        ))}

                        <div
                            ref={textViewportRef}
                            className="relative z-10 h-full w-full overflow-hidden px-[20%] tracking-[-0.03em]"
                        >
                            <div
                                ref={textTrackRef}
                                className="flex min-h-full w-full flex-col items-center gap-[20cqw] will-change-transform"
                            >
                                {slides.map((slide, index) => (
                                    <div
                                        key={slide.text}
                                        data-highlight-text-item
                                        className="overflow-hidden"
                                    >
                                        <ProgressiveText
                                            text={slide.text}
                                            active={activeIndex === index}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
