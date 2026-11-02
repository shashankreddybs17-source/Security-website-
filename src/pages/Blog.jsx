import AboutFooterSection from '../components/AboutFooterSection';
import BlogListing from '../components/BlogListing';
import { blogPosts } from '../data/blogPosts';
import styles from './Blog.module.css';

export default function Blog({ slug }) {
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) return <BlogListing />;
  return (
    <div className="page-wrapper">
      <main className="main-wrapper">
        <section className={styles.banner}>
          <div className="container-default w-container">
            <p className={styles.breadcrumb}>
              <a href="/">Home</a> / <a href="/blog">Blog</a>
            </p>
            <h1>{post.title}</h1>
            <p>Draft — Demo Content</p>
          </div>
        </section>
        <article className={styles.article}>
          <img src={post.image} alt="Hi-Tech Protection Security personnel and training" />
          <p className={styles.notice}>
            Demo article for preview. This content is awaiting client review.
          </p>
          {post.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className={styles.actions}>
            <a className="secondary-button w-inline-block" href="/blog">
              All articles
            </a>
            <a className="secondary-button w-inline-block" href="/contact-us">
              Discuss your requirements
            </a>
          </div>
        </article>
      </main>
      <AboutFooterSection />
    </div>
  );
}
