import Image from "next/image";

export default function Experiment() {
    return (
        <section className="relative w-full py-17.5 min-h-220 max-h-300 h-dvh overflow-hidden">
            <div className="mx-auto w-full h-full max-w-8xl">
                <div className="flex items-center justify-between flex-col w-full h-full">
                    <div className="flex justify-between w-full px-5 sm:px-6 md:px-8 lg:px-10">
                        <h2 className="text-[3.5rem] max-w-[8em] font-medium leading-[1.1] tracking-[-0.03em] ">
                            Furniture Experiment
                        </h2>
                        <span className="text-lg uppercase font-medium leading-[1.1] tracking-[-0.03em] text-right">
                            Series 1-20
                        </span>
                    </div>
                    <div className="grid grid-cols-12 w-full">
                        <div className="col-span-7 px-5 sm:px-6 md:px-8 lg:px-10 flex flex-col justify-between gap-16 text-lg font-medium tracking-[-0.04em] leading-[1.4]">
                            <div className="flex justify-between w-full">
                                <div className="flex flex-col gap-27">
                                    <div className="flex gap-4">
                                        <span className="font-semibold">-01</span>
                                        <h3>The Origin</h3>
                                    </div>
                                    <button className="w-fit flex gap-2 items-center text-lg font-medium underline cursor-pointer">
                                        Let's Talk
                                        <span className="bg-foreground size-6 flex items-center justify-center">
                                            <Image src="/arrows.svg" alt="" width={10} height={10} />
                                        </span>
                                    </button>
                                </div>
                                <div className="flex gap-4">
                                    <span className="uppercase">Detail</span>
                                    <div className="flex flex-col gap-1 text-foreground/50 text-right">
                                        <div className="pb-2 border-b border-border">
                                            Hand-sculpted Oak
                                        </div>
                                        <div className="pb-2 border-b border-border">
                                            Ergonomic Geometry
                                        </div>
                                        <div className="pb-2 border-b border-border">
                                            Matte Finish
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className="border-border" />
                            <div className="flex justify-between w-full">
                                <div className="flex flex-col gap-27">
                                    <div className="flex gap-4">
                                        <span className="font-semibold">-01</span>
                                        <h3>The Origin</h3>
                                    </div>
                                    <button className="w-fit flex gap-2 items-center text-lg font-medium underline cursor-pointer">
                                        Let's Talk
                                        <span className="bg-foreground size-6 flex items-center justify-center">
                                            <Image src="/arrows.svg" alt="" width={10} height={10} />
                                        </span>
                                    </button>
                                </div>
                                <div className="flex gap-4">
                                    <span className="uppercase">Detail</span>
                                    <div className="flex flex-col gap-1 text-foreground/50 text-right">
                                        <div className="pb-2 border-b border-border">
                                            Hand-sculpted Oak
                                        </div>
                                        <div className="pb-2 border-b border-border">
                                            Ergonomic Geometry
                                        </div>
                                        <div className="pb-2 border-b border-border">
                                            Matte Finish
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative col-span-5">
                            <Image src="/chair.png" alt="" fill className="object-cover" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}