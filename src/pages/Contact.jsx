import ContactEnquirySection from '../components/ContactEnquirySection';
import { Phone, Mail, MapPin, ArrowUpRight, Clock, ShieldCheck, Navigation } from 'lucide-react';
import AboutHeroSection from '../components/AboutHeroSection';
import AboutFooterSection from '../components/AboutFooterSection';
import styles from './Contact.module.css';

const officeAddress =
  'No. 28, Shop No. 2, 3rd Cross, Vinayaka Nagar, JP Nagar 5th Phase, Bengaluru - 560 078';
// Verified from the Google Maps embed supplied by the office owner. Use the
// place ID for both actions so Google does not geocode the written address.
const officeQuery = encodeURIComponent('12.9136062,77.5911957');
const officePlaceId = 'ChIJX2VQMaEVrjsRIoH9kk11Nf4';
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${officeQuery}&query_place_id=${officePlaceId}`;
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${officeQuery}&destination_place_id=${officePlaceId}`;
const mapEmbedUrl =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4501.613969393963!2d77.58862077563006!3d12.913611416145393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15a13150655f%3A0xfe35754d92fd8122!2s3rd%20Cross%20Rd%2C%201489%2C%2017th%20A%20Main%20Road%2C%20Marenahalli%2C%202nd%20Phase%2C%20J.%20P.%20Nagar%2C%20Bengaluru%2C%20Karnataka%20560041!5e1!3m2!1sen!2sin!4v1793769946513!5m2!1sen!2sin';

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
                  src="/assets/hitech/new-uniform/converted-old-07.webp"
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
                  title="Hi-Tech Protection Security office location supplied by the owner"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
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
