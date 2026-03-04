import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CONTACT_INFO } from "@/lib/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Photography Services & Packages | Plant City & Tampa",
    description: "Tailored photography packages for Weddings, Commercial Branding, and Editorial Portraits in Plant City and Tampa Bay.",
};

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] text-[#ededed]">
            {/* Hero Section */}
            <section className="pt-40 pb-20 px-6 container mx-auto text-center">
                <h1 className="font-serif text-5xl md:text-7xl mb-6">Curated Photography Services</h1>
                <p className="text-white/60 text-lg max-w-2xl mx-auto font-light">
                    Capturing moments with elegance and artistry. Explore our tailored service packages designed to tell your unique story.
                </p>
            </section>

            {/* Services Grid */}
            <section className="px-6 pb-32 container mx-auto">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Wedding Category */}
                    <div className="group space-y-6">
                        <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-white/5">
                            <Image
                                src="/images/wedding-hero.jpg"
                                alt="Wedding Photography"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        </div>
                        <div>
                            <h2 className="font-serif text-3xl mb-4">Wedding</h2>
                            <p className="text-white/60 font-light mb-6 text-sm leading-relaxed">
                                Timeless documentation of your special day, focusing on candid emotion, beautiful details, and lasting memories.
                            </p>
                            <ul className="space-y-2 mb-8 border-t border-white/10 pt-4">
                                <li className="flex items-center text-sm text-white/80"><span className="text-white/40 mr-2">✓</span> Wedding</li>
                                <li className="flex items-center text-sm text-white/80"><span className="text-white/40 mr-2">✓</span> Couples</li>
                                <li className="flex items-center text-sm text-white/80"><span className="text-white/40 mr-2">✓</span> Elopement</li>
                            </ul>
                        </div>
                    </div>

                    {/* Commercial Category */}
                    <div className="group space-y-6">
                        <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-white/5">
                            <Image
                                src="/images/commercial.jpg"
                                alt="Commercial Photography"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        </div>
                        <div>
                            <h2 className="font-serif text-3xl mb-4">Commercial</h2>
                            <p className="text-white/60 font-light mb-6 text-sm leading-relaxed">
                                Strategic visual storytelling for brands, products, and marketing campaigns that require a polished, professional look.
                            </p>
                            <ul className="space-y-2 mb-8 border-t border-white/10 pt-4">
                                <li className="flex items-center text-sm text-white/80"><span className="text-white/40 mr-2">✓</span> Branding</li>
                                <li className="flex items-center text-sm text-white/80"><span className="text-white/40 mr-2">✓</span> Product</li>
                                <li className="flex items-center text-sm text-white/80"><span className="text-white/40 mr-2">✓</span> Architecture</li>
                            </ul>
                        </div>
                    </div>

                    {/* Portrait Category */}
                    <div className="group space-y-6">
                        <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-white/5">
                            <Image
                                src="/images/services-midshot.jpg"
                                alt="Portrait Photography"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        </div>
                        <div>
                            <h2 className="font-serif text-3xl mb-4">Portrait & Lifestyle</h2>
                            <p className="text-white/60 font-light mb-6 text-sm leading-relaxed">
                                Creative direction and high-fashion photography designed for magazines, personal branding, and life's milestones.
                            </p>
                            <ul className="space-y-2 mb-8 border-t border-white/10 pt-4">
                                <li className="flex items-center text-sm text-white/80"><span className="text-white/40 mr-2">✓</span> Portrait</li>
                                <li className="flex items-center text-sm text-white/80"><span className="text-white/40 mr-2">✓</span> Family</li>
                                <li className="flex items-center text-sm text-white/80"><span className="text-white/40 mr-2">✓</span> Maternity</li>
                                <li className="flex items-center text-sm text-white/80"><span className="text-white/40 mr-2">✓</span> Birthday & Graduation</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-[#0F0F0F] border-t border-white/5">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="font-serif text-4xl mb-6">Ready to capture your story?</h2>
                    <p className="text-white/60 mb-8 max-w-xl mx-auto font-light">
                        Let's create something beautiful together. Reach out to check availability and discuss your vision.
                    </p>
                    <Link href={CONTACT_INFO.bookingUrl} target="_blank" rel="noopener noreferrer">
                        <Button size="lg" className="bg-white text-black hover:bg-white/90 px-8">
                            Inquire Now
                        </Button>
                    </Link>
                </div>
            </section>
        </main>
    );
}
