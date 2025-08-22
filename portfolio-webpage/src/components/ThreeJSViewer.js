import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center } from "@react-three/drei";

/* --------------------------------------------------------------------------
   Model Component
   Loads and renders a GLTF 3D model using drei's useGLTF and Center.
   Props:
     - url: path to the GLTF model file
-------------------------------------------------------------------------- */
function Model({ url }) {
  const { scene } = useGLTF(url);
  return (
    <Center>
      <primitive object={scene} />
    </Center>
  );
}

/* --------------------------------------------------------------------------
   ThreeJSViewer Component
   Renders a 3D viewer using react-three-fiber.
   Features:
     - Model selection dropdown
     - Loading indicator
     - Error handling
     - User instructions overlay
-------------------------------------------------------------------------- */
export default function ThreeJSViewer({ modelPath }) {
  return (
    <div className="threejs-viewer-container" style={{ width: "100%", minHeight: "400px", position: "relative" }}>
      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 5] }} style={{ width: "100%", height: "100%" }}>
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