import { Check } from 'lucide-react';

export default function AboutHeaderSection({ activePage = 'about' }) {
  return (
    <div
      data-animation="default"
      className="header-section w-nav"
      data-easing2="ease"
      data-easing="ease"
      data-wf--header-section--variant="base"
      data-collapse="medium"
      data-w-id="0ed56dd9-7d80-d261-f786-25122067f7eb"
      role="banner"
      data-duration="300"
    >
      <div className="container-default w-container">
        <div className="header-block">
          <nav role="navigation" className="header-nav-block w-nav-menu">
            <div className="header-nav-link-block site-header-links">
              <a href="/" className="header-nav-link w-nav-link">
                {'Home'}
              </a>
              <a
                href="/about-us"
                aria-current={activePage === 'about' ? 'page' : undefined}
                className={`header-nav-link w-nav-link${activePage === 'about' ? ' w--current' : ''}`}
              >
                {'About Us'}
              </a>
              <a
                href="/services"
                aria-current={activePage === 'services' ? 'page' : undefined}
                className={`header-nav-link w-nav-link${activePage === 'services' ? ' w--current' : ''}`}
              >
                {'Services'}
              </a>
              <a
                href="/blog"
                aria-current={activePage === 'blog' ? 'page' : undefined}
                className={`header-nav-link w-nav-link${activePage === 'blog' ? ' w--current' : ''}`}
              >
                {'Blog'}
              </a>
              <a
                href="/faqs"
                aria-current={activePage === 'faq' ? 'page' : undefined}
                className={`header-nav-link w-nav-link${activePage === 'faq' ? ' w--current' : ''}`}
              >
                {'FAQ'}
              </a>
              <a
                href="/contact-us"
                aria-current={activePage === 'contact' ? 'page' : undefined}
                className={`header-nav-link w-nav-link${activePage === 'contact' ? ' w--current' : ''}`}
              >
                {'Contact Us'}
              </a>
              <div className="header-cta-wrap">
                <a href="tel:+917259537223" className="nagivation-cta w-inline-block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="nagivation-cta-icon"
                  >
                    <path
                      d="M12.0154 4.57495C11.6187 4.50167 11.2543 4.75483 11.1788 5.14206C11.1033 5.52929 11.3573 5.90737 11.7432 5.98315C12.9051 6.20966 13.8022 7.10904 14.0296 8.27491V8.27574C14.0943 8.61134 14.3898 8.85534 14.73 8.85534C14.7757 8.85534 14.8213 8.85118 14.8678 8.84285C15.2537 8.76541 15.5077 8.38816 15.4322 8.0001C15.0927 6.25879 13.7524 4.91388 12.0154 4.57495Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M11.9635 1.67328C11.7776 1.64663 11.5909 1.70159 11.4423 1.81984C11.2896 1.93976 11.1942 2.11297 11.1735 2.30701C11.1295 2.69924 11.4125 3.05399 11.8042 3.09813C14.5056 3.39959 16.6053 5.50398 16.909 8.21378C16.9497 8.57687 17.2543 8.85085 17.6178 8.85085C17.6452 8.85085 17.6717 8.84918 17.6991 8.84585C17.8891 8.82503 18.0585 8.73093 18.178 8.58103C18.2966 8.43114 18.3506 8.2446 18.329 8.05389C17.9506 4.67288 15.3338 2.04885 11.9635 1.67328Z"
                      fill="currentColor"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.19295 10.8103C12.5172 14.1336 13.2713 10.2889 15.3879 12.404C17.4284 14.444 18.6012 14.8527 16.0159 17.4373C15.692 17.6975 13.6345 20.8286 6.40367 13.5997C-0.828061 6.37 2.30116 4.31037 2.56148 3.98662C5.15306 1.39487 5.55472 2.57449 7.59525 4.61444C9.71181 6.73041 5.86872 7.48701 9.19295 10.8103Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <div className="nagivation-cta-text">
                    <div className="nagivation-cta-subtitle">{'Contact'}</div>
                    <h6 className="nagivation-cta-title">{'+91 72595 37223'}</h6>
                  </div>
                </a>
              </div>
            </div>
          </nav>
          <div className="header-brand-block">
            <a href="/" className="header-brand w-nav-brand">
              <img
                src="/assets/hitech/logo.png"
                loading="eager"
                alt="Hi-Tech Protection Security"
                className="header-brand-logo"
              />
            </a>
          </div>
          <div className="header-cta-block">
            <a href="tel:+917259537223" className="nagivation-cta w-inline-block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                viewBox="0 0 20 20"
                fill="none"
                className="nagivation-cta-icon"
              >
                <path
                  d="M12.0154 4.57495C11.6187 4.50167 11.2543 4.75483 11.1788 5.14206C11.1033 5.52929 11.3573 5.90737 11.7432 5.98315C12.9051 6.20966 13.8022 7.10904 14.0296 8.27491V8.27574C14.0943 8.61134 14.3898 8.85534 14.73 8.85534C14.7757 8.85534 14.8213 8.85118 14.8678 8.84285C15.2537 8.76541 15.5077 8.38816 15.4322 8.0001C15.0927 6.25879 13.7524 4.91388 12.0154 4.57495Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M11.9635 1.67328C11.7776 1.64663 11.5909 1.70159 11.4423 1.81984C11.2896 1.93976 11.1942 2.11297 11.1735 2.30701C11.1295 2.69924 11.4125 3.05399 11.8042 3.09813C14.5056 3.39959 16.6053 5.50398 16.909 8.21378C16.9497 8.57687 17.2543 8.85085 17.6178 8.85085C17.6452 8.85085 17.6717 8.84918 17.6991 8.84585C17.8891 8.82503 18.0585 8.73093 18.178 8.58103C18.2966 8.43114 18.3506 8.2446 18.329 8.05389C17.9506 4.67288 15.3338 2.04885 11.9635 1.67328Z"
                  fill="currentColor"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.19295 10.8103C12.5172 14.1336 13.2713 10.2889 15.3879 12.404C17.4284 14.444 18.6012 14.8527 16.0159 17.4373C15.692 17.6975 13.6345 20.8286 6.40367 13.5997C-0.828061 6.37 2.30116 4.31037 2.56148 3.98662C5.15306 1.39487 5.55472 2.57449 7.59525 4.61444C9.71181 6.73041 5.86872 7.48701 9.19295 10.8103Z"
                  fill="currentColor"
                ></path>
              </svg>
              <div className="nagivation-cta-text">
                <div className="nagivation-cta-subtitle">{'Contact'}</div>
                <h6 className="nagivation-cta-title">{'+91 72595 37223'}</h6>
              </div>
            </a>
          </div>
          <div className="header-menu-button w-nav-button">
            <div className="header-menu-button-block">
              <div className="top"></div>
              <div className="middle"></div>
              <div className="bottom"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
