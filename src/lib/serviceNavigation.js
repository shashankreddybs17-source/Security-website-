import { allServices } from '../data/services.js';

export const serviceSelectionEvent = 'hi-tech-service-selection';
export const isServicesPage = () => /^\/services\/?$/.test(window.location.pathname);
export function selectedService({ fallback = true } = {}) {
  const id = new URLSearchParams(window.location.search).get('service');
  return allServices.find((service) => service.id === id) || (fallback ? allServices[0] : null);
}
export function navigateService(event, id) {
  if (
    !isServicesPage() ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  )
    return;
  event.preventDefault();
  const url = new URL(window.location.href);
  url.searchParams.set('service', id);
  if (url.href !== window.location.href) window.history.pushState(null, '', url);
  window.dispatchEvent(new Event(serviceSelectionEvent));
}
