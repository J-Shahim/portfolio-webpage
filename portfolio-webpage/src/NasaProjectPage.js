import React, { useState } from "react";
import Header from './components/Header';
import TextBlock from './components/TextBlock';
import nasaProjectText from "./assets/texts/nasa-project/nasa-project.md";
import ThreeJSViewer from "./components/ThreeJSViewer";
import "./components/NasaProjectPage.css";

// PDF Viewer imports
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

// Model paths and markdown descriptions
const nasaModels = [
  "/portfolio-webpage/assets/models/nasa-project/NasaModel1.glb",
  "/portfolio-webpage/assets/models/nasa-project/NasaModel2.glb",
  "/portfolio-webpage/assets/models/nasa-project/NasaModel3.glb",
  "/portfolio-webpage/assets/models/nasa-project/NasaModel4.glb",
  "/portfolio-webpage/assets/models/nasa-project/NasaModel5.glb",
  "/portfolio-webpage/assets/models/nasa-project/NasaModel6.glb",
  "/portfolio-webpage/assets/models/nasa-project/NasaModel7.glb",
  "/portfolio-webpage/assets/models/nasa-project/NasaModel8.glb",
  "/portfolio-webpage/assets/models/nasa-project/NasaModel9.glb",
];

// Import markdown descriptions for each model
import model1Desc from "./assets/texts/nasa-project/model1.md";
import model2Desc from "./assets/texts/nasa-project/model2.md";
import model3Desc from "./assets/texts/nasa-project/model3.md";
import model4Desc from "./assets/texts/nasa-project/model4.md";
import model5Desc from "./assets/texts/nasa-project/model5.md";
import model6Desc from "./assets/texts/nasa-project/model6.md";
import model7Desc from "./assets/texts/nasa-project/model7.md";
import model8Desc from "./assets/texts/nasa-project/model8.md";
import model9Desc from "./assets/texts/nasa-project/model9.md";

const modelDescriptions = [
  model1Desc,
  model2Desc,
  model3Desc,
  model4Desc,
  model5Desc,
  model6Desc,
  model7Desc,
  model8Desc,
  model9Desc,
];

// PDF path
const nasaProjectPdf = "/portfolio-webpage/assets/docs/nasa-project/Final Report.pdf";

function NasaProjectPage({ collapsed, setCollapsed }) {
  const [popupIdx, setPopupIdx] = useState(null);
  const [panelReloadKeys, setPanelReloadKeys] = useState(Array(nasaModels.length).fill(0));

  const handlePanelClick = (idx) => {
    setPopupIdx(idx);
  };

  const closePopup = () => {
    setPopupIdx(null);
    setPanelReloadKeys(keys =>
      keys.map((key, i) => (i === popupIdx ? key + 1 : key))
    );
  };

  return (
    <>
      <div className={`main-content${collapsed ? " header-collapsed" : ""}`}>
        <div className="main-flex-row">
          <main className="main-block" style={{maxWidth: "100%" }}>
            <h1>NASA Project</h1>
            <TextBlock content={nasaProjectText} format="markdown" />
          </main>
        </div>
        {/* Always below the main block */}
        <main className="main-block nasa-models-block" style={{ maxWidth: "85%" }}>
          <div className="nasa-models-grid">
            {nasaModels.map((modelPath, idx) => (
              <div
                className="nasa-model-panel"
                key={idx}
                onDoubleClick={() => handlePanelClick(idx)}
                style={{ cursor: "pointer" }}
              >
                <ThreeJSViewer key={panelReloadKeys[idx] + "-" + idx} modelPath={modelPath} />
                <div className="nasa-model-title">Model {idx + 1}</div>
              </div>
            ))}
          </div>
        </main>
        {/* Popup block for model viewer and description */}
        {popupIdx !== null && (
          <div className="nasa-model-popup">
            <div className="nasa-model-popup-content">
              <button className="nasa-model-popup-close" onClick={closePopup}>
                &times;
              </button>
              <div style={{ width: "100%", height: "75%" }}>
                <ThreeJSViewer key={nasaModels[popupIdx]} modelPath={nasaModels[popupIdx]} />
              </div>
              <TextBlock content={modelDescriptions[popupIdx]} format="markdown" />
            </div>
            <div className="nasa-model-popup-backdrop" onClick={closePopup}></div>
          </div>
        )}
        {/* PDF Viewer below models main block */}
        <main className="main-block nasa-pdf-block" style={{ maxWidth: "85%", marginTop: "32px" }}>
          <h2>NASA Project PDF</h2>
          <div style={{ width: "100%", height: "600px" }}>
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
              <Viewer fileUrl={nasaProjectPdf} defaultScale={1.5} />
            </Worker>
          </div>
        </main>
      </div>
    </>
  );
}

export default NasaProjectPage;