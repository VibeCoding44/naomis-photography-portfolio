import Link from "next/link";
import type { Metadata } from "next";
import { CONTACT_INFO } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description:
        "How Cute Company Photography collects, uses, and protects your information, including analytics and advertising cookies used on this website.",
    alternates: {
        canonical: "/privacy",
    },
};

const EFFECTIVE_DATE = "June 16, 2026";

export default function PrivacyPage() {
    return (
        <main className="pt-32 pb-20 min-h-screen bg-[#0a0a0a] text-[#ededed]">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto">
                    <h1 className="font-serif text-5xl mb-4">Privacy Policy</h1>
                    <p className="text-sm uppercase tracking-widest text-[#6f6862] mb-12">
                        Effective {EFFECTIVE_DATE}
                    </p>

                    <div className="space-y-10 text-[#dcdcdc] font-light leading-relaxed text-lg">
                        <section className="space-y-4">
                            <p>
                                Cute Company Photography (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
                                &ldquo;our&rdquo;) is a family-owned photography studio based in Plant
                                City, Florida. This policy explains what information we collect when you
                                visit{" "}
                                <Link href="/" className="text-[#b07a52] underline underline-offset-4 decoration-[#b07a52]/40 hover:text-[#ededed]">
                                    cutecompanyphotography.com
                                </Link>{" "}
                                or contact us, how we use it, and the choices you have.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="font-serif text-3xl text-[#ededed]">Information We Collect</h2>
                            <p>
                                <strong className="text-[#ededed] font-normal">Information you give us.</strong>{" "}
                                When you email, call, or request a booking, we receive the details you
                                choose to share, typically your name, email address, phone number, event
                                date, and a description of the session you&rsquo;re planning.
                            </p>
                            <p>
                                <strong className="text-[#ededed] font-normal">Information collected automatically.</strong>{" "}
                                Like most websites, we use cookies and similar technologies to understand
                                how visitors use the site and to measure the performance of our marketing.
                                This may include your device and browser type, pages viewed, referring
                                links, and a general (city-level) location derived from your IP address.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="font-serif text-3xl text-[#ededed]">Analytics &amp; Advertising Tools</h2>
                            <p>We rely on a small number of trusted third-party services:</p>
                            <ul className="space-y-3 list-disc pl-6 marker:text-[#b07a52]">
                                <li>
                                    <strong className="text-[#ededed] font-normal">Google Analytics &amp; Google Tag Manager</strong>{" "}
                                    to measure site traffic and understand which pages are helpful to
                                    visitors.
                                </li>
                                <li>
                                    <strong className="text-[#ededed] font-normal">Pinterest Tag</strong>{" "}
                                    to measure the performance of our Pinterest content and ads, and to
                                    understand which visits lead to booking inquiries.
                                </li>
                            </ul>
                            <p>
                                These providers may set their own cookies and process data under their own
                                privacy policies. We do not sell your personal information.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="font-serif text-3xl text-[#ededed]">How We Use Your Information</h2>
                            <p>We use the information we collect to:</p>
                            <ul className="space-y-3 list-disc pl-6 marker:text-[#b07a52]">
                                <li>respond to your inquiries and plan your photography session;</li>
                                <li>provide, maintain, and improve our website and services;</li>
                                <li>understand which content and marketing efforts are effective;</li>
                                <li>comply with our legal obligations.</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="font-serif text-3xl text-[#ededed]">Your Choices</h2>
                            <p>
                                Most browsers let you block or delete cookies through their settings. You
                                can opt out of Google Analytics using Google&rsquo;s{" "}
                                <a
                                    href="https://tools.google.com/dlpage/gaoptout"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#b07a52] underline underline-offset-4 decoration-[#b07a52]/40 hover:text-[#ededed]"
                                >
                                    browser opt-out add-on
                                </a>
                                , and adjust Pinterest ad personalization in your Pinterest account
                                settings. You may also ask us to access or delete any personal information
                                you&rsquo;ve shared with us directly by emailing the address below.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="font-serif text-3xl text-[#ededed]">Third-Party Links</h2>
                            <p>
                                Our site may link to third-party services, for example, our booking
                                request flow and our social profiles. Once you leave our site, this policy
                                no longer applies, and we encourage you to review the privacy policy of any
                                site you visit.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="font-serif text-3xl text-[#ededed]">Children&rsquo;s Privacy</h2>
                            <p>
                                Our website is not directed to children under 13, and we do not knowingly
                                collect personal information from them. When we photograph families,
                                imagery of minors is captured and used only with the consent of a parent or
                                guardian.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="font-serif text-3xl text-[#ededed]">Changes to This Policy</h2>
                            <p>
                                We may update this policy from time to time. When we do, we&rsquo;ll revise
                                the &ldquo;Effective&rdquo; date at the top of this page.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="font-serif text-3xl text-[#ededed]">Contact Us</h2>
                            <p>
                                Questions about this policy? Reach us at{" "}
                                <a
                                    href={`mailto:${CONTACT_INFO.email}`}
                                    className="text-[#b07a52] underline underline-offset-4 decoration-[#b07a52]/40 hover:text-[#ededed] break-all"
                                >
                                    {CONTACT_INFO.email}
                                </a>{" "}
                                or visit our{" "}
                                <Link href="/contact" className="text-[#b07a52] underline underline-offset-4 decoration-[#b07a52]/40 hover:text-[#ededed]">
                                    contact page
                                </Link>
                                . We&rsquo;re based in {CONTACT_INFO.location}.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}
