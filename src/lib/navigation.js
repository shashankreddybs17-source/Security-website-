export const navigationLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Services', href: '/services' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/faqs' },
  { label: 'Contact Us', href: '/contact-us' },
];

export function activeNavigationPath(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/contact') return '/contact-us';
  if (path === '/faq') return '/faqs';
  if (path.startsWith('/blog/')) return '/blog';
  return navigationLinks.find((link) => link.href === path)?.href || '/';
}
