import React, { useEffect, useState } from 'react';
import { getDeviceCapabilities } from '../utils/performance';

const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({
    fps: 0,
    memory: 0,
    loadTime: 0,
    renderTime: 0,
  });
  const [capabilities, setCapabilities] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development mode
    if (process.env.NODE_ENV !== 'development') return;

    setCapabilities(getDeviceCapabilities());

    let frameCount = 0;
    let lastTime = performance.now();
    let animationId;

    // FPS counter
    const updateFPS = () => {
      frameCount++;
      const now = performance.now();
      
      if (now - lastTime >= 1000) {
        setMetrics(prev => ({
          ...prev,
          fps: Math.round((frameCount * 1000) / (now - lastTime))
        }));
        frameCount = 0;
        lastTime = now;
      }
      
      animationId = requestAnimationFrame(updateFPS);
    };

    // Memory usage (if available)
    const updateMemory = () => {
      if (performance.memory) {
        setMetrics(prev => ({
          ...prev,
          memory: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024)
        }));
      }
    };

    // Performance observer for load times
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'navigation') {
            setMetrics(prev => ({
              ...prev,
              loadTime: Math.round(entry.loadEventEnd - entry.loadEventStart)
            }));
          }
          if (entry.entryType === 'measure' && entry.name === 'render') {
            setMetrics(prev => ({
              ...prev,
              renderTime: Math.round(entry.duration)
            }));
          }
        });
      });

      try {
        observer.observe({ entryTypes: ['navigation', 'measure'] });
      } catch (e) {
        console.warn('Performance observer not fully supported');
      }
    }

    updateFPS();
    const memoryInterval = setInterval(updateMemory, 2000);

    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(memoryInterval);
    };
  }, []);

  // Don't render in production
  if (process.env.NODE_ENV === 'production') return null;

  const getPerformanceStatus = () => {
    if (!capabilities) return 'unknown';
    if (capabilities.isLowEnd) return 'low';
    if (capabilities.isMobile) return 'medium';
    return 'high';
  };

  const statusColors = {
    low: 'bg-red-500',
    medium: 'bg-yellow-500',
    high: 'bg-green-500',
    unknown: 'bg-gray-500'
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className={`w-4 h-4 rounded-full ${statusColors[getPerformanceStatus()]} opacity-75 hover:opacity-100 transition-opacity`}
        title="Performance Monitor"
      />
      
      {isVisible && (
        <div className="absolute top-6 right-0 bg-black bg-opacity-90 text-white p-3 rounded-lg text-xs min-w-48 backdrop-blur">
          <h3 className="font-bold mb-2 text-green-400">Performance Monitor</h3>
          
          <div className="space-y-1">
            <div>FPS: <span className={metrics.fps < 30 ? 'text-red-400' : 'text-green-400'}>{metrics.fps}</span></div>
            <div>Memory: <span className="text-blue-400">{metrics.memory}MB</span></div>
            <div>Load Time: <span className="text-yellow-400">{metrics.loadTime}ms</span></div>
            {metrics.renderTime > 0 && (
              <div>Render: <span className="text-purple-400">{metrics.renderTime}ms</span></div>
            )}
          </div>

          {capabilities && (
            <div className="mt-3 pt-2 border-t border-gray-600">
              <h4 className="font-semibold text-xs text-gray-300 mb-1">Device Info</h4>
              <div className="space-y-1">
                <div>Cores: <span className="text-blue-300">{capabilities.cores}</span></div>
                <div>Memory: <span className="text-blue-300">{capabilities.memory}GB</span></div>
                <div>Connection: <span className="text-blue-300">{capabilities.connection}</span></div>
                <div>Status: <span className={`text-${getPerformanceStatus() === 'high' ? 'green' : getPerformanceStatus() === 'medium' ? 'yellow' : 'red'}-300`}>
                  {getPerformanceStatus()}
                </span></div>
              </div>
            </div>
          )}

          <div className="mt-2 text-xs text-gray-400">
            Click circle to toggle
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceMonitor; 