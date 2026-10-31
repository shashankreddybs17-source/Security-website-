import { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  ArrowRight,
  Plus,
  X,
  ShieldCheck,
  UserCheck,
  ClipboardCheck,
  Handshake,
} from 'lucide-react';
import styles from './HomeEnhancements.module.css';

const services = [
  {
    title: 'Hotels',
    photo: '26',
    text: 'Security support for entrances, guest areas and parking zones, helping maintain a welcoming environment.',
  },
  {
    title: 'Banks & financial institutions',
    photo: '24',
    text: 'Vigilance at entrances and sensitive areas, supported by access control and visitor management.',
  },
  {
    title: 'Corporate offices',
    photo: '15',
    text: 'Access monitoring, visitor management and premises surveillance for offices and business parks.',
  },
  {
    title: 'Factories & industrial units',
    photo: '13',
    text: 'Gate control, verification and material movement checks, with attention to valuable industrial assets.',
  },
  {
    title: 'Commercial buildings',
    photo: '23',
    text: 'Professional guards to help protect employees, visitors, property and business assets.',
  },
  {
    title: 'Residential apartments',
    photo: '28',
    text: 'Entrance monitoring, visitor and vehicle management, and common-area vigilance for communities.',
  },
];
const principles = [
  {
    title: 'Our Mission',
    text: 'To provide reliable and comprehensive protection for businesses, institutions, residential communities and individuals. Our approach brings trained personnel and security practices together to meet the specific requirements of each location.',
  },
  {
    title: 'Our Vision',
    text: 'A safe and secure environment supported by training, vigilance, discipline, communication and quick response. Professional, courteous conduct and a clear understanding of responsibilities are central to this approach.',
  },
  {
    title: 'Our Core Values',
    text: 'Five principles guide every assignment.',
    points: [
      'Discipline — following procedures and maintaining professional conduct.',
      'Vigilance — staying alert to potential security risks.',
      'Responsibility — taking ownership of assigned duties and entrusted premises.',
      'Integrity — maintaining honesty, confidentiality and trust.',
      'Professionalism — representing clients with courtesy, discipline and respect.',
    ],
  },
];
const strengths = [
  {
    icon: ShieldCheck,
    title: 'Ex-Army leadership',
    text: 'Experienced and trained Ex-Army personnel bring discipline, alertness and responsibility to security operations.',
  },
  {
    icon: UserCheck,
    title: 'Prepared personnel',
    text: 'Our security personnel are selected and trained to understand their responsibilities and maintain professional conduct.',
  },
  {
    icon: ClipboardCheck,
    title: 'A site-specific approach',
    text: 'Personnel and security practices are suited to the nature of each location and its individual requirements.',
  },
  {
    icon: Handshake,
    title: 'Professional at every step',
    text: 'Courtesy, honesty, confidentiality and respect are part of the responsibility we bring to each assignment.',
  },
];
const gallery = [
  {
    photo: '14',
    title: 'Discipline in formation',
    detail: 'Team briefing and preparation',
    position: '50% 45%',
  },
  {
    photo: '15',
    title: 'Prepared on site',
    detail: 'Practical safety instruction',
    position: '50% 45%',
  },
  {
    photo: '10',
    title: 'Learning through practice',
    detail: 'Fire safety training',
    position: '45% 55%',
  },
  {
    photo: '28',
    title: 'Clear communication',
    detail: 'An outdoor team briefing',
    position: '50% 50%',
  },
  {
    photo: '24',
    title: 'A professional presence',
    detail: 'Hi-Tech security personnel',
    position: '50% 35%',
  },
  {
    photo: '31',
    title: 'Working together',
    detail: 'Team instruction and readiness',
    position: '50% 50%',
  },
];
const photoUrl = (number) => `/assets/hitech/team-${number}.jpeg`;

function Section({ children, className, id, labelledBy }) {
  const ref = useRef(null);
  useEffect(() => {
    const element = ref.current;
    if (
      !element ||
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.dataset.visible = 'true';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    const targets = element.querySelectorAll('[data-reveal]');
    targets.forEach((target) => observer.observe(target));
    element.dataset.motion = 'ready';
    return () => observer.disconnect();
  }, []);
  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={labelledBy}
      className={`${styles.section} ${className || ''}`}
    >
      {children}
    </section>
  );
}
function Label({ children }) {
  return <p className={styles.label}>{children}</p>;
}
function LinkButton({ children, href, light = false }) {
  return (
    <a className={`${styles.button} ${light ? styles.outlineButton : ''}`} href={href}>
      {children}
      <ArrowUpRight size={19} aria-hidden="true" />
    </a>
  );
}

export function HomeServicesShowcase() {
  return (
    <Section className={styles.services} id="service-overview" labelledBy="service-overview-title">
      <div className="container-default w-container">
        <div className={styles.sectionHeading} data-reveal>
          <div>
            <Label>OUR SERVICES</Label>
            <h2 id="service-overview-title">
              PROTECTION FOR
              <br />
              EVERY PURPOSE.
            </h2>
          </div>
          <p>
            Different environments. Different responsibilities.
            <br />
            Explore the places our professional security personnel support.
          </p>
        </div>
        <div className={styles.serviceGrid}>
          {services.map((service, index) => (
            <a
              className={styles.serviceCard}
              href="/services"
              key={service.title}
              data-reveal
              aria-label={`Explore ${service.title.toLowerCase()} security coverage`}
            >
              <div
                className={`${styles.servicePhoto} ${service.photo === '23' ? styles.portraitPhoto : ''}`}
              >
                <img
                  src={photoUrl(service.photo)}
                  alt="Hi-Tech Protection Security personnel"
                  loading="lazy"
                  width="1280"
                  height="960"
                />
              </div>
              <div className={styles.serviceBody}>
                <span className={styles.number}>0{index + 1} / SECURITY COVERAGE</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <span className={styles.cardFooter}>
                  Explore coverage
                  <span className={styles.arrow}>
                    <ArrowUpRight size={21} aria-hidden="true" />
                  </span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}

export function HomeWhoWeAre() {
  const [open, setOpen] = useState(0);
  return (
    <Section className={styles.who} id="who-we-are" labelledBy="who-we-are-title">
      <div className="container-default w-container">
        <div className={styles.whoGrid}>
          <div className={styles.editorial} data-reveal>
            <Label>WHO WE ARE</Label>
            <h2 id="who-we-are-title">
              BUILT ON TRUST.
              <br />
              DRIVEN BY PROTECTION.
            </h2>
            <p>
              Hi-Tech Protection Security is a Bengaluru-based security management company providing
              reliable protection for businesses, institutions, residential communities and
              individuals.
            </p>
            <p>
              We are an associated entity of Hi-Tech Security Force, established in 2008 with
              operations in Karnataka, Tamil Nadu and Kerala. Our organisation is managed by
              experienced and trained Ex-Army personnel, bringing military discipline, alertness,
              responsibility and leadership to security operations.
            </p>
            <p>
              Our personnel are selected and trained to understand their duties, maintain a safe
              environment and conduct themselves with professionalism and courtesy. We focus on
              security practices suited to the needs of each location.
            </p>
            <LinkButton href="/about-us">Get to know Hi-Tech</LinkButton>
          </div>
          <div className={styles.accordions} data-reveal>
            {principles.map((principle, index) => (
              <div
                className={`${styles.accordion} ${open === index ? styles.openAccordion : ''}`}
                key={principle.title}
              >
                <h3>
                  <button
                    type="button"
                    id={`hi-tech-principle-${index}`}
                    aria-expanded={open === index}
                    aria-controls={`hi-tech-principle-panel-${index}`}
                    onClick={() => setOpen(open === index ? null : index)}
                  >
                    <span>
                      <span className={styles.principleIndex}>0{index + 1}</span>
                      {principle.title}
                    </span>
                    <Plus size={20} aria-hidden="true" />
                  </button>
                </h3>
                <div
                  id={`hi-tech-principle-panel-${index}`}
                  role="region"
                  aria-labelledby={`hi-tech-principle-${index}`}
                  aria-hidden={open !== index}
                  className={styles.accordionPanel}
                >
                  <div>
                    <p>{principle.text}</p>
                    {principle.points && (
                      <ul className={styles.valueList}>
                        {principle.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <p className={styles.accordionNote}>
              <ShieldCheck size={18} aria-hidden="true" />
              People. Principles. Protection.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

export function HomeWhyChooseUs() {
  return (
    <Section className={styles.why} id="why-hi-tech" labelledBy="why-hi-tech-title">
      <div className="container-default w-container">
        <div className={styles.sectionHeading} data-reveal>
          <div>
            <Label>THE HI-TECH DIFFERENCE</Label>
            <h2 id="why-hi-tech-title">WHY CHOOSE HI-TECH?</h2>
          </div>
          <p>
            Protection is a responsibility.
            <br />
            Our approach keeps people, preparation and professional conduct at its centre.
          </p>
        </div>
        <div className={styles.strengthGrid}>
          {strengths.map(({ icon: Icon, title, text }, index) => (
            <article className={styles.strengthCard} key={title} data-reveal>
              <div className={styles.strengthTop}>
                <Icon size={27} strokeWidth={1.5} aria-hidden="true" />
                <span>0{index + 1}</span>
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className={styles.whyFooter} data-reveal>
          <p>
            Tell us about your premises.
            <br />
            <strong>Let’s discuss the protection you need.</strong>
          </p>
          <LinkButton href="/contact-us">Get in touch</LinkButton>
        </div>
      </div>
    </Section>
  );
}

export function HomeWorkGallery() {
  const [selected, setSelected] = useState(null);
  const dialog = useRef(null);
  const trigger = useRef(null);
  useEffect(() => {
    if (selected === null) return;
    const element = dialog.current;
    if (!element.open) element.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [selected]);
  const close = () => dialog.current?.close();
  const openPhoto = (index, event) => {
    trigger.current = event.currentTarget;
    setSelected(index);
  };
  return (
    <Section className={styles.work} id="our-work" labelledBy="our-work-title">
      <div className="container-default w-container">
        <div className={styles.galleryHeading} data-reveal>
          <Label>OUR WORK</Label>
          <h2 id="our-work-title">PROTECTION IN ACTION.</h2>
          <p>
            A closer look at our people, their preparation and the everyday discipline behind our
            approach to security.
          </p>
        </div>
        <div className={styles.gallery}>
          {gallery.map((item, index) => (
            <button
              className={styles.galleryPhoto}
              type="button"
              key={item.photo}
              onClick={(event) => openPhoto(index, event)}
              aria-label={`View full photograph: ${item.detail}`}
            >
              <img
                src={photoUrl(item.photo)}
                alt={item.detail}
                loading="lazy"
                style={{ objectPosition: item.position }}
              />
              <span className={styles.galleryNumber}>
                0{index + 1}
                <ArrowUpRight size={17} aria-hidden="true" />
              </span>
              <span className={styles.galleryCaption}>{item.title}</span>
            </button>
          ))}
        </div>
        <div className={styles.galleryFooter}>
          <p>
            <span className={styles.liveDot} />
            Original Hi-Tech team photography
          </p>
          <span>
            SELECT A PHOTO TO VIEW IT IN FULL <ArrowRight size={15} aria-hidden="true" />
          </span>
        </div>
      </div>
      <dialog
        ref={dialog}
        className={styles.lightbox}
        aria-labelledby="home-work-photo-title"
        onClose={() => {
          setSelected(null);
          trigger.current?.focus();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        {selected !== null && (
          <div className={styles.lightboxBody}>
            <button
              className={styles.close}
              onClick={close}
              type="button"
              aria-label="Close photograph"
              autoFocus
            >
              <X size={23} />
            </button>
            <img src={photoUrl(gallery[selected].photo)} alt={gallery[selected].detail} />
            <p id="home-work-photo-title">
              {gallery[selected].title}
              <span>{gallery[selected].detail}</span>
            </p>
          </div>
        )}
      </dialog>
    </Section>
  );
}
