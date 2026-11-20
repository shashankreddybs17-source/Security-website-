import ResponsiveImage from './ResponsiveImage';
import { useState } from 'react';
import { Headphones, ArrowUpRight } from 'lucide-react';
import styles from './ContactEnquirySection.module.css';
import { allServices } from '../data/services';
import toast from 'react-hot-toast';

const services = [...allServices.map((service) => service.title), 'Help me choose'];
const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  service: '',
};

export default function ContactEnquirySection() {
  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    if (!formData.phone.trim()) errors.phone = 'Phone is required';
    if (!formData.service) errors.service = 'Service is required';
    return errors;
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isLoading) return;

    const formErrors = validateForm();
    const firstError = Object.values(formErrors)[0];

    if (firstError) {
      toast.error(firstError, { id: 'enquiry-validation' });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://htpsecurity.in/forms/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
        }),
      });

      if (!response.ok) {
        toast.error('Could not send your enquiry. Please try again.');
        return;
      }

      const data = await response.json();

      if (data.status !== 'success') {
        toast.error(data.message || 'Could not send your enquiry. Please try again.');
        return;
      }

      setFormData(initialFormData);
      toast.success('Your enquiry was sent successfully.');
    } catch (error) {
      console.error('Failed to submit enquiry:', error);
      toast.error('Could not send your enquiry. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.section} aria-labelledby="contact-enquiry-title">
      <div className="container-default site-container">
        <div className={styles.panel}>
          <figure className={styles.photo}>
            <ResponsiveImage
              src="/assets/hitech/new-uniform/november-2026/residential-security.webp"
              alt="Hi-Tech guard on duty outside a residential apartment building"
              loading="eager"
              width="4284"
              height="5712"
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
            <form className={styles.form} data-contact-enquiry="true" onSubmit={handleSubmit}>
              <div className={styles.fieldRow}>
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
                    value={formData.firstName}
                    onChange={handleInputChange}
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
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className={styles.fieldRow}>
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
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </label>
                <label htmlFor="enquiry-phone">
                  Phone number <span>*</span>
                  <input
                    id="enquiry-phone"
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    placeholder="Phone number"
                    required
                    maxLength={40}
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <label htmlFor="enquiry-service">
                Service <span>*</span>
                <select
                  id="enquiry-service"
                  name="service"
                  defaultValue=""
                  required
                  value={formData.service}
                  onChange={handleInputChange}
                >
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
              <button type="submit" className={styles.submit} disabled={isLoading}>
                {isLoading ? 'Submitting...' : 'Send enquiry'}{' '}
                <ArrowUpRight size={19} aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
