import { PhoneCall, Mail, MapPin } from 'lucide-react';
import styles from './SiteFooter.module.css';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Services', href: '/services' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact Us', href: '/contact-us' },
  { label: 'FAQ', href: '/faqs' },
];
const email = 'hitechprotectionsecurity@gmail.com';

export default function SiteFooter() {
  return (
    <footer className={styles.footer} aria-label="Site footer">
      <div className={`${styles.container} ${styles.main}`}>
        <div className={styles.brand}>
          <a href="/" aria-label="Hi-Tech Protection Security home" className={styles.logoLink}>
            <img
              src="/assets/hitech/logo.png"
              width="1007"
              height="391"
              loading="lazy"
              alt="Hi-Tech Protection Security"
              className={styles.logo}
            />
          </a>
          <p>Security You Can Trust. Protection You Can Rely On.</p>
        </div>
        <nav className={styles.quickLinks} aria-label="Footer quick links">
          <h2>Quick Links</h2>
          <ul>
            {quickLinks.map(({ label, href }) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <address className={styles.contact}>
          <a href="tel:+917259537223" className={styles.contactItem}>
            <span className={styles.icon}>
              <PhoneCall size={18} aria-hidden="true" />
            </span>
            <span className={styles.contactText}>
              <span className={styles.label}>Contact</span>
              <strong>+91 72595 37223</strong>
            </span>
          </a>
          <a href={`mailto:${email}`} className={styles.contactItem}>
            <span className={styles.icon}>
              <Mail size={18} aria-hidden="true" />
            </span>
            <span className={styles.contactText}>
              <span className={styles.label}>Email Us</span>
              <strong>{email}</strong>
            </span>
          </a>
          <div className={`${styles.contactItem} ${styles.location}`}>
            <span className={styles.icon}>
              <MapPin size={20} aria-hidden="true" />
            </span>
            <p>
              No. 28, Shop No. 2, 3rd Cross, Vinayaka Nagar, JP Nagar 5th Phase, Bengaluru - 560
              078.
            </p>
          </div>
        </address>
      </div>
      <div className={styles.bottomBar}>
        <div className={`${styles.container} ${styles.bottom}`}>
          <nav aria-label="Footer additional links" className={styles.bottomLinks}>
            <a href="/services">Services</a>
            <a href="/blog">Blog</a>
            <a href="/faqs">FAQ</a>
          </nav>
          <p>
            Copyright &copy; {new Date().getFullYear()} Hi-Tech Protection Security. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
