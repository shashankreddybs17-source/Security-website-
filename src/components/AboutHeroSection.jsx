import { Check } from 'lucide-react';

export default function AboutHeroSection({
  title = 'About Us',
  image = '/assets/hitech/new-uniform/gate-security.webp',
  imageAlt = 'Hi-Tech security personnel in new uniforms at a property entrance',
}) {
  return (
    <section className="hero-section">
      <div className="hero-wrap">
        <div className="w-layout-blockcontainer container-default w-container">
          <div className="hero-block">
            <div className="hero-title-block">
              <h3
                data-w-id="306b2491-d070-3e99-8a00-4332eeb059c3"
                style={{
                  transform:
                    'translate3d(0, 150%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(10deg) skew(0, 0)',
                }}
                className="hero-title"
              >
                {title}
              </h3>
            </div>
            <div className="hero-subtitle-block">
              <div
                data-w-id="e44a8c45-f1bc-96fb-2e74-f5545452fda7"
                style={{
                  transform:
                    'translate3d(0, 150%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(10deg) skew(0, 0)',
                }}
                className="hero-subtitle-wrap"
              >
                <a href="/" className="hero-subtitle-link">
                  {'Home'}
                </a>
                <div className="hero-subtitle-text">{'/'}</div>
                <div className="hero-subtitle-text">{title}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-bg">
        <img
          src={image}
          loading="eager"
          alt={imageAlt}
          className="hero-bg-image"
          style={{ objectPosition: 'center 25%' }}
        />
        <div className="hero-bg-overlay"></div>
      </div>
    </section>
  );
}
