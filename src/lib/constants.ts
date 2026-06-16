export const SITE_URL = "https://cutecompanyphotography.com";

// Google Analytics 4 measurement ID (e.g. "G-XXXXXXXXXX").
// Set NEXT_PUBLIC_GA_ID in the environment / Netlify build settings.
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

// Google Tag Manager container ID. Public by design (appears in page source).
// Manage Pinterest / GA / conversion tags inside the GTM dashboard, not here.
export const GTM_CONTAINER_ID = "GTM-MHXCT2RK";

export const NAV_LINKS = [
    { name: "Portfolio", href: "/portfolio" },
    { name: "Sessions", href: "/sessions" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
];

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
