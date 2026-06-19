import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { getSessionBySlug, getSessionSlugs } from "@/lib/sessions";
import { SITE_URL, CONTACT_INFO } from "@/lib/constants";
import type { Metadata } from "next";

// Static export: pre-render one HTML file per session at build time.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
    return getSessionSlugs().map((slug) => ({ slug }));
}

function formatDate(iso: string): string {
    if (!iso) return "";
    const d = new Date(`${iso}T00:00:00`);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = getSessionBySlug(slug);
    if (!post) return { title: "Story Not Found" };

    const url = `${SITE_URL}/sessions/${post.slug}`;
    const image = post.coverImage.startsWith("http") ? post.coverImage : `${SITE_URL}${post.coverImage}`;

    return {
        title: post.title,
        description: post.excerpt,
        alternates: { canonical: `/sessions/${post.slug}` },
        openGraph: {
            // og:type=article is what turns links to this page into Pinterest Rich Pins.
            type: "article",
            url,
            title: post.title,
            description: post.excerpt,
            publishedTime: post.date || undefined,
            authors: ["Cute Company Photography"],
            images: [{ url: image, alt: post.title }],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt,
            images: [image],
        },
    };
}

export default async function SessionPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = getSessionBySlug(slug);
    if (!post) notFound();

    const url = `${SITE_URL}/sessions/${post.slug}`;
    const image = post.coverImage.startsWith("http") ? post.coverImage : `${SITE_URL}${post.coverImage}`;
    const bodyHtml = marked.parse(post.body) as string;

    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "image": image,
            "datePublished": post.date || undefined,
            "author": {
                "@type": "Organization",
                "name": "Cute Company Photography",
                "url": SITE_URL,
            },
            "publisher": {
                "@type": "Organization",
                "name": "Cute Company Photography",
                "logo": { "@type": "ImageObject", "url": `${SITE_URL}/images/og-image.jpg` },
            },
            "mainEntityOfPage": { "@type": "WebPage", "@id": url },
            ...(post.location ? { "locationCreated": { "@type": "Place", "name": post.location } } : {}),
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
                { "@type": "ListItem", "position": 2, "name": "Sessions & Stories", "item": `${SITE_URL}/sessions` },
                { "@type": "ListItem", "position": 3, "name": post.title, "item": url },
            ],
        },
    ];

    const meta = [post.location, formatDate(post.date)].filter(Boolean).join(" · ");
    const gallery = (post.gallery ?? []).filter((g) => g.image && g.image !== post.coverImage);

    return (
        <main className="pt-32 pb-20 min-h-screen bg-[#0a0a0a] text-[#ededed]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <article className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto text-center mb-10">
                    <p className="mb-4">
                        <Link
                            href="/sessions"
                            className="text-xs uppercase tracking-widest text-white/40 hover:text-white/70 transition-colors"
                        >
                            ← All Sessions
                        </Link>
                    </p>
                    {meta && (
                        <p className="text-xs uppercase tracking-widest text-white/40 mb-4">{meta}</p>
                    )}
                    <h1 className="font-serif text-4xl md:text-5xl leading-tight">{post.title}</h1>
                </div>

                <div className="max-w-4xl mx-auto relative aspect-[3/2] overflow-hidden rounded-lg mb-12">
                    <Image
                        src={post.coverImage}
                        alt={`${post.title} — photography by Cute Company Photography in ${post.location || "Central Florida"}`}
                        fill
                        priority
                        className="object-cover object-[50%_25%]"
                        sizes="(max-width: 1024px) 100vw, 896px"
                    />
                </div>

                <div
                    className="prose-session max-w-3xl mx-auto text-white/70 font-light text-lg leading-relaxed space-y-6"
                    dangerouslySetInnerHTML={{ __html: bodyHtml }}
                />

                {gallery.length > 0 && (
                    <div className="max-w-5xl mx-auto mt-16 columns-1 md:columns-2 gap-6 space-y-6">
                        {gallery.map((img) => (
                            <div key={img.image} className="break-inside-avoid overflow-hidden rounded-lg">
                                <Image
                                    src={img.image}
                                    alt={img.alt || `${post.title} — Cute Company Photography`}
                                    width={800}
                                    height={1000}
                                    className="w-full h-auto object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        ))}
                    </div>
                )}

                <div className="max-w-3xl mx-auto mt-20 text-center border-t border-white/10 pt-12">
                    <h2 className="font-serif text-2xl md:text-3xl mb-4">Planning your own session?</h2>
                    <p className="text-white/60 font-light mb-8">
                        We&apos;d love to hear your story. Reach out to check availability across Plant City,
                        Tampa, and Central Florida.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block bg-white text-black px-8 py-3 rounded-md hover:bg-white/90 transition-colors"
                    >
                        Get in Touch
                    </Link>
                    <p className="mt-6 text-sm text-white/40">
                        Or email us at{" "}
                        <a href={`mailto:${CONTACT_INFO.email}`} className="underline underline-offset-4 hover:text-white/70">
                            {CONTACT_INFO.email}
                        </a>
                    </p>
                </div>
            </article>
        </main>
    );
}
