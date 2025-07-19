import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";
import { preloadCriticalImages } from "./utils/performance";
import { runPerformanceTests } from "./utils/performanceTests";

// Performance optimizations
if (typeof window !== 'undefined') {
  // Preload critical images
  preloadCriticalImages();
  
  // Add performance observer if supported
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime);
        }
      });
    });
    
    try {
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      // Ignore if not supported
    }
  }

  // Run performance tests in development
  if (process.env.NODE_ENV === 'development') {
    // Wait for initial render to complete
    setTimeout(() => {
      runPerformanceTests();
    }, 2000);
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
