import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="relative w-full pb-10 min-h-180 max-h-300 h-dvh py-38 overflow-hidden">
        <div className="w-full h-full flex flex-col justify-between gap-21">
          <div className="mx-auto w-full max-w-8xl px-5 sm:px-6 md:px-8 lg:px-10">
            <div className="flex flex-col gap-8">
              <div className="flex justify-between gap-8">
                <div className="w-full max-w-148 flex gap-4 justify-between text-xl font-medium leading-[1.4] tracking-[-0.01em]">
                  <span>
                    -7.756944, 110.446944
                  </span>
                  <p className="max-w-62.5 w-full">
                    Eco-friendly furniture made from salvaged timber for relaxation.
                  </p>
                </div>
                <h1 className="max-w-110 w-full text-[3.5rem] font-medium tracking-tighter leading-[1.1] ">
                  Mindful Furniture for Future.
                </h1>
              </div>
              <button className="w-fit flex gap-2 items-center text-xl font-medium underline cursor-pointer">
                Let's Talk
                <span className="bg-foreground size-6 flex items-center justify-center">
                  <Image src="/arrows.svg" alt="" width={10} height={10} />
                </span>
              </button>
            </div>
          </div>
          <div className="mx-auto w-full h-full">
            <div className="relative w-full h-full">
              <div
                className="absolute inset-0 border-y border-border bg-muted bg-center bg-size-[2.5rem_2.5rem] bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)]"
              />
              <div className="relative w-full h-full flex justify-center gap-20">
                <div className="relative aspect-9/10 h-[65%] p-5 flex flex-col justify-between">
                  <Image src="/img-1.png" alt="" fill className="object-cover"/>
                  <div className="absolute inset-0 bg-muted/70"></div>
                </div>
                <div className="relative aspect-9/10 h-[65%] p-5 flex flex-col justify-between">
                  <Image src="/img-2.png" alt="" fill className="object-cover"/>
                  <div className="absolute inset-0 bg-muted/70"></div>
                </div>
                <div className="relative aspect-9/10 h-[90%] p-5 flex flex-col justify-between">
                  <Image src="/img-3.png" alt="" fill className="object-cover"/>
                  <div className="absolute inset-0" style={{background: "linear-gradient(180deg, #F9FAFB -9.77%, rgba(249, 250, 251, 0.00) 43.23%)"}}>

                  </div>
                  <div className="relative flex flex-col gap-1.5 text-sm font-medium leading-none tracking-[-0.02em]">
                    <div className="flex justify-between items-center">
                      <span>Klok Series</span>
                      <span>-01</span>
                    </div>
                    <span className="opacity-50">Lounge Chair</span>
                  </div>
                  <div className="relative flex justify-between items-center">
                    <Image src="/plus.svg" alt="" width={14} height={14} />
                    <Image src="/plus.svg" alt="" width={14} height={14} />
                  </div>
                </div>
                <div className="relative aspect-9/10 h-[65%] p-5 flex flex-col justify-between">
                  <Image src="/img-4.png" alt="" fill className="object-cover"/>
                  <div className="absolute inset-0 bg-muted/70"></div>
                </div>
                <div className="relative aspect-9/10 h-[65%] p-5 flex flex-col justify-between">
                  <Image src="/img-5.png" alt="" fill className="object-cover"/>
                  <div className="absolute inset-0 bg-muted/70"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
