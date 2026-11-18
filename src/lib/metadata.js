import { pageMetadata, siteName } from '../data/siteMetadata.js';
import { serviceSelectionEvent } from './serviceNavigation.js';

export function initializeMetadata(origin) {
  const update = () => {
    const data = pageMetadata(location.pathname, location.search, origin);
    document.title = data.title;
    const meta = (attribute, name, content) => {
      let element = document.head.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.content = content;
    };
    meta('name', 'description', data.description);
    for (const [key, value] of Object.entries({
      title: data.title,
      description: data.description,
      url: data.canonical,
      image: data.image,
      type: 'website',
      site_name: siteName,
    })) {
      meta('property', `og:${key}`, value);
    }
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = data.canonical;
  };
  update();
  window.addEventListener('popstate', update);
  window.addEventListener(serviceSelectionEvent, update);
  return () => {
    window.removeEventListener('popstate', update);
    window.removeEventListener(serviceSelectionEvent, update);
  };
}
