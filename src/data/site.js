// Site-wide settings, available in every template as `site`.

export default {
  url: "https://armanlalani.com",
  name: "Arman Lalani",
  twitter: "@lalaniarman5",
  resumeUrl: "https://resume.armanlalani.com/resume.pdf",
  sourceUrl: "https://github.com/armanlalani/portfolio",

  // Default description and link-preview text (pages can override these)
  description:
    "Frontend engineer with 5 years of experience building data-intensive SaaS apps with React and GraphQL/Apollo, across ESG reporting and manufacturing.",
  ogImage: "/assets/og-image.png",
  ogImageAlt: "Arman Lalani — Software Developer. React, JavaScript, GraphQL/Apollo.",

  // Header menu. `section` links point at a part of the home page.
  nav: [
    { label: "Home", section: "" },
    { label: "Work", section: "experience" },
    { label: "Writing", href: "/writing/" },
    { label: "Contact", section: "contact" },
    { label: "Résumé", href: "https://resume.armanlalani.com/resume.pdf", external: true },
  ],

  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/armanlalani/", icon: "/assets/linkedIn.png" },
    { label: "GitHub", href: "https://github.com/armanlalani", icon: "/assets/github.svg" },
    { label: "X", href: "https://x.com/lalaniarman5", icon: "/assets/X.svg" },
    { label: "Medium", href: "https://medium.com/@armanlalani5", icon: "/assets/medium.svg" },
  ],
};
