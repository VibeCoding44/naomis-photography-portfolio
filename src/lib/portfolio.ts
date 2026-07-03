import fs from "fs";
import path from "path";

export type PortfolioItem = {
    image: string;
    title?: string;
    caption?: string;
    category?: string;
    order?: number;
    date?: string;
};

const PORTFOLIO_DIR = path.join(process.cwd(), "content", "portfolio");
function readPortfolioEntries(): PortfolioItem[] {
    if (!fs.existsSync(PORTFOLIO_DIR)) return [];
    return fs
        .readdirSync(PORTFOLIO_DIR)
        .filter((f) => f.endsWith(".json"))
        .map((f) => JSON.parse(fs.readFileSync(path.join(PORTFOLIO_DIR, f), "utf8")) as PortfolioItem)
        .filter((item) => Boolean(item.image));
}

async function fetchSupabasePhotos(): Promise<PortfolioItem[]> {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return [];
    try {
        const res = await fetch(
            `${url}/rest/v1/portfolio_photos?select=public_url,title,caption,category,display_order&order=display_order.asc`,
            { headers: { apikey: key, Authorization: `Bearer ${key}` }, next: { revalidate: 0 } }
        );
        if (!res.ok) return [];
        const rows = await res.json() as { public_url: string; title: string | null; caption: string | null; category: string | null; display_order: number }[];
        return rows.map((r) => ({
            image: r.public_url,
            title: r.title ?? undefined,
            caption: r.caption ?? undefined,
            category: r.category ?? undefined,
            order: r.display_order,
        }));
    } catch {
        return [];
    }
}

export async function getPortfolioItems(): Promise<PortfolioItem[]> {
    const [manual, fromSupabase] = await Promise.all([
        Promise.resolve(readPortfolioEntries()),
        fetchSupabasePhotos(),
    ]);

    // Supabase uploads take priority; manual JSON entries fill in the rest
    const seen = new Set<string>();
    const merged: PortfolioItem[] = [];
    for (const item of [...fromSupabase, ...manual]) {
        if (!seen.has(item.image)) {
            seen.add(item.image);
            merged.push(item);
        }
    }

    return merged.sort((a, b) => {
        const orderDiff = (a.order ?? 100) - (b.order ?? 100);
        if (orderDiff !== 0) return orderDiff;
        return (b.date ?? "").localeCompare(a.date ?? "");
    });
}
