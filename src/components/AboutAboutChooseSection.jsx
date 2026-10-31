import { Check } from 'lucide-react';

export default function AboutAboutChooseSection() {
  return (
    <section className="about-choose-section">
      <div className="section-gap bottom-gap">
        <div className="w-layout-blockcontainer container-default w-container">
          <div className="about-choose-block">
            <div className="about-choose-image-block">
              <div className="about-choose-image-wrap-1">
                <img
                  src="/assets/hitech/team-13.jpeg"
                  loading="eager"
                  style={{ opacity: '0' }}
                  data-w-id="5e3e2fd4-32e4-29e4-2d1c-12203bebf175"
                  alt="Hi-Tech Protection Security personnel and training"
                  className="about-choose-image-1"
                />
              </div>
              <div className="about-choose-image-wrap-2">
                <img
                  src="/assets/hitech/team-15.jpeg"
                  loading="eager"
                  style={{ opacity: '0' }}
                  data-w-id="5e3e2fd4-32e4-29e4-2d1c-12203bebf176"
                  alt="Hi-Tech Protection Security personnel and training"
                  className="about-choose-image-2"
                />
              </div>
            </div>
            <div className="about-choose-content-block">
              <div className="section-title-block">
                <h2
                  data-w-id="5e3e2fd4-32e4-29e4-2d1c-12203bebf179"
                  style={{
                    transform:
                      'translate3d(0, 150%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(10deg) skew(0, 0)',
                  }}
                  className="section-title"
                >
                  {'Why Choose Us?'}
                </h2>
              </div>
              <div className="section-except-block">
                <p
                  data-w-id="5e3e2fd4-32e4-29e4-2d1c-12203bebf17c"
                  style={{
                    transform:
                      'translate3d(0, 150%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(10deg) skew(0, 0)',
                  }}
                  className="section-except"
                >
                  {
                    'Managed by experienced and trained Ex-Army personnel, our organisation brings discipline, alertness and responsibility to its security operations.'
                  }
                </p>
              </div>
              <div className="home-about-list-wrapper space-none">
                <div className="home-about-list-title-block">
                  <h5
                    data-w-id="5e3e2fd4-32e4-29e4-2d1c-12203bebf180"
                    style={{
                      transform:
                        'translate3d(0, 150%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(10deg) skew(0, 0)',
                    }}
                    className="home-about-list-title"
                  >
                    {'Key Benefits.'}
                  </h5>
                </div>
                <div className="home-about-list">
                  <div className="home-about-item">
                    <Check size={24} aria-hidden="true" />
                    <div
                      data-w-id="5e3e2fd4-32e4-29e4-2d1c-12203bebf185"
                      style={{
                        transform:
                          'translate3d(0, 150%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(10deg) skew(0, 0)',
                      }}
                      className="home-about-list-text"
                    >
                      {'Ex-Army Leadership.'}
                    </div>
                  </div>
                  <div className="home-about-item">
                    <Check size={24} aria-hidden="true" />
                    <div
                      data-w-id="5e3e2fd4-32e4-29e4-2d1c-12203bebf189"
                      style={{
                        transform:
                          'translate3d(0, 150%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(10deg) skew(0, 0)',
                      }}
                      className="home-about-list-text"
                    >
                      {'Selected & Trained Personnel.'}
                    </div>
                  </div>
                  <div className="home-about-item">
                    <Check size={24} aria-hidden="true" />
                    <div
                      data-w-id="5e3e2fd4-32e4-29e4-2d1c-12203bebf18d"
                      style={{
                        transform:
                          'translate3d(0, 150%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(10deg) skew(0, 0)',
                      }}
                      className="home-about-list-text"
                    >
                      {'Professional Conduct.'}
                    </div>
                  </div>
                  <div className="home-about-item">
                    <Check size={24} aria-hidden="true" />
                    <div
                      data-w-id="5e3e2fd4-32e4-29e4-2d1c-12203bebf191"
                      style={{
                        transform:
                          'translate3d(0, 150%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(10deg) skew(0, 0)',
                      }}
                      className="home-about-list-text"
                    >
                      {'Vigilance & Responsibility.'}
                    </div>
                  </div>
                  <div className="home-about-item">
                    <Check size={24} aria-hidden="true" />
                    <div
                      data-w-id="ab7aff5f-1318-7b8e-b8fe-d3ebb435260f"
                      style={{
                        transform:
                          'translate3d(0, 150%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(10deg) skew(0, 0)',
                      }}
                      className="home-about-list-text"
                    >
                      {'Site-Specific Security'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
