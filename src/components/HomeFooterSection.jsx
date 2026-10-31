import { Check } from 'lucide-react';

export default function HomeFooterSection() {
  return (
    <section className="footer-section">
      <div className="footer-block">
        <div className="footer-nav-wrap">
          <div className="w-layout-blockcontainer container-default w-container">
            <div className="footer-nav-block">
              <div
                id="w-node-_06c87419-1add-f712-c132-9ef8d1fa4211-d1fa420c"
                className="footer-brand-block"
              >
                <div className="footer-description-block">
                  <a
                    href="/"
                    aria-current="page"
                    className="footer-brand w-inline-block w--current"
                  >
                    <img
                      src="/assets/hitech/logo.png"
                      loading="eager"
                      alt="Hi-Tech Protection Security"
                      className="footer-brand-logo"
                    />
                  </a>
                  <div className="footer-except">
                    {'Security You Can Trust. Protection You Can Rely On.'}
                  </div>
                </div>
                <div className="footer-menu-block">
                  <div className="footer-nav-menu">
                    <h5 className="footer-nav-title">{'Quick Links'}</h5>
                    <a href="/" aria-current="page" className="footer-nav-link w--current">
                      {'Home'}
                    </a>
                    <a href="/about-us" className="footer-nav-link">
                      {'About Us'}
                    </a>
                    <a href="/services" className="footer-nav-link">
                      {'Services'}
                    </a>
                    <a href="/blog" className="footer-nav-link">
                      {'Blog'}
                    </a>
                    <a href="/contact-us" className="footer-nav-link">
                      {'Contact Us'}
                    </a>
                    <a href="/faqs" className="footer-nav-link">
                      {'FAQ'}
                    </a>
                  </div>
                </div>
                <div className="footer-brand-bg"></div>
              </div>
              <div id="contact" className="footer-contact-block">
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
                <a
                  href="mailto:hitechprotectionsecurity@gmail.com"
                  className="nagivation-cta w-inline-block"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="nagivation-cta-icon"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14.1162 2.5C15.2337 2.5 16.3087 2.94167 17.0995 3.73417C17.8912 4.525 18.3337 5.59167 18.3337 6.70833V13.2917C18.3337 15.6167 16.442 17.5 14.1162 17.5H5.88366C3.55783 17.5 1.66699 15.6167 1.66699 13.2917V6.70833C1.66699 4.38333 3.54949 2.5 5.88366 2.5H14.1162ZM15.442 7.95L15.5087 7.88333C15.7078 7.64167 15.7078 7.29167 15.4995 7.05C15.3837 6.92583 15.2245 6.85 15.0587 6.83333C14.8837 6.82417 14.717 6.88333 14.5912 7L10.8337 10C10.3503 10.4008 9.65783 10.4008 9.16699 10L5.41699 7C5.15783 6.80833 4.79949 6.83333 4.58366 7.05833C4.35866 7.28333 4.33366 7.64167 4.52449 7.89167L4.63366 8L8.42533 10.9583C8.89199 11.325 9.45783 11.525 10.0503 11.525C10.6412 11.525 11.217 11.325 11.6828 10.9583L15.442 7.95Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <div className="nagivation-cta-text">
                    <div className="nagivation-cta-subtitle">{'Email Us'}</div>
                    <h6 className="nagivation-cta-title">{'hitechprotectionsecurity@gmail.com'}</h6>
                  </div>
                </a>
                <div className="footer-contact-bg"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-cta-wrap">
          <div className="w-layout-blockcontainer container-default w-container">
            <div className="footer-cta-block">
              <div className="footer-cta-text-block">
                <div className="footer-cta-text">
                  {
                    'No. 28, Shop No. 2, 3rd Cross, Vinayaka Nagar, JP Nagar 5th Phase, Bengaluru - 560 078.'
                  }
                </div>
              </div>
              <div className="footer-cta-form-block w-form">
                <form
                  id="wf-form-Footer-CTA"
                  name="wf-form-Footer-CTA"
                  data-name="Footer CTA"
                  method="get"
                  className="footer-cta-form"
                  data-wf-page-id="679f5ed995191a2bd9d5042d"
                  data-wf-element-id="06c87419-1add-f712-c132-9ef8d1fa424e"
                >
                  <input
                    className="footer-cta-field w-input"
                    maxLength="256"
                    name="Email-Address-2"
                    data-name="Email Address 2"
                    placeholder="Email Address"
                    type="email"
                    id="Email-Address-2"
                    required={true}
                  />
                  <div className="footer-cta-arrow">
                    <input
                      type="submit"
                      data-wait=""
                      data-w-id="06c87419-1add-f712-c132-9ef8d1fa4251"
                      className="footer-cta-button w-button"
                      value=""
                    />
                    <div className="footer-cta-icon">
                      <div className="footer-cta-icon-wrap">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="100%"
                          viewBox="0 0 29 30"
                          fill="none"
                          className="footer-cta-hover-icon"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3.6875 14.6572C3.6875 13.9669 4.24714 13.4072 4.9375 13.4072L23.6875 13.4072C24.3779 13.4072 24.9375 13.9669 24.9375 14.6572C24.9375 15.3476 24.3779 15.9072 23.6875 15.9072L4.9375 15.9072C4.24714 15.9072 3.6875 15.3476 3.6875 14.6572Z"
                            fill="currentColor"
                          ></path>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.2398 23.0696C14.7526 22.5804 14.7543 21.7889 15.2434 21.3018L21.9165 14.6563L15.2435 8.01204C14.7543 7.52493 14.7526 6.73348 15.2397 6.24427C15.7268 5.75507 16.5183 5.75336 17.0075 6.24047L24.57 13.7705C24.8055 14.005 24.938 14.3238 24.938 14.6562C24.938 14.9886 24.8056 15.3074 24.57 15.542L17.0075 23.0732C16.5184 23.5604 15.7269 23.5587 15.2398 23.0696Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="100%"
                          viewBox="0 0 29 30"
                          fill="none"
                          className="footer-cta-normal-icon"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3.6875 14.6572C3.6875 13.9669 4.24714 13.4072 4.9375 13.4072L23.6875 13.4072C24.3779 13.4072 24.9375 13.9669 24.9375 14.6572C24.9375 15.3476 24.3779 15.9072 23.6875 15.9072L4.9375 15.9072C4.24714 15.9072 3.6875 15.3476 3.6875 14.6572Z"
                            fill="currentColor"
                          ></path>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.2398 23.0696C14.7526 22.5804 14.7543 21.7889 15.2434 21.3018L21.9165 14.6563L15.2435 8.01204C14.7543 7.52493 14.7526 6.73348 15.2397 6.24427C15.7268 5.75507 16.5183 5.75336 17.0075 6.24047L24.57 13.7705C24.8055 14.005 24.938 14.3238 24.938 14.6562C24.938 14.9886 24.8056 15.3074 24.57 15.542L17.0075 23.0732C16.5184 23.5604 15.7269 23.5587 15.2398 23.0696Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="footer-cta-success-message w-form-done">
                  <div className="footer-cta-message">
                    {'Thank you! Your submission has been received!'}
                  </div>
                </div>
                <div className="footer-cta-error-message w-form-fail">
                  <div className="footer-cta-message">
                    {'Oops! Something went wrong while submitting the form.'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-copy-wrap">
          <div className="w-layout-blockcontainer container-default w-container">
            <div className="footer-copy-block">
              <div className="footer-social-block">
                <a href="/services" className="footer-social-link">
                  Services
                </a>
                <a href="/blog" className="footer-social-link">
                  Blog
                </a>
                <a href="/faqs" className="footer-social-link">
                  FAQ
                </a>
              </div>
              <div className="footer-copyright-block">
                <div className="footer-copyright-text">
                  {'Copyright \u00a9 2026 Hi-Tech Protection Security. All rights reserved.'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
