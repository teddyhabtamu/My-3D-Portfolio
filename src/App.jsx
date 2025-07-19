import { BrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";

// Lazy load components for better performance
const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));
const Experience = lazy(() => import("./components/Experience"));
const Feedbacks = lazy(() => import("./components/Feedbacks"));
const Tech = lazy(() => import("./components/Tech"));
const Works = lazy(() => import("./components/Works"));
const StarsCanvas = lazy(() => import("./components/canvas/Stars"));

// Keep Hero and Navbar as direct imports since they're above the fold
import { Hero, Navbar } from "./components";
import PerformanceMonitor from "./components/PerformanceMonitor";

// Loading component for lazy loaded sections
const SectionLoader = () => (
  <div className="w-full min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        {/* Performance Monitor (dev only) */}
        <PerformanceMonitor />
        
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Navbar />
          <Hero />
        </div>
        
        {/* Lazy loaded sections with suspense boundaries */}
        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Experience />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Tech />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Works />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Feedbacks />
        </Suspense>
        
        <div className='relative z-0'>
          <Suspense fallback={<SectionLoader />}>
            <Contact />
          </Suspense>
          
          <Suspense fallback={null}>
            <StarsCanvas />
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
