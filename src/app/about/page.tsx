import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About the Photographers | Plant City & Tampa",
    description: "Meet the four sisters behind Cute Company Photography — a family-owned, Plant City and Tampa-based team crafting fine art wedding, portrait, and commercial imagery across Central Florida.",
    alternates: {
        canonical: "/about",
    },
};

export default function AboutPage() {
    return (
        <main className="pt-32 pb-20 min-h-screen bg-[#0a0a0a] text-[#ededed]">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row gap-16 items-center">
                    {/* Bio Photo */}
                    <div className="w-full md:w-1/2 relative h-[400px] md:h-[600px] overflow-hidden rounded-sm">
                        <Image
                            src="/images/about-photo.webp"
                            alt="The four sisters behind Cute Company Photography, family-owned photographers in Plant City, FL"
                            fill
                            className="object-cover object-top"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>

                    {/* Text Content */}
                    <div className="w-full md:w-1/2">
                        <h1 className="font-serif text-5xl mb-8">About Us</h1>
                        <div className="space-y-6 text-[#dcdcdc] font-light leading-relaxed text-lg">
                            <p>
                                Cute Company Photography is a family-owned photography team based in the Tampa Bay Area, dedicated to preserving what matters most—your family’s memories. Run by four sisters who grew up as the unofficial “memory keepers” of our own family, we’ve learned just how quickly time moves and how precious the in-between moments can be.
                            </p>
                            <p>
                                We believe photographs should do more than document a day—they should hold onto the love, the laughter, and the season of life you’re in, so it never fades. Because while memories can soften with time, a thoughtfully captured image can keep a moment alive forever.
                            </p>
                            <p>
                                From our home base in Plant City, we photograph weddings, elopements, engagements, growing families, maternity and newborn sessions, senior portraits, and branding imagery for local businesses—traveling to couples and families throughout Tampa, Lakeland, Brandon, and across Central Florida. Wherever your story takes place, we come to you.
                            </p>
                            <p>
                                Our style is rooted in natural light, candid and unscripted moments, and true-to-life editing with warm, cinematic tones. The goal is simple: relaxed sessions that feel like time with people who care, and images that actually look and feel like you.
                            </p>
                            <p>
                                We’d love to hear your story. Take a look at our{" "}
                                <Link href="/services" className="text-[#b07a52] underline underline-offset-4 decoration-[#b07a52]/40 hover:text-[#ededed]">photography services</Link>
                                {" "}or{" "}
                                <Link href="/contact" className="text-[#b07a52] underline underline-offset-4 decoration-[#b07a52]/40 hover:text-[#ededed]">reach out</Link>
                                {" "}to check availability for your date.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
