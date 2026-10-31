import ContactEnquirySection from '../components/ContactEnquirySection';
import { Phone, Mail, MapPin, ArrowUpRight, Clock, ShieldCheck, Navigation } from 'lucide-react';
import AboutHeroSection from '../components/AboutHeroSection';
import AboutFooterSection from '../components/AboutFooterSection';
import styles from './Contact.module.css';

const officeAddress =
  'No. 28, Shop No. 2, 3rd Cross, Vinayaka Nagar, JP Nagar 5th Phase, Bengaluru - 560 078';
const officeQuery = encodeURIComponent(officeAddress);
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${officeQuery}`;
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${officeQuery}`;
// Search the supplied address rather than inventing a business pin or coordinates.
const mapEmbedUrl = `https://maps.google.com/maps?q=${officeQuery}&z=16&output=embed`;

export default function Contact() {
  return (
    <div className="page-wrapper">
      <main className="main-wrapper">
        <AboutHeroSection title="Contact Us" />
        <ContactEnquirySection />
        <section className={styles.section} aria-labelledby="contact-title">
          <div className="container-default w-container">
            <div className={styles.intro}>
              <div>
                <p className={styles.eyebrow}>LET’S CONNECT</p>
                <h2 id="contact-title" className={styles.heading}>
                  The right protection
                  <br />
                  starts with a conversation.
                </h2>
              </div>
              <p className={styles.introText}>
                Have a question about coverage, your premises or a new security requirement? Reach
                our Bengaluru team using the contact details below.
              </p>
            </div>
            <div className={styles.detailsLayout}>
              <figure className={styles.companyPhoto}>
                <img
                  src="/assets/hitech/team-14.jpeg"
                  alt="Hi-Tech security personnel attending a team briefing"
                  width="1280"
                  height="960"
                  loading="lazy"
                />
                <figcaption>
                  <ShieldCheck size={22} aria-hidden="true" />
                  <span>
                    People. Discipline. Protection.<small>HI-TECH PROTECTION SECURITY</small>
                  </span>
                </figcaption>
              </figure>
              <div className={styles.methods}>
                <article className={styles.method}>
                  <MapPin className={styles.icon} aria-hidden="true" />
                  <div>
                    <h3>Our Bengaluru office</h3>
                    <address className={styles.detail}>
                      No. 28, Shop No. 2, 3rd Cross,
                      <br />
                      Vinayaka Nagar, JP Nagar 5th Phase,
                      <br />
                      Bengaluru - 560 078
                    </address>
                    <a
                      className={styles.textLink}
                      href={directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Get directions <ArrowUpRight size={15} aria-hidden="true" />
                    </a>
                  </div>
                </article>
                <article className={styles.method}>
                  <Phone className={styles.icon} aria-hidden="true" />
                  <div>
                    <h3>Speak with us</h3>
                    <p className={styles.meta}>Security enquiries</p>
                    <a className={styles.contactLink} href="tel:+917259537223">
                      +91 72595 37223
                    </a>
                    <p className={styles.supporting}>Discuss your site and preferred coverage.</p>
                  </div>
                </article>
                <article className={styles.method}>
                  <Mail className={styles.icon} aria-hidden="true" />
                  <div>
                    <h3>Send an email</h3>
                    <p className={styles.meta}>Enquiries & requirements</p>
                    <a
                      className={styles.emailLink}
                      href="mailto:hitechprotectionsecurity@gmail.com"
                    >
                      hitechprotectionsecurity@gmail.com
                    </a>
                  </div>
                </article>
                <article className={styles.method}>
                  <Clock className={styles.icon} aria-hidden="true" />
                  <div>
                    <h3>Before you visit</h3>
                    <p className={styles.detail}>
                      Call or email to confirm office availability and discuss your requirements
                      before travelling.
                    </p>
                  </div>
                </article>
              </div>
            </div>
            <p className={styles.note}>
              <ShieldCheck size={18} aria-hidden="true" />
              Include your location, type of premises, preferred coverage and anticipated start date
              for a focused discussion.
            </p>
            <div className={styles.location} aria-labelledby="office-location-title">
              <div className={styles.locationHeader}>
                <div>
                  <p className={styles.eyebrow}>FIND HI-TECH</p>
                  <h2 id="office-location-title">Visit our Bengaluru office.</h2>
                </div>
                <a
                  className={styles.mapButton}
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Navigation size={17} aria-hidden="true" />
                  Open in Maps <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              </div>
              <div className={styles.mapFrame}>
                <iframe
                  src={mapEmbedUrl}
                  title="Map of the Hi-Tech Protection Security office address in JP Nagar 5th Phase, Bengaluru"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <div className={styles.mapAddress}>
                <MapPin size={17} aria-hidden="true" />
                <span>{officeAddress}</span>
              </div>
            </div>
            <div className={styles.contactBanner}>
              <div>
                <p>YOUR PEOPLE. YOUR PROPERTY.</p>
                <h2>Let’s plan your protection.</h2>
              </div>
              <div className={styles.bannerActions}>
                <a href="tel:+917259537223">
                  <Phone size={21} aria-hidden="true" />
                  <span>
                    <small>CALL HI-TECH</small>+91 72595 37223
                  </span>
                </a>
                <a href="mailto:hitechprotectionsecurity@gmail.com">
                  <Mail size={21} aria-hidden="true" />
                  <span>
                    <small>EMAIL YOUR REQUIREMENTS</small>hitechprotectionsecurity@gmail.com
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <AboutFooterSection />
    </div>
  );
}
