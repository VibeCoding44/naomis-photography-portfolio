"use client"

import { motion } from "framer-motion"
import { Camera, Heart, Sun } from "lucide-react"

const features = [
    {
        icon: Sun,
        title: "Natural Light",
        description: "I work almost exclusively with available light to create softness and authenticity."
    },
    {
        icon: Camera,
        title: "Unscripted Moments",
        description: "Life isn't posed. The most powerful images are the ones that happen in the spaces between."
    },
    {
        icon: Heart,
        title: "Timeless Editing",
        description: "My editing style is grounded in true-to-life colors and cinematic film tones."
    }
]

export function Philosophy() {
    return (
        <section id="philosophy" className="py-24 md:py-32 bg-[#0a0a0a] text-[#ededed]">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row gap-16 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="md:w-1/3"
                    >
                        <h2 className="font-serif text-4xl md:text-5xl mb-6">Philosophy</h2>
                        <div className="h-[2px] w-20 bg-white/20" />
                    </motion.div>

                    <div className="md:w-2/3 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature, i) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.2 }}
                            >
                                <feature.icon className="w-8 h-8 mb-6 text-white/80" />
                                <h3 className="font-serif text-xl mb-3">{feature.title}</h3>
                                <p className="text-white/60 font-light leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
