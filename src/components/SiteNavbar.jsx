import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import { activeNavigationPath, navigationLinks } from '../lib/navigation';
import { allServices } from '../data/services';
import {
  isServicesPage,
  selectedService,
  navigateService,
  serviceSelectionEvent,
} from '../lib/serviceNavigation';
import styles from './SiteNavbar.module.css';
import { lockPageScroll } from '../lib/pageNavigation';

export default function SiteNavbar() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [activeService, setActiveService] = useState(() =>
    isServicesPage() ? selectedService({ fallback: false })?.id : null,
  );
  const hoverTimer = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const header = useRef(null);
  const menu = useRef(null);
  const toggle = useRef(null);
  const activePath = activeNavigationPath(window.location.pathname);
  const close = () => {
    setOpen(false);
    setServicesOpen(false);
  };

  useEffect(() => {
    const update = () =>
      setActiveService(isServicesPage() ? selectedService({ fallback: false })?.id : null);
    window.addEventListener('popstate', update);
    window.addEventListener(serviceSelectionEvent, update);
    return () => {
      clearTimeout(hoverTimer.current);
      window.removeEventListener('popstate', update);
      window.removeEventListener(serviceSelectionEvent, update);
    };
  }, []);

  useEffect(() => {
    if (!servicesOpen) return;
    const dismiss = (event) => {
      if (!event.target.closest('[data-services-dropdown]')) setServicesOpen(false);
    };
    const escape = (event) => {
      if (event.key !== 'Escape') return;
      const dropdown = document.activeElement?.closest('[data-services-dropdown]');
      if (dropdown) {
        event.preventDefault();
        event.stopImmediatePropagation();
        dropdown.querySelector('button')?.focus();
      }
      setServicesOpen(false);
    };
    document.addEventListener('pointerdown', dismiss);
    document.addEventListener('keydown', escape, true);
    return () => {
      document.removeEventListener('pointerdown', dismiss);
      document.removeEventListener('keydown', escape, true);
    };
  }, [servicesOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    const onResize = () => {
      if (window.innerWidth >= 992) setOpen(false);
      setServicesOpen(false);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const unlock = lockPageScroll(window, document);
    const focusFrame = requestAnimationFrame(() =>
      menu.current?.querySelector('a')?.focus({ preventScroll: true }),
    );
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = [
        ...header.current.querySelectorAll('a[href], button:not([disabled])'),
      ].filter((element) => element.getClientRects().length && !element.closest('[inert]'));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      cancelAnimationFrame(focusFrame);
      unlock();
      document.removeEventListener('keydown', onKeyDown);
      if (toggle.current?.getClientRects().length) toggle.current.focus({ preventScroll: true });
    };
  }, [open]);

  const links = (mobile) =>
    navigationLinks.map((link) =>
      link.href === '/services' ? (
        <div
          key={link.href}
          className={styles.servicesDropdown}
          data-services-dropdown
          onPointerEnter={(event) => {
            if (mobile || event.pointerType !== 'mouse') return;
            clearTimeout(hoverTimer.current);
            setServicesOpen(true);
          }}
          onPointerLeave={(event) => {
            if (mobile || event.pointerType !== 'mouse') return;
            clearTimeout(hoverTimer.current);
            const dropdown = event.currentTarget;
            hoverTimer.current = setTimeout(() => {
              if (!dropdown.contains(document.activeElement)) setServicesOpen(false);
            }, 160);
          }}
          onKeyDown={(event) => {
            const items = [...event.currentTarget.querySelectorAll('ul a')];
            const index = items.indexOf(document.activeElement);
            let next;
            if (event.key === 'ArrowDown') next = index < 0 ? 0 : (index + 1) % items.length;
            else if (event.key === 'ArrowUp')
              next = index < 0 ? items.length - 1 : (index - 1 + items.length) % items.length;
            else if (event.key === 'Home' && index >= 0) next = 0;
            else if (event.key === 'End' && index >= 0) next = items.length - 1;
            else return;
            event.preventDefault();
            setServicesOpen(true);
            requestAnimationFrame(() => items[next]?.focus());
          }}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setServicesOpen(false);
          }}
        >
          <div className={styles.servicesRow}>
            <a
              className={mobile ? styles.mobileLink : styles.link}
              href={link.href}
              aria-current={activePath === link.href ? 'page' : undefined}
              onClick={close}
            >
              {link.label}
            </a>
            <button
              type="button"
              className={styles.servicesToggle}
              aria-label="Toggle services submenu"
              aria-expanded={servicesOpen}
              aria-controls={mobile ? 'mobile-services-submenu' : 'desktop-services-submenu'}
              onClick={() => setServicesOpen((value) => !value)}
            >
              <ChevronDown size={16} aria-hidden="true" />
            </button>
          </div>
          <ul
            id={mobile ? 'mobile-services-submenu' : 'desktop-services-submenu'}
            className={styles.servicesSubmenu}
            data-open={servicesOpen}
            inert={!servicesOpen}
            aria-hidden={!servicesOpen}
          >
            {allServices.map((service) => (
              <li key={service.id}>
                <a
                  href={`/services?service=${service.id}`}
                  aria-current={activeService === service.id ? 'true' : undefined}
                  onClick={(event) => {
                    navigateService(event, service.id);
                    clearTimeout(hoverTimer.current);
                    close();
                  }}
                >
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <a
          key={link.href}
          className={mobile ? styles.mobileLink : styles.link}
          href={link.href}
          aria-current={activePath === link.href ? 'page' : undefined}
          onClick={close}
        >
          {link.label}
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      ),
    );
  return (
    <>
      <div
        className={`${styles.mobileSpacer} ${window.location.pathname === '/' ? styles.heroSpacer : ''}`}
        aria-hidden="true"
      />
      <header
        ref={header}
        className={`${styles.header} ${window.location.pathname === '/' ? styles.overHero : ''} ${scrolled ? styles.scrolled : ''}`}
      >
        <div className={styles.inner}>
          <a
            href="/"
            className={styles.brand}
            aria-label="Hi-Tech Protection Security home"
            onClick={close}
          >
            <img
              src="/assets/hitech/logo.png"
              width="1007"
              height="391"
              alt="Hi-Tech Protection Security"
            />
          </a>
          <nav className={styles.desktopNav} aria-label="Main navigation">
            {links(false)}
          </nav>
          <a
            href="/contact-us"
            className={`${styles.quote} ${styles.desktopQuote}`}
            onClick={close}
          >
            GET A QUOTE{' '}
            <span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </span>
          </a>
          <button
            ref={toggle}
            className={styles.toggle}
            type="button"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            aria-controls="hi-tech-mobile-navigation"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>
        {open && <div className={styles.backdrop} aria-hidden="true" onClick={close} />}
        <div
          ref={menu}
          id="hi-tech-mobile-navigation"
          className={`${styles.mobileMenu} ${open ? styles.menuOpen : ''}`}
          inert={!open}
          aria-hidden={!open}
        >
          <div className={styles.mobileMenuBody}>
            <nav aria-label="Mobile navigation">{links(true)}</nav>
            <a className={styles.quote} href="/contact-us" onClick={close}>
              GET A QUOTE{' '}
              <span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </span>
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
