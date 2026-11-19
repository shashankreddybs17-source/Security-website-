import ResponsiveImage from './ResponsiveImage';
import BrandLogo from './BrandLogo';
import { Check } from 'lucide-react';
import styles from './AboutAboutSection.module.css';

export default function AboutAboutSection() {
  return (
    <section className={`about-section ${styles.section}`}>
      <div className="section-gap bottom-gap">
        <div className="site-layout-blockcontainer container-default site-container">
          <div className="about-block">
            <div className="about-content-block">
              <div className="about-title-block">
                <h2
                  data-reveal=""
                  style={{
                    transform:
                      'translate3d(0, 150%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(10deg) skew(0, 0)',
                  }}
                  className="about-title"
                >
                  {'Your Trusted Security Partner'}
                </h2>
              </div>
              <div className="about-except-block">
                <p
                  data-reveal=""
                  style={{
                    transform:
                      'translate3d(0, 150%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(10deg) skew(0, 0)',
                  }}
                  className="about-except"
                >
                  {
                    'Hi-Tech Protection Security is a Bengaluru-based security management company associated with Hi-Tech Security Force, established in 2008 with operations in Karnataka, Tamil Nadu and Kerala. Led by experienced and trained Ex-Army personnel, we bring discipline, vigilance and responsibility to every assignment. Our trained teams support businesses, institutions and residential communities with clear site duties and professional, courteous conduct.'
                  }
                </p>
              </div>
              <div className="site-layout-grid about-card-wrap">
                <div className="about-card">
                  <div data-reveal="" style={{ opacity: '0' }} className="about-subtitle-block">
                    <div className="about-subtitle">{'Our Purpose'}</div>
                  </div>
                  <div data-reveal="" style={{ opacity: '0' }} className="about-text-block">
                    <div className="about-text">
                      {
                        'To provide reliable protection through trained personnel and security practices suited to each location. Clear responsibilities, preparation and communication help us maintain a safe, welcoming environment for employees, visitors and residents.'
                      }
                    </div>
                  </div>
                </div>
                <div className="about-card">
                  <div data-reveal="" style={{ opacity: '0' }} className="about-subtitle-block">
                    <div className="about-subtitle">{'Our Values'}</div>
                  </div>
                  <div data-reveal="" style={{ opacity: '0' }} className="about-text-block">
                    <div className="about-text">
                      {
                        'Discipline, vigilance, responsibility, integrity and professionalism guide every assignment. We follow procedures, stay alert to risks and take ownership of entrusted duties, treating people with courtesy and protecting our clients’ confidentiality.'
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-image-block">
              <div data-reveal="" className="about-image-wrap">
                <ResponsiveImage
                  src="/assets/hitech/new-uniform/november-2026/security-guard-building-entrance.webp"
                  loading="lazy"
                  style={{
                    transform:
                      'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',
                  }}
                  alt="Hi-Tech security guard in a grey uniform standing at a building entrance"
                  className="about-image"
                />
              </div>
              <div className="about-name-block">
                <h4
                  data-reveal=""
                  style={{
                    transform:
                      'translate3d(0, 150%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(10deg) skew(0, 0)',
                  }}
                  className="about-name"
                >
                  {'Dileep'}
                </h4>
              </div>
              <div className="about-designation-block">
                <h6
                  data-reveal=""
                  style={{
                    transform:
                      'translate3d(0, 150%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(10deg) skew(0, 0)',
                  }}
                  className="about-designation"
                >
                  {'Operations Manager'}
                </h6>
              </div>
              <div className="about-signature-block">
                <BrandLogo
                  loading="lazy"
                  sizes="100px"
                  style={{
                    transform:
                      'translate3d(0, 150%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(10deg) skew(0, 0)',
                  }}
                  data-reveal=""
                  className="about-signature"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
