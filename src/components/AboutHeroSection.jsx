import ResponsiveImage from './ResponsiveImage';
import { Check } from 'lucide-react';

export default function AboutHeroSection({
  title = 'About Us',
  image = '/assets/hitech/new-uniform/november-2026/gate-security.webp',
  imageAlt = 'Hi-Tech security personnel in new uniforms at a property entrance',
  imagePosition = 'center 25%',
}) {
  return (
    <section className="hero-section">
      <div className="hero-wrap">
        <div className="site-layout-blockcontainer container-default site-container">
          <div className="hero-block">
            <div className="hero-title-block">
              <h3
                data-reveal=""
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
                data-reveal=""
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
        <ResponsiveImage
          src={image}
          sizes="100vw"
          fetchPriority="high"
          loading="eager"
          alt={imageAlt}
          className="hero-bg-image"
          style={{ objectPosition: imagePosition }}
        />
      </div>
    </section>
  );
}
