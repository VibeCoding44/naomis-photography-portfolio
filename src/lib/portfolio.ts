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

/**
 * Reads every photo entry committed under content/portfolio at build time.
 * Each entry is a small JSON file written by the CMS (or seeded by hand).
 * Runs only during `next build` (server side) — never ships to the client.
 */
export function getPortfolioItems(): PortfolioItem[] {
    if (!fs.existsSync(PORTFOLIO_DIR)) return [];

    const items = fs
        .readdirSync(PORTFOLIO_DIR)
        .filter((file) => file.endsWith(".json"))
        .map((file) => {
            const raw = fs.readFileSync(path.join(PORTFOLIO_DIR, file), "utf8");
            return JSON.parse(raw) as PortfolioItem;
        })
        .filter((item) => Boolean(item.image));

    // Lower "order" first; ties broken by most-recent date.
    return items.sort((a, b) => {
        const orderDiff = (a.order ?? 100) - (b.order ?? 100);
        if (orderDiff !== 0) return orderDiff;
        return (b.date ?? "").localeCompare(a.date ?? "");
    });
}
