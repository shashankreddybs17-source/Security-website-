import { ArrowUpRight } from 'lucide-react';
import { allServices } from '../data/services';
import { navigateService } from '../lib/serviceNavigation';
import styles from './ServicesLanding.module.css';

export default function ServicesLanding({ headingRef }) {
  return (
    <section className={styles.section} aria-labelledby="services-landing-heading">
      <div className="container-default w-container">
        <div className={styles.heading}>
          <h1 id="services-landing-heading" ref={headingRef} tabIndex={-1}>
            OUR SECURITY SOLUTIONS
          </h1>
          <p>
            Professional security services tailored to protect people, properties, and businesses.
          </p>
        </div>
        <div className={styles.grid}>
          {allServices.map((service) => {
            const image =
              service.image || (service.photo ? `/assets/hitech/team-${service.photo}.jpeg` : null);
            return (
              <a
                key={service.id}
                className={styles.card}
                href={`/services?service=${service.id}`}
                onClick={(event) => navigateService(event, service.id)}
                aria-labelledby={`landing-${service.id}`}
              >
                <div className={styles.imageFrame}>
                  {image ? (
                    <img
                      src={image}
                      alt={service.imageAlt || `${service.title} personnel`}
                      width="1440"
                      height="1080"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className={styles.placeholder}>
                      <span>{service.title}</span>
                      <small>Service image coming soon</small>
                    </div>
                  )}
                </div>
                <div className={styles.body}>
                  <h2 id={`landing-${service.id}`}>{service.title}</h2>
                  <p>{service.text}</p>
                  <span className={styles.action}>
                    Explore Service
                    <ArrowUpRight size={19} aria-hidden="true" />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
