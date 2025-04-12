import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Decal, OrbitControls, Preload, useTexture } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Ball = ({ imgUrl }) => {
  const [decal] = useTexture([imgUrl]);
  const meshRef = useRef();

  // Custom bounce animation
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    meshRef.current.position.y = Math.sin(elapsedTime * 1) * 0.2; // slow bounce
    meshRef.current.rotation.y += 0.005; // slow rotation
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow scale={2.75}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color="#fff8eb"
        polygonOffset
        polygonOffsetFactor={-5}
        flatShading
      />
      {/* Front */}
      <Decal
        position={[0, 0, 1]}
        rotation={[0, 0, 0]}
        scale={1}
        map={decal}
        flatShading
      />
      {/* Back */}
      <Decal
        position={[0, 0, -1]}
        rotation={[0, Math.PI, 0]} // Fixed rotation to properly align the back decal
        scale={1}
        map={decal}
        flatShading
      />
      {/* Top */}
      <Decal
        position={[0, 1, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={1}
        map={decal}
        flatShading
      />
      {/* Bottom */}
      <Decal
        position={[0, -1, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={1}
        map={decal}
        flatShading
      />
    </mesh>
  );
};


const BallCanvas = ({ icon }) => {
  return (
    <Canvas
      frameloop="always"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <ambientLight intensity={0.25} />
        <directionalLight position={[0, 0, 0.05]} />
        <OrbitControls enableZoom={false} />
        <Ball imgUrl={icon} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;
