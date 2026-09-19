import fs from "fs";
import path from "path";

export type SessionGalleryImage = {
    image: string;
    alt?: string;
};

export type SessionPost = {
    slug: string;
    title: string;
    type?: "session" | "story"; // session = full shoot recap; story = a single image/moment (gallery optional)
    date: string; // ISO yyyy-mm-dd — used for sorting + article:published_time
    location?: string; // city / area (e.g. "Plant City, FL")
    venue?: string; // optional venue name (e.g. "Edward Medard Park")
    category?: string; // weddings | engagements | portraits | family | commercial | events
    excerpt: string; // card text on /sessions (and the meta description fallback)
    // Optional search-result description. The excerpt doubles as on-page card
    // copy, so it is written to read well and often runs past the ~155 chars
    // Google shows. Set this to control what search + social actually display
    // without shortening the visible card text.
    metaDescription?: string;
    // Optional shorter <title>. The post title is the on-page H1 and is written
    // as a full sentence; with the ' | Cute Company Photography' suffix that can
    // pass the ~60 chars Google shows. Set this to control the search result.
    metaTitle?: string;
    coverImage: string;
    galleryUrl?: string; // optional Pic-Time (or other) full-gallery link → renders a "View the full gallery" button
    gallery?: SessionGalleryImage[];
    body: string; // markdown
};

const SESSIONS_DIR = path.join(process.cwd(), "content", "sessions");

/**
 * Reads every story/session entry committed under content/sessions at build
 * time. Each entry is a JSON file written by the CMS (or seeded by hand).
 * Runs only during `next build` (server side) — never ships to the client.
 */
export function getSessions(): SessionPost[] {
    if (!fs.existsSync(SESSIONS_DIR)) return [];

    const posts = fs
        .readdirSync(SESSIONS_DIR)
        .filter((file) => file.endsWith(".json"))
        .map((file) => {
            const raw = fs.readFileSync(path.join(SESSIONS_DIR, file), "utf8");
            const data = JSON.parse(raw) as Omit<SessionPost, "slug">;
            return { ...data, slug: file.replace(/\.json$/, "") };
        })
        .filter((post) => Boolean(post.title) && Boolean(post.coverImage));

    // Most recent first.
    return posts.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

export function getSessionSlugs(): string[] {
    return getSessions().map((post) => post.slug);
}

export function getSessionBySlug(slug: string): SessionPost | undefined {
    return getSessions().find((post) => post.slug === slug);
}
