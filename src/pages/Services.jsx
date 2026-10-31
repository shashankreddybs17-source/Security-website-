import AboutFooterSection from '../components/AboutFooterSection';
import HomeHomeServicesSection from '../components/HomeHomeServicesSection';
import HomeCtaSection from '../components/HomeCtaSection';
import styles from './Blog.module.css';

export default function Services() {
  return (
    <div className="page-wrapper">
      <main className="main-wrapper">
        <section className={styles.banner}>
          <div className="container-default w-container">
            <p className={styles.breadcrumb}>
              <a href="/">Home</a> / Services
            </p>
            <h1>Our Services</h1>
            <p>
              Professional security coverage for businesses, institutions and residential
              communities.
            </p>
          </div>
        </section>
        <HomeHomeServicesSection />
        <HomeCtaSection />
      </main>
      <AboutFooterSection />
    </div>
  );
}
