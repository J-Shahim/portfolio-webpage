import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center } from "@react-three/drei";

/* --------------------------------------------------------------------------
   Model Component
   Loads and renders a GLTF 3D model using drei's useGLTF and Center.
   Props:
     - url: path to the GLTF model file
-------------------------------------------------------------------------- */
function Model({ url }) {
  // Error boundary for model loading
  try {
    const { scene } = useGLTF(url);
    return (
      <Center>
        <primitive object={scene} />
      </Center>
    );
  } catch (e) {
    return <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="red" />
      <textGeometry args={["Model Error", { size: 0.2 }]} />
    </mesh>;
  }
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
const MODEL_OPTIONS = [
  { label: "Test Cube", path: "/assets/models/Test.glb" },
  { label: "Sample Model", path: "/assets/models/Sample.glb" },
  // Add more models here
];

export default function ThreeJSViewer({ modelPath = "/assets/models/Test.glb" }) {
  const [selectedModel, setSelectedModel] = useState(modelPath);
  const [loading, setLoading] = useState(true);

  return (
    <div className="threejs-viewer-container" style={{ width: "100%", height: "600px", position: "relative" }}>
      {/* Model selection dropdown */}
      <div style={{
        position: "absolute", top: 16, left: 16, zIndex: 10, background: "#fff9", borderRadius: 8, padding: "8px 12px"
      }}>
        <label htmlFor="model-select" style={{ marginRight: 8 }}>Choose Model:</label>
        <select
          id="model-select"
          value={selectedModel}
          onChange={e => { setSelectedModel(e.target.value); setLoading(true); }}
        >
          {MODEL_OPTIONS.map(opt => (
            <option key={opt.path} value={opt.path}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Instructions overlay */}
      <div style={{
        position: "absolute", bottom: 16, left: 16, zIndex: 10, background: "#fff9", borderRadius: 8, padding: "8px 12px", fontSize: "0.95em"
      }}>
        <strong>Controls:</strong> Rotate: drag | Zoom: scroll | Pan: right-drag
      </div>

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5] }}
        style={{ width: "100%", height: "100%" }}
        onCreated={() => setLoading(false)}
      >
        <ambientLight />
        <directionalLight position={[2, 2, 2]} />
        <Suspense fallback={null}>
          <Model url={selectedModel} />
        </Suspense>
        <OrbitControls />
      </Canvas>

      {/* Loading indicator */}
      {loading && (
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          background: "#fff9", borderRadius: 8, padding: "16px 32px", zIndex: 20, fontWeight: "bold"
        }}>
          Loading model...
        </div>
      )}
    </div>
  );
}