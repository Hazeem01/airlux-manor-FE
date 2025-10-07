import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  quality?: number;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  loading = 'lazy',
  sizes = '100vw',
  quality = 85,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  // Generate responsive image sources for different screen sizes
  const generateSrcSet = (baseSrc: string) => {
    const sizes = [320, 640, 768, 1024, 1280, 1536];
    return sizes
      .map(size => `${baseSrc}?w=${size}&q=${quality} ${size}w`)
      .join(', ');
  };

  if (hasError) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-500 text-sm">Image failed to load</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ width, height }}
        />
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : loading}
        sizes={sizes}
        srcSet={generateSrcSet(src)}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        style={{
          width: width ? `${width}px` : '100%',
          height: height ? `${height}px` : 'auto',
        }}
      />
    </div>
  );
};

export default OptimizedImage;
