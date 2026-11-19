import ResponsiveImage from './ResponsiveImage';

// Certification is included in the supplied artwork, so it must not be repeated as text.
export default function BrandLogo({ className = '', ...props }) {
  return (
    <ResponsiveImage
      {...props}
      src="/assets/hitech/hi-tech-certified-logo.webp"
      width="1235"
      height="503"
      className={`site-brand-logo ${className}`}
      alt="Hi-Tech Protection Security — An ISO 9001:2015 Certified Company"
    />
  );
}
