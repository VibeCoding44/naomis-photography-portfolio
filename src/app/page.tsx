import { Metadata } from "next";
import { Hero } from "@/components/ui/hero";
import { Philosophy } from "@/components/ui/philosophy";
import { CONTACT_INFO, SITE_URL, SOCIAL_LINKS } from "@/lib/constants";

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
      SOCIAL_LINKS.instagram
    ],
    "priceRange": "$$$"
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Philosophy />
    </main>
  );
}
