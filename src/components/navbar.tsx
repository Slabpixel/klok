"use client";

import Link from "next/link";
import Image from "next/image";
import { useLenis } from "lenis/react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

const SCROLL_DELTA = 12;

const fadeMask =
    "mask-[linear-gradient(to_bottom,black_0%,black_38%,transparent_100%)] mask-no-repeat";

const blurLayers = ["backdrop-blur-[3px]", "backdrop-blur-[8px]", "backdrop-blur-[14px]"];

export default function Navbar() {
    const [hidden, setHidden] = useState(false);
    const lastScroll = useRef(0);
    const accumulated = useRef(0);

    useLenis((lenis) => {
        const current = lenis.scroll;
        const diff = current - lastScroll.current;
        lastScroll.current = current;

        if (Math.abs(diff) < 0.5) return;

        if ((diff > 0 && accumulated.current < 0) || (diff < 0 && accumulated.current > 0)) {
            accumulated.current = 0;
        }
        accumulated.current += diff;

        if (accumulated.current > SCROLL_DELTA && current > 80) {
            setHidden(true);
            accumulated.current = 0;
        } else if (accumulated.current < -SCROLL_DELTA) {
            setHidden(false);
            accumulated.current = 0;
        }
    });

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 py-10 transition-transform duration-500 ease-out",
                hidden && "-translate-y-full",
            )}
        >
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className={cn("absolute inset-0 bg-background/50", fadeMask)} />
                {blurLayers.map((blur) => (
                    <div key={blur} className={cn("absolute inset-0", blur, fadeMask)} />
                ))}
            </div>

            <div className="relative mx-auto w-full max-w-8xl px-5 sm:px-6 md:px-8 lg:px-10">
                <div className="flex w-full items-center justify-between">
                    <Link href="/">
                        <Image src="/logo.svg" alt="Klok" width={83} height={24} />
                    </Link>
                    <div className="flex w-full max-w-110 justify-between gap-2 text-lg font-medium">
                        <div className="flex gap-4">
                            <button className="underline">EN</button>
                            <button>ID</button>
                        </div>
                        <div className="flex gap-4">
                            <button className="flex items-center gap-1.5 uppercase">
                                Cart
                                <span className="flex items-center justify-center p-1.25 pt-0.75">
                                    <Image src="/bag-shopping.svg" alt="" width={16} height={16} />
                                </span>
                            </button>
                            <button className="flex items-center gap-1.5 uppercase">
                                Menu
                                <span className="flex items-center justify-center p-1.25 pt-0.75">
                                    <Image src="/bars.svg" alt="" width={16} height={16} />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
