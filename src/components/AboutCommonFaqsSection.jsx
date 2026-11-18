import { useId, useState } from 'react';
import styles from './AboutCommonFaqsSection.module.css';

export default function AboutCommonFaqsSection({
  singleOpen = false,
  spacingClassName = 'section-gap bottom-gap site-variant-a36b6055-396e-b87e-f32c-146d9f9c8b9b',
}) {
  const [openIndex, setOpenIndex] = useState(0);
  const accordionId = useId();
  const Question = singleOpen ? 'button' : 'div';
  const QuestionBlock = singleOpen ? 'span' : 'div';
  const QuestionText = singleOpen ? 'span' : 'h5';
  const questionProps = (index) =>
    singleOpen
      ? {
          type: 'button',
          id: `${accordionId}-question-${index}`,
          className: `faqs-question site-dropdown-toggle ${styles.question}`,
          'aria-expanded': openIndex === index,
          'aria-controls': `${accordionId}-answer-${index}`,
          onClick: () => setOpenIndex((current) => (current === index ? null : index)),
          onKeyDown: (event) => {
            if (event.key === 'Escape') setOpenIndex(null);
          },
        }
      : {};
  const answerProps = (index) =>
    singleOpen
      ? {
          id: `${accordionId}-answer-${index}`,
          role: 'region',
          'aria-labelledby': `${accordionId}-question-${index}`,
          'aria-hidden': openIndex !== index,
          inert: openIndex !== index,
          'data-expanded': openIndex === index,
          className: `faqs-answer site-dropdown-list ${styles.answer}`,
        }
      : {};
  const Answer = singleOpen ? 'div' : 'nav';

  return (
    <section id="faqs" className="common-faqs-section">
      <div className={spacingClassName}>
        <div className="site-layout-blockcontainer container-default site-container">
          <div className="faqs-block home-faqs-block">
            <div className="faqs-content home-faqs-content">
              <div className="section-title-block">
                <h2 data-reveal="" className="section-title">
                  {'Common Questions'}
                </h2>
              </div>
              <div className="section-except-block">
                <p data-reveal="" className="section-except">
                  {"Still curious? We're here to help! Reach out to our team for expert guidance."}
                </p>
              </div>
              <div className="section-button-block">
                <div data-reveal="" className="section-button-wrap">
                  <a
                    data-reveal=""
                    href="/contact-us"
                    className="tertiary-button site-inline-block"
                  >
                    <div className="button-block">
                      <div className="button-text-block tertiary">
                        <div className="button-text">{'Contact Us'}</div>
                      </div>
                      <div className="button-icon-block tertiary">
                        <div className="button-icon-wrapper">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="100%"
                            viewBox="0 0 20 20"
                            fill="none"
                            className="button-hover-icon"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.125 9.7714C3.125 9.31117 3.4981 8.93807 3.95833 8.93807H16.4583C16.9186 8.93807 17.2917 9.31117 17.2917 9.7714C17.2917 10.2316 16.9186 10.6047 16.4583 10.6047H3.95833C3.4981 10.6047 3.125 10.2316 3.125 9.7714Z"
                              fill="currentColor"
                            ></path>
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M10.8264 15.3799C10.5016 15.0538 10.5027 14.5262 10.8288 14.2014L15.2775 9.77113L10.8288 5.3416C10.5027 5.01687 10.5016 4.48923 10.8263 4.16309C11.151 3.83695 11.6787 3.83582 12.0048 4.16055L17.0465 9.18055C17.2035 9.33693 17.2918 9.54942 17.2918 9.77104C17.2918 9.99267 17.2036 10.2052 17.0465 10.3616L12.0049 15.3824C11.6788 15.7071 11.1511 15.7061 10.8264 15.3799Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="100%"
                            viewBox="0 0 20 20"
                            fill="none"
                            className="button-initial-icon"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.125 9.7714C3.125 9.31117 3.4981 8.93807 3.95833 8.93807H16.4583C16.9186 8.93807 17.2917 9.31117 17.2917 9.7714C17.2917 10.2316 16.9186 10.6047 16.4583 10.6047H3.95833C3.4981 10.6047 3.125 10.2316 3.125 9.7714Z"
                              fill="currentColor"
                            ></path>
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M10.8264 15.3799C10.5016 15.0538 10.5027 14.5262 10.8288 14.2014L15.2775 9.77113L10.8288 5.3416C10.5027 5.01687 10.5016 4.48923 10.8263 4.16309C11.151 3.83695 11.6787 3.83582 12.0048 4.16055L17.0465 9.18055C17.2035 9.33693 17.2918 9.54942 17.2918 9.77104C17.2918 9.99267 17.2036 10.2052 17.0465 10.3616L12.0049 15.3824C11.6788 15.7071 11.1511 15.7061 10.8264 15.3799Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div
              className="faqs-wrapper home-faqs-wrapper"
              data-react-accordion={singleOpen ? '' : undefined}
            >
              <div
                data-hover="false"
                data-delay="0"
                data-reveal=""
                className="faqs-dropdown site-dropdown"
              >
                <Question className="faqs-question site-dropdown-toggle" {...questionProps(0)}>
                  <QuestionBlock className="faqs-question-block">
                    <QuestionText className="faqs-question-text">
                      {'What types of security services do you offer?'}
                    </QuestionText>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      viewBox="0 0 30 30"
                      fill="none"
                      className="faqs-arrow-icon"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M15.3429 4.6875C16.0333 4.6875 16.5929 5.24714 16.5929 5.9375V24.6875C16.5929 25.3779 16.0333 25.9375 15.3429 25.9375C14.6525 25.9375 14.0929 25.3779 14.0929 24.6875V5.9375C14.0929 5.24714 14.6525 4.6875 15.3429 4.6875Z"
                        fill="currentColor"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.93008 16.2393C7.41925 15.7521 8.2107 15.7538 8.69785 16.2429L15.3433 22.916L21.9876 16.243C22.4747 15.7538 23.2662 15.7521 23.7554 16.2392C24.2446 16.7263 24.2463 17.5178 23.7592 18.007L16.2292 25.5695C15.9946 25.8051 15.6759 25.9375 15.3434 25.9375C15.011 25.9375 14.6923 25.8051 14.4577 25.5696L6.92642 18.0071C6.43928 17.5179 6.44092 16.7264 6.93008 16.2393Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </QuestionBlock>
                </Question>
                <Answer className="faqs-answer site-dropdown-list" {...answerProps(0)}>
                  <div className={singleOpen ? styles.answerInner : undefined}>
                    <div className="faqs-answer-text">
                      {
                        'We provide trained security personnel for hotels, banks, corporate offices, industrial units, commercial buildings and residential apartments.'
                      }
                    </div>
                  </div>
                </Answer>
              </div>
              <div
                data-hover="false"
                data-delay="0"
                data-reveal=""
                className="faqs-dropdown site-dropdown"
              >
                <Question className="faqs-question site-dropdown-toggle" {...questionProps(1)}>
                  <QuestionBlock className="faqs-question-block">
                    <QuestionText className="faqs-question-text">
                      {'How do I determine the right security service for my needs?'}
                    </QuestionText>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      viewBox="0 0 30 30"
                      fill="none"
                      className="faqs-arrow-icon"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M15.3429 4.6875C16.0333 4.6875 16.5929 5.24714 16.5929 5.9375V24.6875C16.5929 25.3779 16.0333 25.9375 15.3429 25.9375C14.6525 25.9375 14.0929 25.3779 14.0929 24.6875V5.9375C14.0929 5.24714 14.6525 4.6875 15.3429 4.6875Z"
                        fill="currentColor"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.93008 16.2393C7.41925 15.7521 8.2107 15.7538 8.69785 16.2429L15.3433 22.916L21.9876 16.243C22.4747 15.7538 23.2662 15.7521 23.7554 16.2392C24.2446 16.7263 24.2463 17.5178 23.7592 18.007L16.2292 25.5695C15.9946 25.8051 15.6759 25.9375 15.3434 25.9375C15.011 25.9375 14.6923 25.8051 14.4577 25.5696L6.92642 18.0071C6.43928 17.5179 6.44092 16.7264 6.93008 16.2393Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </QuestionBlock>
                </Question>
                <Answer className="faqs-answer site-dropdown-list" {...answerProps(1)}>
                  <div className={singleOpen ? styles.answerInner : undefined}>
                    <div className="faqs-answer-text">
                      {
                        'Share your location, premises type and security requirements. Our approach focuses on personnel and practices suited to each location.'
                      }
                    </div>
                  </div>
                </Answer>
              </div>
              <div
                data-hover="false"
                data-delay="0"
                data-reveal=""
                className="faqs-dropdown site-dropdown"
              >
                <Question className="faqs-question site-dropdown-toggle" {...questionProps(2)}>
                  <QuestionBlock className="faqs-question-block">
                    <QuestionText className="faqs-question-text">
                      {'How are your security personnel prepared?'}
                    </QuestionText>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      viewBox="0 0 30 30"
                      fill="none"
                      className="faqs-arrow-icon"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M15.3429 4.6875C16.0333 4.6875 16.5929 5.24714 16.5929 5.9375V24.6875C16.5929 25.3779 16.0333 25.9375 15.3429 25.9375C14.6525 25.9375 14.0929 25.3779 14.0929 24.6875V5.9375C14.0929 5.24714 14.6525 4.6875 15.3429 4.6875Z"
                        fill="currentColor"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.93008 16.2393C7.41925 15.7521 8.2107 15.7538 8.69785 16.2429L15.3433 22.916L21.9876 16.243C22.4747 15.7538 23.2662 15.7521 23.7554 16.2392C24.2446 16.7263 24.2463 17.5178 23.7592 18.007L16.2292 25.5695C15.9946 25.8051 15.6759 25.9375 15.3434 25.9375C15.011 25.9375 14.6923 25.8051 14.4577 25.5696L6.92642 18.0071C6.43928 17.5179 6.44092 16.7264 6.93008 16.2393Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </QuestionBlock>
                </Question>
                <Answer className="faqs-answer site-dropdown-list" {...answerProps(2)}>
                  <div className={singleOpen ? styles.answerInner : undefined}>
                    <div className="faqs-answer-text">
                      {
                        'Our personnel are selected and trained to maintain a safe environment and conduct themselves with professionalism and courtesy.'
                      }
                    </div>
                  </div>
                </Answer>
              </div>
              <div
                data-hover="false"
                data-delay="0"
                data-reveal=""
                className="faqs-dropdown site-dropdown"
              >
                <Question className="faqs-question site-dropdown-toggle" {...questionProps(3)}>
                  <QuestionBlock className="faqs-question-block">
                    <QuestionText className="faqs-question-text">
                      {'Who manages your security operations?'}
                    </QuestionText>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      viewBox="0 0 30 30"
                      fill="none"
                      className="faqs-arrow-icon"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M15.3429 4.6875C16.0333 4.6875 16.5929 5.24714 16.5929 5.9375V24.6875C16.5929 25.3779 16.0333 25.9375 15.3429 25.9375C14.6525 25.9375 14.0929 25.3779 14.0929 24.6875V5.9375C14.0929 5.24714 14.6525 4.6875 15.3429 4.6875Z"
                        fill="currentColor"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.93008 16.2393C7.41925 15.7521 8.2107 15.7538 8.69785 16.2429L15.3433 22.916L21.9876 16.243C22.4747 15.7538 23.2662 15.7521 23.7554 16.2392C24.2446 16.7263 24.2463 17.5178 23.7592 18.007L16.2292 25.5695C15.9946 25.8051 15.6759 25.9375 15.3434 25.9375C15.011 25.9375 14.6923 25.8051 14.4577 25.5696L6.92642 18.0071C6.43928 17.5179 6.44092 16.7264 6.93008 16.2393Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </QuestionBlock>
                </Question>
                <Answer className="faqs-answer site-dropdown-list" {...answerProps(3)}>
                  <div className={singleOpen ? styles.answerInner : undefined}>
                    <div className="faqs-answer-text">
                      {
                        'Our organisation is managed by experienced and trained Ex-Army personnel, bringing military discipline, alertness, responsibility and leadership.'
                      }
                    </div>
                  </div>
                </Answer>
              </div>
              <div
                data-hover="false"
                data-delay="0"
                data-reveal=""
                className="faqs-dropdown site-dropdown"
              >
                <Question className="faqs-question site-dropdown-toggle" {...questionProps(4)}>
                  <QuestionBlock className="faqs-question-block">
                    <QuestionText className="faqs-question-text">
                      {'How can I discuss security coverage and pricing?'}
                    </QuestionText>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      viewBox="0 0 30 30"
                      fill="none"
                      className="faqs-arrow-icon"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M15.3429 4.6875C16.0333 4.6875 16.5929 5.24714 16.5929 5.9375V24.6875C16.5929 25.3779 16.0333 25.9375 15.3429 25.9375C14.6525 25.9375 14.0929 25.3779 14.0929 24.6875V5.9375C14.0929 5.24714 14.6525 4.6875 15.3429 4.6875Z"
                        fill="currentColor"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.93008 16.2393C7.41925 15.7521 8.2107 15.7538 8.69785 16.2429L15.3433 22.916L21.9876 16.243C22.4747 15.7538 23.2662 15.7521 23.7554 16.2392C24.2446 16.7263 24.2463 17.5178 23.7592 18.007L16.2292 25.5695C15.9946 25.8051 15.6759 25.9375 15.3434 25.9375C15.011 25.9375 14.6923 25.8051 14.4577 25.5696L6.92642 18.0071C6.43928 17.5179 6.44092 16.7264 6.93008 16.2393Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </QuestionBlock>
                </Question>
                <Answer className="faqs-answer site-dropdown-list" {...answerProps(4)}>
                  <div className={singleOpen ? styles.answerInner : undefined}>
                    <div className="faqs-answer-text">
                      {
                        'Call +91 72595 37223 or email hitechprotectionsecurity@gmail.com with your location and requirements to discuss your assignment.'
                      }
                    </div>
                  </div>
                </Answer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
