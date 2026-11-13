import { ArrowRight } from 'lucide-react';
import styles from './HomeCtaSection.module.css';

export default function HomeCtaSection() {
  return (
    <section className="cta-section">
      <div className="section-gap">
        <div className="site-layout-blockcontainer container-default site-container">
          <div className="cta-block">
            <div className="cta-title-block">
              <h2 data-reveal="" className="cta-title">
                {'Ready to Discuss Your Security Requirements?'}
              </h2>
            </div>
            <div className="cta-except-block">
              <p data-reveal="" className="cta-except">
                {
                  'Contact Hi-Tech Protection Security for professional protection suited to your premises and requirements.'
                }
              </p>
            </div>
            <div className="cta-button-block">
              <div className="cta-button-wrap">
                <a href="/contact-us" className={styles.quote}>
                  Request a Quote
                  <span>
                    <ArrowRight size={20} aria-hidden="true" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
