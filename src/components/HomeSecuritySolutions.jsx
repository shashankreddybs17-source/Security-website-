import { approvedTeamPhoto } from '../data/approvedPhotos';
import { useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { existingServices } from '../data/services';
import styles from './HomeSecuritySolutions.module.css';

// Services change only through the accessible tabs, without intercepting page scrolling.
export default function HomeSecuritySolutions({
  services = existingServices,
  allowServiceLinks = false,
}) {
  const [active, setActive] = useState(() => {
    const requested = allowServiceLinks
      ? services.findIndex(
          (service) => service.id === new URLSearchParams(window.location.search).get('service'),
        )
      : -1;
    return requested >= 0 ? requested : 0;
  });
  const tabs = useRef([]);
  const select = (index) => {
    setActive(index);
  };
  const navigate = (event, index) => {
    let next;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight')
      next = Math.min(index + 1, services.length - 1);
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = Math.max(index - 1, 0);
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = services.length - 1;
    else return;
    event.preventDefault();
    tabs.current[next]?.focus({ preventScroll: true });
    select(next);
  };
  return (
    <section id="services" className={styles.section} aria-labelledby="security-solutions-title">
      <div className={styles.runway}>
        <div>
          <div className="container-default w-container">
            <div className={styles.layout}>
              <div className={styles.introduction}>
                <h2 id="security-solutions-title" className="section-title">
                  Our Security Solutions
                </h2>
                <p>
                  Delivering Professional &amp; Reliable Security Services with Excellence &amp;
                  Precision.
                </p>
              </div>
              <div className={styles.navigation} role="tablist" aria-label="Security services">
                {services.map((service, index) => (
                  <button
                    key={service.title}
                    type="button"
                    role="tab"
                    id={`security-service-tab-${index}`}
                    aria-controls={`security-service-panel-${index}`}
                    aria-selected={active === index}
                    tabIndex={active === index ? 0 : -1}
                    ref={(element) => {
                      tabs.current[index] = element;
                    }}
                    onClick={() => select(index)}
                    onKeyDown={(event) => navigate(event, index)}
                    className={styles.tab}
                  >
                    <span className={styles.dash} aria-hidden="true" />
                    <span>{service.title}</span>
                  </button>
                ))}
              </div>
              <div className={styles.panels}>
                {services.map((service, index) => (
                  <article
                    key={service.title}
                    className={styles.panel}
                    role="tabpanel"
                    id={`security-service-panel-${index}`}
                    aria-labelledby={`security-service-tab-${index}`}
                    aria-hidden={active !== index}
                    inert={active !== index}
                  >
                    <div
                      className={`${styles.imageFrame} ${service.fillImage ? styles.filledImageFrame : ''}`}
                    >
                      <a
                        href="/contact-us"
                        aria-label={`Enquire about ${service.title.toLowerCase()}`}
                      >
                        {service.image || service.photo ? (
                          <img
                            src={service.image || approvedTeamPhoto(service.photo)}
                            alt={
                              service.imageAlt ||
                              (service.photo === '24'
                                ? 'Hi-Tech Protection Security personnel'
                                : 'Hi-Tech Protection Security personnel and training')
                            }
                            className={service.photo === '24' ? styles.bankPhoto : undefined}
                            loading="eager"
                            decoding="async"
                            width="1440"
                            height="1080"
                          />
                        ) : (
                          <div className={styles.imagePlaceholder}>
                            <span>{service.title}</span>
                            <small>Service image coming soon</small>
                          </div>
                        )}
                      </a>
                    </div>
                    <div className={styles.details}>
                      <a href="/contact-us" className={styles.titleLink}>
                        <h4 className="services-title">{service.title}</h4>
                      </a>
                      <p>{service.text}</p>
                      <a href="/contact-us" className={styles.explore}>
                        Explore Now
                        <span>
                          <ArrowRight size={20} aria-hidden="true" />
                        </span>
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
