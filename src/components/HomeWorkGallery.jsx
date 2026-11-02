import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react';
import styles from './HomeWorkGallery.module.css';

const gallery = [
  {
    photo: '14',
    title: 'Discipline in formation',
    detail: 'Team briefing and preparation',
    width: 1280,
    height: 960,
  },
  {
    photo: '15',
    title: 'Prepared on site',
    detail: 'Practical safety instruction',
    width: 1448,
    height: 1086,
  },
  {
    photo: '10',
    title: 'Learning through practice',
    detail: 'Fire safety training',
    width: 1280,
    height: 960,
  },
  {
    photo: '28',
    title: 'Clear communication',
    detail: 'An outdoor team briefing',
    width: 1280,
    height: 960,
  },
  {
    photo: '24',
    title: 'A professional presence',
    detail: 'Hi-Tech security personnel',
    width: 1320,
    height: 1189,
  },
  {
    photo: '31',
    title: 'Working together',
    detail: 'Team instruction and readiness',
    width: 1280,
    height: 960,
  },
];
const photoUrl = (photo) => `/assets/hitech/team-${photo}.jpeg`;
const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value));
const mix = (start, end, amount) => start + (end - start) * amount;
const smooth = (value, start, end) => {
  const t = clamp((value - start) / (end - start));
  return t * t * (3 - 2 * t);
};
const cardTiming = { lead: 0.04, interval: 0.18, duration: 0.16 };

// Every pose depends only on the same absolute progress, so reversing scroll
// retraces the sequence without timers, direction tracking or React updates.
function cardPose(progress, index, geometry) {
  const { width, cardWidth, anchor, top, step, rotation } = geometry;
  // The first card stays still. Later cards are dealt in from the right,
  // each on its own interval, sharing one size and one vertical anchor.
  const entryStart = cardTiming.lead + (index - 1) * cardTiming.interval;
  const entry = index === 0 ? 1 : smooth(progress, entryStart, entryStart + cardTiming.duration);
  const target = anchor + index * step;
  const x = index === 0 ? anchor : mix(width + cardWidth * 0.2, target, entry);
  const angles = [0, -1, -0.35, 0.35, 0.7, 1];
  return {
    x,
    y: top,
    rotation: angles[index] * rotation * entry,
    scale: 1,
    opacity: 1,
    zIndex: index + 1,
    entered: index === 0 || (entry > 0 && x < width - cardWidth * 0.2),
  };
}

function useScrollCards(section, stage, cards, heading, viewAll) {
  useEffect(() => {
    const root = section.current;
    const canvas = stage.current;
    if (!root || !canvas || !window.matchMedia || !window.requestAnimationFrame) return;
    const wideScreen = window.matchMedia('(min-width: 768px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const navbar = document.querySelector('[aria-label="Main navigation"]')?.closest('header');
    let frame = 0;
    let disposed = false;
    let needsMeasure = true;
    let geometry = null;
    let measuredSize = '';
    const sizeKey = () =>
      `${canvas.clientWidth}:${canvas.clientHeight}:${heading.current?.offsetHeight}:${navbar?.getBoundingClientRect().height}`;

    const reset = () => {
      root.removeAttribute('data-animated');
      for (const name of [
        '--work-viewport',
        '--work-travel',
        '--work-card-width',
        '--work-sticky-top',
      ])
        root.style.removeProperty(name);
      cards.current.forEach((card) => {
        if (!card) return;
        card.style.removeProperty('transform');
        card.style.removeProperty('opacity');
        card.style.removeProperty('z-index');
        card.removeAttribute('data-entered');
        card.inert = false;
      });
      geometry = null;
    };

    const measure = () => {
      reset();
      needsMeasure = false;
      if (reducedMotion.matches) {
        measuredSize = sizeKey();
        return;
      }
      if (!wideScreen.matches) {
        geometry = { mobile: true, viewport: window.innerHeight };
        measuredSize = sizeKey();
        return;
      }
      // Measure the actual navbar and leave a gallery-only breathing space.
      const offset =
        Math.ceil(navbar?.getBoundingClientRect().height || (window.innerWidth >= 992 ? 108 : 94)) +
        12;
      const viewport = Math.max(1, window.innerHeight - offset);
      root.style.setProperty('--work-sticky-top', `${offset}px`);
      root.style.setProperty('--work-viewport', `${viewport}px`);
      // Give each card its own travel range and a short settled interval.
      // Keep the mapping positional: fast scrolling never waits for a timer.
      const pixelsPerEntry =
        window.innerWidth >= 992
          ? clamp(viewport * 0.55, 380, 460)
          : clamp(viewport * 0.42, 260, 340);
      root.style.setProperty(
        '--work-travel',
        `${Math.round(pixelsPerEntry / cardTiming.duration)}px`,
      );
      root.dataset.animated = 'true';
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      // Never use a collapsed layout to derive tiny/invisible cards or leave
      // an empty scroll track. The CSS deck remains visible until measurable.
      if (width <= 0 || height <= 0) {
        reset();
        measuredSize = sizeKey();
        return;
      }
      const rotation = window.innerWidth < 1100 ? 2.4 : 3.5;
      const angle = (rotation * Math.PI) / 180;
      // A 4:5 portrait card, with room for the rotated top/bottom corners.
      // Width is fitted once on resize; all cards then keep the same scale.
      const cardWidth = Math.floor(
        Math.max(32, Math.min(340, width * 0.32, (height - 48) / (1.25 + Math.sin(angle)))),
      );
      root.style.setProperty('--work-card-width', `${cardWidth}px`);
      const cardHeight = Math.max(
        ...cards.current.filter(Boolean).map((card) => card.offsetHeight),
      );
      const sideInset = 18 + cardHeight * Math.sin(angle);
      geometry = {
        offset,
        viewport,
        width,
        height,
        cardWidth,
        cardHeight,
        rotation,
        anchor: sideInset,
        top: Math.max(0, (height - cardHeight) / 2),
        step: Math.max(0, Math.min(cardWidth * 0.78, (width - sideInset * 2 - cardWidth) / 5)),
      };
      measuredSize = sizeKey();
    };

    const render = () => {
      frame = 0;
      if (disposed) return;
      if (needsMeasure) measure();
      if (!geometry) return;
      if (geometry.mobile) {
        const stageTop = canvas.getBoundingClientRect().top;
        cards.current.forEach((card) => {
          if (!card) return;
          // offsetTop is unaffected by transforms, keeping reverse scrolling
          // deterministic while the mobile cards remain in normal flow.
          const reveal = smooth(
            geometry.viewport - stageTop - card.offsetTop,
            0,
            Math.min(180, geometry.viewport * 0.3),
          );
          card.style.transform = `translate3d(0, ${12 * (1 - reveal)}px, 0)`;
          card.style.opacity = '1';
        });
        return;
      }
      const bounds = root.getBoundingClientRect();
      const progress = clamp(
        (geometry.offset - bounds.top) / Math.max(1, bounds.height - geometry.viewport),
      );
      cards.current.forEach((card, index) => {
        if (!card) return;
        const pose = cardPose(progress, index, geometry);
        card.style.transform = `translate3d(${pose.x}px, ${pose.y}px, 0) rotate(${pose.rotation}deg)`;
        card.style.opacity = String(pose.opacity);
        card.style.zIndex = String(pose.zIndex);
        if (!pose.entered && card.contains(document.activeElement))
          viewAll.current?.focus({ preventScroll: true });
        card.inert = !pose.entered;
        card.dataset.entered = String(pose.entered);
      });
    };
    const schedule = () => {
      if (!disposed && !frame) frame = window.requestAnimationFrame(render);
    };
    const resize = () => {
      needsMeasure = true;
      schedule();
    };
    const observer =
      typeof ResizeObserver === 'undefined'
        ? null
        : new ResizeObserver(() => {
            if (sizeKey() !== measuredSize) resize();
          });
    observer?.observe(canvas);
    if (heading.current) observer?.observe(heading.current);
    if (navbar) observer?.observe(navbar);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', resize);
    wideScreen.addEventListener('change', resize);
    reducedMotion.addEventListener('change', resize);
    document.fonts?.ready.then(() => {
      if (!disposed) resize();
    });
    schedule();
    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', resize);
      wideScreen.removeEventListener('change', resize);
      reducedMotion.removeEventListener('change', resize);
      observer?.disconnect();
      reset();
    };
  }, [section, stage, cards, heading, viewAll]);
}

export default function HomeWorkGallery() {
  const section = useRef(null);
  const stage = useRef(null);
  const cards = useRef([]);
  const heading = useRef(null);
  const viewAll = useRef(null);
  const dialog = useRef(null);
  const trigger = useRef(null);
  const [selected, setSelected] = useState(null);
  const modalOpen = selected !== null;
  useScrollCards(section, stage, cards, heading, viewAll);

  useEffect(() => {
    if (!modalOpen) return;
    dialog.current.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [modalOpen]);
  const openPhoto = (index, event) => {
    trigger.current = event.currentTarget;
    setSelected(index);
  };
  const movePhoto = (direction) =>
    setSelected((index) => (index + direction + gallery.length) % gallery.length);
  const close = () => dialog.current?.close();

  return (
    <section ref={section} id="our-work" className={styles.work} aria-labelledby="our-work-title">
      <div className={styles.sticky}>
        <div className={`container-default ${styles.layout}`}>
          <header ref={heading} className={styles.heading}>
            <div>
              <p className={styles.eyebrow}>OUR WORK</p>
              <h2 id="our-work-title">PROTECTION IN ACTION.</h2>
              <p className={styles.introduction}>
                A closer look at our people, their preparation and the everyday discipline behind
                our approach to security.
              </p>
            </div>
            <button
              ref={viewAll}
              className={styles.viewAll}
              type="button"
              onClick={(event) => openPhoto(0, event)}
            >
              View photographs <ArrowUpRight size={18} aria-hidden="true" />
            </button>
          </header>
          <div ref={stage} className={styles.stage}>
            {gallery.map((item, index) => (
              <figure
                className={styles.card}
                key={item.photo}
                style={{ '--card-index': index, zIndex: index + 1 }}
                ref={(element) => {
                  cards.current[index] = element;
                }}
              >
                <button
                  className={styles.photoButton}
                  type="button"
                  onClick={(event) => openPhoto(index, event)}
                  aria-label={`View full photograph: ${item.detail}`}
                >
                  <span className={styles.photo}>
                    <img
                      src={photoUrl(item.photo)}
                      alt={item.detail}
                      width={item.width}
                      height={item.height}
                      loading="eager"
                      decoding="async"
                      fetchPriority="low"
                    />
                  </span>
                  <span className={styles.caption}>
                    <span className={styles.number}>0{index + 1}</span>
                    <span>{item.title}</span>
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </span>
                </button>
              </figure>
            ))}
          </div>
          <div className={styles.captionRail} aria-label="Gallery photographs">
            {gallery.map((item, index) => (
              <button key={item.photo} type="button" onClick={(event) => openPhoto(index, event)}>
                <span>0{index + 1}</span>
                {item.title}
              </button>
            ))}
          </div>
          <div className={styles.footer}>
            <p>
              <span className={styles.dot} />
              Original Hi-Tech team photography
            </p>
            <span className={styles.scrollHint} aria-hidden="true">
              SCROLL TO REVEAL <ArrowDown size={16} />
            </span>
            <span>
              SELECT A PHOTO TO VIEW IT IN FULL <ArrowRight size={15} aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>
      <dialog
        ref={dialog}
        className={styles.lightbox}
        aria-labelledby="home-work-photo-title"
        onClose={() => {
          setSelected(null);
          const target = trigger.current?.closest('[inert]') ? viewAll.current : trigger.current;
          target?.focus({ preventScroll: true });
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            movePhoto(event.key === 'ArrowLeft' ? -1 : 1);
          }
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
            <img
              src={photoUrl(gallery[selected].photo)}
              alt={gallery[selected].detail}
              width={gallery[selected].width}
              height={gallery[selected].height}
            />
            <div className={styles.lightboxFooter}>
              <button type="button" onClick={() => movePhoto(-1)} aria-label="Previous photograph">
                <ArrowLeft size={20} />
              </button>
              <p id="home-work-photo-title" aria-live="polite">
                {gallery[selected].title}
                <span>
                  {gallery[selected].detail} · {selected + 1} / {gallery.length}
                </span>
              </p>
              <button type="button" onClick={() => movePhoto(1)} aria-label="Next photograph">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
