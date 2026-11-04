import { Phone } from 'lucide-react';
import styles from './FloatingContactButtons.module.css';

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="26"
      height="26"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 11.5a9 9 0 0 1-13.4 7.8L3 21l1.6-4.7A9 9 0 1 1 21 11.5Z" />
      <path
        fill="currentColor"
        stroke="none"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.967-.94 1.165-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.149-.173.198-.297.298-.495.099-.199.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479s1.064 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347Z"
      />
    </svg>
  );
}

export default function FloatingContactButtons() {
  return (
    <nav className={styles.contacts} aria-label="Quick contact">
      <a
        className={styles.phone}
        href="tel:+917259537223"
        aria-label="Call Hi-Tech Protection Security on +91 72595 37223"
      >
        <Phone size={23} strokeWidth={2} aria-hidden="true" />
      </a>
      <a
        className={styles.whatsapp}
        href="https://wa.me/917259537223"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Hi-Tech Protection Security on WhatsApp (opens in a new tab)"
      >
        <WhatsAppIcon />
      </a>
    </nav>
  );
}
