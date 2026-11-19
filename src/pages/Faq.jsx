import AboutHeroSection from '../components/AboutHeroSection';
import AboutCommonFaqsSection from '../components/AboutCommonFaqsSection';
import AboutFooterSection from '../components/AboutFooterSection';
import { useAfterFirstPaint } from '../hooks/useAfterFirstPaint';

export default function Faq() {
  const contentReady = useAfterFirstPaint();
  return (
    <div className="page-wrapper">
      <main className="main-wrapper">
        <AboutHeroSection
          title="Frequently Asked Questions"
          image="/assets/hitech/new-uniform/november-2026/faq-briefing-guards-short-sleeves.webp"
          imageAlt="Hi-Tech guards in short-sleeved grey uniforms attending an outdoor briefing"
        />
        {contentReady ? (
          <AboutCommonFaqsSection singleOpen />
        ) : (
          <div aria-busy="true" aria-label="Loading page" style={{ minHeight: '100vh' }} />
        )}
      </main>
      {contentReady && <AboutFooterSection />}
    </div>
  );
}
