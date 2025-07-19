import React, { useState, useRef, useEffect } from 'react';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  loading = 'lazy',
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src); // Start with actual src
  const imgRef = useRef(null);

  useEffect(() => {
    // Set the image source immediately
    setImageSrc(src);
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    setHasError(true);
  };

  if (hasError) {
    return (
      <div 
        className={`bg-gray-800 flex items-center justify-center ${className}`}
        style={{ minHeight: '200px', ...props.style }}
      >
        <div className="text-gray-400 text-sm">Image not found</div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      {/* Show loading placeholder while image loads */}
      {!isLoaded && (
        <div 
          className={`absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center ${className}`}
        >
          <svg 
            className="w-8 h-8 text-gray-600" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
      )}
      
      {/* Actual image */}
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        onLoad={handleLoad}
        onError={handleError}
        loading={loading}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage; 