import { ArrowUpRight } from 'lucide-react';
import { serviceDetails } from '../data/serviceDetails';
import styles from './ServiceDetailInformation.module.css';

function InformationRow({ number, title, children }) {
  return (
    <div className={styles.row}>
      <div className={styles.rowHeading}>
        <span className={styles.number} aria-hidden="true">
          {number}
        </span>
        <h2>{title}</h2>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
function Points({ items }) {
  return (
    <ul className={styles.points}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function ServiceDetailInformation({ service }) {
  const detail = serviceDetails[service.id];
  if (!detail) return null;
  return (
    <section className={styles.section} aria-label={`${service.title} in detail`}>
      <div className="container-default w-container">
        <InformationRow number="01" title="What This Service Covers">
          <p>{detail.coverage}</p>
          <Points items={detail.responsibilities} />
        </InformationRow>
        <InformationRow number="02" title="Our Approach">
          <p>{detail.approach}</p>
          <Points items={detail.practices} />
        </InformationRow>
        <InformationRow number="03" title="Where This Service Is Suitable">
          <Points items={detail.suitable} />
        </InformationRow>
        <InformationRow number="04" title="Discuss Your Requirements">
          <p>{detail.discussion}</p>
          <p className={styles.confirmation}>
            <strong>To agree before the assignment</strong>
            {detail.confirmation}
          </p>
          <a
            href="/contact-us"
            className={styles.enquiry}
            aria-label={`Enquire about ${service.title}`}
          >
            Make an Enquiry
            <ArrowUpRight size={20} aria-hidden="true" />
          </a>
        </InformationRow>
      </div>
    </section>
  );
}
