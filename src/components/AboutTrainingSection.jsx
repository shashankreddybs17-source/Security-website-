import { useEffect, useRef } from 'react';
import styles from './AboutTrainingSection.module.css';

export default function AboutTrainingSection() {
  const section = useRef(null);
  useEffect(() => {
    const element = section.current;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!element || motion.matches || !('IntersectionObserver' in window)) return;
    // Match the site's one-time, IntersectionObserver-based reveal pattern.
    element.dataset.motion = 'ready';
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        element.dataset.visible = 'true';
        observer.disconnect();
      },
      { threshold: 0.12 },
    );
    const showImmediately = () => {
      if (!motion.matches) return;
      element.dataset.visible = 'true';
      observer.disconnect();
    };
    observer.observe(element);
    motion.addEventListener('change', showImmediately);
    return () => {
      observer.disconnect();
      motion.removeEventListener('change', showImmediately);
      delete element.dataset.motion;
      delete element.dataset.visible;
    };
  }, []);
  return (
    <section ref={section} className={styles.section} aria-labelledby="about-training-heading">
      <div className="container-default w-container">
        <div className={styles.layout}>
          <div className={styles.content} data-reveal>
            <p className={styles.label}>TRAINING &amp; PREPAREDNESS</p>
            <h2 id="about-training-heading">TRAINED TO RESPOND. PREPARED TO PROTECT.</h2>
            <p className={styles.description}>
              Our approach to security goes beyond daily vigilance. Through practical training
              exercises, our personnel develop the awareness, discipline, and readiness needed to
              respond effectively to workplace emergencies.
            </p>
            <p className={styles.supporting}>PRACTICAL FIRE SAFETY TRAINING</p>
          </div>
          <figure className={styles.media}>
            <img
              src="/assets/hitech/new-uniform/fire-demonstration.webp"
              alt="Hi-Tech personnel practising a fire extinguisher demonstration while colleagues observe"
              width="1280"
              height="960"
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
