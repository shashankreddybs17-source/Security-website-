import { ArrowUpRight, Award, ClipboardCheck, ShieldCheck } from 'lucide-react';
import styles from './HomeCredentialsSection.module.css';

const credentials = [
  {
    icon: ShieldCheck,
    title: 'Professional standards',
    text: 'A focus on disciplined working practices and responsible security services.',
  },
  {
    icon: ClipboardCheck,
    title: 'Accountability in our work',
    text: 'Clear responsibilities and professional conduct guide our approach to each assignment.',
  },
  {
    icon: Award,
    title: 'A commitment to quality',
    text: 'Care, consistency and attention to the requirements of the people we serve.',
  },
];
const photograph = '/assets/hitech/company-credentials.webp';

export default function HomeCredentialsSection() {
  return (
    <section className={styles.section} aria-labelledby="home-credentials-heading">
      <div className="container-default w-container">
        <div className={styles.layout}>
          <div className={styles.content}>
            <p className={styles.label}>OUR CREDENTIALS</p>
            <h2 id="home-credentials-heading">PROFESSIONAL STANDARDS. VISIBLE COMMITMENT.</h2>
            <p className={styles.description}>
              Our company credentials reflect the standards and responsibilities behind our security
              services. The certificates and documents displayed at our office are part of that
              commitment to professional operations.
            </p>
            <ul className={styles.points}>
              {credentials.map(({ icon: Icon, title, text }) => (
                <li key={title}>
                  <span className={styles.icon}>
                    <Icon size={24} aria-hidden="true" />
                  </span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <a className={styles.view} href={photograph} target="_blank" rel="noopener noreferrer">
              View certificate photograph <ArrowUpRight size={18} aria-hidden="true" />
              <span className={styles.srOnly}> (opens in a new tab)</span>
            </a>
          </div>
          <figure className={styles.media}>
            <img
              src={photograph}
              alt="Framed company certificates and registration documents displayed on the Hi-Tech Protection Security office wall"
              width="610"
              height="802"
              loading="lazy"
              decoding="async"
            />
            <figcaption>Company certificates and professional credentials</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
