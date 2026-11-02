import {
  HomeServicesShowcase,
  HomeWhoWeAre,
  HomeWhyChooseUs,
  HomeWorkGallery,
} from '../components/HomeEnhancements';
import HomeHeaderHeroSection from '../components/HomeHeaderHeroSection';
import HomeMarqueeSection from '../components/HomeMarqueeSection';
import HomeHomeAboutSection from '../components/HomeHomeAboutSection';
import HomeSecuritySolutions from '../components/HomeSecuritySolutions';
import HomePartnersSection from '../components/HomePartnersSection';
import HomeTeamSection from '../components/HomeTeamSection';

import HomeHomeBlogSection from '../components/HomeHomeBlogSection';
import HomeCommonFaqsSection from '../components/HomeCommonFaqsSection';
import HomeCtaSection from '../components/HomeCtaSection';
import HomeFooterSection from '../components/HomeFooterSection';

export default function Home() {
  return (
    <div className="page-wrapper">
      <HomeHeaderHeroSection />
      <main className="main-wrapper">
        <HomeMarqueeSection />
        <HomeHomeAboutSection />
        <HomeServicesShowcase />
        <HomeWhoWeAre />
        <HomeWhyChooseUs />
        <HomeSecuritySolutions />
        <HomeWorkGallery />
        <HomePartnersSection />
        <HomeTeamSection />
        <HomeHomeBlogSection />
        <HomeCommonFaqsSection />
        <HomeCtaSection />
      </main>
      <HomeFooterSection />
    </div>
  );
}
