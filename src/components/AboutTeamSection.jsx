import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import styles from './AboutReplacements.module.css';

const team = [
  {
    photo: '23',
    title: 'Professional presence',
    detail: 'Our security personnel',
    position: '50% 22%',
  },
  {
    photo: '29',
    title: 'Discipline in every duty',
    detail: 'Our team on location',
    position: '50% 35%',
  },
  {
    photo: '24',
    title: 'People you can rely on',
    detail: 'Our security personnel',
    position: '50% 35%',
  },
  {
    photo: '28',
    title: 'Prepared to protect',
    detail: 'Team briefing and readiness',
    position: '50% 40%',
  },
];

export default function AboutTeamSection() {
  return (
    <section id="team" className={styles.team} aria-labelledby="about-team-heading">
      <div className="container-default w-container">
        <div className={styles.teamHeader}>
          <div>
            <p className={styles.eyebrow}>THE PEOPLE BEHIND YOUR PROTECTION</p>
            <h2 id="about-team-heading" className={styles.heading}>
              Built on discipline.
              <br />
              Driven by responsibility.
            </h2>
          </div>
          <a className={styles.cta} href="/contact-us">
            Talk to our team <ArrowUpRight size={19} aria-hidden="true" />
          </a>
        </div>
        <div className={styles.teamGrid}>
          {team.map((person) => (
            <figure className={styles.person} key={person.photo}>
              <img
                src={`/assets/hitech/team-${person.photo}.jpeg`}
                alt={person.detail}
                loading="lazy"
                style={{ objectPosition: person.position }}
              />
              <figcaption className={styles.personCaption}>
                <div>
                  <h3>{person.title}</h3>
                  <p>{person.detail}</p>
                </div>
                <ShieldCheck size={24} aria-hidden="true" />
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
