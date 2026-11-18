import { useEffect, useRef, useState } from 'react';
import ResponsiveImage from './ResponsiveImage';
import styles from './HomePartnersSection.module.css';

// Local client artwork: brochure originals and published brand logo sources.
const clients = [
  { name: 'Aditya Birla Group', image: 'aditya-birla-group-logo.webp' },
  { name: 'Mahindra', image: 'mahindra-logo.webp' },
  { name: 'Volkswagen', image: 'volkswagen-logo.webp' },
  { name: 'Union Bank of India', image: 'union-bank-logo.webp' },
  { name: 'BSNL', image: 'bsnl-logo.webp' },
  { name: 'INOX', image: 'inox-logo.webp' },
  { name: 'Indian Express', image: 'clients/indian-express-logo.svg' },
  { name: 'Allen Solly', image: 'clients/allen-solly-logo-large.webp' },
  { name: 'Woodland', image: 'clients/woodland-logo.webp' },
  { name: 'Fabindia', image: 'fabindia-logo.webp' },
  { name: 'Karnataka Housing Board', image: 'clients/karnataka-housing-board-logo.webp' },
  {
    name: 'Karnataka Vikas Grameena Bank',
    image: 'clients/karnataka-vikas-grameena-bank-logo-large.webp',
  },
  { name: 'BIG Cinemas', image: 'big-cinemas-logo.webp' },
  { name: 'GIRIAS', image: 'girias-logo.webp' },
  { name: 'DAMRO', image: 'damro-logo.webp' },
  { name: 'Frankfinn', image: 'clients/frankfinn-logo.webp' },
  { name: 'Deeksha', image: 'clients/deeksha-logo.webp' },
  { name: 'Ashok Iron Group', image: 'clients/ashok-iron-group-logo.webp' },
  { name: 'Keshav Cement', image: 'clients/keshav-cement-logo-large.webp' },
  { name: 'Subhash Photos', image: 'clients/subhash-photos-logo-large.webp' },
];

const rows = [0, 5, 10, 15].map((start) => clients.slice(start, start + 5));

function ClientLogo({ client, decorative = false }) {
  return (
    <div className={styles.logo} role={decorative ? undefined : 'listitem'}>
      <ResponsiveImage
        src={`/assets/hitech/${client.image}`}
        alt={decorative ? '' : client.name}
        width="180"
        height="72"
        sizes="200px"
        loading="lazy"
        draggable="false"
      />
    </div>
  );
}

export default function HomePartnersSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting));
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="hi-tech-client-heading"
      data-paused={!isVisible}
    >
      <p className={styles.eyebrow}>OUR CLIENTS</p>
      <h2 id="hi-tech-client-heading" className={styles.heading}>
        Security you can trust.
      </h2>
      <div className={styles.strip}>
        <div className="container-default site-container">
          <div className={styles.rows} id="hi-tech-client-rows">
            {rows.map((row, index) => (
              <div className={styles.row} key={index}>
                <div className={styles.track}>
                  <div
                    className={styles.group}
                    role="list"
                    aria-label={`Client logos, row ${index + 1}`}
                  >
                    {row.map((client) => (
                      <ClientLogo client={client} key={client.name} />
                    ))}
                  </div>
                  <div className={`${styles.group} ${styles.duplicate}`} aria-hidden="true">
                    {row.map((client) => (
                      <ClientLogo client={client} key={client.name} decorative />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
