import { useVisibleSliderHeight } from '../lib/useVisibleSliderHeight';
import { Check, ArrowUpRight } from 'lucide-react';

export default function HomeTeamSection() {
  const section = useVisibleSliderHeight();
  return (
    <section ref={section} id="team" className="team-section">
      <div className="section-gap">
        <div className="team-block">
          <div className="team-content-block">
            <div className="w-layout-blockcontainer container-default w-container">
              <div className="team-conternt-wrap">
                <div className="section-title-block space-none">
                  <h2 data-w-id="d06941f4-93e7-ee70-1485-469e46f0f45e" className="section-title">
                    {'Meet Our Security Experts'}
                  </h2>
                </div>
                <div className="team-introduction">
                  <p>
                    Our organisation is managed by experienced and trained Ex-Army personnel. We
                    bring discipline, alertness and responsibility to the protection of people and
                    premises.
                  </p>
                  <ul className="team-proof">
                    <li>
                      <Check size={18} aria-hidden="true" />
                      <span>Selected and trained personnel</span>
                    </li>
                    <li>
                      <Check size={18} aria-hidden="true" />
                      <span>Clear site responsibilities</span>
                    </li>
                    <li>
                      <Check size={18} aria-hidden="true" />
                      <span>Professional, courteous conduct</span>
                    </li>
                  </ul>
                  <div className="team-intro-note">
                    <strong>Assess. Prevent. Protect. Respond.</strong>
                    <p>
                      Training, vigilance and communication help our personnel understand the needs
                      of each assignment.
                    </p>
                  </div>
                  <a className="team-intro-link" href="/about-us">
                    Get to know our team <ArrowUpRight size={18} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="team-slider-block">
            <div
              data-delay="3000"
              data-animation="slide"
              className="team-slider w-slider"
              data-autoplay="true"
              data-easing="ease"
              data-hide-arrows="false"
              data-disable-swipe="false"
              data-w-id="d06941f4-93e7-ee70-1485-469e46f0f461"
              data-autoplay-limit="0"
              data-nav-spacing="3"
              data-duration="500"
              data-infinite="true"
            >
              <div className="team-mask w-slider-mask">
                <div
                  data-w-id="d06941f4-93e7-ee70-1485-469e46f0f463"
                  className="team-slide w-slide"
                >
                  <div className="team-card">
                    <div className="team-image-block">
                      <img
                        src="/assets/hitech/team-23.jpeg"
                        loading="eager"
                        alt="Hi-Tech Protection Security personnel and training"
                        className="team-image"
                      />
                      <div className="team-tag">{'Leadership Team'}</div>
                    </div>
                    <div className="team-text-block">
                      <h5 className="team-name">{'Arjun Kumar (Demo)'}</h5>
                      <div className="team-designation">{'Operations Manager'}</div>
                    </div>
                  </div>
                </div>
                <div
                  data-w-id="d06941f4-93e7-ee70-1485-469e46f0f46e"
                  className="team-slide w-slide"
                >
                  <div className="team-card">
                    <div className="team-image-block">
                      <img
                        src="/assets/hitech/team-29.jpeg"
                        loading="eager"
                        alt="Hi-Tech Protection Security personnel and training"
                        className="team-image"
                      />
                      <div className="team-tag">{'Leadership Team'}</div>
                    </div>
                    <div className="team-text-block">
                      <h5 className="team-name">{'Priya Rao (Demo)'}</h5>
                      <div className="team-designation">{'Training Coordinator'}</div>
                    </div>
                  </div>
                </div>
                <div
                  data-w-id="d06941f4-93e7-ee70-1485-469e46f0f479"
                  className="team-slide w-slide"
                >
                  <div className="team-card">
                    <div className="team-image-block">
                      <img
                        src="/assets/hitech/team-24.jpeg"
                        loading="eager"
                        alt="Hi-Tech Protection Security personnel and training"
                        className="team-image"
                      />
                      <div className="team-tag">{'Leadership Team'}</div>
                    </div>
                    <div className="team-text-block">
                      <h5 className="team-name">{'Vikram Singh (Demo)'}</h5>
                      <div className="team-designation">{'Security Supervisor'}</div>
                    </div>
                  </div>
                </div>
                <div
                  data-w-id="d06941f4-93e7-ee70-1485-469e46f0f484"
                  className="team-slide w-slide"
                >
                  <div className="team-card">
                    <div className="team-image-block">
                      <img
                        src="/assets/hitech/team-14.jpeg"
                        loading="eager"
                        alt="Hi-Tech Protection Security personnel and training"
                        className="team-image"
                      />
                      <div className="team-tag">{'Field Experts'}</div>
                    </div>
                    <div className="team-text-block">
                      <h5 className="team-name">{'Kiran Sharma (Demo)'}</h5>
                      <div className="team-designation">{'Site Supervisor'}</div>
                    </div>
                  </div>
                </div>
                <div
                  data-w-id="d06941f4-93e7-ee70-1485-469e46f0f48f"
                  className="team-slide w-slide"
                >
                  <div className="team-card">
                    <div className="team-image-block">
                      <img
                        src="/assets/hitech/team-26.jpeg"
                        loading="eager"
                        alt="Hi-Tech Protection Security personnel and training"
                        className="team-image"
                      />
                      <div className="team-tag">{'Field Experts'}</div>
                    </div>
                    <div className="team-text-block">
                      <h5 className="team-name">{'Ravi Kumar (Demo)'}</h5>
                      <div className="team-designation">{'Field Supervisor'}</div>
                    </div>
                  </div>
                </div>
                <div
                  data-w-id="d06941f4-93e7-ee70-1485-469e46f0f49a"
                  className="team-slide w-slide"
                >
                  <div className="team-card">
                    <div className="team-image-block">
                      <img
                        src="/assets/hitech/team-28.jpeg"
                        loading="eager"
                        alt="Hi-Tech Protection Security personnel and training"
                        className="team-image"
                      />
                      <div className="team-tag">{'Field Experts'}</div>
                    </div>
                    <div className="team-text-block">
                      <h5 className="team-name">{'Anita Rao (Demo)'}</h5>
                      <div className="team-designation">{'Client Coordinator'}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="team-arrow left-arrow w-slider-arrow-left">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="team-arrow-icon"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20.25 12.2739C20.25 12.8262 19.8023 13.2739 19.25 13.2739L4.25 13.2739C3.69772 13.2739 3.25 12.8262 3.25 12.2739C3.25 11.7216 3.69772 11.2739 4.25 11.2739L19.25 11.2739C19.8023 11.2739 20.25 11.7216 20.25 12.2739Z"
                    fill="currentColor"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.0084 5.54387C11.3981 5.9352 11.3968 6.56837 11.0054 6.95808L5.66701 12.2745L11.0054 17.5899C11.3968 17.9796 11.3981 18.6127 11.0084 19.0041C10.6188 19.3955 9.98559 19.3968 9.59422 19.0071L3.54422 12.9831C3.35576 12.7955 3.24981 12.5405 3.2498 12.2746C3.24979 12.0086 3.35572 11.7536 3.54416 11.5659L9.59416 5.54094C9.9855 5.15123 10.6187 5.15254 11.0084 5.54387Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
              <div className="team-arrow right-arrow w-slider-arrow-right">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="team-arrow-icon"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.75 11.7261C3.75 11.1738 4.19772 10.7261 4.75 10.7261H19.75C20.3023 10.7261 20.75 11.1738 20.75 11.7261C20.75 12.2784 20.3023 12.7261 19.75 12.7261L4.75 12.7261C4.19772 12.7261 3.75 12.2784 3.75 11.7261Z"
                    fill="currentColor"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.9916 18.4561C12.6019 18.0648 12.6032 17.4316 12.9946 17.0419L18.333 11.7255L12.9946 6.41012C12.6032 6.02043 12.6019 5.38727 12.9916 4.99591C13.3812 4.60454 14.0144 4.60318 14.4058 4.99286L20.4558 11.0169C20.6442 11.2045 20.7502 11.4595 20.7502 11.7254C20.7502 11.9914 20.6443 12.2464 20.4558 12.4341L14.4058 18.4591C14.0145 18.8488 13.3813 18.8475 12.9916 18.4561Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
