import AboutHeroSection from '../components/AboutHeroSection';
import AboutAboutSection from '../components/AboutAboutSection';
import AboutTrainingSection from '../components/AboutTrainingSection';
import AboutApproachSection from '../components/AboutApproachSection';
import AboutStorySection from '../components/AboutStorySection';
import AboutGallerySection from '../components/AboutGallerySection';
import AboutCommonFaqsSection from '../components/AboutCommonFaqsSection';
import HomeCtaSection from '../components/HomeCtaSection';
import AboutFooterSection from '../components/AboutFooterSection';

export default function About() {
  return (
    <div className="page-wrapper">
      <main className="main-wrapper">
        <AboutHeroSection />
        <AboutAboutSection />
        <AboutTrainingSection />
        <AboutApproachSection />
        <AboutStorySection />
        <AboutGallerySection />
        <AboutCommonFaqsSection />
        <HomeCtaSection />
      </main>
      <AboutFooterSection />
    </div>
  );
}
