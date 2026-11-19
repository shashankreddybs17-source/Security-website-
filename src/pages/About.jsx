import AboutHeroSection from '../components/AboutHeroSection';
import AboutAboutSection from '../components/AboutAboutSection';
import AboutTrainingSection from '../components/AboutTrainingSection';
import AboutApproachSection from '../components/AboutApproachSection';
import AboutStorySection from '../components/AboutStorySection';
import AboutGallerySection from '../components/AboutGallerySection';
import AboutCommonFaqsSection from '../components/AboutCommonFaqsSection';
import HomeCtaSection from '../components/HomeCtaSection';
import AboutFooterSection from '../components/AboutFooterSection';
import { useAfterFirstPaint } from '../hooks/useAfterFirstPaint';

export default function About() {
  const contentReady = useAfterFirstPaint();
  return (
    <div className="page-wrapper">
      <main className="main-wrapper">
        <AboutHeroSection readableCaption />
        {contentReady ? (
          <>
            <AboutAboutSection />
            <AboutTrainingSection />
            <AboutApproachSection />
            <AboutStorySection />
            <AboutGallerySection />
            <AboutCommonFaqsSection />
            <HomeCtaSection />
          </>
        ) : (
          <div aria-busy="true" aria-label="Loading page" style={{ minHeight: '100vh' }} />
        )}
      </main>
      {contentReady && <AboutFooterSection />}
    </div>
  );
}
