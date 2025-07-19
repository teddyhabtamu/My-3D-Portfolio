import { BrowserRouter } from "react-router-dom";
import { Suspense, lazy, useState, useEffect } from "react";

// Lazy load components for better performance with error boundaries
const About = lazy(() => import("./components/About").catch(() => import("./components/About")));
const Contact = lazy(() => import("./components/Contact").catch(() => import("./components/Contact")));
const Experience = lazy(() => import("./components/Experience").catch(() => import("./components/Experience")));
const Feedbacks = lazy(() => import("./components/Feedbacks").catch(() => import("./components/Feedbacks")));
const Tech = lazy(() => import("./components/Tech").catch(() => import("./components/Tech")));
const Works = lazy(() => import("./components/Works").catch(() => import("./components/Works")));
const StarsCanvas = lazy(() => import("./components/canvas/Stars").catch(() => import("./components/canvas/Stars")));

// Keep Hero and Navbar as direct imports since they're above the fold
import { Hero, Navbar } from "./components";
import PerformanceMonitor from "./components/PerformanceMonitor";

// Simplified loading component for mobile
const SectionLoader = ({ isMobile }) => (
  <div className={`w-full ${isMobile ? 'min-h-[200px]' : 'min-h-screen'} flex items-center justify-center`}>
    <div className={`animate-spin rounded-full ${isMobile ? 'h-16 w-16' : 'h-32 w-32'} border-b-2 border-white`}></div>
  </div>
);

// Error boundary component
const ErrorFallback = ({ children, fallback }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = () => setHasError(true);
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError && fallback) {
    return fallback;
  }

  return children;
};

const App = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        {/* Performance Monitor (dev only) */}
        <PerformanceMonitor />
        
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Navbar />
          <Hero />
        </div>
        
        {/* Optimized lazy loaded sections */}
        <ErrorFallback>
          <Suspense fallback={<SectionLoader isMobile={isMobile} />}>
            <About />
          </Suspense>
        </ErrorFallback>
        
        <ErrorFallback>
          <Suspense fallback={<SectionLoader isMobile={isMobile} />}>
            <Experience />
          </Suspense>
        </ErrorFallback>
        
        <ErrorFallback>
          <Suspense fallback={<SectionLoader isMobile={isMobile} />}>
            <Tech />
          </Suspense>
        </ErrorFallback>
        
        <ErrorFallback>
          <Suspense fallback={<SectionLoader isMobile={isMobile} />}>
            <Works />
          </Suspense>
        </ErrorFallback>
        
        <ErrorFallback>
          <Suspense fallback={<SectionLoader isMobile={isMobile} />}>
            <Feedbacks />
          </Suspense>
        </ErrorFallback>
        
        <div className='relative z-0'>
          <ErrorFallback>
            <Suspense fallback={<SectionLoader isMobile={isMobile} />}>
              <Contact />
            </Suspense>
          </ErrorFallback>
          
          <ErrorFallback>
            <Suspense fallback={null}>
              <StarsCanvas />
            </Suspense>
          </ErrorFallback>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
