import React, { lazy, Suspense, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { X } from 'lucide-react';
import SiteNavbar from './components/SiteNavbar';
import FloatingContactButtons from './components/FloatingContactButtons';
import Home from './pages/Home';
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Faq = lazy(() => import('./pages/Faq'));
const Services = lazy(() => import('./pages/Services'));
import { initializePageScroll } from './lib/pageNavigation';
import { cleanPageUrl } from './lib/cleanPageUrl';
const Blog = lazy(() => import('./pages/Blog'));
import { blogPosts } from './data/blogPosts';
import { initializeInteractions } from './lib/interactions';
import './styles/fonts.css';
import './styles/base.css';
import './styles/app.css';
import './styles/layout.css';
import './styles/theme.css';

const cleanUrl = cleanPageUrl(location.pathname, location.search, location.hash);
if (cleanUrl) window.history.replaceState(window.history.state, '', cleanUrl);

initializePageScroll(window);

const isServices = /^\/services\/?$/.test(location.pathname);
const isAbout = /^\/about-us\/?$/.test(location.pathname);
const isContact = /^\/contact(?:-us)?\/?$/.test(location.pathname);
const blogMatch = location.pathname.match(/^\/blog(?:\/([^/]+))?\/?$/);
const isBlog = Boolean(blogMatch);
const blogSlug = blogMatch?.[1];
const currentPost = blogPosts.find((post) => post.slug === blogSlug);
const isFaq = /^\/faqs?\/?$/.test(location.pathname);
document.title = `${isServices ? 'Services | ' : isFaq ? 'FAQ | ' : isBlog ? `${currentPost ? currentPost.title : 'Blog'} | ` : isContact ? 'Contact Us | ' : isAbout ? 'About Us | ' : ''}Hi-Tech Protection Security`;

function App() {
  const [notice, setNotice] = useState('');
  useEffect(() => {
    const disposeInteractions = initializeInteractions();
    // Only the dedicated enquiry form is connected to the contact flow.
    const submit = (event) => {
      if (!(event.target instanceof HTMLFormElement)) return;
      if (event.target.dataset.contactEnquiry === 'true') return;
      event.preventDefault();
      event.stopImmediatePropagation();
      setNotice('Preview only — newsletter signup is not connected yet.');
    };
    document.addEventListener('submit', submit, true);
    return () => {
      disposeInteractions();
      document.removeEventListener('submit', submit, true);
    };
  }, []);
  return (
    <>
      <SiteNavbar />
      <Suspense
        fallback={<div aria-busy="true" aria-label="Loading page" style={{ minHeight: '100vh' }} />}
      >
        {isServices ? (
          <Services />
        ) : isFaq ? (
          <Faq />
        ) : isBlog ? (
          <Blog slug={blogSlug} />
        ) : isContact ? (
          <Contact />
        ) : isAbout ? (
          <About />
        ) : (
          <Home />
        )}
      </Suspense>
      <FloatingContactButtons />
      {notice && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-[10000] flex w-[min(92vw,480px)] -translate-x-1/2 items-center gap-4 rounded-xl bg-[#080818] px-5 py-4 text-white shadow-2xl"
        >
          <span>{notice}</span>
          <button aria-label="Dismiss notice" onClick={() => setNotice('')}>
            <X size={20} />
          </button>
        </div>
      )}
    </>
  );
}
createRoot(document.getElementById('root')).render(<App />);
