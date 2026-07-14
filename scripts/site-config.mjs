export const SITE = Object.freeze({
  origin: "https://seandinwiddie.com",
  name: "Sean Dinwiddie's Webmastery",
  email: "hello@seandinwiddie.com",
  phone: "+1-530-638-3238",
  analyticsId: "G-4CWP5L8TMC",
});

export const organizationId = `${SITE.origin}/#organization`;
export const websiteId = `${SITE.origin}/#website`;

const place = (city, state) => ({
  "@type": "City",
  name: city,
  containedInPlace: { "@type": "State", name: state },
});

export const SERVICE_AREAS = Object.freeze([
  place("Klamath Falls", "Oregon"),
  place("Redding", "California"),
]);

export const SOCIAL_IMAGES = Object.freeze({
  agency: {
    path: "/assets/social/agency.png",
    alt: "Sean Dinwiddie's Webmastery — web design, development, SEO, and automation",
  },
  local: {
    path: "/assets/social/local.png",
    alt: "Local web support for Klamath Falls and Redding from Sean Dinwiddie's Webmastery",
  },
  services: {
    path: "/assets/social/services.png",
    alt: "Web design, development, SEO, and automation services from Sean Dinwiddie's Webmastery",
  },
  archive: {
    path: "/assets/social/technical-archive.png",
    alt: "Sean Dinwiddie's technical archive covering Redux, BDD, and functional reactive programming",
  },
});

const ROUTE_METADATA = Object.freeze({
  "/": {
    title: "Web Design for Klamath Falls & Redding | Sean Dinwiddie",
    description:
      "Web design, development, local SEO, and business automation for organizations in Klamath Falls, Oregon, and Redding, California.",
  },
  "/about/": {
    title: "About Sean Dinwiddie | Independent Web Developer",
    description:
      "Meet Sean Dinwiddie, the developer behind an independent web, software, SEO, and automation agency serving Klamath Falls and Redding.",
  },
  "/contact/": {
    title: "Contact Sean Dinwiddie | Web and Software Projects",
    description:
      "Contact Sean Dinwiddie about web design, development, local SEO, or business automation in Klamath Falls and Redding.",
  },
  "/local/": {
    title: "Local Web Services in Klamath Falls & Redding | Sean Dinwiddie",
    description:
      "Explore practical web design, development, local SEO, and automation services for organizations in Klamath Falls and Redding.",
    social: "local",
    published: "2026-07-14",
    modified: "2026-07-14",
  },
  "/local/oregon/klamath-falls/": {
    title: "Klamath Falls Web Design & Local SEO | Sean Dinwiddie",
    description:
      "Practical web design, development, and local SEO for Klamath Falls businesses, with a clear scope and direct technical support.",
    social: "local",
    modified: "2026-07-14",
  },
  "/local/california/redding/": {
    title: "Redding Web Design & Local SEO | Sean Dinwiddie",
    description:
      "Practical web design, development, and local SEO for Redding businesses, with a clear scope and direct technical support.",
    social: "local",
    published: "2026-07-14",
    modified: "2026-07-14",
  },
  "/automation/": {
    title: "Business Automation for Klamath Falls & Redding | Sean Dinwiddie",
    description:
      "Workflow automation for small organizations in Klamath Falls, Redding, and nearby communities, designed around the tools their teams already use.",
    social: "services",
  },
  "/design/": {
    title: "Website Design Services | Sean Dinwiddie's Webmastery",
    description:
      "Responsive website design focused on clear information, accessible interactions, and practical paths for visitors to contact your organization.",
    social: "services",
  },
  "/development/": {
    title: "Web Development Services | Sean Dinwiddie's Webmastery",
    description:
      "Web development for maintainable sites, custom applications, integrations, repairs, and performance improvements sized to the project.",
    social: "services",
  },
  "/marketing/": {
    title: "SEO and Digital Marketing Services | Sean Dinwiddie",
    description:
      "Technical SEO, on-page optimization, off-site strategy, and paid advertising support with a clear scope and measurable implementation plan.",
    social: "services",
  },
  "/service/": {
    title: "Web, Software, SEO & Automation Services | Sean Dinwiddie",
    description:
      "Independent web design, development, SEO, automation, and training services for organizations in Klamath Falls and Redding.",
    social: "services",
  },
  "/prices/": {
    title: "Project Pricing and Scope | Sean Dinwiddie's Webmastery",
    description:
      "Review the agency's project approach, then contact Sean Dinwiddie for a scope and price based on the work your organization needs.",
    social: "services",
  },
  "/resources/": {
    title: "Web and Software Resources | Sean Dinwiddie's Webmastery",
    description:
      "A maintained collection of web design, software development, SEO, hosting, and business tools referenced by the agency.",
  },
  "/tools/": {
    title: "Agency Tools | Sean Dinwiddie's Webmastery",
    description:
      "A reference list of development, design, hosting, analytics, productivity, and site-maintenance tools used or evaluated by the agency.",
  },
  "/privacy/": {
    title: "Privacy and Data Choices | Sean Dinwiddie's Webmastery",
    description:
      "Learn which providers and data events this static agency site uses, how optional analytics consent works, and how to change your privacy choice.",
    modified: "2026-07-14",
  },
  "/service/training/": {
    title: "Software and Web Training | Sean Dinwiddie's Webmastery",
    description:
      "Practical training materials for web pages, software workflows, and functional reactive programming, maintained by Sean Dinwiddie.",
    social: "services",
  },
  "/service/training/frp/": {
    title: "Functional Reactive Programming Training | Sean Dinwiddie",
    description:
      "Training resources for understanding functional reactive programming concepts and applying event-driven data flow in software projects.",
    social: "archive",
  },
  "/service/training/pages/": {
    title: "Landing Page Training | Sean Dinwiddie's Webmastery",
    description:
      "Training resources for planning and assembling clear landing pages with purposeful content, structure, and calls to action.",
    social: "services",
  },
  "/service/training/pages/page-setup/": {
    title: "Landing Page Setup Guide | Sean Dinwiddie's Webmastery",
    description:
      "A practical guide to setting up a landing page structure, organizing its content, and preparing the page for implementation.",
    social: "services",
  },
  "/store/": {
    title: "Store | Sean Dinwiddie's Webmastery",
    description:
      "Open the agency's externally hosted store after choosing to load content from its commerce provider.",
  },
  "/blog/": {
    title: "Agency Notes | Sean Dinwiddie's Webmastery",
    description:
      "Practical notes from Sean Dinwiddie on web development, Redux Toolkit, automation, and maintaining useful software for small organizations.",
    social: "archive",
  },
  "/blog/rtk-promt-example/": {
    title: "Redux Toolkit CLI with Prompts and JSON | Sean Dinwiddie",
    description:
      "Build a small command-line application with Redux Toolkit, prompt-driven input, and JSON state persistence.",
    social: "archive",
  },
  "/community/": {
    title: "Technical Archive: Redux, BDD & FRP | Sean Dinwiddie",
    description:
      "Browse Sean Dinwiddie's agency technical archive covering Redux, user stories, behavior-driven development, and functional reactive programming.",
    social: "archive",
    modified: "2026-07-14",
  },
  "/community/sitemap/": {
    title: "Technical Archive Sitemap | Sean Dinwiddie",
    description:
      "Browse an index of articles in Sean Dinwiddie's agency technical archive.",
    social: "archive",
  },
});

const SERVICE_ROUTES = Object.freeze({
  "/local/": ["Web Design", "Web Development", "Local SEO", "Business Automation"],
  "/local/oregon/klamath-falls/": ["Web Design", "Web Development", "Local SEO", "Business Automation"],
  "/local/california/redding/": ["Web Design", "Web Development", "Local SEO", "Business Automation"],
  "/automation/": ["Business Automation"],
  "/design/": ["Web Design"],
  "/design/new/": ["Web Design"],
  "/design/cro/": ["Conversion Rate Optimization"],
  "/development/": ["Web Development"],
  "/development/apps/": ["Application Development"],
  "/development/sites/": ["Website Development"],
  "/marketing/": ["Search Engine Optimization", "Digital Marketing"],
  "/marketing/on-site-seo/": ["On-site SEO"],
  "/marketing/off-site-seo-and-ads/": ["Off-site SEO", "Paid Advertising"],
  "/service/": ["Web Design", "Web Development", "Local SEO", "Business Automation"],
  "/service/training/": ["Software and Web Training"],
});

const categoryForRoute = (route) => {
  if (route.startsWith("/community/") || route.startsWith("/blog/")) return "archive";
  if (route.startsWith("/local/")) return "local";
  if (/^\/(?:automation|design|development|marketing|service)(?:\/|$)/.test(route)) {
    return "services";
  }
  return "agency";
};

const archiveMetadataForRoute = (route) => {
  const communityPage = route.match(/^\/community\/page\/(\d+)\/$/);
  if (communityPage) {
    return {
      title: `Technical Archive — Page ${communityPage[1]} | Sean Dinwiddie`,
      description:
        "Browse more Redux, user-story, behavior-driven-development, and functional-reactive-programming articles in the agency technical archive.",
    };
  }
  const communityAuthor = route.match(/^\/community\/author\/seandinwiddie\/(?:page\/(\d+)\/)?$/);
  if (communityAuthor) {
    const page = communityAuthor[1] ? ` — Page ${communityAuthor[1]}` : "";
    return {
      title: `Sean Dinwiddie Technical Articles${page}`,
      description:
        "Browse technical archive articles by Sean Dinwiddie on Redux, user stories, BDD, and functional reactive programming.",
    };
  }
  const communityCategory = route.match(/^\/community\/category\/development\/(?:page\/(\d+)\/)?$/);
  if (communityCategory) {
    const page = communityCategory[1] ? ` — Page ${communityCategory[1]}` : "";
    return {
      title: `Software Development Archive${page} | Sean Dinwiddie`,
      description:
        "Browse software-development articles retained in Sean Dinwiddie's agency technical archive.",
    };
  }
  if (route === "/blog/author/seandinwiddie/") {
    return {
      title: "Agency Notes by Sean Dinwiddie",
      description:
        "Browse agency notes by Sean Dinwiddie about web development, software maintenance, Redux Toolkit, and automation.",
    };
  }
  if (route === "/blog/category/uncategorized/") {
    return {
      title: "General Agency Notes | Sean Dinwiddie's Webmastery",
      description:
        "Browse general agency notes retained on web development, software maintenance, and practical implementation work.",
    };
  }
  return {};
};

export const metadataForRoute = (route) => ({
  social: categoryForRoute(route),
  ...archiveMetadataForRoute(route),
  ...ROUTE_METADATA[route],
});

export const serviceTypesForRoute = (route) => SERVICE_ROUTES[route] || null;

export const socialImageForRoute = (route) => {
  const key = metadataForRoute(route).social;
  const image = SOCIAL_IMAGES[key] || SOCIAL_IMAGES.agency;
  return {
    ...image,
    url: `${SITE.origin}${image.path}`,
    width: 1200,
    height: 630,
    type: "image/png",
  };
};
