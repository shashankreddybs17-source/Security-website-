import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { X } from 'lucide-react';
import SiteNavbar from './components/SiteNavbar';
import FloatingContactButtons from './components/FloatingContactButtons';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Faq from './pages/Faq';
import Services from './pages/Services';
import { initializePageScroll } from './lib/pageNavigation';
import { cleanPageUrl } from './lib/cleanPageUrl';
import Blog from './pages/Blog';
import { blogPosts } from './data/blogPosts';
import metadata from '../reference-metadata.json';
import { loadInteractions } from './lib/interactions';
import './styles/fonts.css';
import './styles/reference.css';
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
const page = metadata[isAbout || isContact || isFaq ? 'about' : 'home'];
document.documentElement.setAttribute('data-wf-page', page.pageId);
document.documentElement.setAttribute('data-wf-site', page.siteId);
document.documentElement.classList.add('w-mod-js');
if ('ontouchstart' in window) document.documentElement.classList.add('w-mod-touch');

document.title = `${isServices ? 'Services | ' : isFaq ? 'FAQ | ' : isBlog ? `${currentPost ? currentPost.title : 'Blog'} | ` : isContact ? 'Contact Us | ' : isAbout ? 'About Us | ' : ''}Hi-Tech Protection Security`;

function App() {
  const [notice, setNotice] = useState('');
  useEffect(() => {
    loadInteractions(page.scripts).catch((error) => {
      console.error(error);
      document.documentElement.classList.add('animation-fallback');
    });
    // This two-page frontend has no mailing-list backend. Prevent reference
    // form handlers from sending visitor data to the template owner.
    const submit = (event) => {
      if (!(event.target instanceof HTMLFormElement)) return;
      if (event.target.dataset.contactEnquiry === 'true') return;
      event.preventDefault();
      event.stopImmediatePropagation();
      setNotice('Preview only — newsletter signup is not connected yet.');
    };
    document.addEventListener('submit', submit, true);
    return () => document.removeEventListener('submit', submit, true);
  }, []);
  return (
    <>
      <SiteNavbar />
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
