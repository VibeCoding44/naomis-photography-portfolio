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
                    {/* Trust badges — "As Seen on The Knot" + WeddingWire (WeddingPro). Plain <img>: third-party hosts. */}
                    <div className="flex items-center gap-5">
                        <a
                            href="https://www.theknot.com/marketplace/redirect-2105977?utm_source=vendor_website&utm_medium=banner&utm_term=dbb9e11e-5670-41fe-96b7-ed1a512d3879&utm_campaign=vendor_badge_assets"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="As Seen on The Knot"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="https://d13ns7kbjmbjip.cloudfront.net/For_Your_Website/TK-badge_AsSeen.png"
                                alt="As Seen on The Knot"
                                width={190}
                                height={80}
                                loading="lazy"
                                className="h-10 w-auto"
                            />
                        </a>
                        <a
                            href="https://www.weddingwire.com"
                            target="_blank"
                            rel="nofollow noopener noreferrer"
                            title="weddingwire.com"
                            aria-label="Reviewed on WeddingWire"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="https://www.weddingwire.com/images/sellos/partner--pp2234610.png"
                                alt="Reviewed on WeddingWire"
                                width={125}
                                height={125}
                                loading="lazy"
                                className="h-10 w-auto"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
