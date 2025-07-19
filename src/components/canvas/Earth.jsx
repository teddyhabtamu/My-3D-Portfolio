import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Earth = ({ isMobile }) => {
  const earth = useGLTF("./planet/scene.gltf");

  return (
    <primitive 
      object={earth.scene} 
      scale={isMobile ? 2.0 : 2.5} 
      position-y={0} 
      rotation-y={0} 
    />
  );
};

const EarthCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
      
      // Disable on very low-end devices
      const isVeryLowEnd = navigator.hardwareConcurrency <= 2 && mobile;
      setShouldRender(!isVeryLowEnd);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Fallback for very low-end devices
  if (!shouldRender) {
    return (
      <div className="w-full h-auto flex justify-center items-center min-h-[350px]">
        <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-green-500 rounded-full animate-pulse"></div>
      </div>
    );
  }

  return (
    <Canvas
      shadows={!isMobile}
      frameloop='demand'
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      gl={{ 
        preserveDrawingBuffer: true,
        antialias: !isMobile,
        alpha: false,
        powerPreference: "high-performance"
      }}
      performance={{ min: 0.5 }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          autoRotateSpeed={isMobile ? 0.5 : 1}
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          enableDamping={!isMobile}
        />
        <Earth isMobile={isMobile} />

        {!isMobile && <Preload all />}
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
