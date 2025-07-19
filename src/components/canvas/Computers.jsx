import React, { Suspense, useEffect, useState, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = ({ screenSize, isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  // Optimized scale and position based on screen size
  const { scale, position } = useMemo(() => {
    if (screenSize === "mobile") {
      return { scale: 0.15, position: [0, -1.8, -0.5] }; // Smaller for better performance
    } else if (screenSize === "tablet") {
      return { scale: 0.4, position: [0, -3.2, -0.5] };
    } else {
      return { scale: 0.45, position: [0, -3.15, -1.5] }; // Slightly smaller
    }
  }, [screenSize]);

  // Adaptive lighting based on device capabilities
  const lightingConfig = useMemo(() => {
    if (isMobile) {
      return {
        hemisphereIntensity: 0.08,
        spotLightIntensity: 0.6,
        shadowMapSize: 256, // Further reduced shadow quality
      };
    }
    return {
      hemisphereIntensity: 0.12,
      spotLightIntensity: 0.8,
      shadowMapSize: 512, // Reduced from 1024
    };
  }, [isMobile]);

  return (
    <mesh>
      <hemisphereLight 
        intensity={lightingConfig.hemisphereIntensity} 
        groundColor="black" 
      />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={lightingConfig.spotLightIntensity}
        castShadow={!isMobile} // Disable shadows on mobile for performance
        shadow-mapSize={lightingConfig.shadowMapSize}
      />
      <pointLight intensity={isMobile ? 0.5 : 1} />
      <primitive
        object={computer.scene}
        scale={scale}
        position={position}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [screenSize, setScreenSize] = useState("large");
  const [isMobile, setIsMobile] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const mobile = width < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      setIsMobile(mobile);
      
      if (width < 500) {
        setScreenSize("mobile");
      } else if (width < 1024) {
        setScreenSize("tablet");
      } else {
        setScreenSize("large");
      }

      // More aggressive low-end device detection
      const isVeryLowEnd = (navigator.hardwareConcurrency <= 2 && mobile) ||
                           navigator.deviceMemory <= 2 ||
                           (navigator.connection?.effectiveType && 
                            ['slow-2g', '2g', '3g'].includes(navigator.connection.effectiveType));
      setShouldRender(!isVeryLowEnd);
    };

    handleResize(); // Set on load
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fallback for very low-end devices
  if (!shouldRender) {
    return (
      <div className="absolute inset-0 flex justify-center items-center">
        <img
          src="/computer.png"
          alt="3D Computer Static"
          className="w-3/4 h-3/4 object-contain opacity-80"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <Canvas
      frameloop="demand" // Only render when needed
      shadows={!isMobile} // Disable shadows on mobile
      dpr={isMobile ? [0.8, 1.2] : [1, 1.8]} // Reduced pixel ratio for better performance
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ 
        preserveDrawingBuffer: true,
        antialias: !isMobile, // Disable antialiasing on mobile
        alpha: false, // Disable alpha for better performance
        powerPreference: "high-performance",
        stencil: false, // Disable stencil buffer
        depth: true
      }}
      performance={{ min: 0.3 }} // Lower performance threshold for more aggressive optimization
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          enablePan={false} // Disable panning for performance
          enableDamping={!isMobile} // Disable damping on mobile
          dampingFactor={0.05}
          enableRotate={!isMobile} // Disable rotation on mobile for better performance
        />
        <Computers screenSize={screenSize} isMobile={isMobile} />
      </Suspense>

      {/* Don't preload everything on mobile */}
      {!isMobile && <Preload all />}
    </Canvas>
  );
};

export default ComputersCanvas;
