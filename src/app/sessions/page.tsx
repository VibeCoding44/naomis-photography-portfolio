import Image from "next/image";
import Link from "next/link";
import { getSessions } from "@/lib/sessions";
import { SITE_URL } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sessions & Stories | Plant City & Tampa Photography Journal",
    description:
        "Real weddings, engagements, and portrait sessions photographed across Plant City, Tampa, and Central Florida by Cute Company Photography. Browse our latest stories.",
    alternates: {
        canonical: "/sessions",
    },
    openGraph: {
        type: "website",
        url: `${SITE_URL}/sessions`,
        title: "Sessions & Stories | Cute Company Photography",
        description:
            "Real weddings, engagements, and portrait sessions photographed across Plant City, Tampa, and Central Florida.",
    },
};

function formatDate(iso: string): string {
    if (!iso) return "";
    const d = new Date(`${iso}T00:00:00`);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function SessionsPage() {
    const posts = getSessions();

    return (
        <main className="pt-32 pb-20 min-h-screen bg-[#0a0a0a] text-[#ededed]">
            <div className="container mx-auto px-6">
                <div className="mb-16 text-center">
                    <h1 className="font-serif text-5xl md:text-6xl mb-6">Sessions &amp; Stories</h1>
                    <p className="max-w-2xl mx-auto text-white/60 font-light">
                        Real weddings, engagements, and portrait sessions from across Plant City,
                        Tampa, and Central Florida — a look behind the camera at the moments we love most.
                    </p>
                </div>

                {posts.length === 0 ? (
                    <p className="text-center text-white/40 font-light py-20">
                        New stories coming soon — check back shortly.
                    </p>
                ) : (
                    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                        {posts.map((post) => (
                            <Link
                                key={post.slug}
                                href={`/sessions/${post.slug}`}
                                className="group block"
                            >
                                <article className="overflow-hidden rounded-lg border border-white/10 bg-white/5 transition-colors hover:border-white/25">
                                    <div className="relative aspect-[4/5] overflow-hidden">
                                        <Image
                                            src={post.coverImage}
                                            alt={`${post.title} — photography by Cute Company Photography`}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <p className="text-xs uppercase tracking-widest text-white/40 mb-3">
                                            {[post.location, formatDate(post.date)].filter(Boolean).join(" · ")}
                                        </p>
                                        <h2 className="font-serif text-2xl mb-3 leading-snug">{post.title}</h2>
                                        <p className="text-white/60 font-light text-sm leading-relaxed">
                                            {post.excerpt}
                                        </p>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
