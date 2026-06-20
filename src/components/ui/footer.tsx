import { SOCIAL_LINKS } from "@/lib/constants"
import { Instagram } from "lucide-react"
import Link from "next/link"

export function Footer() {
    return (
        <footer className="bg-[#0a0a0a] border-t border-white/10 py-20">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-[#ededed]/60">
                <div className="flex flex-col items-center md:items-start gap-2">
                    <p className="font-serif text-lg text-[#ededed]">Cute Company</p>
                    <p className="text-sm">© {new Date().getFullYear()} All rights reserved.</p>
                </div>

                <div className="flex flex-col items-center md:items-end gap-5">
                    <div className="flex items-center gap-6">
                        <Link href="/privacy" className="text-sm hover:text-white transition-colors">Privacy</Link>
                        <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Cute Company Photography on Instagram" className="hover:text-white transition-colors"><Instagram size={20} /></a>
                    </div>
                    {/* Trust badges — "As Seen on The Knot" (self-hosted) + styled WeddingWire
                        link (their seal can't be hotlinked; review widget is paid-tier only). */}
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
                            className="inline-flex items-center rounded-full border border-white/15 px-3 py-1.5 text-xs hover:text-white hover:border-white/30 transition-colors"
                        >
                            WeddingWire
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
