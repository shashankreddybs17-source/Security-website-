import { useEffect, useRef } from 'react';
import styles from './AboutGallerySection.module.css';

const photos = [
  {
    file: '23',
    title: 'Professional presence',
    detail: 'Hi-Tech security personnel',
    position: '50% 20%',
  },
  {
    file: '29',
    title: 'Discipline in every duty',
    detail: 'Our people on location',
    position: '50% 30%',
  },
  {
    file: '24',
    title: 'People you can rely on',
    detail: 'Hi-Tech security personnel',
    position: '50% 35%',
  },
  {
    file: '31',
    title: 'Prepared through training',
    detail: 'Team briefing and preparation',
    position: '50% 45%',
  },
  {
    file: '27',
    title: 'Together in protection',
    detail: 'Our team in the field',
    position: '50% 40%',
  },
];

export default function AboutGallerySection() {
  const section = useRef(null);
  const stage = useRef(null);
  const cards = useRef([]);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let disposed = false;
    const render = () => {
      frame = 0;
      if (disposed || !section.current || !stage.current || reducedMotion.matches) return;
      const bounds = section.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const progress = Math.max(
        0,
        Math.min(1, -bounds.top / Math.max(1, bounds.height - viewportHeight)),
      );
      const width = stage.current.clientWidth;
      const firstCard = cards.current[0];
      if (!firstCard) return;
      const cardWidth = firstCard.offsetWidth;
      const spacing = cardWidth + Math.min(190, width * 0.13);
      const anchor = width < 600 ? (width - cardWidth) / 2 : width * 0.23;
      // Allow the final card to leave the stage, revealing the background lettering.
      const distance = (photos.length - 1) * spacing + anchor + cardWidth + 40;
      cards.current.forEach((card, index) => {
        if (!card) return;
        const offset = index * spacing - progress * distance;
        const separation = Math.min(1, Math.abs(offset) / spacing);
        const scale = 1 - separation * 0.22;
        const float = index % 2 === 0 ? 0 : -48;
        const x = anchor + offset;
        card.style.transform = `translate3d(${x}px, ${float}px, 0) scale(${scale})`;
        card.style.filter = 'none';
        card.style.opacity = '1';
        card.style.zIndex = String(Math.round(100 - separation * 50));
      });
    };
    const schedule = () => {
      if (!frame && !disposed) frame = window.requestAnimationFrame(render);
    };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    reducedMotion.addEventListener('change', schedule);
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(schedule) : null;
    observer?.observe(section.current);
    schedule();
    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      reducedMotion.removeEventListener('change', schedule);
      observer?.disconnect();
    };
  }, []);

  return (
    <section ref={section} className={styles.section} aria-labelledby="hi-tech-gallery-heading">
      <div className={styles.sticky}>
        <div className={styles.header}>
          <p className={styles.label}>
            <span aria-hidden="true">✳</span> PEOPLE. DISCIPLINE. PROTECTION.
          </p>
          <h2 id="hi-tech-gallery-heading">
            Meet the people behind
            <br />
            your protection.
          </h2>
        </div>
        <div className={styles.watermark} aria-hidden="true">
          OUR PEOPLE
        </div>
        <div ref={stage} className={styles.stage}>
          {photos.map((photo, index) => (
            <figure
              className={styles.card}
              key={photo.file}
              ref={(element) => {
                cards.current[index] = element;
              }}
            >
              <img
                src={`/assets/hitech/team-${photo.file}.jpeg`}
                alt={photo.detail}
                style={{ objectPosition: photo.position }}
                loading="eager"
              />
              <figcaption>
                <p>{photo.detail}</p>
                <h3>{photo.title}</h3>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className={styles.hint}>
          SCROLL TO MEET OUR PEOPLE <span aria-hidden="true">↓</span>
        </p>
      </div>
    </section>
  );
}
