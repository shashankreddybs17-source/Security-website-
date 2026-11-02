import { ArrowUpRight } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import { BlogArticleCard, BlogFeaturedArticle } from './BlogListing';
import styles from './BlogListing.module.css';

export default function HomeHomeBlogSection() {
  return (
    <section
      id="blog"
      className={`home-blog-section ${styles.page} ${styles.preview}`}
      aria-labelledby="home-journal-title"
    >
      <div className={styles.container}>
        <header className={styles.previewHeader}>
          <p className={styles.eyebrow}>
            <span aria-hidden="true" />
            THE HI-TECH JOURNAL
          </p>
          <h2 id="home-journal-title">Your Security Resource</h2>
          <p className={styles.intro}>
            Security insights and updates from Hi-Tech Protection Security.
          </p>
        </header>
        <BlogFeaturedArticle
          post={blogPosts[0]}
          headingAs="h3"
          headingId="home-featured-article-title"
          loading="lazy"
        />
        <div className={`${styles.grid} ${styles.previewGrid}`}>
          {blogPosts.map((post) => (
            <BlogArticleCard post={post} key={post.slug} />
          ))}
        </div>
        <div className={styles.previewAction}>
          <a className={styles.readButton} href="/blog">
            View all articles
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
