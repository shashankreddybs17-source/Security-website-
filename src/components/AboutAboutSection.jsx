import { Check } from 'lucide-react';
import styles from './AboutAboutSection.module.css';

export default function AboutAboutSection() {
  return (
    <section className={`about-section ${styles.section}`}>
      <div className="section-gap bottom-gap">
        <div className="w-layout-blockcontainer container-default w-container">
          <div className="about-block">
            <div className="about-content-block">
              <div className="about-title-block">
                <h2
                  data-w-id="1be2cd6c-d473-3ad6-b823-7f6dcf4bc363"
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
                  data-w-id="8b8ffe54-125b-62dd-aa7a-5d211cd3242d"
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
              <div className="w-layout-grid about-card-wrap">
                <div className="about-card">
                  <div
                    data-w-id="0777ff1c-ba9f-947c-da08-c8d8bd025215"
                    style={{ opacity: '0' }}
                    className="about-subtitle-block"
                  >
                    <div className="about-subtitle">{'Our Purpose'}</div>
                  </div>
                  <div
                    data-w-id="1138acf4-999e-98bd-1b86-ae7260793ba0"
                    style={{ opacity: '0' }}
                    className="about-text-block"
                  >
                    <div className="about-text">
                      {
                        'To provide reliable protection through trained personnel and security practices suited to each location. Clear responsibilities, preparation and communication help us maintain a safe, welcoming environment for employees, visitors and residents.'
                      }
                    </div>
                  </div>
                </div>
                <div className="about-card">
                  <div
                    data-w-id="f9eb42af-6c6d-06b1-61e8-390dfbc28378"
                    style={{ opacity: '0' }}
                    className="about-subtitle-block"
                  >
                    <div className="about-subtitle">{'Our Values'}</div>
                  </div>
                  <div
                    data-w-id="f9eb42af-6c6d-06b1-61e8-390dfbc2837b"
                    style={{ opacity: '0' }}
                    className="about-text-block"
                  >
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
              <div data-w-id="1a48e2d1-8870-9f35-df3b-7abd70bfe38c" className="about-image-wrap">
                <img
                  src="/assets/hitech/new-uniform/converted-old-08.webp"
                  loading="eager"
                  style={{
                    transform:
                      'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',
                  }}
                  alt="Hi-Tech Protection Security personnel and training"
                  className="about-image"
                />
                <div
                  style={{
                    transform:
                      'translate3d(0, 100%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',
                    display: 'block',
                  }}
                  className="about-overlay"
                ></div>
              </div>
              <div className="about-name-block">
                <h4
                  data-w-id="b30779de-01c4-f2be-b277-081d220b97bb"
                  style={{
                    transform:
                      'translate3d(0, 150%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(10deg) skew(0, 0)',
                  }}
                  className="about-name"
                >
                  {'Arjun Kumar'}
                </h4>
              </div>
              <div className="about-designation-block">
                <h6
                  data-w-id="d6fdc874-a69d-5dfd-8b9b-9ffc67cc2cd1"
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
                <img
                  src="/assets/hitech/logo-clean.webp"
                  loading="eager"
                  style={{
                    transform:
                      'translate3d(0, 150%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(10deg) skew(0, 0)',
                  }}
                  data-w-id="87137819-6685-4a6d-8f2b-a5ac828986f1"
                  alt=""
                  className="about-signature site-brand-logo"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
