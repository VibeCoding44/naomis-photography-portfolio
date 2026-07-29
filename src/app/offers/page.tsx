import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getOffersPage } from "@/lib/offers";
import { SITE_URL, CONTACT_INFO, SOCIAL_LINKS } from "@/lib/constants";
import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
    title: "Current Offers & Mini Sessions | Plant City & Tampa Photography",
    description:
        "Seasonal mini sessions, graduation specials, and limited-time photography offers from Cute Company Photography, serving Plant City, Tampa Bay, and Central Florida.",
    alternates: {
        canonical: "/offers",
    },
    openGraph: {
        type: "website",
        url: `${SITE_URL}/offers`,
        title: "Current Offers & Mini Sessions | Cute Company Photography",
        description:
            "Seasonal mini sessions and limited-time photography specials across Plant City, Tampa, and Central Florida.",
    },
};

function formatDate(iso: string): string {
    const d = new Date(`${iso.slice(0, 10)}T00:00:00`);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function OffersPage() {
    const page = getOffersPage();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": page.heading,
        "url": `${SITE_URL}/offers`,
        "description": metadata.description,
        ...(page.items.length > 0 && {
            mainEntity: {
                "@type": "OfferCatalog",
                "name": page.heading,
                "itemListElement": page.items.map((offer) => ({
                    "@type": "Offer",
                    "name": offer.title,
                    "description": offer.description,
                    ...(offer.validUntil && { validThrough: offer.validUntil.slice(0, 10) }),
                    "offeredBy": {
                        "@type": "LocalBusiness",
                        "name": "Cute Company Photography",
                        "url": SITE_URL,
                    },
                })),
            },
        }),
    };

    return (
        <main className="pt-32 pb-20 min-h-screen bg-[#0a0a0a] text-[#ededed]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <div className="container mx-auto px-6">
                <div className="mb-16 text-center">
                    <h1 className="font-serif text-5xl md:text-6xl mb-6">{page.heading}</h1>
                    <p className="max-w-2xl mx-auto text-[#9a9189] font-light">{page.intro}</p>
                </div>

                {page.items.length === 0 ? (
                    <div className="max-w-2xl mx-auto text-center border border-[#262626] bg-[#111111] rounded-lg px-8 py-14 mb-20">
                        <h2 className="font-serif text-2xl mb-4">Nothing running right now</h2>
                        <p className="text-[#9a9189] font-light leading-relaxed mb-6">
                            Mini sessions are announced here and on{" "}
                            <a
                                href={SOCIAL_LINKS.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#b07a52] hover:underline"
                            >
                                Instagram
                            </a>{" "}
                            first, usually for fall family photos, spring graduations, and holiday portraits.
                            Full sessions are always open for booking.
                        </p>
                        <Link href="/contact">
                            <Button className="bg-[#ededed] text-[#0a0a0a] hover:bg-[#b07a52]">
                                Ask about your date
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-10 md:grid-cols-2 max-w-4xl mx-auto mb-20">
                        {page.items.map((offer) => (
                            <article
                                key={offer.title}
                                className="overflow-hidden rounded-lg border border-[#262626] bg-[#111111]"
                            >
                                {offer.image && (
                                    <div className="relative aspect-[3/2] overflow-hidden">
                                        <Image
                                            src={offer.image}
                                            alt={`${offer.title}, Cute Company Photography`}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    </div>
                                )}
                                <div className="p-8">
                                    <h2 className="font-serif text-2xl mb-3 leading-snug">{offer.title}</h2>
                                    {offer.price && (
                                        <p className="text-[#b07a52] text-sm tracking-wide mb-3">{offer.price}</p>
                                    )}
                                    <p className="text-[#9a9189] font-light text-sm leading-relaxed mb-4">
                                        {offer.description}
                                    </p>
                                    {offer.validUntil && (
                                        <p className="text-xs uppercase tracking-widest text-[#6f6862] mb-6">
                                            Book by {formatDate(offer.validUntil)}
                                        </p>
                                    )}
                                    <Link href="/contact">
                                        <Button size="sm" className="bg-[#ededed] text-[#0a0a0a] hover:bg-[#b07a52]">
                                            Reserve a spot
                                        </Button>
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                )}

                {/* Evergreen: what our minis and specials are like */}
                <section className="max-w-3xl mx-auto">
                    <h2 className="font-serif text-3xl mb-6 text-center">How our mini sessions work</h2>
                    <div className="space-y-5 text-[#9a9189] font-light leading-relaxed">
                        <p>
                            A mini session is a shorter, set-price version of a full session, usually 15 to 30
                            minutes at one location around Plant City, Tampa, or Lakeland, with a small gallery
                            of hand-edited images delivered through your private online portal. They&apos;re perfect
                            for updated family photos, graduation and senior portraits, announcements, and
                            holiday cards.
                        </p>
                        <p>
                            Because dates and spots are limited, minis are first-come, first-served. When a
                            round opens, it&apos;s posted here with the date, location, and price, and spots are
                            reserved through the{" "}
                            <Link href="/contact" className="text-[#b07a52] hover:underline">
                                contact page
                            </Link>
                            . If you&apos;re after something more personal, our{" "}
                            <Link href="/services" className="text-[#b07a52] hover:underline">
                                full sessions and wedding collections
                            </Link>{" "}
                            are open year-round, and you can see recent shoots on the{" "}
                            <Link href="/sessions" className="text-[#b07a52] hover:underline">
                                Sessions &amp; Stories
                            </Link>{" "}
                            page.
                        </p>
                        <p>
                            Want to hear about the next round before it fills? Follow along on{" "}
                            <a
                                href={SOCIAL_LINKS.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#b07a52] hover:underline"
                            >
                                Instagram
                            </a>{" "}
                            or send a note through the contact page and mention you&apos;d like a heads-up about
                            minis. We keep a short list.
                        </p>
                    </div>
                </section>

                {/* CTA */}
                <section className="mt-20 text-center border-t border-[#262626] pt-16">
                    <h2 className="font-serif text-3xl mb-4">Have a date in mind?</h2>
                    <p className="text-[#9a9189] mb-8 max-w-xl mx-auto font-light">
                        Whether it&apos;s a mini or a full session, reach out with your date and what you&apos;re
                        dreaming up, and we&apos;ll take it from there.
                    </p>
                    <Link href={CONTACT_INFO.bookingUrl} target="_blank" rel="noopener noreferrer">
                        <Button size="lg" className="bg-[#ededed] text-[#0a0a0a] hover:bg-[#b07a52] px-8">
                            Inquire Now
                        </Button>
                    </Link>
                </section>
            </div>
        </main>
    );
}
