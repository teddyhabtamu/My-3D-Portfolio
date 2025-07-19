import React, { useRef, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Decal, OrbitControls, Preload, useTexture } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Ball = ({ imgUrl, isMobile }) => {
  const [decal] = useTexture([imgUrl]);
  const meshRef = useRef();

  // Reduced animation frequency for better performance
  useFrame(({ clock }) => {
    if (!isMobile && meshRef.current) {
      const elapsedTime = clock.getElapsedTime();
      meshRef.current.position.y = Math.sin(elapsedTime * 0.5) * 0.1; // slower, smaller bounce
      meshRef.current.rotation.y += 0.002; // slower rotation
    }
  });

  return (
    <mesh ref={meshRef} castShadow={!isMobile} receiveShadow={!isMobile} scale={isMobile ? 2.2 : 2.75}>
      <icosahedronGeometry args={[1, isMobile ? 0 : 1]} />
      <meshStandardMaterial
        color="#fff8eb"
        polygonOffset
        polygonOffsetFactor={-5}
        flatShading
      />
      {/* Only front decal on mobile for better performance */}
      <Decal
        position={[0, 0, 1]}
        rotation={[0, 0, 0]}
        scale={1}
        map={decal}
        flatShading
      />
      {!isMobile && (
        <>
          {/* Back decal only on desktop */}
          <Decal
            position={[0, 0, -1]}
            rotation={[0, Math.PI, 0]}
            scale={1}
            map={decal}
            flatShading
          />
        </>
      )}
    </mesh>
  );
};

const BallCanvas = ({ icon }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return (
    <Canvas
      frameloop="demand" // Changed from "always" to "demand" for better performance
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      gl={{ 
        preserveDrawingBuffer: true,
        antialias: !isMobile,
        alpha: false,
        powerPreference: "high-performance"
      }}
      performance={{ min: 0.5 }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <ambientLight intensity={isMobile ? 0.15 : 0.25} />
        <directionalLight position={[0, 0, 0.05]} intensity={isMobile ? 0.3 : 0.5} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          enableDamping={!isMobile}
          dampingFactor={0.05}
        />
        <Ball imgUrl={icon} isMobile={isMobile} />
      </Suspense>

      {!isMobile && <Preload all />}
    </Canvas>
  );
};

export default BallCanvas;
