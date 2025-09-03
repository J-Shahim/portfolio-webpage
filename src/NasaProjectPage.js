import { useState } from "react";
import TextBlock from './components/TextBlock';
import nasaProjectText from "./assets/texts/nasa-project/nasa-project.md";
import ThreeJSViewer from "./components/ThreeJSViewer";
import "./components/NasaProjectPage.css";

// Model paths and markdown descriptions
const nasaModels = [
  "/portfolio-webpage/assets/models/nasa-project/Ball_Hinge_Bottom_plate.glb",
  "/portfolio-webpage/assets/models/nasa-project/Base_Plate_V3.glb",
  "/portfolio-webpage/assets/models/nasa-project/BlackBox_V2.glb",
  "/portfolio-webpage/assets/models/nasa-project/Foot.glb",
  "/portfolio-webpage/assets/models/nasa-project/Gimbal Attachment ring.glb",
  "/portfolio-webpage/assets/models/nasa-project/HousingTopPlate.glb",
  "/portfolio-webpage/assets/models/nasa-project/legv2.glb",
  // Add any additional current models here
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

// List of available PDFs
const pdfOptions = [
  {
    label: "NASA Proposal",
    value: "/portfolio-webpage/assets/docs/nasa-project/Design-Proposal.pdf",
  },
    {
    label: "NASA Final Report",
    value: "/portfolio-webpage/assets/docs/nasa-project/Final-Report.pdf",
  },
  {
    label: "First Term Prototype",
    value: "/portfolio-webpage/assets/docs/nasa-project/Prototype-First-Term-CAD-Package.pdf",
  },
    {
    label: "Final Prototype",
    value: "/portfolio-webpage/assets/docs/nasa-project/Final-CAD-Package.pdf",
  },
  // Add more PDFs as needed
];

function NasaProjectPage({ collapsed, setCollapsed }) {
  const [popupIdx, setPopupIdx] = useState(null);
  const [panelReloadKeys, setPanelReloadKeys] = useState(Array(nasaModels.length).fill(0));
  // PDF selection state
  const [selectedPdf, setSelectedPdf] = useState(pdfOptions[0].value);
  const [showTextBlock, setShowTextBlock] = useState(false);
  const [showModelGallery, setShowModelGallery] = useState(false);
  const [showPdfViewer, setShowPdfViewer] = useState(false);

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
      {/* Collapsible NASA.md Text Block */}
      <div className="collapsible-section">
        {showTextBlock ? (
          <main className="main-block" style={{ maxWidth: "80%", position: "relative" }}>
            <button
              className="collapse-x"
              onClick={() => setShowTextBlock(false)}
              title="Collapse"
            >
              &times;
            </button>
            <h1>NASA Project</h1>
            <TextBlock content={nasaProjectText} format="markdown" />
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
            ► NASA Project Description
          </div>
        )}
      </div>

      {/* Collapsible Model Gallery */}
      <div className="collapsible-section">
        {showModelGallery ? (
          <main className="main-block nasa-models-block" style={{ maxWidth: "85%", position: "relative" }}>
            <button
              className="collapse-x"
              onClick={() => setShowModelGallery(false)}
              title="Collapse"
            >
              &times;
            </button>
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
            ► NASA Project Model Gallery
          </div>
        )}
      </div>

      {/* Collapsible PDF Viewer */}
      <div className="collapsible-section">
        {showPdfViewer ? (
          <main className="main-block nasa-pdf-block" style={{ maxWidth: "85%", marginTop: "32px", position: "relative" }}>
            <button
              className="collapse-x"
              onClick={() => setShowPdfViewer(false)}
              title="Collapse"
            >
              &times;
            </button>
            <h2>NASA Project PDF</h2>
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
                title="NASA Project PDF"
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
            ► NASA Project PDF Viewer
          </div>
        )}
      </div>

      {/* Popup block for model viewer and description */}
      {popupIdx !== null && (
        <div className="nasa-model-popup">
          <div className="nasa-model-popup-content">
            <button className="collapse-x" onClick={closePopup} title="Close">
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
    </div>
  );
}

export default NasaProjectPage;