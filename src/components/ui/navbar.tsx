"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { NAV_LINKS, CONTACT_INFO } from "@/lib/constants"

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)
    const [openGroup, setOpenGroup] = React.useState<string | null>(null)
    const pathname = usePathname()

    // Close both menus on navigation, so the dropdown isn't left hanging open
    // over the new page.
    React.useEffect(() => {
        setOpenGroup(null)
        setIsOpen(false)
    }, [pathname])

    // Deliberately no body scroll-lock here: the menu is a full-screen overlay
    // that covers the page, so locking the body only costs the scroll position
    // on close without changing what the visitor sees.

    // Solid ivory bar once scrolled past the hero top.
    React.useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24)
        onScroll()
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    return (
        <>
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
                    {NAV_LINKS.map((link) => {
                        // A group is "active" when any of its children is the
                        // current page, so the underline still tracks location.
                        const active = link.children
                            ? link.children.some((c) => c.href === pathname)
                            : pathname === link.href;

                        if (!link.children) {
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={cn(
                                        "group relative text-[0.72rem] uppercase tracking-[0.18em] text-[#9a9189] transition-colors hover:text-[#ededed]",
                                        active && "text-[#ededed]",
                                    )}
                                >
                                    {link.name}
                                    <span
                                        className={cn(
                                            "absolute -bottom-2 left-0 h-px w-full bg-[#b07a52] scale-x-0 transition-transform duration-300 group-hover:scale-x-100",
                                            active && "scale-x-100",
                                        )}
                                    />
                                </Link>
                            );
                        }

                        const open = openGroup === link.name;
                        return (
                            <div
                                key={link.name}
                                className="relative"
                                onMouseEnter={() => setOpenGroup(link.name)}
                                onMouseLeave={() => setOpenGroup(null)}
                            >
                                <button
                                    type="button"
                                    aria-expanded={open}
                                    aria-haspopup="true"
                                    onClick={() => setOpenGroup(open ? null : link.name)}
                                    className={cn(
                                        "group relative flex items-center gap-1.5 text-[0.72rem] uppercase tracking-[0.18em] text-[#9a9189] transition-colors hover:text-[#ededed]",
                                        (active || open) && "text-[#ededed]",
                                    )}
                                >
                                    {link.name}
                                    <ChevronDown
                                        size={12}
                                        aria-hidden="true"
                                        className={cn(
                                            "transition-transform duration-300",
                                            open && "rotate-180",
                                        )}
                                    />
                                    <span
                                        className={cn(
                                            "absolute -bottom-2 left-0 h-px w-full bg-[#b07a52] scale-x-0 transition-transform duration-300 group-hover:scale-x-100",
                                            active && "scale-x-100",
                                        )}
                                    />
                                </button>

                                <AnimatePresence>
                                    {open && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 8 }}
                                            transition={{ duration: 0.18, ease: "easeOut" }}
                                            // pt-5 keeps a hover bridge to the trigger so the
                                            // menu doesn't close in the gap between the two.
                                            className="absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-5"
                                        >
                                            <div className="overflow-hidden rounded-sm border border-[#262626] bg-[#111111] shadow-xl shadow-black/40">
                                                {link.children.map((child) => (
                                                    <Link
                                                        key={child.href}
                                                        href={child.href}
                                                        onClick={() => setOpenGroup(null)}
                                                        className={cn(
                                                            "block border-b border-[#262626] px-5 py-4 transition-colors last:border-b-0 hover:bg-[#161616]",
                                                            pathname === child.href && "bg-[#161616]",
                                                        )}
                                                    >
                                                        <span className="block text-sm text-[#ededed]">
                                                            {child.name}
                                                        </span>
                                                        <span className="mt-1 block text-xs leading-relaxed text-[#9a9189]">
                                                            {child.blurb}
                                                        </span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
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
            </div>
        </nav>

        {/* Mobile Menu Overlay — rendered outside <nav> so the navbar's
            backdrop-filter (when scrolled) can't become its containing block
            and clip `fixed inset-0` to the navbar height. */}
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: "-100%" }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: "-100%" }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col items-center justify-center gap-8 md:hidden"
                >
                    {NAV_LINKS.map((link, i) => (
                        <motion.div
                            key={link.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + i * 0.1 }}
                            className="text-center"
                        >
                            {link.children ? (
                                // No nested dropdown on mobile: the group's children are
                                // listed directly, which is fewer taps than a disclosure
                                // and keeps every page one tap from the menu.
                                <>
                                    <span className="block text-[0.7rem] uppercase tracking-[0.18em] text-[#6f6862]">
                                        {link.name}
                                    </span>
                                    <div className="mt-3 flex flex-col gap-3">
                                        {link.children.map((child) => (
                                            <Link
                                                key={child.href}
                                                href={child.href}
                                                className="font-serif text-3xl text-[#ededed]"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {child.name}
                                            </Link>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <Link
                                    href={link.href}
                                    className="font-serif text-3xl text-[#ededed]"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            )}
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
        </>
    )
}
