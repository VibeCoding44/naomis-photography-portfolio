import { Metadata } from "next";
import { Hero } from "@/components/ui/hero";
import { Philosophy } from "@/components/ui/philosophy";
import { CONTACT_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Plant City & Tampa Wedding Photographer | Fine Art & Editorial",
  description: "Cute Company Photography is a premier Plant City and Tampa-based photography studio specializing in fine art wedding, commercial, and family portrait photography.",
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PhotographyBusiness",
    "name": "Cute Company Photography",
    "image": "https://cutecocompany.com/images/wedding-hero.jpg",
    "description": "Premier wedding, commercial, and portrait photography serving Plant City, Tampa, and Central Florida.",
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
    "url": "https://cutecocompany.com",
    "sameAs": [
      "https://www.instagram.com/cutecompanyphotography/"
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
