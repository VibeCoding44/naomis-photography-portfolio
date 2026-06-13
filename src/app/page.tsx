import { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/ui/hero";
import { Philosophy } from "@/components/ui/philosophy";
import { CONTACT_INFO, SITE_URL, SOCIAL_LINKS } from "@/lib/constants";

// Google Business Profile map link (derived from the studio's place ID).
const GBP_MAP = "https://www.google.com/maps/place/?q=place_id:ChIJszQJrAhNwgwRx11eqz5r-Ow";

export const metadata: Metadata = {
  title: "Plant City & Tampa Wedding Photographer | Fine Art & Editorial",
  description: "Cute Company Photography is a premier Plant City and Tampa-based photography studio specializing in fine art wedding, commercial, and family portrait photography.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PhotographyBusiness",
    "name": "Cute Company Photography",
    "image": `${SITE_URL}/images/wedding-hero.jpg`,
    "description": "Premier wedding, commercial, and portrait photography serving Plant City, Tampa, and Central Florida.",
    "email": CONTACT_INFO.email,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Plant City",
      "addressRegion": "FL",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "28.0178",
      "longitude": "-82.1165"
    },
    "areaServed": [
      { "@type": "City", "name": "Plant City" },
      { "@type": "City", "name": "Tampa" },
      { "@type": "AdministrativeArea", "name": "Central Florida" }
    ],
    "url": SITE_URL,
    "sameAs": [
      SOCIAL_LINKS.instagram,
      GBP_MAP
    ],
    "hasMap": GBP_MAP,
    "priceRange": "$$$",
    "makesOffer": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Wedding & Elopement Photography", "serviceType": "Wedding photography" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Commercial & Branding Photography", "serviceType": "Commercial photography" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Portrait & Family Photography", "serviceType": "Portrait photography" } }
    ]
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Philosophy />

      {/* Welcome / intro — static, SEO + internal-linking content */}
      <section className="py-24 md:py-32 bg-[#0a0a0a] text-[#ededed] border-t border-white/5">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="font-serif text-3xl md:text-4xl mb-8 text-center">
            Fine Art Wedding &amp; Portrait Photography in Plant City &amp; Tampa Bay
          </h2>
          <div className="space-y-6 text-white/60 font-light leading-relaxed text-lg">
            <p>
              Cute Company Photography is a family-owned studio based in Plant City, Florida,
              serving couples and families across Tampa, Lakeland, Brandon, and all of Central
              Florida. Run by four sisters who grew up as their family&apos;s &ldquo;memory
              keepers,&rdquo; we photograph the moments most worth holding onto — wedding days,
              growing families, milestones, and the quiet in-between.
            </p>
            <p>
              Whether you&apos;re planning an intimate elopement, a full wedding celebration, a
              family or maternity session, or branding imagery for your business, every booking is
              shaped around your story and made with a natural-light, editorial approach. Explore
              our{" "}
              <Link href="/portfolio" className="text-white/90 underline underline-offset-4 decoration-white/30 hover:decoration-white">portfolio</Link>,
              {" "}browse our{" "}
              <Link href="/services" className="text-white/90 underline underline-offset-4 decoration-white/30 hover:decoration-white">services &amp; packages</Link>,
              {" "}or{" "}
              <Link href="/contact" className="text-white/90 underline underline-offset-4 decoration-white/30 hover:decoration-white">get in touch</Link>
              {" "}to check availability for your date.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
