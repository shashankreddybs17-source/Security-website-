import { useState } from 'react';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import SiteFooter from './SiteFooter';
import styles from './BlogListing.module.css';

const categories = {
  'preparing-your-workplace-for-security-coverage': 'Site Security',
  'the-role-of-discipline-in-site-security': 'Operations',
  'why-regular-safety-training-matters': 'Training',
};
const categoryFor = (post) => categories[post.slug] || 'Security Insights';
const readingTime = (post) =>
  Math.max(1, Math.ceil(post.paragraphs.join(' ').trim().split(/\s+/).length / 200));
const articleUrl = (post) => `/blog/${post.slug}`;

function Byline({ post }) {
  return (
    <div className={styles.byline}>
      <span className={styles.authorIcon}>
        <ShieldCheck size={18} aria-hidden="true" />
      </span>
      <div>
        <span className={styles.author}>HI-TECH team</span>
        <span className={styles.reading}>Draft &middot; {readingTime(post)} min read</span>
      </div>
    </div>
  );
}

export function BlogFeaturedArticle({
  post,
  headingAs: Heading = 'h2',
  headingId = 'featured-article-title',
  loading = 'eager',
}) {
  if (!post) return null;
  return (
    <article className={styles.featured} aria-labelledby={headingId}>
      <a href={articleUrl(post)} className={styles.featuredPhoto} aria-label={`Read ${post.title}`}>
        <img
          src={post.image}
          alt="HI-TECH personnel taking part in practical workplace safety training"
          width="1280"
          height="960"
          loading={loading}
        />
        <span className={styles.featuredBadge}>
          <span aria-hidden="true" />
          FEATURED ARTICLE
        </span>
      </a>
      <div className={styles.featuredContent}>
        <p className={styles.category}>{categoryFor(post)}</p>
        <Heading id={headingId} className={styles.featuredTitle}>
          <a href={articleUrl(post)}>{post.title}</a>
        </Heading>
        <p className={styles.excerpt}>{post.paragraphs[0]}</p>
        <div className={styles.featuredFooter}>
          <Byline post={post} />
          <a href={articleUrl(post)} className={styles.readButton}>
            Read article
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}

export function BlogArticleCard({ post }) {
  return (
    <article className={styles.card}>
      <a href={articleUrl(post)} className={styles.cardPhoto} aria-label={`Read ${post.title}`}>
        <img
          src={post.image}
          alt="HI-TECH Protection Security personnel during training and site briefings"
          width="1280"
          height="960"
          loading="lazy"
          decoding="async"
        />
        <span className={styles.cardBadge}>{categoryFor(post)}</span>
      </a>
      <div className={styles.cardContent}>
        <h3>
          <a href={articleUrl(post)}>{post.title}</a>
        </h3>
        <p className={styles.cardExcerpt}>{post.paragraphs[0]}</p>
        <div className={styles.cardFooter}>
          <Byline post={post} />
          <a href={articleUrl(post)} className={styles.cardArrow} aria-label={`Read ${post.title}`}>
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function BlogListing() {
  const [selected, setSelected] = useState('All');
  const featured = blogPosts[0];
  const filters = ['All', ...new Set(blogPosts.map(categoryFor))];
  const articles = blogPosts.filter((post) => selected === 'All' || categoryFor(post) === selected);
  return (
    <div className="page-wrapper">
      <main className={`main-wrapper ${styles.page}`}>
        <section className={styles.hero} aria-labelledby="journal-title">
          <div className={styles.container}>
            <p className={styles.eyebrow}>
              <span aria-hidden="true" />
              THE HI-TECH JOURNAL
            </p>
            <h1 id="journal-title">Security insights &amp; updates.</h1>
            <p className={styles.intro}>
              Security insights and updates from Hi-Tech Protection Security.
            </p>
          </div>
        </section>
        <section className={styles.journal} aria-label="Security articles">
          <div className={styles.container}>
            <BlogFeaturedArticle post={featured} />
            <div className={styles.filters} role="group" aria-label="Filter articles by category">
              {filters.map((category) => (
                <button
                  type="button"
                  key={category}
                  aria-pressed={selected === category}
                  aria-controls="journal-articles"
                  onClick={() => setSelected(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <h2 className={styles.srOnly} id="journal-articles-title">
              Browse security articles
            </h2>
            <p className={styles.srOnly} role="status" aria-live="polite">
              {articles.length} {articles.length === 1 ? 'article' : 'articles'}
              {selected === 'All' ? ' in all categories' : ` in ${selected}`}.
            </p>
            <div
              className={styles.grid}
              id="journal-articles"
              aria-labelledby="journal-articles-title"
            >
              {articles.map((post) => (
                <BlogArticleCard post={post} key={post.slug} />
              ))}
            </div>
            <p className={styles.articleCount}>
              Showing {articles.length} of {blogPosts.length} articles
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
