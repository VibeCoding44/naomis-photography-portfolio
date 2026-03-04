import { SOCIAL_LINKS } from "@/lib/constants"
import { Instagram } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-[#0a0a0a] border-t border-white/10 py-20">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-[#ededed]/60">
                <div className="flex flex-col items-center md:items-start gap-2">
                    <p className="font-serif text-lg text-[#ededed]">Cute Company</p>
                    <p className="text-sm">© {new Date().getFullYear()} All rights reserved.</p>
                </div>

                <div className="flex items-center gap-6">
                    <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Instagram size={20} /></a>
                </div>
            </div>
        </footer>
    )
}
