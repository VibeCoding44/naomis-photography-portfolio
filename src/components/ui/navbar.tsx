"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { NAV_LINKS, CONTACT_INFO } from "@/lib/constants"

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)
    const pathname = usePathname()

    // Lock body scroll when mobile menu is open
    React.useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "unset"
    }, [isOpen])

    // Solid ivory bar once scrolled past the hero top.
    React.useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24)
        onScroll()
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
                scrolled
                    ? "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#262626]"
                    : "bg-transparent",
            )}
        >
            <div className="wrap flex h-20 items-center justify-between">
                {/* Logo */}
                <Link
                    href="/"
                    className="font-serif text-xl tracking-[0.18em] uppercase text-[#ededed] z-50 relative"
                >
                    Cute Company<span className="text-[#b07a52]">.</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-10">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "group relative text-[0.72rem] uppercase tracking-[0.18em] text-[#9a9189] transition-colors hover:text-[#ededed]",
                                pathname === link.href && "text-[#ededed]",
                            )}
                        >
                            {link.name}
                            <span
                                className={cn(
                                    "absolute -bottom-2 left-0 h-px w-full bg-[#b07a52] scale-x-0 transition-transform duration-300 group-hover:scale-x-100",
                                    pathname === link.href && "scale-x-100",
                                )}
                            />
                        </Link>
                    ))}
                    <a
                        href={CONTACT_INFO.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-[#ededed] px-5 py-2 text-[0.72rem] uppercase tracking-[0.16em] text-[#0a0a0a] transition-colors hover:bg-[#b07a52]"
                    >
                        Book
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden z-50 relative p-2 text-[#ededed]"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isOpen}
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
                            <motion.a
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + NAV_LINKS.length * 0.1 }}
                                href={CONTACT_INFO.bookingUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 rounded-full bg-[#ededed] px-7 py-3 text-sm uppercase tracking-[0.16em] text-[#0a0a0a]"
                                onClick={() => setIsOpen(false)}
                            >
                                Book a session
                            </motion.a>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    )
}
