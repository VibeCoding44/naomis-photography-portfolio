import { GalleryGrid } from "@/components/ui/gallery-grid";
import { getPortfolioItems } from "@/lib/portfolio";

export default function PortfolioPage() {
    const items = getPortfolioItems();

    return (
        <main className="pt-32 pb-20 min-h-screen bg-[#0a0a0a]">
            <div className="container mx-auto px-6">
                <div className="mb-16 text-center">
                    <h1 className="font-serif text-5xl md:text-6xl text-[#ededed] mb-6">Portfolio</h1>
                    <p className="max-w-2xl mx-auto text-white/60 font-light">
                        A curation of my favorite moments, captured with intention and heart.
                    </p>
                </div>

                <GalleryGrid items={items} />
            </div>
        </main>
    );
}
