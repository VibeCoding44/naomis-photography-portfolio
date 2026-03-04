import Image from "next/image";

export default function AboutPage() {
    return (
        <main className="pt-32 pb-20 min-h-screen bg-[#0a0a0a] text-[#ededed]">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row gap-16 items-center">
                    {/* Bio Photo */}
                    <div className="w-full md:w-1/2 relative h-[400px] md:h-[600px] overflow-hidden rounded-sm">
                        <Image
                            src="/images/about-photo.jpg"
                            alt="About Us"
                            fill
                            className="object-cover object-top"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>

                    {/* Text Content */}
                    <div className="w-full md:w-1/2">
                        <h1 className="font-serif text-5xl mb-8">About Us</h1>
                        <div className="space-y-6 text-white/70 font-light leading-relaxed text-lg">
                            <p>
                                Cute Company Photography is a family-owned located in the Tampa Bay Area dedicated to preserving what matters most—your family’s memories. Run by four sisters who grew up as the unofficial “memory keepers” of our own family, we’ve learned just how quickly time moves and how precious the in-between moments can be.
                            </p>
                            <p>
                                We believe photographs should do more than document a day—they should hold onto the love, the laughter, and the season of life you’re in, so it never fades. Because while memories can soften with time, a thoughtfully captured image can keep a moment alive forever.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
