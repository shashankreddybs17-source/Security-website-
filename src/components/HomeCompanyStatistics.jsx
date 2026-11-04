import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import styles from './HomeCompanyStatistics.module.css';

export const companyStatistics = [
  { value: 18, suffix: '+', label: 'Years of Experience' },
  { value: 1010, suffix: '', label: 'Employees' },
  { value: 280, suffix: '', label: 'Clients' },
  { value: 99, suffix: '%', label: 'On-Time Reporting' },
];
const finalValues = companyStatistics.map(({ value }) => value);
const format = (value, suffix) => `${value.toLocaleString('en-US')}${suffix}`;

// Starts only after the visibility observer fires; returns an unmount/motion cleanup.
export function animateStatistics(update, win = window) {
  let frame;
  let started;
  let cancelled = false;
  const tick = (time) => {
    if (cancelled) return;
    started ??= time;
    const progress = Math.min(1, (time - started) / 1800);
    const eased = 1 - (1 - progress) ** 3;
    update(finalValues.map((value) => Math.round(value * eased)));
    if (progress < 1) frame = win.requestAnimationFrame(tick);
  };
  update(finalValues.map(() => 0));
  frame = win.requestAnimationFrame(tick);
  return () => {
    cancelled = true;
    win.cancelAnimationFrame(frame);
  };
}

function Statistic({ statistic, value, experience = false }) {
  const final = format(statistic.value, statistic.suffix);
  return (
    <dl className={experience ? styles.experience : styles.statistic}>
      <dt>{statistic.label}</dt>
      <dd>
        <span className={styles.accessibleValue}>{final}</span>
        <span className={styles.number} aria-hidden="true">
          <span className={styles.reserve}>{final}</span>
          <span className={styles.counter}>{format(value, statistic.suffix)}</span>
        </span>
        {!experience && (
          <span className={styles.accent} aria-hidden="true">
            <ArrowUpRight size={18} />
          </span>
        )}
      </dd>
    </dl>
  );
}

export default function HomeCompanyStatistics() {
  const section = useRef(null);
  const [values, setValues] = useState(finalValues);
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motion.matches || !('IntersectionObserver' in window)) return;
    let played = false;
    let stop = () => {};
    const observer = new IntersectionObserver(
      (entries) => {
        if (played || !entries.some((entry) => entry.isIntersecting)) return;
        played = true;
        observer.disconnect();
        stop = animateStatistics(setValues);
      },
      { threshold: 0.2 },
    );
    const onMotionChange = () => {
      if (!motion.matches) return;
      played = true;
      observer.disconnect();
      stop();
      setValues(finalValues);
    };
    observer.observe(section.current);
    motion.addEventListener('change', onMotionChange);
    return () => {
      observer.disconnect();
      stop();
      motion.removeEventListener('change', onMotionChange);
    };
  }, []);
  return (
    <section
      ref={section}
      className={styles.section}
      aria-label="Company experience and statistics"
    >
      <div className="container-default w-container">
        <div className={styles.layout}>
          <Statistic statistic={companyStatistics[0]} value={values[0]} experience />
          <div className={styles.metrics}>
            {companyStatistics.slice(1).map((statistic, index) => (
              <Statistic key={statistic.label} statistic={statistic} value={values[index + 1]} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
