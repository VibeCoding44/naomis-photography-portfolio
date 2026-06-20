import { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/ui/hero";
import { Philosophy } from "@/components/ui/philosophy";
import { CONTACT_INFO, SITE_URL, SOCIAL_LINKS } from "@/lib/constants";

// Google Business Profile map link (derived from the business's place ID).
const GBP_MAP = "https://www.google.com/maps/place/?q=place_id:ChIJszQJrAhNwgwRx11eqz5r-Ow";

export const metadata: Metadata = {
  title: "Plant City & Tampa Wedding Photographer | Fine Art & Editorial",
  description: "Cute Company Photography is a family-owned, Plant City and Tampa-based photography team specializing in fine art wedding, commercial, and family portrait photography across Central Florida.",
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
    "telephone": CONTACT_INFO.phoneE164,
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
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Thursday", "Friday", "Saturday"],
        "opens": "06:30",
        "closes": "20:30"
      }
    ],
    "makesOffer": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Wedding & Elopement Photography", "serviceType": "Wedding photography" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Commercial & Branding Photography", "serviceType": "Commercial photography" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Portrait & Family Photography", "serviceType": "Portrait photography" } }
    ]
  };

  // Real client testimonials. Add entries as genuine client reviews come in
  // (e.g. { quote: "…", name: "First L.", detail: "Wedding · 2026" }).
  // Left empty intentionally — we do not display the owner's own Google review,
  // and we do not add aggregateRating schema (first-party self-rating violates
  // Google's guidelines; the star rating below is display-only and links to GBP).
  const TESTIMONIALS: { quote: string; name: string; detail?: string }[] = [];

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
              Cute Company Photography is a family-owned photography team based in Plant City,
              Florida, serving couples and families across Tampa, Lakeland, Brandon, and all of
              Central Florida. Run by four sisters who grew up as their family&apos;s &ldquo;memory
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

      {/* Social proof — display-only Google rating (NOT aggregateRating schema) + client testimonials */}
      <section className="py-24 md:py-32 bg-[#0f0f0f] text-[#ededed] border-t border-white/5">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <div className="flex items-center justify-center gap-1 text-amber-400 text-2xl" aria-hidden="true">
            ★★★★★
          </div>
          <p className="mt-4 font-serif text-2xl md:text-3xl">Rated 5.0 on Google</p>
          <p className="mt-3 text-white/60 font-light">
            Loved by the couples and families we&apos;ve photographed across Plant City &amp; Tampa Bay.
          </p>
          <a
            href={GBP_MAP}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block text-white/90 underline underline-offset-4 decoration-white/30 hover:decoration-white"
          >
            Read our reviews on Google
          </a>

          {/* External trust badges — "As Seen on The Knot" + WeddingWire (WeddingPro). Plain <img> by design: third-party hosts, no next/image remote-host config needed. */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <a
              href="https://www.theknot.com/marketplace/redirect-2105977?utm_source=vendor_website&utm_medium=banner&utm_term=dbb9e11e-5670-41fe-96b7-ed1a512d3879&utm_campaign=vendor_badge_assets"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="As Seen on The Knot"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://d13ns7kbjmbjip.cloudfront.net/For_Your_Website/TK-badge_AsSeen.png"
                alt="As Seen on The Knot"
                width={190}
                height={80}
                loading="lazy"
                className="h-14 w-auto"
              />
            </a>
            <a
              href="https://www.weddingwire.com"
              target="_blank"
              rel="nofollow noopener noreferrer"
              title="weddingwire.com"
              aria-label="Reviewed on WeddingWire"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://www.weddingwire.com/images/sellos/partner--pp2234610.png"
                alt="Reviewed on WeddingWire"
                width={125}
                height={125}
                loading="lazy"
                className="h-14 w-auto"
              />
            </a>
          </div>

          {TESTIMONIALS.length > 0 && (
            <div className="mt-16 grid gap-8 md:grid-cols-2 text-left">
              {TESTIMONIALS.map((t, i) => (
                <figure key={i} className="border border-white/10 rounded-lg p-8 bg-[#0a0a0a]">
                  <blockquote className="text-white/70 font-light leading-relaxed text-lg">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-5 text-sm text-white/50">
                    — {t.name}
                    {t.detail ? <span className="text-white/30"> · {t.detail}</span> : null}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
