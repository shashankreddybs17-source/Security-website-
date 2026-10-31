import AboutFooterSection from '../components/AboutFooterSection';
import HomeHomeBlogSection from '../components/HomeHomeBlogSection';
import { blogPosts } from '../data/blogPosts';
import styles from './Blog.module.css';

export default function Blog({ slug }) {
  const post = blogPosts.find((item) => item.slug === slug);
  return (
    <div className="page-wrapper">
      <main className="main-wrapper">
        <section className={styles.banner}>
          <div className="container-default w-container">
            <p className={styles.breadcrumb}>
              <a href="/">Home</a> / {post ? <a href="/blog">Blog</a> : 'Blog'}
            </p>
            <h1>{post ? post.title : 'Blog'}</h1>
            <p>
              {post
                ? 'Draft — Demo Content'
                : 'Security insights and updates from Hi-Tech Protection Security.'}
            </p>
          </div>
        </section>
        {post ? (
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
        ) : (
          <HomeHomeBlogSection />
        )}
      </main>
      <AboutFooterSection />
    </div>
  );
}
