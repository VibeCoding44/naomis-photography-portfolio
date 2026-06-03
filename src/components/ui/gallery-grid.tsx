"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import type { PortfolioItem } from "@/lib/portfolio"

export function GalleryGrid({ items }: { items: PortfolioItem[] }) {
    if (items.length === 0) {
        return (
            <p className="text-center text-white/40 font-light py-20">
                No photos yet — check back soon.
            </p>
        )
    }

    return (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {items.map((item, i) => {
                const label = item.title || item.caption || "";
                return (
                <motion.div
                    key={item.image}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: (i % 6) * 0.1 }}
                    className="break-inside-avoid relative group overflow-hidden"
                >
                    <Image
                        src={item.image}
                        alt={label || `Portfolio image ${i + 1}`}
                        width={800}
                        height={600}
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
                        {label ? (
                            <span className="text-white/90 text-sm font-light">{label}</span>
                        ) : null}
                    </div>
                </motion.div>
                );
            })}
        </div>
    )
}
