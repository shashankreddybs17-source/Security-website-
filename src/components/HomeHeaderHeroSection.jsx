import ResponsiveImage from './ResponsiveImage';
import { ArrowUpRight, Phone } from 'lucide-react';
import styles from './HomeHeaderHeroSection.module.css';
import heroAvif from '../data/heroAvif.json';

const avifSources = heroAvif.variants.map(({ src, width }) => `${src} ${width}w`).join(', ');

export default function HomeHeaderHeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.photo}>
        <picture>
          <source type="image/avif" srcSet={avifSources} sizes="100vw" />
          <ResponsiveImage
            src="/assets/hitech/new-uniform/november-2026/corporate-security-briefing.webp"
            alt="Five Hi-Tech security guards receiving a corporate security and fire safety briefing"
            width="1448"
            height="1086"
            sizes="100vw"
            fetchPriority="high"
            loading="eager"
          />
        </picture>
        <div className={styles.headlineBlock}>
          <p className={styles.headline}>
            A HIGHER STANDARD
            <br />
            OF SECURITY.
          </p>
        </div>
      </div>
      <div className={styles.caption}>
        <div className={`container-default site-container ${styles.captionInner}`}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>HI-TECH PROTECTION SECURITY</p>
            <h1>
              Dependable security.
              <br />
              For Bengaluru’s businesses
              <br className={styles.desktopBreak} /> and communities.
            </h1>
            <p className={styles.description}>
              Trained personnel. Military discipline. Protection built around your premises.
            </p>
          </div>
          <div className={styles.enquiry}>
            <a className={styles.phone} href="tel:+917259537223">
              <Phone size={19} aria-hidden="true" />
              +91 72595 37223
            </a>
            <a className={styles.button} href="/contact-us">
              Discuss your security <ArrowUpRight size={20} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
