import { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { Marquee } from "@/components/ui/marquee";
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

// Portfolio bento tiles — real .webp assets under /public/images.
const BENTO: { src: string; caption: string; className: string }[] = [
  {
    src: "/images/uploads/micro-wedding-plant-city-01.webp",
    caption: "Micro wedding · Plant City",
    className: "col-span-12 sm:col-span-7 row-span-2",
  },
  {
    src: "/images/portraits/bonnet-springs-engagement-lakeland-02.webp",
    caption: "Engagement · Bonnet Springs, Lakeland",
    className: "col-span-12 sm:col-span-5",
  },
  {
    src: "/images/uploads/eureka-springs-engagement-tampa-01.webp",
    caption: "Engagement · Eureka Springs, Tampa",
    className: "col-span-6 sm:col-span-5",
  },
  {
    src: "/images/portraits/gala-downtown-tampa-01.webp",
    caption: "Gala · Downtown Tampa",
    className: "col-span-6 sm:col-span-4",
  },
  {
    src: "/images/portraits/formal-portrait-bonnet-springs-lakeland-02.webp",
    caption: "Formal portrait · Lakeland",
    className: "col-span-6 sm:col-span-4 row-span-2",
  },
  {
    src: "/images/portraits/birthday-portrait-bonnet-springs-lakeland-01.webp",
    caption: "Birthday portrait · Lakeland",
    className: "col-span-6 sm:col-span-4",
  },
];

const SERVICES = [
  "Weddings",
  "Elopements",
  "Engagements",
  "Family",
  "Maternity & Newborn",
  "Portraits",
  "Senior",
  "Commercial & Branding",
];

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
    <main className="min-h-screen bg-[#0a0a0a] text-[#ededed]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Reveal />

      {/* ───────────────────────── Hero ───────────────────────── */}
      <section className="relative isolate overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/wedding-hero.webp"
          alt="Fine-art wedding photography in Central Florida by Cute Company Photography"
          loading="eager"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        {/* Dark wash for legibility over the hero photo. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0a0a0a]/95 via-[#0a0a0a]/80 to-[#0a0a0a]/35"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0a0a0a]/90 via-transparent to-[#111111]/30"
        />

        <div className="wrap">
          <div className="flex min-h-[88vh] max-w-2xl flex-col justify-center py-28 md:py-36">
            <p className="eyebrow reveal">Fine-art wedding &amp; portrait photography</p>
            <h1 className="reveal mt-5 text-[clamp(2.6rem,6vw,4.75rem)] leading-[1.04]">
              The moments most worth holding onto.
            </h1>
            <p className="reveal prose-cormorant mt-7 max-w-xl">
              A family-owned studio in Plant City, photographing weddings, families, and
              milestones across Tampa Bay and Central Florida with a calm, natural-light,
              editorial eye.
            </p>

            <div className="reveal mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[#ededed] px-7 py-3.5 text-sm tracking-wide text-[#111111] transition-colors hover:bg-[#b07a52]"
              >
                Inquire
              </Link>
              <Link
                href="/portfolio"
                className="group inline-flex items-center gap-2 rounded-full border border-[#ededed]/20 bg-[#111111]/70 px-7 py-3.5 text-sm tracking-wide text-[#ededed] backdrop-blur-sm transition-colors hover:border-[#b07a52] hover:text-[#b07a52]"
              >
                View portfolio
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
            </div>

            <ul className="reveal mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-[#9a9189]">
              <li className="serif-i text-[1.05rem] text-[#ededed]">Plant City · Tampa · Central Florida</li>
              <li aria-hidden="true" className="hidden text-[#262626] sm:inline">/</li>
              <li>Rated 5.0 on Google</li>
              <li aria-hidden="true" className="hidden text-[#262626] sm:inline">/</li>
              <li>Family-owned, four sisters</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ──────────────── Intro / SEO welcome ──────────────── */}
      <section className="py-24 md:py-32 border-t border-[#262626]">
        <div className="wrap max-w-3xl text-center">
          <p className="eyebrow reveal">Welcome</p>
          <h2 className="reveal mt-4 text-3xl md:text-4xl">
            Fine Art Wedding &amp; Portrait Photography in Plant City &amp; Tampa Bay
          </h2>
          <div className="reveal mt-8 space-y-6 prose-cormorant text-left sm:text-center">
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
              <Link href="/portfolio" className="text-[#b07a52] underline underline-offset-4 decoration-[#b07a52]/40 hover:decoration-[#b07a52]">portfolio</Link>,
              {" "}browse our{" "}
              <Link href="/services" className="text-[#b07a52] underline underline-offset-4 decoration-[#b07a52]/40 hover:decoration-[#b07a52]">services &amp; packages</Link>,
              {" "}or{" "}
              <Link href="/contact" className="text-[#b07a52] underline underline-offset-4 decoration-[#b07a52]/40 hover:decoration-[#b07a52]">get in touch</Link>
              {" "}to check availability for your date.
            </p>
          </div>
        </div>
      </section>

      {/* ──────────────── About teaser ──────────────── */}
      <section className="py-20 md:py-28 border-t border-[#262626]">
        <div className="wrap grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <div className="reveal relative overflow-hidden rounded-sm border border-[#262626]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/about-photo.webp"
              alt="The four sisters behind Cute Company Photography"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div className="reveal">
            <p className="eyebrow">The studio</p>
            <h2 className="mt-4 text-3xl md:text-4xl">Four sisters, raised to be memory keepers.</h2>
            <div className="prose-cormorant mt-6 space-y-5">
              <p>
                We grew up as our family&apos;s memory keepers — the ones with the camera at every
                birthday, holiday, and ordinary Tuesday worth remembering. That instinct became
                Cute Company: a family-owned studio built around the moments most worth holding
                onto.
              </p>
              <p>
                Every booking is shaped around your story, photographed with a calm,
                natural-light, editorial approach across Plant City, Tampa, and Central Florida.
              </p>
            </div>
            <Link
              href="/about"
              className="group mt-8 inline-flex items-center gap-2 text-sm tracking-wide text-[#ededed] transition-colors hover:text-[#b07a52]"
            >
              <span className="border-b border-[#ededed]/30 pb-1 transition-colors group-hover:border-[#b07a52]">Meet the team</span>
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ──────────────── Portfolio bento ──────────────── */}
      <section className="py-20 md:py-28 border-t border-[#262626]">
        <div className="wrap">
          <div className="reveal flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2 className="mt-3 text-3xl md:text-4xl">A look through the lens.</h2>
            </div>
            <p className="prose-cormorant max-w-sm sm:text-right">
              Weddings, engagements, and portraits from across Tampa Bay and Central Florida.
            </p>
          </div>

          <div className="reveal mt-12 grid auto-rows-[160px] grid-cols-12 gap-3 sm:auto-rows-[200px] md:gap-4">
            {BENTO.map((tile) => (
              <figure
                key={tile.src}
                className={`group relative overflow-hidden rounded-sm border border-[#262626] ${tile.className}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tile.src}
                  alt={tile.caption}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/75 to-transparent p-4 text-sm text-[#ededed] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="serif-i text-[1.05rem]">{tile.caption}</span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="reveal mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 rounded-full border border-[#ededed]/20 px-7 py-3.5 text-sm tracking-wide text-[#ededed] transition-colors hover:border-[#b07a52] hover:text-[#b07a52]"
            >
              View full portfolio
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
            <a
              href={CONTACT_INFO.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#ededed] px-7 py-3.5 text-sm tracking-wide text-[#111111] transition-colors hover:bg-[#b07a52]"
            >
              Book a session
            </a>
          </div>
        </div>
      </section>

      {/* ──────────────── Services marquee ──────────────── */}
      <section className="py-20 md:py-28 border-t border-[#262626] bg-[#111111]">
        <div className="wrap text-center">
          <p className="eyebrow reveal">Honored to capture</p>
        </div>
        <div className="reveal mt-10">
          <Marquee pauseOnHover className="[--duration:34s]">
            {SERVICES.map((s) => (
              <span
                key={s}
                className="serif-i whitespace-nowrap px-2 text-[clamp(1.6rem,3.5vw,2.75rem)] text-[#ededed]"
              >
                {s}
                <span aria-hidden="true" className="px-6 text-[#c89c7d]">✦</span>
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* ──── Social proof — display-only Google rating (NOT aggregateRating schema) + badges ──── */}
      <section className="py-24 md:py-32 border-t border-[#262626]">
        <div className="wrap max-w-3xl text-center">
          <div className="reveal flex items-center justify-center gap-1 text-[#b07a52] text-2xl" aria-hidden="true">
            ★★★★★
          </div>
          <p className="reveal mt-4 font-serif text-2xl md:text-3xl text-[#ededed]">Rated 5.0 on Google</p>
          <p className="reveal mt-3 prose-cormorant">
            Loved by the couples and families we&apos;ve photographed across Plant City &amp; Tampa Bay.
          </p>
          <a
            href={GBP_MAP}
            target="_blank"
            rel="noopener noreferrer"
            className="reveal mt-6 inline-block text-[#b07a52] underline underline-offset-4 decoration-[#b07a52]/40 hover:decoration-[#b07a52]"
          >
            Read our reviews on Google
          </a>

          {/* External trust badges. The Knot badge is self-hosted (public/badges) so it
              can't be blocked by CSP or break if their CDN changes. WeddingWire's seal
              can't be hotlinked (Akamai 403s cross-origin) and their review widget is
              gated to paid tiers, so we use a styled link to the storefront instead. */}
          <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <a
              href="https://www.theknot.com/marketplace/redirect-2105977?utm_source=vendor_website&utm_medium=banner&utm_term=dbb9e11e-5670-41fe-96b7-ed1a512d3879&utm_campaign=vendor_badge_assets"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="As Seen on The Knot"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/badges/the-knot-as-seen.png"
                alt="As Seen on The Knot"
                width={500}
                height={500}
                loading="lazy"
                className="h-14 w-auto"
              />
            </a>
            <a
              href="https://www.weddingwire.com/biz/cute-company-photography/c8288530d2001016.html"
              target="_blank"
              rel="nofollow noopener noreferrer"
              aria-label="Find Cute Company Photography on WeddingWire"
              className="group inline-flex items-center gap-2 rounded-full border border-[#262626] bg-[#111111] px-5 py-3 text-sm text-[#9a9189] transition-colors hover:border-[#b07a52] hover:text-[#ededed]"
            >
              <span>Find us on WeddingWire</span>
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
          </div>

          {TESTIMONIALS.length > 0 && (
            <div className="mt-16 grid gap-8 md:grid-cols-2 text-left">
              {TESTIMONIALS.map((t, i) => (
                <figure key={i} className="border border-[#262626] rounded-sm p-8 bg-[#111111]">
                  <blockquote className="prose-cormorant">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-5 text-sm text-[#9a9189]">
                    — {t.name}
                    {t.detail ? <span className="text-[#a99f93]"> · {t.detail}</span> : null}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ──────────────── Closing inquiry teaser ──────────────── */}
      <section className="py-24 md:py-32 border-t border-[#262626] bg-[#111111]">
        <div className="wrap max-w-2xl text-center">
          <p className="eyebrow reveal">Let&apos;s begin</p>
          <h2 className="reveal mt-4 text-[clamp(2rem,5vw,3.5rem)]">
            Tell us about your day.
          </h2>
          <p className="reveal prose-cormorant mt-6">
            We take a limited number of weddings and sessions each season so every story gets
            our full attention. Reach out to check availability for your date — we&apos;d love
            to hear what you&apos;re planning.
          </p>
          <div className="reveal mt-9">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[#ededed] px-8 py-4 text-sm tracking-wide text-[#111111] transition-colors hover:bg-[#b07a52]"
            >
              Inquire about your date
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
