// Performance optimization utilities

// Preload critical images
export const preloadCriticalImages = () => {
  const criticalImages = [
    '/herobg.png',
    '/logo.png',
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

// Optimize image loading with WebP support
export const getOptimizedImageSrc = (src, fallback) => {
  // Check if WebP is supported
  const supportsWebP = (() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').startsWith('data:image/webp');
  })();

  if (supportsWebP && src.endsWith('.png')) {
    const webpSrc = src.replace('.png', '.webp');
    return webpSrc;
  }
  
  return fallback || src;
};

// Intersection Observer for lazy loading
export const createIntersectionObserver = (callback, options = {}) => {
  const defaultOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  };

  return new IntersectionObserver(callback, defaultOptions);
};

// Debounced resize handler
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Performance monitoring
export const measurePerformance = (name, fn) => {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  console.log(`${name} took ${end - start} milliseconds`);
  return result;
};

// Device capability detection
export const getDeviceCapabilities = () => {
  const capabilities = {
    cores: navigator.hardwareConcurrency || 4,
    memory: navigator.deviceMemory || 4,
    connection: navigator.connection?.effectiveType || '4g',
    isMobile: /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isLowEnd: false
  };

  // Determine if device is low-end
  capabilities.isLowEnd = capabilities.cores <= 2 || 
                         capabilities.memory <= 2 || 
                         ['slow-2g', '2g', '3g'].includes(capabilities.connection);

  return capabilities;
};

// Adaptive quality settings based on device
export const getAdaptiveSettings = () => {
  const capabilities = getDeviceCapabilities();
  
  return {
    particleCount: capabilities.isLowEnd ? 1000 : capabilities.isMobile ? 2000 : 4000,
    shadowQuality: capabilities.isLowEnd ? 'none' : capabilities.isMobile ? 'low' : 'high',
    textureQuality: capabilities.isLowEnd ? 0.5 : capabilities.isMobile ? 0.75 : 1,
    enableAntialiasing: !capabilities.isLowEnd && !capabilities.isMobile,
    maxFPS: capabilities.isLowEnd ? 30 : 60,
    enableAnimations: !capabilities.isLowEnd
  };
}; 