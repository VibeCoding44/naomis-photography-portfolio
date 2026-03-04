import { Button } from "@/components/ui/button";
import { CONTACT_INFO, SOCIAL_LINKS } from "@/lib/constants";
import Link from "next/link";

export default function ContactPage() {
    return (
        <main className="pt-32 pb-20 min-h-screen bg-[#0a0a0a] text-[#ededed]">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row gap-16 justify-center max-w-4xl mx-auto">
                    {/* Contact Info */}
                    <div className="md:w-1/2">
                        <h1 className="font-serif text-5xl mb-8">Get in Touch</h1>
                        <p className="text-white/60 font-light text-lg mb-12">
                            Interested in working together? I'd love to hear from you. Please reach out directly or book a session.
                        </p>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-sm uppercase tracking-widest text-white/40 mb-2">Email</h3>
                                <p className="text-xl break-all">{CONTACT_INFO.email}</p>
                            </div>
                            <div>
                                <h3 className="text-sm uppercase tracking-widest text-white/40 mb-2">Location</h3>
                                <p className="text-xl">{CONTACT_INFO.location}</p>
                            </div>
                            <div>
                                <h3 className="text-sm uppercase tracking-widest text-white/40 mb-2">Social</h3>
                                <div className="flex gap-4">
                                    <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors border-b border-transparent hover:border-white">Instagram</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Booking Section */}
                    <div className="md:w-1/2 flex flex-col justify-center items-start md:items-center space-y-6">
                        <div className="p-8 border border-white/10 rounded-lg bg-white/5 w-full text-center">
                            <h2 className="font-serif text-3xl mb-4">Ready to Book?</h2>
                            <p className="text-white/60 mb-8 font-light">
                                Secure your session directly through my booking portal.
                            </p>
                            <Link href={CONTACT_INFO.bookingUrl} target="_blank" rel="noopener noreferrer">
                                <Button size="lg" className="w-full md:w-auto bg-white text-black hover:bg-white/90">
                                    Request A Booking
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
