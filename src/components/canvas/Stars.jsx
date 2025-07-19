import { useState, useRef, Suspense, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

const Stars = (props) => {
  const ref = useRef();
  const [isMobile, setIsMobile] = useState(false);
  const frameCount = useRef(0);

  // Check device capabilities for adaptive rendering
  useEffect(() => {
    const checkDevice = () => {
      const isMobileDevice = window.innerWidth < 768 || 
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Much more aggressive particle reduction
  const particleCount = useMemo(() => {
    if (isMobile) return 800; // Reduced from 1500
    const isLowEnd = navigator.hardwareConcurrency <= 4;
    return isLowEnd ? 1200 : 2000; // Reduced from 2500/4000
  }, [isMobile]);

  const [sphere] = useState(() => 
    random.inSphere(new Float32Array(particleCount), { radius: 1.2 })
  );

  // Frame skipping for better performance
  useFrame((state, delta) => {
    if (ref.current) {
      frameCount.current += 1;
      
      // Skip frames on mobile (only update every 3rd frame)
      const skipFrames = isMobile ? 3 : 2;
      if (frameCount.current % skipFrames !== 0) return;
      
      // Much slower animation
      const slowedDelta = delta * (isMobile ? 0.1 : 0.2);
      ref.current.rotation.x -= slowedDelta / 15;
      ref.current.rotation.y -= slowedDelta / 20;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points 
        ref={ref} 
        positions={sphere} 
        stride={3} 
        frustumCulled 
        {...props}
      >
        <PointMaterial
          transparent
          color='#f272c8'
          size={isMobile ? 0.004 : 0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  const [shouldRender, setShouldRender] = useState(true);

  // More aggressive low-end device detection
  useEffect(() => {
    const isVeryLowEnd = navigator.hardwareConcurrency <= 2 || 
      (window.innerWidth < 480 && /Android/i.test(navigator.userAgent)) ||
      navigator.deviceMemory <= 2; // Also check memory
    
    if (isVeryLowEnd) {
      setShouldRender(false);
    }
  }, []);

  if (!shouldRender) {
    return (
      <div className='w-full h-auto absolute inset-0 z-[-1]'>
        {/* Simplified CSS-only stars */}
        <div className="stars-fallback" style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: 'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)',
          overflow: 'hidden'
        }}>
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              style={{
                position: 'absolute',
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                background: '#f272c8',
                borderRadius: '50%',
                animation: `twinkle ${2 + Math.random() * 2}s infinite`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='w-full h-auto absolute inset-0 z-[-1]'>
      <Canvas 
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 1.2]} // Reduced from [1, 1.5]
        performance={{ min: 0.3 }} // Lower threshold for more aggressive optimization
        frameloop="demand" // Changed to demand for better performance
      >
        <Suspense fallback={null}>
          <Stars />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
