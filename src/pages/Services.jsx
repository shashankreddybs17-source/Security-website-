import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import AboutFooterSection from '../components/AboutFooterSection';
import HomeCtaSection from '../components/HomeCtaSection';
import { selectedService, serviceSelectionEvent } from '../lib/serviceNavigation';
import ServicesLanding from '../components/ServicesLanding';
import ServiceDetailInformation from '../components/ServiceDetailInformation';
import styles from './Services.module.css';

const benefits = {
  'hotel-security': [
    'Entrance and guest-area vigilance',
    'Visitor and vehicle monitoring',
    'Parking-area security',
    'A welcoming guest environment',
  ],
  'bank-security': [
    'Premises and entrance vigilance',
    'Controlled access to sensitive areas',
    'Visitor management',
    'Support for orderly branch operations',
  ],
  'corporate-office-security': [
    'Employee and visitor access monitoring',
    'Reception and visitor management',
    'Office premises surveillance',
    'Business-park security support',
  ],
  'industrial-security': [
    'Gate and perimeter vigilance',
    'Employee and visitor verification',
    'Material movement checks',
    'Industrial asset protection',
  ],
  'commercial-security': [
    'Building entrance monitoring',
    'Visitor and baggage screening',
    'Employee and customer safety',
    'Protection of business assets',
  ],
  'residential-security': [
    'Community entrance monitoring',
    'Visitor verification',
    'Vehicle entry management',
    'Common-area vigilance',
  ],
  'gunman-services': [
    'Armed security presence',
    'Premises protection support',
    'Assignment-specific deployment',
    'Vigilance at sensitive access points',
  ],
  'housekeeping-services': [
    'Routine floor and surface cleaning',
    'Glass and shared-area upkeep',
    'Workplace housekeeping support',
    'Clean and welcoming premises',
  ],
  'bodyguard-services': [
    'Personal security support',
    'Accompaniment during travel',
    'Public-appearance security',
    'Attention to surroundings',
  ],
  'supervisor-services': [
    'On-site security team coordination',
    'Duty and attendance monitoring',
    'Routine site inspections',
    'Incident reporting and client coordination',
  ],
  'event-management-services': [
    'Guest entry coordination',
    'Queue and access management',
    'On-site visitor assistance',
    'Support for smooth event operations',
  ],
};

export default function Services() {
  const [service, setService] = useState(() => selectedService({ fallback: false }));
  const heading = useRef(null);
  useEffect(() => {
    const update = () => setService(selectedService({ fallback: false }));
    const select = () => {
      update();
      requestAnimationFrame(() => {
        heading.current?.focus({ preventScroll: true });
        heading.current
          ?.closest('section')
          ?.scrollIntoView({ behavior: 'instant', block: 'start' });
      });
    };
    window.addEventListener('popstate', update);
    window.addEventListener(serviceSelectionEvent, select);
    return () => {
      window.removeEventListener('popstate', update);
      window.removeEventListener(serviceSelectionEvent, select);
    };
  }, []);
  const image =
    service?.image || (service?.photo ? `/assets/hitech/team-${service.photo}.jpeg` : null);
  return (
    <div className="page-wrapper">
      <main className="main-wrapper">
        {service ? (
          <section className={styles.section} aria-labelledby="service-heading">
            <div className="container-default w-container">
              <p className={styles.breadcrumb}>
                <a href="/">Home</a>
                <span aria-hidden="true">/</span>Services
              </p>
              <div key={service.id} className={styles.layout}>
                <div className={styles.content}>
                  <p className={styles.eyebrow}>OUR SERVICES</p>
                  <h1 id="service-heading" ref={heading} tabIndex={-1}>
                    {service.title}
                  </h1>
                  <p className={styles.description}>{service.text}</p>
                  <ul className={styles.features}>
                    {benefits[service.id].map((benefit) => (
                      <li key={benefit}>
                        <span className={styles.featureIcon}>
                          <Check size={18} aria-hidden="true" />
                        </span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <a href="/contact-us" className={styles.cta}>
                    Enquire About This Service
                    <span>
                      <ArrowUpRight size={22} aria-hidden="true" />
                    </span>
                  </a>
                </div>
                <div className={styles.imageFrame}>
                  {image ? (
                    <img
                      src={image}
                      alt={
                        service.imageAlt ||
                        `${service.title} ? Hi-Tech Protection Security personnel`
                      }
                      width="1440"
                      height="1080"
                      decoding="async"
                    />
                  ) : (
                    <div className={styles.placeholder}>Service image coming soon</div>
                  )}
                </div>
              </div>
            </div>
          </section>
        ) : (
          <ServicesLanding headingRef={heading} />
        )}
        {service && <ServiceDetailInformation service={service} />}
        <HomeCtaSection />
      </main>
      <AboutFooterSection />
    </div>
  );
}
