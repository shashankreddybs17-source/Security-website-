import {
  HomeServicesShowcase,
  HomeWhoWeAre,
  HomeWhyChooseUs,
  HomeWorkGallery,
} from '../components/HomeEnhancements';
import HomeCompanyStatistics from '../components/HomeCompanyStatistics';
import HomeCredentialsSection from '../components/HomeCredentialsSection';
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
    <>
      <main className="main-wrapper">
        <HomeMarqueeSection />
        <HomeHomeAboutSection />
        <HomeServicesShowcase />
        <HomeWhoWeAre />
        <HomeCompanyStatistics />
        <HomeCredentialsSection />
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
    </>
  );
}
