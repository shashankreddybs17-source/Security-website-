import { useEffect, useRef, useState } from 'react';
import { Check, ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';
import styles from './HomeTeamSection.module.css';

const experts = [
  {
    src: '/assets/hitech/new-uniform/converted-old-08.webp',
    alt: 'Hi-Tech Protection Security personnel and training',
    category: 'Leadership Team',
    name: 'Arjun Kumar',
    designation: 'Operations Manager',
    position: '50% 50%',
  },
  {
    src: '/assets/hitech/new-uniform/bodyguards.webp',
    alt: 'HI-TECH security personnel standing together in black uniforms',
    category: 'Leadership Team',
    name: 'Priya Rao',
    designation: 'Training Coordinator',
    position: '50% 50%',
  },
  {
    src: '/assets/hitech/new-uniform/bodyguards.webp',
    alt: 'Hi-Tech Protection Security personnel and training',
    category: 'Leadership Team',
    name: 'Vikram Singh',
    designation: 'Security Supervisor',
    position: '50% 50%',
  },
  {
    src: '/assets/hitech/new-uniform/converted-old-01.webp',
    alt: 'Hi-Tech Protection Security personnel and training',
    category: 'Field Experts',
    name: 'Kiran Sharma',
    designation: 'Site Supervisor',
    position: '35% 50%',
  },
  {
    src: '/assets/hitech/new-uniform/commercial-screening.webp',
    alt: 'Hi-Tech Protection Security personnel and training',
    category: 'Field Experts',
    name: 'Ravi Kumar',
    designation: 'Field Supervisor',
    position: '50% 50%',
  },
  {
    src: '/assets/hitech/new-uniform/converted-old-03.webp',
    alt: 'Hi-Tech Protection Security personnel and training',
    category: 'Field Experts',
    name: 'Anita Rao',
    designation: 'Client Coordinator',
    position: '40% 50%',
  },
];

export default function HomeTeamSection() {
  const section = useRef(null);
  const information = useRef(null);
  const swipe = useRef(null);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(2);
  const last = experts.length - visible;
  useEffect(() => {
    const root = section.current;
    const info = information.current;
    const header = root.ownerDocument.querySelector('header');
    const mobile = window.matchMedia('(max-width: 767px)');
    let frame = 0;
    let disposed = false;
    const measure = () => {
      frame = 0;
      if (disposed) return;
      const clearance = Math.ceil(header?.getBoundingClientRect().height || 108) + 24;
      root.style.setProperty('--team-clearance', `${clearance}px`);
      root.dataset.stickyInfo = String(
        window.innerWidth >= 992 && info.offsetHeight + clearance + 24 <= window.innerHeight,
      );
    };
    const schedule = () => {
      if (!frame && !disposed) frame = window.requestAnimationFrame(measure);
    };
    const resize = () => {
      const count = mobile.matches ? 1 : 2;
      setVisible(count);
      setIndex((current) => Math.min(current, experts.length - count));
      schedule();
    };
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(schedule);
    if (header) observer?.observe(header);
    observer?.observe(info);
    window.addEventListener('resize', resize);
    mobile.addEventListener('change', resize);
    resize();
    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      mobile.removeEventListener('change', resize);
      observer?.disconnect();
      root.style.removeProperty('--team-clearance');
      delete root.dataset.stickyInfo;
    };
  }, []);
  const move = (direction) => {
    setIndex((current) => Math.max(0, Math.min(last, current + direction)));
  };
  const navigate = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      move(1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      move(-1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      setIndex(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      setIndex(last);
    }
  };
  const startSwipe = (event) => {
    if (!event.isPrimary || event.pointerType === 'mouse') return;
    swipe.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const endSwipe = (event) => {
    const start = swipe.current;
    swipe.current = null;
    if (!start) return;
    const x = event.clientX - start.x;
    const y = event.clientY - start.y;
    if (Math.abs(x) >= 50 && Math.abs(x) > Math.abs(y) * 1.2) move(x < 0 ? 1 : -1);
  };
  return (
    <section
      ref={section}
      id="team"
      className={`team-section ${styles.section}`}
      aria-labelledby="team-heading"
    >
      <div className="section-gap">
        <div className={`team-block ${styles.layout}`}>
          <div ref={information} className={`team-content-block ${styles.information}`}>
            <div className="w-layout-blockcontainer container-default w-container">
              <div className="team-conternt-wrap">
                <div className="section-title-block space-none">
                  <h2
                    data-w-id="d06941f4-93e7-ee70-1485-469e46f0f45e"
                    id="team-heading"
                    className={`section-title ${styles.heading}`}
                  >
                    MEET OUR
                    <br />
                    <span className={styles.highlight}>DEDICATED</span>
                    <br />
                    SECURITY EXPERTS
                  </h2>
                </div>
                <div className="team-introduction">
                  <p>
                    Our organisation is managed by experienced and trained Ex-Army personnel. We
                    bring discipline, alertness and responsibility to the protection of people and
                    premises.
                  </p>
                  <ul className="team-proof">
                    <li>
                      <Check size={18} aria-hidden="true" />
                      <span>Selected and trained personnel</span>
                    </li>
                    <li>
                      <Check size={18} aria-hidden="true" />
                      <span>Clear site responsibilities</span>
                    </li>
                    <li>
                      <Check size={18} aria-hidden="true" />
                      <span>Professional, courteous conduct</span>
                    </li>
                  </ul>
                  <div className="team-intro-note">
                    <strong>Assess. Prevent. Protect. Respond.</strong>
                    <p>
                      Training, vigilance and communication help our personnel understand the needs
                      of each assignment.
                    </p>
                  </div>
                  <a className={`team-intro-link ${styles.teamLink}`} href="/about-us">
                    Get to know our team <ArrowUpRight size={18} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="team-slider-block">
            <div
              className={`team-slider ${styles.carousel}`}
              role="region"
              aria-roledescription="carousel"
              aria-label="Our security experts"
              tabIndex={0}
              onKeyDown={navigate}
            >
              <div
                className={`team-mask ${styles.mask}`}
                id="team-carousel-viewport"
                onPointerDown={startSwipe}
                onPointerUp={endSwipe}
                onPointerCancel={() => {
                  swipe.current = null;
                }}
              >
                <div className={styles.track} style={{ '--team-index': index }}>
                  {experts.map((expert, item) => (
                    <div
                      className={`team-slide ${styles.slide}`}
                      key={expert.src}
                      role="group"
                      aria-roledescription="slide"
                      aria-label={`${item + 1} of ${experts.length}`}
                      aria-hidden={item < index || item >= index + visible}
                      inert={item < index || item >= index + visible}
                    >
                      <div className={`team-card ${styles.card}`}>
                        <div className={`team-image-block ${styles.photo}`}>
                          <img
                            src={expert.src}
                            loading="eager"
                            alt={expert.alt}
                            className={`team-image ${styles.image}`}
                            style={{ objectPosition: expert.position }}
                            onDragStart={(event) => event.preventDefault()}
                          />
                        </div>
                        <div className={`team-text-block ${styles.caption}`}>
                          <div className={`team-tag ${styles.tag}`}>{expert.category}</div>
                          <h5 className="team-name">{expert.name}</h5>
                          <div className="team-designation">{expert.designation}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.controls}>
                <button
                  type="button"
                  className={`team-arrow ${styles.arrow}`}
                  disabled={index === 0}
                  onClick={() => move(-1)}
                  aria-label="Previous security expert"
                  aria-controls="team-carousel-viewport"
                >
                  <ArrowLeft size={24} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className={`team-arrow ${styles.arrow}`}
                  disabled={index === last}
                  onClick={() => move(1)}
                  aria-label="Next security expert"
                  aria-controls="team-carousel-viewport"
                >
                  <ArrowRight size={24} aria-hidden="true" />
                </button>
              </div>
              <p className={styles.status} role="status" aria-live="polite" aria-atomic="true">
                Showing experts {index + 1}
                {visible > 1 ? ` to ${index + visible}` : ''} of {experts.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
