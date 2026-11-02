import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { connectServiceScroll } from '../lib/serviceScroll';
import styles from './HomeSecuritySolutions.module.css';

const services = [
  {
    title: 'Hotel Security',
    photo: '14',
    text: 'Professional security for hotel entrances, guest areas and parking zones, helping maintain a safe and welcoming environment.',
  },
  {
    title: 'Bank Security',
    photo: '24',
    text: 'Vigilance at entrances, premises and sensitive areas, with access control and visitor management for financial institutions.',
  },
  {
    title: 'Corporate Office Security',
    photo: '15',
    text: 'Access monitoring, visitor management and premises surveillance for corporate offices, business parks and commercial workplaces.',
  },
  {
    title: 'Industrial Security',
    photo: '13',
    text: 'Gate control, employee and visitor verification, material movement checks and protection of industrial assets.',
  },
  {
    title: 'Commercial Security',
    photo: '26',
    text: 'Professional guards to help protect employees, visitors, property and business assets in commercial buildings.',
  },
  {
    title: 'Residential Security',
    photo: '29',
    text: 'Entrance monitoring, visitor and vehicle management, and common-area vigilance for residential apartment communities.',
  },
];

// Shared by the homepage and Services page, with one controller per section.
export default function HomeSecuritySolutions() {
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
    return () => {
      controller.current?.destroy();
      controller.current = null;
    };
  }, []);
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
                    <div className={styles.imageFrame}>
                      <a
                        href="/contact-us"
                        aria-label={`Enquire about ${service.title.toLowerCase()}`}
                      >
                        <img
                          src={`/assets/hitech/team-${service.photo}.jpeg`}
                          alt={
                            service.photo === '24'
                              ? 'Hi-Tech Protection Security personnel'
                              : 'Hi-Tech Protection Security personnel and training'
                          }
                          className={service.photo === '24' ? styles.bankPhoto : undefined}
                          loading="eager"
                          decoding="async"
                          width="1440"
                          height="1080"
                        />
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
