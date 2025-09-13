import { Suspense, useState, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center } from "@react-three/drei";
import { useLoader } from '@react-three/fiber';
import { STLLoader } from 'three-stdlib';
import * as THREE from "three";
import "./ThreeJSViewer.css";

// Color options for the model
const COLOR_OPTIONS = [
  { name: "Blue", value: "#1565c0" },
  { name: "Red", value: "#c62828" },
  { name: "Green", value: "#2e7d32" },
  { name: "Orange", value: "#f9a825" },
  { name: "Purple", value: "#6a1b9a" },
  { name: "Gray", value: "#607d8b" },
  { name: "Metallic Silver", value: "#b0b4b9", metallic: 1, roughness: 0.2 },
  { name: "Metallic Blue", value: "#0e3faa", metallic: 10, roughness: 0.5 },
];

const BG_OPTIONS = [
  { name: "White", value: "#f8faff" },
  { name: "Light Gray", value: "#e3e3e3" },
  { name: "Dark", value: "#22223b" },
  { name: "Blue", value: "#1565c0" },
  { name: "Purple", value: "#5f1d7a" },
  { name: "Gradient", value: "linear-gradient(120deg,#172e94 0%,#5f1d7a 40%,#266da7 70%,#1e215d 100%)" },
  { name: "Transparent", value: "transparent" }
];

/* --------------------------------------------------------------------------
   Model Component
   Loads and renders a GLTF 3D model using drei's useGLTF and Center.
   Props:
     - url: path to the GLTF model file
-------------------------------------------------------------------------- */
function Model({ url, color }) {
  const ext = url.split('.').pop().toLowerCase();
  if (ext === 'stl') {
    // STL loading
    const geometry = useLoader(STLLoader, url);
    // Center and scale STL geometry to fit viewer (like GLB)
    geometry.center();
    geometry.computeBoundingBox();
    const size = geometry.boundingBox.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = maxDim > 0 ? 15 / maxDim : 1;
    // Center the model
    const center = geometry.boundingBox.getCenter(new THREE.Vector3());
    // Custom rotation for Esal-Project.stl
  const isEsalProject = url.toLowerCase().includes('esal-project.stl');
  // Flip upside down: 180deg about X only
  const rotation = isEsalProject ? [Math.PI, 0, 0] : [0, 0, 0];
    // Use a group to apply scale, position, and rotation
    return (
      <Center>
        <group scale={[scale, scale, scale]} position={[-center.x, -center.y, -center.z]} rotation={rotation}>
          <mesh geometry={geometry} castShadow receiveShadow>
            <meshStandardMaterial color={color} />
          </mesh>
        </group>
      </Center>
    );
  } else {
    // GLB/GLTF loading
    const { scene } = useGLTF(url);
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.color.set(color);
      }
    });
    // Scale and center the whole scene
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = maxDim > 0 ? 15 / maxDim : 1;
    scene.scale.setScalar(scale);
    const center = box.getCenter(new THREE.Vector3());
    scene.position.sub(center);

    // Custom rotation for Esal-Project.stl (DFM project)
    if (url.toLowerCase().includes('esal-project.stl')) {
      scene.rotation.x = Math.PI;
      scene.rotation.y = 0;
      scene.rotation.z = Math.PI;
    }
    return (
      <Center>
        <primitive object={scene} />
      </Center>
    );
  }
}

/* --------------------------------------------------------------------------
   CameraDistanceController Component
   Controls the camera distance based on user input.
   Props:
     - distance: the distance value to set the camera to
-------------------------------------------------------------------------- */
function CameraDistanceController({ sliderValue, axis }) {
  const { camera } = useThree();
  camera.position.set(axis[0] * sliderValue, axis[1] * sliderValue, axis[2] * sliderValue);
  camera.updateProjectionMatrix();
  return null;
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
  const [sliderValue, setSliderValue] = useState(50); // 1-100 scale
  const [axis, setAxis] = useState([0, 0, 1]); // Default Z+ axis
  const [controlsOpen, setControlsOpen] = useState(false);
  const [color, setColor] = useState(COLOR_OPTIONS.find(opt => opt.name === "Metallic Blue").value); // Default to Metallic Blue
  const [bg, setBg] = useState(BG_OPTIONS[2].value); // Default to Dark

  // Handle gradient and transparent backgrounds
  const containerStyle = {
    width: "100%",
    height: "100%",
    position: "relative",
    padding: 0,
    background: bg === "transparent" ? "transparent" : (bg.includes("gradient") ? undefined : bg),
    backgroundImage: bg.includes("gradient") ? bg : undefined,
    fontFamily: "'Times New Roman', Times, serif"
  };

  return (
    <div className="threejs-viewer-container" style={containerStyle}>
      {/* Menu-style Controls Tab (top right corner) */}
      <button
        className="viewer-menu-bubble-btn"
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          zIndex: 2
        }}
        onClick={() => setControlsOpen((open) => !open)}
        aria-label="Open viewer controls"
      >
        ☰
      </button>
      {/* Controls Panel */}
      {controlsOpen && (
        <div
          className="viewer-controls-panel"
          style={{
            position: "absolute",
            top: 76,
            right: 12,
            zIndex: 1000,
            background: "#fff",
            border: "2px solid #5f1d7a",
            borderRadius: "16px",
            boxShadow: "0 4px 24px rgba(21,101,192,0.18)",
            padding: "24px 28px 20px 28px",
            minWidth: 120,
            maxWidth: 220,
            fontFamily: "'Times New Roman', Times, serif"
          }}
        >
          <button
            style={{
              position: "absolute",
              top: 8,
              right: 12,
              background: "none",
              border: "none",
              fontSize: 22,
              cursor: "pointer",
              color: "#5f1d7a"
            }}
            onClick={() => setControlsOpen(false)}
            aria-label="Close menu"
          >
            &times;
          </button>
          <div style={{ marginTop: 16 }}>
            {/* Color selector */}
            <ColorSelector color={color} setColor={setColor} />
            {/* Background selector */}
            <BackgroundSelector bg={bg} setBg={setBg} />
          </div>
        </div>
      )}
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [axis[0] * sliderValue, axis[1] * sliderValue, axis[2] * sliderValue], fov: 45 }}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "24px", // Rounded corners
          overflow: "hidden",   // Ensures content stays inside rounded corners
          boxShadow: "0 2px 16px rgba(21,101,192,0.12)", // Optional: subtle shadow
          display: "block"
        }}
      >
        <ambientLight intensity={.25} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        <Suspense fallback={null}>
          <Model url={modelPath} color={color} />
          <CameraDistanceController sliderValue={sliderValue} axis={axis} />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}


/* --------------------------------------------------------------------------
   ColorSelector Component
   Renders a dropdown to select the model color.
   Props:
     - color: the current color value
     - setColor: function to update the color value
-------------------------------------------------------------------------- */
function ColorSelector({ color, setColor }) {
  return (
    <div style={{ marginBottom: "12px", display: "flex", flexDirection: "column", gap: "4px", fontFamily: "'Times New Roman', Times, serif" }}>
      <label style={{ color: "#5f1d7a", fontWeight: "bold", marginBottom: "4px", fontFamily: "'Times New Roman', Times, serif" }}>Model Color</label>
      <select
        value={color}
        onChange={e => setColor(e.target.value)}
        style={{
          border: "2px solid #5f1d7a",
          borderRadius: "8px",
          padding: "4px 12px",
          color: "#5f1d7a",
          background: "#f8faff",
          fontSize: "1em",
          boxShadow: "0 2px 8px rgba(120,120,180,0.10)",
          fontFamily: "'Times New Roman', Times, serif"
        }}
      >
        {COLOR_OPTIONS.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.name}</option>
        ))}
      </select>
    </div>
  );
}

/* --------------------------------------------------------------------------
   BackgroundSelector Component
   Renders a dropdown to select the background style.
   Props:
     - bg: the current background value
     - setBg: function to update the background value
-------------------------------------------------------------------------- */
function BackgroundSelector({ bg, setBg }) {
  return (
    <div style={{ marginBottom: "12px", display: "flex", flexDirection: "column", gap: "4px", fontFamily: "'Times New Roman', Times, serif" }}>
      <label style={{ color: "#5f1d7a", fontWeight: "bold", marginBottom: "4px", fontFamily: "'Times New Roman', Times, serif" }}>Background</label>
      <select
        value={bg}
        onChange={e => setBg(e.target.value)}
        style={{
          border: "2px solid #5f1d7a",
          borderRadius: "8px",
          padding: "4px 12px",
          color: "#5f1d7a",
          background: "#f8faff",
          fontSize: "1em",
          boxShadow: "0 2px 8px rgba(120,120,180,0.10)",
          fontFamily: "'Times New Roman', Times, serif"
        }}
      >
        {BG_OPTIONS.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.name}</option>
        ))}
      </select>
    </div>
  );
}