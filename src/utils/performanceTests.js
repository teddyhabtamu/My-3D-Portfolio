// Performance Testing Utilities

export const runPerformanceTests = () => {
  const results = {
    device: getDeviceInfo(),
    performance: getPerformanceMetrics(),
    recommendations: getPerformanceRecommendations(),
    timestamp: new Date().toISOString()
  };

  console.group('🚀 Portfolio Performance Report');
  console.log('📱 Device Info:', results.device);
  console.log('📊 Performance Metrics:', results.performance);
  console.log('💡 Recommendations:', results.recommendations);
  console.groupEnd();

  return results;
};

export const getDeviceInfo = () => {
  return {
    cores: navigator.hardwareConcurrency || 'unknown',
    memory: navigator.deviceMemory || 'unknown',
    connection: navigator.connection?.effectiveType || 'unknown',
    userAgent: navigator.userAgent,
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight
    },
    pixelRatio: window.devicePixelRatio || 1,
    isMobile: /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isLowEnd: (navigator.hardwareConcurrency <= 2) || (navigator.deviceMemory <= 2)
  };
};

export const getPerformanceMetrics = () => {
  const navigation = performance.getEntriesByType('navigation')[0];
  const paint = performance.getEntriesByType('paint');
  
  return {
    domContentLoaded: navigation?.domContentLoadedEventEnd - navigation?.domContentLoadedEventStart || 0,
    loadComplete: navigation?.loadEventEnd - navigation?.loadEventStart || 0,
    firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
    firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
    memoryUsage: performance.memory ? {
      used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
      total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024),
      limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024)
    } : null
  };
};

export const getPerformanceRecommendations = () => {
  const device = getDeviceInfo();
  const recommendations = [];

  if (device.isLowEnd) {
    recommendations.push('✅ Low-end device detected - 3D optimizations active');
    recommendations.push('💡 Consider disabling complex animations');
  }

  if (device.isMobile) {
    recommendations.push('✅ Mobile device detected - mobile optimizations active');
    recommendations.push('💡 Reduced particle counts and simplified effects');
  }

  if (device.connection === 'slow-2g' || device.connection === '2g') {
    recommendations.push('⚠️ Slow connection detected');
    recommendations.push('💡 Consider showing static images instead of 3D');
  }

  if (device.cores <= 2) {
    recommendations.push('⚠️ Low CPU cores detected');
    recommendations.push('💡 Reduced frame rates and simplified rendering');
  }

  if (device.memory <= 2) {
    recommendations.push('⚠️ Low memory detected');
    recommendations.push('💡 Aggressive garbage collection recommended');
  }

  if (recommendations.length === 0) {
    recommendations.push('🎉 High-performance device - all features enabled!');
  }

  return recommendations;
};

// FPS Monitor
let frameCount = 0;
let lastTime = performance.now();
let fps = 0;

export const startFPSMonitor = (callback) => {
  const updateFPS = () => {
    frameCount++;
    const now = performance.now();
    
    if (now - lastTime >= 1000) {
      fps = Math.round((frameCount * 1000) / (now - lastTime));
      frameCount = 0;
      lastTime = now;
      
      if (callback) callback(fps);
    }
    
    requestAnimationFrame(updateFPS);
  };
  
  updateFPS();
  return fps;
};

// Performance observer for Core Web Vitals
export const setupPerformanceObserver = () => {
  if (!('PerformanceObserver' in window)) return;

  try {
    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('📏 LCP:', lastEntry.startTime, 'ms');
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        console.log('⚡ FID:', entry.processingStart - entry.startTime, 'ms');
      });
    });
    fidObserver.observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift
    const clsObserver = new PerformanceObserver((list) => {
      let clsValue = 0;
      list.getEntries().forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      if (clsValue > 0) {
        console.log('📐 CLS:', clsValue);
      }
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });

  } catch (e) {
    console.warn('Performance Observer not fully supported:', e);
  }
};

// Bundle size analysis
export const analyzeBundleSize = () => {
  const scripts = Array.from(document.querySelectorAll('script[src]'));
  const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
  
  console.group('📦 Bundle Analysis');
  console.log('Scripts loaded:', scripts.length);
  console.log('Stylesheets loaded:', styles.length);
  
  scripts.forEach((script, index) => {
    console.log(`Script ${index + 1}:`, script.src);
  });
  
  styles.forEach((style, index) => {
    console.log(`Stylesheet ${index + 1}:`, style.href);
  });
  console.groupEnd();
};

// Auto-run performance tests in development
if (process.env.NODE_ENV === 'development') {
  setTimeout(() => {
    runPerformanceTests();
    setupPerformanceObserver();
    analyzeBundleSize();
  }, 3000); // Wait for app to load
} 