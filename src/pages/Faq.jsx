import AboutHeroSection from '../components/AboutHeroSection';
import AboutCommonFaqsSection from '../components/AboutCommonFaqsSection';
import AboutFooterSection from '../components/AboutFooterSection';

export default function Faq() {
  return (
    <div className="page-wrapper">
      <main className="main-wrapper">
        <AboutHeroSection
          title="Frequently Asked Questions"
          image="/assets/hitech/new-uniform/november-2026/security-team-wide-briefing.webp"
          imageAlt="Hi-Tech security guards receiving a corporate safety briefing"
        />
        <AboutCommonFaqsSection singleOpen />
      </main>
      <AboutFooterSection />
    </div>
  );
}
