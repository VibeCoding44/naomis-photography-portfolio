import { SOCIAL_LINKS, CONTACT_INFO, NAV_LINKS } from "@/lib/constants"
import { Instagram } from "lucide-react"
import Link from "next/link"

export function Footer() {
    return (
        <footer className="border-t border-[#262626] bg-[#0d0d0d] text-[#9a9189]">
            <div className="wrap py-16">
                <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
                    {/* Brand */}
                    <div>
                        <p className="font-serif text-2xl tracking-[0.04em] text-[#ededed]">
                            Cute Company<span className="text-[#b07a52]">.</span>
                        </p>
                        <p className="prose-cormorant mt-3 max-w-[34ch]">
                            Family-owned, fine-art photography by four sisters —
                            Plant City, Tampa &amp; Central Florida.
                        </p>
                        <a
                            href={CONTACT_INFO.bookingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-5 inline-block rounded-full bg-[#ededed] px-6 py-2.5 text-[0.72rem] uppercase tracking-[0.16em] text-[#0a0a0a] transition-colors hover:bg-[#b07a52]"
                        >
                            Check availability
                        </a>
                    </div>

                    {/* Explore */}
                    <div>
                        <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[#ededed]">Explore</p>
                        <ul className="mt-4 space-y-2.5 text-sm">
                            {NAV_LINKS.map((l) => (
                                <li key={l.name}>
                                    <Link href={l.href} className="transition-colors hover:text-[#ededed]">
                                        {l.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[#ededed]">Connect</p>
                        <ul className="mt-4 space-y-2.5 text-sm">
                            <li>
                                <a href={`mailto:${CONTACT_INFO.email}`} className="transition-colors hover:text-[#ededed]">
                                    {CONTACT_INFO.email}
                                </a>
                            </li>
                            <li>
                                <a href={`tel:${CONTACT_INFO.phoneE164}`} className="transition-colors hover:text-[#ededed]">
                                    {CONTACT_INFO.phone}
                                </a>
                            </li>
                            <li>{CONTACT_INFO.location}</li>
                            <li>
                                <a
                                    href={SOCIAL_LINKS.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Cute Company Photography on Instagram"
                                    className="inline-flex items-center gap-2 transition-colors hover:text-[#ededed]"
                                >
                                    <Instagram size={16} /> Instagram
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar: badges + legal */}
                <div className="mt-12 flex flex-col items-center gap-6 border-t border-[#262626] pt-8 sm:flex-row sm:justify-between">
                    <div className="flex items-center gap-4">
                        <a
                            href="https://www.theknot.com/marketplace/redirect-2105977?utm_source=vendor_website&utm_medium=banner&utm_term=dbb9e11e-5670-41fe-96b7-ed1a512d3879&utm_campaign=vendor_badge_assets"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="As Seen on The Knot"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/badges/the-knot-as-seen.png"
                                alt="As Seen on The Knot"
                                width={500}
                                height={500}
                                loading="lazy"
                                className="h-10 w-auto"
                            />
                        </a>
                        <a
                            href="https://www.weddingwire.com/biz/cute-company-photography/c8288530d2001016.html"
                            target="_blank"
                            rel="nofollow noopener noreferrer"
                            aria-label="Find Cute Company Photography on WeddingWire"
                            className="inline-flex items-center rounded-full border border-[#262626] px-3 py-1.5 text-xs transition-colors hover:border-[#b07a52] hover:text-[#ededed]"
                        >
                            WeddingWire
                        </a>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                        <Link href="/privacy" className="transition-colors hover:text-[#ededed]">Privacy</Link>
                        <span>© {new Date().getFullYear()} Cute Company Photography</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
