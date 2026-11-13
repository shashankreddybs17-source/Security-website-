import ResponsiveImage from './ResponsiveImage';
import styles from './HomePartnersSection.module.css';

// Original client logos supplied in the Hi-Tech company brochure.
const clients = [
  { name: 'Aditya Birla Group', image: 'aditya-birla-group-logo.webp' },
  { name: 'BSNL', image: 'bsnl-logo.webp' },
  { name: 'Mahindra', image: 'mahindra-logo.webp' },
  { name: 'Union Bank of India', image: 'union-bank-logo.webp' },
  { name: 'Volkswagen', image: 'volkswagen-logo.webp' },
  { name: 'INOX', image: 'inox-logo.webp' },
  { name: 'BIG Cinemas', image: 'big-cinemas-logo.webp' },
  { name: 'Damro', image: 'damro-logo.webp' },
  { name: 'Fabindia', image: 'fabindia-logo.webp' },
  { name: 'Girias', image: 'girias-logo.webp' },
];

const rows = [clients.slice(0, 5), clients.slice(5)];

export default function HomePartnersSection() {
  return (
    <section className={styles.section} aria-labelledby="hi-tech-client-heading">
      <p className={styles.eyebrow}>OUR CLIENTS</p>
      <h2 id="hi-tech-client-heading" className={styles.heading}>
        Security you can trust.
      </h2>
      <div className={styles.strip}>
        <div className="container-default site-container">
          <div className={styles.rows}>
            {rows.map((row, index) => (
              <div
                className={styles.row}
                key={index}
                role="list"
                aria-label={`Client logos, row ${index + 1}`}
                style={{ '--client-columns': row.length }}
              >
                {row.map((client) => (
                  <div className={styles.logo} key={client.name} role="listitem">
                    <ResponsiveImage
                      src={`/assets/hitech/${client.image}`}
                      alt={client.name}
                      width="180"
                      height="72"
                      loading="lazy"
                      draggable="false"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
