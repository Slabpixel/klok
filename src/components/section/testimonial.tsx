export default function Testimonial() {
    return (
        <section className="relative w-full py-17.5 min-h-225 h-full overflow-hidden">
            <div className="h-full w-full flex flex-col justify-between gap-30">
                <div className="mx-auto w-full h-full max-w-8xl px-5 sm:px-6 md:px-8 lg:px-10">

                    <div className="flex justify-between items-start gap-2">
                        <h2 className="text-[3.5rem] font-medium leading-[1.1] tracking-[-0.03em]">
                            Voices <br /> of Comfort
                        </h2>
                        <div className="flex gap-6 justify-end items-center">
                            <div className="text-lg font-medium">
                                <span className="opacity-30">-02</span>
                                <span>/04</span>
                            </div>
                            <div className="relative max-w-105 w-[20vw] h-[3px] bg-secondary">
                                <div className="absolute top-0 left-0 h-full w-1/2 bg-foreground"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative mx-auto w-full min-h-150 h-full">
                   
                        <div
                            className="absolute inset-0 border-y border-border bg-muted bg-center bg-size-[2.5rem_2.5rem] bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)]"
                        />
                  
                </div>
            </div>
        </section>
    )
}