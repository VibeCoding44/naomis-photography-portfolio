export const SITE_URL = "https://cutecompanyphotography.com";

// Google Analytics 4 measurement ID (e.g. "G-XXXXXXXXXX").
// Set NEXT_PUBLIC_GA_ID in the environment / Netlify build settings.
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

// Google Tag Manager container ID. Public by design (appears in page source).
// Manage Pinterest / GA / conversion tags inside the GTM dashboard, not here.
export const GTM_CONTAINER_ID = "GTM-MHXCT2RK";

/**
 * Primary navigation.
 *
 * Kept to four top-level items. "Sessions vs Offers vs Services" was a
 * distinction only the studio understood, so the three work-related pages now
 * sit under one "Work" group: Portfolio (the images), Sessions (real shoots
 * written up) and Investment (packages and pricing). Every page is still
 * reachable and every URL is unchanged - this is a grouping change, not a
 * restructure.
 *
 * `children` renders as a dropdown on desktop and an indented group in the
 * mobile sheet. Items without `children` are plain links.
 */
export type NavLink = {
    name: string;
    href: string;
    children?: { name: string; href: string; blurb: string }[];
};

export const NAV_LINKS: NavLink[] = [
    {
        name: "Work",
        href: "/portfolio",
        children: [
            {
                name: "Portfolio",
                href: "/portfolio",
                blurb: "Weddings, portraits, and commercial work.",
            },
            {
                name: "Sessions",
                href: "/sessions",
                blurb: "Real shoots, written up start to finish.",
            },
            {
                name: "Investment",
                href: "/services",
                blurb: "Packages, coverage, and what it costs.",
            },
        ],
    },
    { name: "Offers", href: "/offers" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];

/**
 * Every page, flat, in reading order - for the footer.
 *
 * Derived from NAV_LINKS so a page can never be added to the header and
 * silently missed in the footer. Groups contribute their children, not the
 * group itself (there is no "Work" page to link to).
 */
export const FOOTER_LINKS: { name: string; href: string }[] = NAV_LINKS.flatMap(
    (l) => (l.children ? l.children.map(({ name, href }) => ({ name, href })) : [{ name: l.name, href: l.href }]),
);

export const SOCIAL_LINKS = {
    instagram: "https://www.instagram.com/cutecompanyphotography/",
    twitter: "https://twitter.com",
};

export const CONTACT_INFO = {
    email: "cutecompanyphotography4@gmail.com",
    // Display form for humans; phoneE164 is the machine form for tel: links and schema.
    phone: "(813) 365-9092",
    phoneE164: "+18133659092",
    location: "Plant City, FL",
    bookingUrl: "https://unscriptedphotographers.com/b/9ZammUYVLKP5To?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnqTz9T2Md8-iNsmvzY_SwXaVgBcmQKA5Cqnuyz6tJmDyVt4tfX1UV4Ss4cmI_aem_r8ws6UeTdXknbmJqpZ3ONQ",
};
