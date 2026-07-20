import fs from "fs";
import path from "path";

export type Offer = {
    title: string;
    description: string;
    image?: string;
    price?: string; // free-text price line, e.g. "$250 · 20 minutes · 15 edited images"
    validUntil?: string; // ISO yyyy-mm-dd — offer is hidden after this date (at build time)
};

export type OffersPage = {
    heading: string;
    intro: string;
    items: Offer[];
};

const OFFERS_FILE = path.join(process.cwd(), "content", "offers", "offers.json");

/**
 * Reads the single offers page written by the CMS. Expired offers are filtered
 * out at build time — the site rebuilds on every CMS publish, so an offer with
 * a validUntil in the past disappears on the next publish (or manual deploy).
 */
export function getOffersPage(): OffersPage {
    const fallback: OffersPage = { heading: "Current Offers & Mini Sessions", intro: "", items: [] };
    if (!fs.existsSync(OFFERS_FILE)) return fallback;

    const data = { ...fallback, ...(JSON.parse(fs.readFileSync(OFFERS_FILE, "utf8")) as Partial<OffersPage>) };
    const today = new Date().toISOString().slice(0, 10);
    data.items = (data.items ?? []).filter(
        (offer) => Boolean(offer.title) && (!offer.validUntil || offer.validUntil.slice(0, 10) >= today),
    );
    return data;
}
