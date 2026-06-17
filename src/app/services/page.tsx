import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CONTACT_INFO } from "@/lib/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Photography Services & Packages | Plant City & Tampa",
    description: "Wedding, portrait, family, and commercial photography packages serving Plant City, Tampa Bay, and Central Florida. See what's included, the experience, and how to book.",
    alternates: {
        canonical: "/services",
    },
};

const SERVICES = [
    {
        name: "Wedding",
        image: "/images/wedding-hero.webp",
        alt: "Fine art wedding photography in Plant City and Tampa, Florida",
        heading: "Wedding & Elopement",
        copy: "From intimate elopements to full celebrations, your wedding day is documented with a fine-art, editorial eye — candid emotion, the quiet in-between moments, and the details you spent months planning. Serving couples across Plant City, Tampa Bay, and all of Central Florida, with coverage built around your timeline rather than a rigid shot list.",
        items: ["Full-day & half-day wedding coverage", "Elopements & micro-weddings", "Engagement & couples sessions", "Bridal & getting-ready coverage"],
    },
    {
        name: "Commercial",
        image: "/images/commercial.webp",
        alt: "Commercial brand and product photography in Tampa Bay, Florida",
        heading: "Commercial & Branding",
        copy: "Strategic visual storytelling for Tampa Bay businesses, brands, and creators who need a polished, consistent look. Whether it's product photography for your shop, branding portraits for your team, or imagery for a marketing campaign, every frame is shot with your brand and end-use in mind.",
        items: ["Brand & personal-branding sessions", "Product & e-commerce photography", "Headshots & team portraits", "Architecture & interiors"],
    },
    {
        name: "Portrait",
        image: "/images/services-midshot.webp",
        alt: "Editorial portrait and family photography in Plant City, Florida",
        heading: "Portrait & Family",
        copy: "Creative, magazine-inspired portraiture for life's milestones and the everyday people you love. From family sessions and maternity to seniors, graduations, and personal editorial shoots, you'll get relaxed direction that makes even camera-shy clients feel at ease — and images that actually look like you.",
        items: ["Family & lifestyle sessions", "Maternity & newborn", "Senior, graduation & birthday", "Editorial & personal branding"],
    },
];

const PROCESS = [
    { step: "01", title: "Inquire & Connect", body: "Reach out with your date, location, and what you have in mind. We'll hop on a quick call or exchange messages to make sure we're the right fit before anything is booked." },
    { step: "02", title: "Plan & Prepare", body: "Once your date is reserved with a deposit, we build a simple plan together — timeline, locations around Tampa Bay, outfits, and any must-have shots — so the day itself feels effortless." },
    { step: "03", title: "Your Session", body: "On the day, you relax and be present. You'll get gentle direction where you want it and plenty of room for the real, candid moments that make the best photographs." },
    { step: "04", title: "Gallery & Delivery", body: "Your hand-edited, high-resolution gallery is delivered through a private online portal with personal printing rights — ready to share, print, and keep for a lifetime." },
];

const AREAS = ["Plant City", "Tampa", "Lakeland", "Brandon", "Riverview", "Valrico", "Dover", "Central Florida"];

const FAQS = [
    {
        q: "How much does a photography session cost in Plant City and Tampa?",
        a: "Every booking is tailored to your story, so pricing is shared as a custom quote built around your date, location, and the coverage you need. Reach out with your details and you'll receive a personalized collection guide for portrait, branding, or wedding photography across Tampa Bay and Central Florida.",
    },
    {
        q: "How far in advance should I book a wedding photographer?",
        a: "For weddings, 9–12 months out is ideal, especially for peak Florida season (October–April). Portrait and branding sessions can often be scheduled within a few weeks — but popular weekends fill quickly, so reach out as early as you can.",
    },
    {
        q: "Do you travel outside Plant City and Tampa?",
        a: "Yes. Sessions and weddings throughout Central Florida are welcome, and travel beyond the Tampa Bay area is available — just include your location when you inquire and we'll include any travel details in your custom quote.",
    },
    {
        q: "Do you require a deposit to reserve my date?",
        a: "Yes. Your date is reserved once a deposit is placed, after which we build a simple plan together — timeline, locations around Tampa Bay, outfits, and any must-have shots — so the day itself feels effortless.",
    },
    {
        q: "What's included with my photos?",
        a: "You'll receive a hand-edited, high-resolution gallery delivered through a private online portal with personal printing rights — ready to share, print, and keep for a lifetime.",
    },
    {
        q: "When will we receive our photos?",
        a: "Portrait and branding galleries are typically delivered within 1–2 weeks, and weddings within 4–6 weeks. You'll also receive a small set of preview images shortly after your session or wedding day.",
    },
];

// FAQPage structured data, generated from the same FAQS array rendered below so
// the visible content and the markup can never drift (a Google requirement).
const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map((f) => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
};

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] text-[#ededed]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            {/* Hero Section */}
            <section className="pt-40 pb-20 px-6 container mx-auto text-center">
                <h1 className="font-serif text-5xl md:text-7xl mb-6">Curated Photography Services</h1>
                <p className="text-white/60 text-lg max-w-2xl mx-auto font-light">
                    Fine-art wedding, portrait, family, and commercial photography for Plant City, Tampa Bay,
                    and Central Florida. Every session is tailored to your story — explore the collections below,
                    then reach out to check availability for your date.
                </p>
            </section>

            {/* Services Grid */}
            <section className="px-6 pb-24 container mx-auto">
                <div className="grid md:grid-cols-3 gap-8">
                    {SERVICES.map((s) => (
                        <div key={s.name} className="group space-y-6">
                            <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-white/5">
                                <Image
                                    src={s.image}
                                    alt={s.alt}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            </div>
                            <div>
                                <h2 className="font-serif text-3xl mb-4">{s.heading}</h2>
                                <p className="text-white/60 font-light mb-6 text-sm leading-relaxed">{s.copy}</p>
                                <ul className="space-y-2 mb-2 border-t border-white/10 pt-4">
                                    {s.items.map((item) => (
                                        <li key={item} className="flex items-center text-sm text-white/80">
                                            <span className="text-white/40 mr-2">✓</span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* The Experience / Process */}
            <section className="py-24 bg-[#0F0F0F] border-t border-white/5">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-4xl mb-4">The Experience</h2>
                        <p className="text-white/60 max-w-2xl mx-auto font-light">
                            Booking a photographer should feel exciting, not stressful. Here's how working
                            together unfolds, from first hello to final gallery.
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
                        {PROCESS.map((p) => (
                            <div key={p.step}>
                                <div className="font-serif text-3xl text-white/30 mb-3">{p.step}</div>
                                <h3 className="font-serif text-xl mb-3">{p.title}</h3>
                                <p className="text-white/60 font-light text-sm leading-relaxed">{p.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Investment */}
            <section className="py-24 container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="font-serif text-4xl mb-4">Investment</h2>
                    <p className="text-white/60 max-w-2xl mx-auto font-light">
                        Every booking is tailored to your story, so pricing is shared in a custom quote
                        built around your date, location, and the coverage you need. Reach out and you'll
                        receive a personalized collection guide.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    <div className="border border-white/10 rounded-sm p-8 text-center">
                        <h3 className="font-serif text-2xl mb-2">Portrait & Family</h3>
                        <p className="text-white/80 text-lg mb-1">Custom quote</p>
                        <p className="text-white/50 font-light text-sm">On-location sessions across Tampa Bay and Central Florida.</p>
                    </div>
                    <div className="border border-white/10 rounded-sm p-8 text-center">
                        <h3 className="font-serif text-2xl mb-2">Commercial & Branding</h3>
                        <p className="text-white/80 text-lg mb-1">Custom quote</p>
                        <p className="text-white/50 font-light text-sm">Half-day and full-day rates for brands and products.</p>
                    </div>
                    <div className="border border-white/10 rounded-sm p-8 text-center">
                        <h3 className="font-serif text-2xl mb-2">Weddings</h3>
                        <p className="text-white/80 text-lg mb-1">Custom quote</p>
                        <p className="text-white/50 font-light text-sm">Elopement, micro-wedding, and full-day collections.</p>
                    </div>
                </div>
                <p className="text-white/40 text-xs text-center mt-6 font-light">Tailored pricing for every booking — contact us for your personalized quote.</p>
            </section>

            {/* Areas Served */}
            <section className="py-20 bg-[#0F0F0F] border-t border-white/5">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="font-serif text-3xl mb-4">Proudly Serving Tampa Bay & Central Florida</h2>
                    <p className="text-white/60 max-w-2xl mx-auto font-light mb-8">
                        Based in Plant City, FL and available for sessions, weddings, and commercial work
                        throughout the surrounding communities:
                    </p>
                    <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 max-w-2xl mx-auto">
                        {AREAS.map((a) => (
                            <li key={a} className="text-sm text-white/70 border border-white/10 rounded-full px-4 py-1">{a}</li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 container mx-auto px-6">
                <h2 className="font-serif text-4xl mb-12 text-center">Common Questions</h2>
                <div className="max-w-3xl mx-auto space-y-8">
                    {FAQS.map((f) => (
                        <div key={f.q} className="border-b border-white/10 pb-8">
                            <h3 className="font-serif text-xl mb-3">{f.q}</h3>
                            <p className="text-white/60 font-light leading-relaxed">{f.a}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-[#0F0F0F] border-t border-white/5">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="font-serif text-4xl mb-6">Ready to capture your story?</h2>
                    <p className="text-white/60 mb-8 max-w-xl mx-auto font-light">
                        Let&apos;s create something beautiful together. Reach out to check availability and discuss your vision.
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
