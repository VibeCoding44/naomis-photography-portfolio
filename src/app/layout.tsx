import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { SITE_URL, GA_MEASUREMENT_ID, GTM_CONTAINER_ID } from "@/lib/constants";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

// Editorial italic accent (eyebrows, pull quotes) — pairs with Playfair display.
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s | Cute Company Photography",
    default: "Cute Company Photography | Plant City & Tampa Wedding Photographer",
  },
  description: "Capture your most precious moments with Cute Company Photography. Premier wedding, commercial, and portrait photography serving Plant City, Tampa, and Central Florida.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Cute Company Photography",
    title: "Cute Company Photography | Plant City & Tampa Wedding Photographer",
    description: "Premier wedding, commercial, and portrait photography serving Plant City, Tampa, and Central Florida.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Cute Company Photography, fine art wedding photography in Plant City & Tampa, FL",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cute Company Photography | Plant City & Tampa Wedding Photographer",
    description: "Premier wedding, commercial, and portrait photography serving Plant City, Tampa, and Central Florida.",
    images: ["/images/og-image.jpg"],
  },
  icons: {
    icon: "/icon.png",
  },
  verification: {
    other: { "p:domain_verify": "971ce2a3a32a8058cb411ba30087b86e" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {GTM_CONTAINER_ID && <GoogleTagManager gtmId={GTM_CONTAINER_ID} />}
      <body
        suppressHydrationWarning
        className={`${playfair.variable} ${cormorant.variable} ${inter.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
      {GA_MEASUREMENT_ID && <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />}
    </html>
  );
}
