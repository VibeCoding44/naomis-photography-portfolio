import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Cute Company Photography",
    default: "Cute Company Photography | Plant City & Tampa Wedding Photographer",
  },
  description: "Capture your most precious moments with Cute Company Photography. Premier wedding, commercial, and portrait photography serving Plant City, Tampa, and Central Florida.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cutecocompany.com",
    siteName: "Cute Company Photography",
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
