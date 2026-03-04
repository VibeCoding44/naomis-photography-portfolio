"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

// Sample images (reusing the ones we have for now, repeated/randomized)
const SAMPLE_IMAGES = [
    "/images/portraits/portrait-01.jpg",
    "/images/portraits/portrait-02.jpg",
    "/images/portraits/portrait-03.jpg",
    "/images/portraits/portrait-04.jpg",
    "/images/portraits/portrait-05.jpg",
    "/images/portraits/portrait-06.jpg",
    "/images/portraits/portrait-07.jpg",
    "/images/portraits/portrait-08.jpg",
    "/images/portraits/portrait-09.jpg",
    "/images/portraits/portrait-10.jpg",
    "/images/portraits/portrait-11.jpg",
    "/images/portraits/portrait-12.jpg",
    "/images/portraits/portrait-13.jpg",
    "/images/portraits/portrait-14.jpg",
    "/images/portraits/portrait-15.jpg",
    "/images/portraits/portrait-16.jpg",
    "/images/portraits/portrait-17.jpg",
    "/images/portraits/portrait-18.jpg",
    "/images/portraits/portrait-19.jpg",
]

export function GalleryGrid() {
    return (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {SAMPLE_IMAGES.map((src, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="break-inside-avoid relative group overflow-hidden"
                >
                    <Image
                        src={src}
                        alt={`Portfolio image ${i + 1}`}
                        width={800}
                        height={600}
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    </div>
                </motion.div>
            ))}
        </div>
    )
}
