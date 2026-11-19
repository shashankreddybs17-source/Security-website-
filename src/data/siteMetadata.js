import { allServices } from './services.js';
import { blogPosts } from './blogPosts.js';

export const defaultSiteOrigin = 'https://security-website-omega.vercel.app';
export const siteName = 'Hi-Tech Protection Security';
export const defaultDescription =
  'Hi-Tech Protection Security — professional security services in Bengaluru for businesses, institutions and residential communities.';

export function siteOrigin(value = defaultSiteOrigin) {
  const url = new URL(value);
  if (!['http:', 'https:'].includes(url.protocol))
    throw new Error('Site URL must use HTTP or HTTPS');
  return url.origin;
}

const pages = {
  '/': ['', defaultDescription],
  '/about-us': [
    'About Us',
    'Learn about Hi-Tech Protection Security, our values, personnel and practical security preparation.',
  ],
  '/services': [
    'Services',
    'Explore Hi-Tech Protection Security services for businesses, institutions, residential communities and individual requirements.',
  ],
  '/contact-us': [
    'Contact Us',
    'Contact Hi-Tech Protection Security in Bengaluru to discuss your premises and security requirements.',
  ],
  '/faqs': [
    'FAQ',
    'Find answers to common questions about Hi-Tech Protection Security services and discussing your requirements.',
  ],
  '/blog': [
    'Blog',
    'Read Hi-Tech Protection Security articles about site preparation, professional conduct and safety training.',
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
    label = service.title;
    description = service.text;
    canonicalPath = `/services?service=${service.id}`;
  } else if (post) {
    label = post.title;
    description = post.paragraphs[0];
    canonicalPath = path;
  }
  return {
    title: label ? `${label} | ${siteName}` : siteName,
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
