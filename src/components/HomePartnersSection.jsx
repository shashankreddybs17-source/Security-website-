import styles from './HomePartnersSection.module.css';

// Original client logos supplied in the Hi-Tech company brochure.
const clients = [
  { name: 'Aditya Birla Group', image: 'client-8.png' },
  { name: 'BSNL', image: 'client-10.png' },
  { name: 'Mahindra', image: 'client-15.png' },
  { name: 'Union Bank of India', image: 'client-7.png' },
  { name: 'Volkswagen', image: 'client-16.png' },
  { name: 'INOX', image: 'client-14.png' },
  { name: 'BIG Cinemas', image: 'client-9.png' },
  { name: 'Damro', image: 'client-11.png' },
  { name: 'Fabindia', image: 'client-12.png' },
  { name: 'Girias', image: 'client-13.png' },
];

export default function HomePartnersSection() {
  return (
    <section className={styles.section} aria-labelledby="hi-tech-client-heading">
      <p className={styles.eyebrow}>OUR CLIENTS</p>
      <h2 id="hi-tech-client-heading" className={styles.heading}>
        Security you can trust.
      </h2>
      <div className={styles.strip}>
        <div className={styles.viewport}>
          <div className={styles.track}>
            {[0, 1].map((copy) => (
              <div className={styles.group} key={copy} aria-hidden={copy === 1 ? true : undefined}>
                {clients.map((client) => (
                  <div className={styles.logo} key={client.name}>
                    <img
                      src={`/assets/hitech/${client.image}`}
                      alt={copy === 0 ? client.name : ''}
                      width="180"
                      height="48"
                      loading="eager"
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
