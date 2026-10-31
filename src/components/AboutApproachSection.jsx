import { useEffect, useRef, useState } from 'react';
import styles from './AboutReplacements.module.css';

const steps = [
  {
    title: 'Assess',
    text: 'Understand the premises, daily routines and security requirements specific to each location.',
    photo: '27',
    caption: 'Understanding the environment',
  },
  {
    title: 'Prevent',
    text: 'Maintain vigilance at entrances and sensitive areas, supporting access control and visitor management.',
    photo: '15',
    caption: 'Preparation and on-site awareness',
  },
  {
    title: 'Protect',
    text: 'Provide a disciplined security presence for people, property and the assets entrusted to our personnel.',
    photo: '29',
    caption: 'A professional security presence',
  },
  {
    title: 'Respond',
    text: 'Bring alertness, clear communication and responsibility to every security assignment.',
    photo: '10',
    caption: 'Practical safety training',
  },
];

export default function AboutApproachSection() {
  const [active, setActive] = useState(0);
  const rows = useRef([]);
  const visual = useRef(null);
  useEffect(() => {
    let frame = 0;
    let disposed = false;
    const updateActiveStep = () => {
      frame = 0;
      if (disposed) return;
      let activationPoint = window.innerHeight / 2;
      // On mobile the image sits above the steps; use the readable space below it.
      if (window.innerWidth <= 600 && visual.current) {
        const image = visual.current.getBoundingClientRect();
        if (image.top < window.innerHeight && image.bottom > 0) {
          activationPoint = Math.min(
            window.innerHeight - 24,
            Math.max(activationPoint, image.bottom + 24),
          );
        }
      }
      let nextStep = 0;
      let closestDistance = Infinity;
      rows.current.forEach((row, index) => {
        if (!row) return;
        const bounds = row.getBoundingClientRect();
        const distance = Math.abs(bounds.top + bounds.height / 2 - activationPoint);
        if (distance < closestDistance) {
          closestDistance = distance;
          nextStep = index;
        }
      });
      if (closestDistance < Infinity) setActive(nextStep);
    };
    const schedule = () => {
      if (!disposed && !frame) frame = window.requestAnimationFrame(updateActiveStep);
    };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(schedule);
    rows.current.forEach((row) => row && observer?.observe(row));
    document.fonts?.ready.then(schedule);
    schedule();
    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      observer?.disconnect();
    };
  }, []);
  return (
    <section className={styles.approach} aria-labelledby="about-approach-heading">
      <div className="container-default w-container">
        <div className={styles.approachHeader}>
          <p className={styles.eyebrow}>THE HI-TECH APPROACH</p>
          <h2 id="about-approach-heading" className={styles.heading}>
            Vigilance at every step.
            <br />
            Protection with purpose.
          </h2>
        </div>
        <div className={styles.approachPanel}>
          <div className={styles.steps}>
            {steps.map((step, index) => (
              <button
                key={step.title}
                ref={(element) => {
                  rows.current[index] = element;
                }}
                data-step={index}
                className={`${styles.step} ${active === index ? styles.activeStep : ''}`}
                onClick={() => setActive(index)}
                aria-pressed={active === index}
                aria-controls="hi-tech-approach-visual"
              >
                <span className={styles.stepNumber}>0{index + 1}</span>
                <span>
                  <span className={styles.stepTitle}>{step.title}</span>
                  <span className={styles.stepText}>{step.text}</span>
                </span>
              </button>
            ))}
          </div>
          <div className={styles.visualColumn}>
            <figure ref={visual} id="hi-tech-approach-visual" className={styles.visual}>
              {steps.map((step, index) => (
                <img
                  key={step.photo}
                  src={`/assets/hitech/team-${step.photo}.jpeg`}
                  alt={step.caption}
                  className={active === index ? styles.visibleImage : styles.hiddenImage}
                  aria-hidden={active !== index}
                  loading="lazy"
                />
              ))}
              <figcaption>
                <span className={styles.visualCount}>0{active + 1} / 04</span>
                <span>{steps[active].caption}</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
