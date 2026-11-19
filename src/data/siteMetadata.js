import { allServices } from './services.js';
import { blogPosts } from './blogPosts.js';

export const defaultSiteOrigin = 'https://htpsecurity.in';
export const siteName = 'Hi-Tech Protection Security';
export const defaultDescription =
  'Professional security services in Bengaluru for businesses, institutions and residential communities.';

const business = {
  name: siteName,
  email: 'hitechprotectionsecurity@gmail.com',
  telephone: '+91 72595 37223',
  address: {
    streetAddress: 'No. 28, Shop No. 2, 3rd Cross, Vinayaka Nagar, JP Nagar 5th Phase',
    addressLocality: 'Bengaluru',
    addressRegion: 'Karnataka',
    postalCode: '560078',
    addressCountry: 'IN',
  },
  geo: { latitude: 12.9136062, longitude: 77.5911957 },
};

const frequentlyAskedQuestions = [
  {
    question: 'What types of security services do you offer?',
    answer:
      'We provide trained security personnel for hotels, banks, corporate offices, industrial units, commercial buildings and residential apartments.',
  },
  {
    question: 'How do I determine the right security service for my needs?',
    answer:
      'Share your location, premises type and security requirements. Our approach focuses on personnel and practices suited to each location.',
  },
  {
    question: 'How are your security personnel prepared?',
    answer:
      'Our personnel are selected and trained to maintain a safe environment and conduct themselves with professionalism and courtesy.',
  },
  {
    question: 'Who manages your security operations?',
    answer:
      'Our organisation is managed by experienced and trained Ex-Army personnel, bringing military discipline, alertness, responsibility and leadership.',
  },
  {
    question: 'How can I discuss security coverage and pricing?',
    answer:
      'Call +91 72595 37223 or email hitechprotectionsecurity@gmail.com with your location and requirements to discuss your assignment.',
  },
];

export function siteOrigin(value = defaultSiteOrigin) {
  const url = new URL(value);
  if (!['http:', 'https:'].includes(url.protocol))
    throw new Error('Site URL must use HTTP or HTTPS');
  return url.origin;
}

const pages = {
  '/': [
    'Security Services in Bangalore | Hi-Tech Protection Security',
    'Reliable security services in Bangalore from Hi-Tech Protection. ISO 9001:2015 certified, Ex-Army managed and trusted by 280+ clients. Get a quote today.',
  ],
  '/about-us': [
    'Security Companies in Bangalore | About Hi-Tech Protection',
    'Bangalore-based security management company led by Ex-Army personnel and associated with Hi-Tech Security Force (est. 2008). Meet our team.',
  ],
  '/services': [
    'Security & Facility Management Services | Hi-Tech Protection',
    'Guards, supervisors, armed and bodyguard services, event support and housekeeping in Bangalore for hotels, banks, offices, factories and apartments.',
  ],
  '/contact-us': [
    'Contact Hi-Tech Protection | Security Agency in Bangalore',
    'Call +91 72595 37223 or email us to hire security guards in Bangalore. Visit our JP Nagar 5th Phase office or share your premises details for a quote.',
  ],
  '/faqs': [
    'Security Guard Agency in Bangalore FAQs | Hi-Tech Protection',
    'Answers to common questions about hiring trained security guards in Bangalore, coverage, personnel and getting started. Call +91 72595 37223.',
  ],
  '/blog': [
    'Security Insights & Tips | Hi-Tech Protection Security',
    'Practical security articles from Hi-Tech Protection Security: site preparation, guard discipline, safety training and more for Bangalore businesses.',
  ],
};

const serviceMetadata = {
  'hotel-security': [
    'Hotel Security Services in Bangalore | Trained Guards',
    'Trained security personnel for hotel entrances, guest areas and parking zones in Bangalore. Courteous, disciplined and Ex-Army managed. Get a quote.',
  ],
  'bank-security': [
    'Bank Security Services in Bangalore | Branch Guards',
    'Security personnel for bank branches and financial offices in Bangalore, with entrance vigilance, access control and visitor management. Call for a quote.',
  ],
  'corporate-office-security': [
    'Corporate Security Services in Bangalore | Office Guards',
    'Corporate security services for offices and business parks in Bangalore: access monitoring, visitor management and premises surveillance. Get a quote.',
  ],
  'industrial-security': [
    'Industrial Security Services in Bangalore | Factory Guards',
    'Industrial security services for factories and industrial units in Bangalore: gate control, employee and visitor verification and material movement checks.',
  ],
  'commercial-security': [
    'Commercial Security Services in Bangalore | Building Guards',
    'Professional guards for commercial buildings, showrooms and shared business premises in Bangalore. Entrance monitoring, visitor checks, asset protection.',
  ],
  'residential-security': [
    'Apartment Security Agency in Bangalore | Society Guards',
    'Apartment security agency in Bangalore for residential communities: entrance monitoring, visitor verification, vehicle entry and common-area vigilance.',
  ],
  'gunman-services': [
    'Armed Security Services in Bangalore | Gunman Services',
    'Armed security services (gunman) in Bangalore for premises needing extra protection. Availability and authorisation confirmed per assignment. Enquire now.',
  ],
  'housekeeping-services': [
    'Housekeeping Services in Bangalore | Offices & Apartments',
    'Housekeeping agency in Bangalore for offices, commercial spaces and apartments: floor, glass and shared-area cleaning on an agreed schedule. Get a quote.',
  ],
  'bodyguard-services': [
    'Bodyguard Services in Bangalore | Personal Security Guards',
    'Bodyguard agency in Bangalore offering personal security guard services for daily activities, travel and public appearances. Discreet and professional.',
  ],
  'supervisor-services': [
    'Security Supervisor Services in Bangalore | Site Supervision',
    'On-site security supervisors in Bangalore to coordinate guards, monitor attendance, carry out site inspections and report incidents to you. Get a quote.',
  ],
  'event-management-services': [
    'Event Security Services in Bangalore | Entry Management',
    'Event security and entry management in Bangalore: guest-entry coordination, queue and access management and on-site visitor assistance. Enquire now.',
  ],
};

export function pageMetadata(pathname, search = '', origin = defaultSiteOrigin) {
  let path = pathname.replace(/\/$/, '') || '/';
  if (path === '/faq') path = '/faqs';
  if (path === '/contact') path = '/contact-us';
  let [label, description] = pages[path] || pages['/'];
  let canonicalPath = pages[path] ? path : '/';
  const service =
    path === '/services'
      ? allServices.find((item) => item.id === new URLSearchParams(search).get('service'))
      : null;
  const post = blogPosts.find((item) => path === `/blog/${item.slug}`);
  if (service) {
    [label, description] = serviceMetadata[service.id] || [service.title, service.text];
    canonicalPath = `/services?service=${service.id}`;
  } else if (post) {
    label = `${post.title} | ${siteName}`;
    description = post.paragraphs[0];
    canonicalPath = path;
  }
  return {
    title: label || siteName,
    description,
    canonical: new URL(canonicalPath, siteOrigin(origin)).href,
    image: new URL('/assets/hitech/hi-tech-certified-logo.webp', siteOrigin(origin)).href,
  };
}

export function sitemapUrls(origin = defaultSiteOrigin) {
  const paths = [
    ...Object.keys(pages),
    ...allServices.map((service) => `/services?service=${service.id}`),
    ...blogPosts.map((post) => `/blog/${post.slug}`),
  ];
  return paths.map((path) => new URL(path, siteOrigin(origin)).href);
}

export function structuredData(pathname, search = '', origin = defaultSiteOrigin) {
  const originUrl = siteOrigin(origin);
  let path = pathname.replace(/\/$/, '') || '/';
  if (path === '/faq') path = '/faqs';
  if (path === '/contact') path = '/contact-us';
  const metadata = pageMetadata(path, search, originUrl);
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${originUrl}/#organization`,
    name: business.name,
    url: originUrl,
    logo: new URL('/assets/hitech/hi-tech-certified-logo.webp', originUrl).href,
    image: metadata.image,
    description: defaultDescription,
    email: business.email,
    telephone: business.telephone,
    address: { '@type': 'PostalAddress', ...business.address },
    geo: { '@type': 'GeoCoordinates', ...business.geo },
    areaServed: { '@type': 'City', name: 'Bengaluru' },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: business.telephone,
      contactType: 'customer service',
    },
    knowsAbout: allServices.map((service) => service.title),
  };
  const page = {
    '@context': 'https://schema.org',
    '@type': path === '/' ? 'WebSite' : 'WebPage',
    '@id': metadata.canonical,
    name: metadata.title,
    url: metadata.canonical,
    description: metadata.description,
    inLanguage: 'en-IN',
    publisher: { '@id': organization['@id'] },
  };
  const schema = [organization, page];
  const service =
    path === '/services'
      ? allServices.find((item) => item.id === new URLSearchParams(search).get('service'))
      : null;
  const post = blogPosts.find((item) => path === `/blog/${item.slug}`);
  if (service) {
    schema.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.title,
      description: service.text,
      url: metadata.canonical,
      provider: { '@id': organization['@id'] },
      areaServed: { '@type': 'City', name: 'Bengaluru' },
    });
  }
  if (post) {
    schema.push({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.paragraphs[0],
      image: new URL(post.image, originUrl).href,
      mainEntityOfPage: metadata.canonical,
      author: { '@id': organization['@id'] },
      publisher: { '@id': organization['@id'] },
    });
  }
  if (path === '/faqs') {
    schema.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: frequentlyAskedQuestions.map(({ question, answer }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    });
  }
  return schema;
}

export function llmsText(origin = defaultSiteOrigin) {
  const baseUrl = siteOrigin(origin);
  return `# ${siteName}\n\n> ${defaultDescription}\n\n## Business details\n\n- Location: Bengaluru, Karnataka, India\n- Address: ${business.address.streetAddress}, ${business.address.addressLocality} - ${business.address.postalCode}\n- Phone: ${business.telephone}\n- Email: ${business.email}\n\n## Services\n\n${allServices
    .map(
      (service) =>
        `- [${service.title}](${baseUrl}/services?service=${service.id}): ${service.text}`,
    )
    .join(
      '\n',
    )}\n\n## Key pages\n\n- [About us](${baseUrl}/about-us)\n- [All services](${baseUrl}/services)\n- [Frequently asked questions](${baseUrl}/faqs)\n- [Contact](${baseUrl}/contact-us)\n- [Blog](${baseUrl}/blog)\n\n## Source and accuracy\n\nUse this website as the source for company details and service descriptions. For current availability, coverage and pricing, contact Hi-Tech Protection Security directly.\n`;
}
