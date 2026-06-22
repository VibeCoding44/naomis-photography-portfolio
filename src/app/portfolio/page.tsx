import { GalleryGrid } from "@/components/ui/gallery-grid";
import { getPortfolioItems } from "@/lib/portfolio";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Portfolio | Wedding, Portrait & Commercial Photography",
    description: "Browse a curated portfolio of fine art wedding, portrait, and commercial photography by Cute Company Photography, serving Plant City, Tampa, and Central Florida.",
    alternates: {
        canonical: "/portfolio",
    },
};

export default function PortfolioPage() {
    const items = getPortfolioItems();

    return (
        <main className="pt-32 pb-20 min-h-screen bg-[#0a0a0a]">
            <div className="container mx-auto px-6">
                <div className="mb-16 text-center">
                    <h1 className="font-serif text-5xl md:text-6xl text-[#ededed] mb-6">Portfolio</h1>
                    <p className="max-w-2xl mx-auto text-[#9a9189] font-light">
                        A curation of our favorite moments — weddings, families, and portraits
                        photographed across Plant City, Tampa, and Central Florida. Each gallery is
                        shot with natural light, intention, and heart.
                    </p>
                </div>

                <GalleryGrid items={items} />
            </div>
        </main>
    );
}
