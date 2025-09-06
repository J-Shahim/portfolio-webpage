

import { useState } from 'react';
import TextBlock from './components/TextBlock';
import dfmProjectText from "./assets/texts/dfm-project/dfm-project.md";
import ThreeJSViewer from "./components/ThreeJSViewer";
import GalleryBubble from './components/GalleryBubble';
import { useLocation } from 'react-router-dom';
import { assetFolderMap } from './utils/assetFolderMap';
import "./components/NasaProjectPage.css";

// Example DFM models and descriptions (replace with real data)
const dfmModels = [
  // Add your DFM .glb model paths here
  "/portfolio-webpage/assets/models/dfm-project/model1.glb",
  "/portfolio-webpage/assets/models/dfm-project/model2.glb",
];
// Placeholder descriptions for each model (replace with real imports when available)
const modelDescriptions = [
  'No description available for Model 1.',
  'No description available for Model 2.'
];

// Example PDF options (replace with real data)
const pdfOptions = [
  {
    label: "DFM Proposal",
    value: "/portfolio-webpage/assets/docs/dfm-project/DFM-Proposal.pdf",
  },
  {
    label: "DFM Final Report",
    value: "/portfolio-webpage/assets/docs/dfm-project/DFM-Final-Report.pdf",
  },
];

function DFMProjectPage() {
  const [collapsed, setCollapsed] = useState(true);
  const [popupIdx, setPopupIdx] = useState(null);
  const [panelReloadKeys, setPanelReloadKeys] = useState(Array(dfmModels.length).fill(0));
  const [selectedPdf, setSelectedPdf] = useState(pdfOptions[0].value);
  const [showTextBlock, setShowTextBlock] = useState(false);
  const [showModelGallery, setShowModelGallery] = useState(false);
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const location = useLocation();
  const assetFolder = assetFolderMap[location.pathname] || 'home';

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
    <div className={`main-content${collapsed ? " header-collapsed" : ""}`}>
      {/* Collapsible DFM.md Text Block */}
      <div className="collapsible-section">
        {showTextBlock ? (
          <main className="main-block" style={{ maxWidth: "82.25%", position: "relative" }}>
            <button
              className="collapse-x"
              onClick={() => setShowTextBlock(false)}
              title="Collapse"
            >
              &times;
            </button>
            <h1>Design For Manufacturing (DFM) Project</h1>
            <TextBlock content={dfmProjectText} format="markdown" />
          </main>
        ) : (
          <div
            className="collapsed-bar"
            onClick={() => setShowTextBlock(true)}
            title="Expand"
            style={{
              marginTop: "120px",
              width: "90%",
              justifySelf: "center",
            }}
          >
            ► DFM Project Description
          </div>
        )}
      </div>

      {/* Collapsible Model Gallery */}
      <div className="collapsible-section">
        {showModelGallery ? (
          <main className="main-block dfm-models-block" style={{ maxWidth: "85%", position: "relative" }}>
            <button
              className="collapse-x"
              onClick={() => setShowModelGallery(false)}
              title="Collapse"
            >
              &times;
            </button>
            <div className="dfm-models-grid">
              {dfmModels.map((modelPath, idx) => (
                <div
                  className="dfm-model-panel"
                  key={idx}
                  onDoubleClick={() => handlePanelClick(idx)}
                  style={{ cursor: "pointer" }}
                >
                  <ThreeJSViewer key={panelReloadKeys[idx] + "-" + idx} modelPath={modelPath} />
                  <div className="dfm-model-title">Model {idx + 1}</div>
                </div>
              ))}
            </div>
          </main>
        ) : (
          <div
            className="collapsed-bar"
            onClick={() => setShowModelGallery(true)}
            title="Expand"
            style={{
              width: "90%",
              justifySelf: "center",
            }}
          >
            ► DFM Project Model Gallery
          </div>
        )}
      </div>

      {/* Collapsible PDF Viewer */}
      <div className="collapsible-section">
        {showPdfViewer ? (
          <main className="main-block dfm-pdf-block" style={{ maxWidth: "85%", marginTop: "32px", position: "relative" }}>
            <button
              className="collapse-x"
              onClick={() => setShowPdfViewer(false)}
              title="Collapse"
            >
              &times;
            </button>
            <h2>DFM Project PDF</h2>
            <div style={{ marginBottom: "16px" }}>
              <label htmlFor="pdf-select" style={{ marginRight: "8px" }}>Select PDF:</label>
              <select
                id="pdf-select"
                value={selectedPdf}
                onChange={e => setSelectedPdf(e.target.value)}
              >
                {pdfOptions.map(pdf => (
                  <option key={pdf.value} value={pdf.value}>{pdf.label}</option>
                ))}
              </select>
            </div>
            <div style={{ width: "100%", height: "80vh" }}>
              <iframe
                src={selectedPdf}
                title="DFM Project PDF"
                width="100%"
                height="100%"
                style={{ border: "none" }}
              />
            </div>
          </main>
        ) : (
          <div
            className="collapsed-bar"
            onClick={() => setShowPdfViewer(true)}
            title="Expand"
            style={{
              width: "90%",
              justifySelf: "center",
            }}
          >
            ► DFM Project PDF Viewer
          </div>
        )}
      </div>

      {/* Place GalleryBubble here so expand/collapse gallery appears after all sections */}
      <GalleryBubble
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        assetFolder={assetFolder}
      />
      {/* Popup block for model viewer and description */}
      {popupIdx !== null && (
        <div className="dfm-model-popup">
          <div className="dfm-model-popup-content">
            <button className="collapse-x" onClick={closePopup} title="Close">
              &times;
            </button>
            <div style={{ width: "100%", height: "75%" }}>
              <ThreeJSViewer key={dfmModels[popupIdx]} modelPath={dfmModels[popupIdx]} />
            </div>
            <TextBlock content={modelDescriptions[popupIdx]} format="markdown" />
          </div>
          <div className="dfm-model-popup-backdrop" onClick={closePopup}></div>
        </div>
      )}
    </div>
  );
}

export default DFMProjectPage;