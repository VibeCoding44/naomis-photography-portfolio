"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { NAV_LINKS } from "@/lib/constants"

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false)
    const pathname = usePathname()

    // Lock body scroll when mobile menu is open
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 text-[#ededed]">
            <div className="container mx-auto px-6 h-24 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="font-serif text-2xl tracking-widest uppercase z-50 relative mix-blend-difference">
                    Cute Company<span className="text-gray-400">.</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-12 mix-blend-difference">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "text-sm uppercase tracking-widest hover:text-white/70 transition-colors relative group",
                                pathname === link.href && "text-white"
                            )}
                        >
                            {link.name}
                            <span className={cn(
                                "absolute -bottom-2 left-0 w-full h-[1px] bg-white scale-x-0 transition-transform duration-300 group-hover:scale-x-100",
                                pathname === link.href && "scale-x-100"
                            )} />
                        </Link>
                    ))}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden z-50 relative p-2 mix-blend-difference"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: "-100%" }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: "-100%" }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="fixed inset-0 bg-[#0a0a0a] flex flex-col items-center justify-center gap-8 md:hidden"
                        >
                            {NAV_LINKS.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + i * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        className="font-serif text-4xl text-[#ededed]"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    )
}
