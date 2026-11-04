import AboutHeroSection from '../components/AboutHeroSection';
import AboutCommonFaqsSection from '../components/AboutCommonFaqsSection';
import AboutFooterSection from '../components/AboutFooterSection';

export default function Faq() {
  return (
    <div className="page-wrapper">
      <main className="main-wrapper">
        <AboutHeroSection
          title="Frequently Asked Questions"
          image="/assets/hitech/new-uniform/faq-uniform-banner.webp"
          imageAlt="Hi-Tech security guards receiving a corporate safety briefing"
        />
        <AboutCommonFaqsSection />
      </main>
      <AboutFooterSection />
    </div>
  );
}
