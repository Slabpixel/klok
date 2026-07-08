import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    return (
        <nav className="fixed top-10 left-0 right-0 z-50">
            <div className="mx-auto bg-white w-full max-w-8xl px-5 sm:px-6 md:px-8 lg:px-10">
                <div className="flex w-full items-center justify-between">
                    <Link href="/">
                        <Image src="/logo.svg" alt="Klok" width={83} height={24} />
                    </Link>
                    <div className="w-full max-w-110 justify-between flex gap-2 text-lg font-medium">
                        <div className="flex gap-4">
                            <button className="underline">EN</button>
                            <button>ID</button>
                        </div>
                        <div className="flex gap-4">
                            <button className="flex items-center uppercase gap-1.5">Cart
                                <span className="flex items-center justify-center p-1.25 pt-0.75">
                                    <Image src="/bag-shopping.svg" alt="" width={16} height={16} />
                                </span>
                            </button>
                            <button className="flex items-center uppercase gap-1.5">Menu<span className="flex items-center justify-center p-1.25 pt-0.75">
                                <Image src="/bars.svg" alt="" width={16} height={16} />
                            </span></button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}