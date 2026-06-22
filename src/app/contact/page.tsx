import { CONTACT_INFO, SOCIAL_LINKS } from "@/lib/constants";
import { BookingForm } from "@/components/booking-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact & Booking | Plant City & Tampa Photographer",
    description: "Book your wedding, portrait, or commercial session with Cute Company Photography in Plant City and Tampa, FL. Get in touch to start planning your shoot.",
    alternates: {
        canonical: "/contact",
    },
};

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
                                <h3 className="text-sm uppercase tracking-widest text-white/40 mb-2">Phone</h3>
                                <p className="text-xl">
                                    <a href={`tel:${CONTACT_INFO.phoneE164}`} className="hover:text-white transition-colors border-b border-transparent hover:border-white">{CONTACT_INFO.phone}</a>
                                </p>
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
                        <BookingForm />
                    </div>
                </div>
            </div>
        </main>
    );
}
