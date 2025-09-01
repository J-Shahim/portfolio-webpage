import { Suspense, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center } from "@react-three/drei";
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
  const { scene } = useGLTF(url);

  // Set all mesh materials to selected color
  scene.traverse((child) => {
    if (child.isMesh) {
      child.material.color.set(color);
    }
  });

  // Center and scale model to fit viewer
  const box = new THREE.Box3().setFromObject(scene);
  const size = box.getSize(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);
  const scale = maxDim > 0 ? 1.8 / maxDim : 1; // Slightly less than 2 to add margin

  scene.scale.setScalar(scale);

  // Center the model
  const center = box.getCenter(new THREE.Vector3());
  scene.position.sub(center);

  return (
    <Center>
      <primitive object={scene} />
    </Center>
  );
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
  const [color, setColor] = useState(COLOR_OPTIONS[0].value);
  const [bg, setBg] = useState("transparent"); // Set default background to transparent

  // Handle gradient and transparent backgrounds
  const containerStyle = {
    width: "100%",
    minHeight: "400px",
    position: "relative",
    padding: "8px",
    background: bg === "transparent" ? "transparent" : (bg.includes("gradient") ? undefined : bg),
    backgroundImage: bg.includes("gradient") ? bg : undefined
  };

  return (
    <div className="threejs-viewer-container" style={containerStyle}>
      {/* Menu-style Controls Tab (top right corner) */}
      <button
        className="viewer-menu-bubble-btn"
        style={{
          position: "absolute",
          top: 12,
          right: 16,
        }}
        onClick={() => setControlsOpen((open) => !open)}
        aria-label={controlsOpen ? "Hide Controls" : "Show Controls"}
      >
        <span style={{ fontSize: "0.9em" }}>&#9776;</span>
      </button>
      {/* Controls Panel */}
      {controlsOpen && (
        <div style={{
          position: "absolute",
          top: 72,
          right: 16,
          zIndex: 9999, // very high value to ensure it's always on top
          background: "rgba(255,255,255,0.95)",
          border: "2px solid #5f1d7a",
          borderRadius: "18px",
          boxShadow: "0 0 16px 4px #c0a4e66c, 0 4px 16px rgba(120,120,180,0.15), 0 8px 24px -4px rgba(180,180,255,0.12)",
          padding: "16px 18px",
          minWidth: "140px",
          color: "#22223b",
          backdropFilter: "blur(4px)"
        }}>
          {/* Axis selector */}
          <AxisSelector onSelect={setAxis} currentAxis={axis} />
          {/* Camera distance slider */}
          <div style={{ marginTop: "10px" }}>
            <input
              id="camera-distance-slider"
              type="range"
              min={1}
              max={1500}
              step={1}
              value={sliderValue}
              onChange={e => setSliderValue(Number(e.target.value))}
              style={{
                width: "100%",
                accentColor: "#5f1d7a", // modern browsers
                background: "#f8faff",
                borderRadius: "8px",
                border: "2px solid #5f1d7a",
                boxShadow: "0 2px 8px rgba(120,120,180,0.10)"
              }}
            />
          </div>
          {/* Color selector */}
          <ColorSelector color={color} setColor={setColor} />
          {/* Background selector */}
          <BackgroundSelector bg={bg} setBg={setBg} />
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
          boxShadow: "0 2px 16px rgba(21,101,192,0.12)" // Optional: subtle shadow
        }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 2, 2]} intensity={0.6} />
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
   AxisSelector Component
   Renders buttons to select camera orientation along the X, Y, or Z axis.
   Props:
     - onSelect: callback function to call with the new camera position
-------------------------------------------------------------------------- */
function AxisSelector({ onSelect, currentAxis }) {
  const axes = [
    { label: "X+", vec: [1, 0, 0] },
    { label: "X-", vec: [-1, 0, 0] },
    { label: "Y+", vec: [0, 1, 0] },
    { label: "Y-", vec: [0, -1, 0] },
    { label: "Z+", vec: [0, 0, 1] },
    { label: "Z-", vec: [0, 0, -1] },
  ];
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      marginBottom: "12px"
    }}>
      {axes.map(axis => (
        <button
          key={axis.label}
          style={{
            background: currentAxis[0] === axis.vec[0] && currentAxis[1] === axis.vec[1] && currentAxis[2] === axis.vec[2]
              ? "#e3d7f7"
              : "#f8faff",
            color: "#5f1d7a",
            border: "2px solid #5f1d7a",
            borderRadius: "8px",
            padding: "4px 12px",
            cursor: "pointer",
            fontSize: "1em",
            boxShadow: "0 2px 8px rgba(120,120,180,0.10)"
          }}
          onClick={() => onSelect(axis.vec)}
        >
          {axis.label}
        </button>
      ))}
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
    <div style={{ marginBottom: "12px", display: "flex", flexDirection: "column", gap: "4px" }}>
      <label style={{ color: "#5f1d7a", fontWeight: "bold", marginBottom: "4px" }}>Model Color</label>
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
          boxShadow: "0 2px 8px rgba(120,120,180,0.10)"
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
    <div style={{ marginBottom: "12px", display: "flex", flexDirection: "column", gap: "4px" }}>
      <label style={{ color: "#5f1d7a", fontWeight: "bold", marginBottom: "4px" }}>Background</label>
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
          boxShadow: "0 2px 8px rgba(120,120,180,0.10)"
        }}
      >
        {BG_OPTIONS.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.name}</option>
        ))}
      </select>
    </div>
  );
}