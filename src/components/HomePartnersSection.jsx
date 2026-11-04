import styles from './HomePartnersSection.module.css';

// Original client logos supplied in the Hi-Tech company brochure.
const clients = [
  { name: 'Aditya Birla Group', image: 'client-8.webp' },
  { name: 'BSNL', image: 'client-10.webp' },
  { name: 'Mahindra', image: 'client-15.webp' },
  { name: 'Union Bank of India', image: 'client-7.webp' },
  { name: 'Volkswagen', image: 'client-16.webp' },
  { name: 'INOX', image: 'client-14.webp' },
  { name: 'BIG Cinemas', image: 'client-9.webp' },
  { name: 'Damro', image: 'client-11.webp' },
  { name: 'Fabindia', image: 'client-12.webp' },
  { name: 'Girias', image: 'client-13.webp' },
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
        <div className="container-default w-container">
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
                    <img
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
