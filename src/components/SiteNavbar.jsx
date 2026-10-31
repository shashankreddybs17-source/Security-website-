import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { activeNavigationPath, navigationLinks } from '../lib/navigation';
import styles from './SiteNavbar.module.css';

export default function SiteNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const header = useRef(null);
  const menu = useRef(null);
  const toggle = useRef(null);
  const activePath = activeNavigationPath(window.location.pathname);
  const close = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    const onResize = () => {
      if (window.innerWidth >= 992) setOpen(false);
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
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const scrollbarWidth = Math.max(0, window.innerWidth - document.documentElement.clientWidth);
    if (scrollbarWidth)
      document.body.style.paddingRight = `${parseFloat(getComputedStyle(document.body).paddingRight) + scrollbarWidth}px`;
    document.body.style.overflow = 'hidden';
    const focusFrame = requestAnimationFrame(() => menu.current?.querySelector('a')?.focus());
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
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
      document.removeEventListener('keydown', onKeyDown);
      if (toggle.current?.getClientRects().length) toggle.current.focus();
    };
  }, [open]);

  const links = (mobile) =>
    navigationLinks.map((link) => (
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
    ));
  return (
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
        <a href="/contact-us" className={`${styles.quote} ${styles.desktopQuote}`} onClick={close}>
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
  );
}
