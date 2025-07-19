import { BrowserRouter } from "react-router-dom";

// Direct imports - no lazy loading for maximum compatibility
import { Hero, Navbar, About, Tech, Experience, Works, Feedbacks, Contact } from "./components";
import { StarsCanvas } from "./components/canvas";
import PerformanceMonitor from "./components/PerformanceMonitor";

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
        
        {/* Direct components - no lazy loading */}
        <About />
        <Experience />
        <Tech />
        <Works />
        <Feedbacks />
        
        <div className='relative z-0'>
          <Contact />
          <StarsCanvas />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App; 