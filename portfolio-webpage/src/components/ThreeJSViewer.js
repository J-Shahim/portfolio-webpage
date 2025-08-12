import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center } from "@react-three/drei";

function Model({ url }) {
  const { scene } = useGLTF(url);
  return (
    <Center>
      <primitive object={scene} />
    </Center>
  );
}

export default function ThreeJSViewer({ modelPath = "/assets/models/Test.glb" }) {
  return (
    <div className="threejs-viewer-container" style={{ width: "100%", height: "600px" }}>
      <Canvas
        camera={{ position: [0, 0, 5] }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight />
        <directionalLight position={[2, 2, 2]} />
        <Suspense fallback={null}>
          <Model url={modelPath} />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}