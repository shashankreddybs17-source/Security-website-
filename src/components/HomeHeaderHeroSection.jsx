import { ArrowUpRight, Phone } from 'lucide-react';
import styles from './HomeHeaderHeroSection.module.css';

export default function HomeHeaderHeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.photo}>
        <img
          src="/assets/hitech/new-uniform/corporate-security-briefing.webp"
          alt="Five Hi-Tech security guards receiving a corporate security and fire safety briefing"
          width="1430"
          height="1100"
          fetchPriority="high"
          loading="eager"
        />
        <div className={styles.headlineBlock}>
          <p className={styles.headline}>
            A HIGHER STANDARD
            <br />
            OF SECURITY.
          </p>
        </div>
      </div>
      <div className={styles.caption}>
        <div className={`container-default w-container ${styles.captionInner}`}>
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
