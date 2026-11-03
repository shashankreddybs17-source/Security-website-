import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { connectServiceScroll } from '../lib/serviceScroll';
import { existingServices } from '../data/services';
import styles from './HomeSecuritySolutions.module.css';

// Shared by the homepage and Services page, with one controller per section.
export default function HomeSecuritySolutions({
  services = existingServices,
  allowServiceLinks = false,
}) {
  const [active, setActive] = useState(0);
  const runway = useRef(null);
  const stage = useRef(null);
  const controller = useRef(null);
  const tabs = useRef([]);
  useEffect(() => {
    controller.current = connectServiceScroll(
      runway.current,
      stage.current,
      services.length,
      setActive,
    );
    const requested = allowServiceLinks
      ? services.findIndex(
          (service) => service.id === new URLSearchParams(window.location.search).get('service'),
        )
      : -1;
    let selectionFrame;
    if (requested >= 0) {
      selectionFrame = requestAnimationFrame(() => {
        const headerHeight =
          document.querySelector('header')?.getBoundingClientRect().height || 104;
        window.scrollTo({
          top: runway.current.getBoundingClientRect().top + window.scrollY - headerHeight - 12,
          behavior: 'instant',
        });
        controller.current?.select(requested);
      });
    }
    return () => {
      cancelAnimationFrame(selectionFrame);
      controller.current?.destroy();
      controller.current = null;
    };
  }, [services, allowServiceLinks]);
  const select = (index) => {
    if (controller.current) controller.current.select(index);
    else setActive(index);
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
      <div ref={runway} className={styles.runway}>
        <div ref={stage} className={styles.stage}>
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
              <div
                className={styles.navigation}
                role="tablist"
                aria-label="Security services"
                aria-orientation="vertical"
              >
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
                            src={service.image || `/assets/hitech/team-${service.photo}.jpeg`}
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
