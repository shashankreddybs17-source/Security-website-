// Resolve old homepage-section bookmarks to their dedicated pages.
export function cleanPageUrl(pathname, search = '', hash = '') {
  const legacy = {
    '#services': '/services',
    '#blog': '/blog',
    '#faq': '/faqs',
    '#faqs': '/faqs',
    '#contact': '/contact-us',
    '#contact-us': '/contact-us',
    '#about': '/about-us',
    '#about-us': '/about-us',
  };
  if (pathname === '/' && legacy[hash]) return legacy[hash] + search;
  return null;
}
