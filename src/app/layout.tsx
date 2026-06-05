import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { SITE_URL } from "@/lib/constants";

const playfair = Playfair_Display({
  variable: "--font-playfair",
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
        alt: "Cute Company Photography — fine art wedding photography in Plant City & Tampa, FL",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${playfair.variable} ${inter.variable} antialiased bg-[#0a0a0a] text-[#ededed]`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
