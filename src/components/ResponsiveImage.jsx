import images from '../data/responsiveImages.json';
import descriptions from '../data/imageDescriptions.json';

// Keep explicit hero priorities; defer other images and let the browser choose a size.
export default function ResponsiveImage({
  src,
  srcSet,
  sizes,
  loading = 'lazy',
  decoding = 'async',
  width,
  height,
  alt,
  ...props
}) {
  const image = images[src];
  const candidates = image?.variants.length
    ? [
        ...image.variants.map((item) => `${item.src} ${item.width}w`),
        `${src} ${image.width}w`,
      ].join(', ')
    : undefined;
  return (
    <img
      {...props}
      style={
        image?.objectPosition
          ? { objectPosition: image.objectPosition, ...props.style }
          : props.style
      }
      src={src}
      alt={alt === '' ? '' : descriptions[src] || alt || ''}
      srcSet={srcSet || candidates}
      sizes={sizes || (candidates ? '(max-width: 767px) 100vw, 50vw' : undefined)}
      loading={loading}
      decoding={decoding}
      width={width || image?.width}
      height={height || image?.height}
    />
  );
}
