import { useState } from 'react';
import { Headphones, ArrowUpRight, Download } from 'lucide-react';
import styles from './ContactEnquirySection.module.css';

const services = [
  'Hotel Security',
  'Bank Security',
  'Corporate Office Security',
  'Industrial Security',
  'Commercial Security',
  'Residential Security',
  'Help me choose',
];
const contactEmail = 'hitechprotectionsecurity@gmail.com';

export default function ContactEnquirySection() {
  const [draft, setDraft] = useState('');
  function prepareEnquiry(event) {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    const data = new FormData(form);
    const firstName = String(data.get('firstName')).trim();
    const lastName = String(data.get('lastName')).trim();
    if (!firstName || !lastName) {
      const field = form.elements.namedItem(!firstName ? 'firstName' : 'lastName');
      field.setCustomValidity('Please enter your name.');
      field.reportValidity();
      return;
    }
    const email = String(data.get('email')).trim();
    const service = String(data.get('service'));
    const body = `Hello Hi-Tech Protection Security,\n\nI would like to discuss ${service.toLowerCase()}.\n\nName: ${firstName} ${lastName}\nEmail: ${email}\nService: ${service}\n\nLocation / premises: \nPreferred coverage hours: \nAnticipated start date: \nAdditional requirements: \n\nThank you,\n${firstName} ${lastName}`;
    setDraft(body);
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(`Security enquiry — ${service}`)}&body=${encodeURIComponent(body)}`;
  }
  function downloadEnquiry() {
    const url = URL.createObjectURL(new Blob([draft], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'hi-tech-security-enquiry.txt';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <section className={styles.section} aria-labelledby="contact-enquiry-title">
      <div className="container-default w-container">
        <div className={styles.panel}>
          <figure className={styles.photo}>
            <img
              src="/assets/hitech/team-23.jpeg"
              alt="Hi-Tech Protection Security officer in uniform"
              loading="eager"
              width="1200"
              height="1600"
            />
          </figure>
          <div className={styles.formPanel}>
            <p className={styles.label}>
              <Headphones size={16} aria-hidden="true" /> CONTACT HI-TECH
            </p>
            <h2 id="contact-enquiry-title">
              Your security starts
              <br />
              with a conversation.
            </h2>
            <p className={styles.intro}>
              Tell us what you’re looking for. Let’s discuss the protection that suits your
              premises.
            </p>
            <form className={styles.form} data-contact-enquiry="true" onSubmit={prepareEnquiry}>
              <div className={styles.names}>
                <label htmlFor="enquiry-first-name">
                  First name <span>*</span>
                  <input
                    id="enquiry-first-name"
                    name="firstName"
                    autoComplete="given-name"
                    placeholder="First name"
                    required
                    maxLength={100}
                    onInput={(event) => event.currentTarget.setCustomValidity('')}
                  />
                </label>
                <label htmlFor="enquiry-last-name">
                  Last name <span>*</span>
                  <input
                    id="enquiry-last-name"
                    name="lastName"
                    autoComplete="family-name"
                    placeholder="Last name"
                    required
                    maxLength={100}
                    onInput={(event) => event.currentTarget.setCustomValidity('')}
                  />
                </label>
              </div>
              <label htmlFor="enquiry-email">
                Email address <span>*</span>
                <input
                  id="enquiry-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  required
                  maxLength={254}
                />
              </label>
              <label htmlFor="enquiry-service">
                Service <span>*</span>
                <select id="enquiry-service" name="service" defaultValue="" required>
                  <option value="" disabled>
                    Select a service
                  </option>
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </label>
              <button type="submit" className={styles.submit}>
                Prepare email enquiry <ArrowUpRight size={19} aria-hidden="true" />
              </button>
              <p className={styles.note}>
                Opens your email app with a draft. Review and send it to complete your enquiry.
              </p>
              {draft && (
                <div className={styles.status} role="status">
                  <p>
                    Your draft is prepared. It has not been sent. If your email app didn’t open,{' '}
                    <a href={`mailto:${contactEmail}`}>email us directly</a> or download the enquiry
                    below.
                  </p>
                  <button className={styles.download} type="button" onClick={downloadEnquiry}>
                    <Download size={15} aria-hidden="true" />
                    Download enquiry
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
