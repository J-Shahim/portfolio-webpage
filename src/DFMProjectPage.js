import { useState } from 'react';
import TextBlock from './components/TextBlock';
import dfmProjectText from "./assets/texts/dfm-project/dfm-project.md";
import ThreeJSViewer from "./components/ThreeJSViewer";
import ModelGalleryCarousel from "./components/ModelGalleryCarousel";
import GalleryBubble from './components/GalleryBubble';
import { useLocation } from 'react-router-dom';
import { assetFolderMap } from './utils/assetFolderMap';
import "./components/NasaProjectPage.css";

// DFM models and descriptions
const dfmModels = [
  "/portfolio-webpage/assets/models/dfm-project/Esal-Project.stl",
  "/portfolio-webpage/assets/models/dfm-project/Bottom-Arm-Esal.stl",
  "/portfolio-webpage/assets/models/dfm-project/Fastener-Esal.stl",
  "/portfolio-webpage/assets/models/dfm-project/Foot-Esal.stl",
  "/portfolio-webpage/assets/models/dfm-project/Guide-Back-Block.stl",
  "/portfolio-webpage/assets/models/dfm-project/Hinge-Back-Plate-Esal.stl",
  "/portfolio-webpage/assets/models/dfm-project/Hinge-Plate-Esal.stl",
  "/portfolio-webpage/assets/models/dfm-project/Pallet.stl",
  "/portfolio-webpage/assets/models/dfm-project/Slider-guide.stl",
  "/portfolio-webpage/assets/models/dfm-project/Top-Arm-Esal.stl",
  "/portfolio-webpage/assets/models/dfm-project/Top-Strut-Esal.stl",
  "/portfolio-webpage/assets/models/dfm-project/Wedge.stl"
];

import dfmModel1Desc from "./assets/texts/dfm-project/model1.md";
import dfmModel2Desc from "./assets/texts/dfm-project/model2.md";
import dfmModel3Desc from "./assets/texts/dfm-project/model3.md";
import dfmModel4Desc from "./assets/texts/dfm-project/model4.md";
import dfmModel5Desc from "./assets/texts/dfm-project/model5.md";
import dfmModel6Desc from "./assets/texts/dfm-project/model6.md";
import dfmModel7Desc from "./assets/texts/dfm-project/model7.md";
import dfmModel8Desc from "./assets/texts/dfm-project/model8.md";
import dfmModel9Desc from "./assets/texts/dfm-project/model9.md";
import dfmModel10Desc from "./assets/texts/dfm-project/model10.md";
import dfmModel11Desc from "./assets/texts/dfm-project/model11.md";
import dfmModel12Desc from "./assets/texts/dfm-project/model12.md";


const modelDescriptions = [
  dfmModel2Desc, // Esal-Project.stl
  dfmModel1Desc, // Bottom-Arm-Esal.stl
  dfmModel3Desc, // Fastener-Esal.stl
  dfmModel4Desc, // Foot-Esal.stl
  dfmModel5Desc, // Guide-Back-Block.stl
  dfmModel6Desc, // Hinge-Back-Plate-Esal.stl
  dfmModel7Desc, // Hinge-Plate-Esal.stl
  dfmModel8Desc, // Pallet.stl
  dfmModel9Desc, // Slider-guide.stl
  dfmModel10Desc, // Top-Arm-Esal.stl
  dfmModel11Desc, // Top-Strut-Esal.stl
  dfmModel12Desc, // Wedge.stl
];

// Example PDF options (replace with real data)
const pdfOptions = [
  {
    label: "Easel DFM CAD Package",
    value: "/portfolio-webpage/assets/docs/dfm-project/Esal-DFM-Project.pdf",
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
          <div
            className="collapsed-bar"
            onClick={() => setShowTextBlock(true)}
            title="Expand"
            style={{
              marginTop: "120px",
              width: "90%",
              justifySelf: "center",
              fontFamily: "'Times New Roman', Times, serif"
            }}
          >
            ► DFM Project Description
          </div>
  return (
    <div className={`main-content${collapsed ? " header-collapsed" : ""}`}>
      {/* Collapsible DFM.md Text Block */}
      <div className="collapsible-section">
        {showTextBlock ? (
          <main className="main-block" style={{ maxWidth: "82.25%", position: "relative", fontFamily: "'Times New Roman', Times, serif" }}>
            <button
              className="collapse-x"
              onClick={() => setShowTextBlock(false)}
              title="Collapse"
            >
              &times;
            </button>
            <h1>Design For Manufacturing (DFM) Project</h1>
            <TextBlock content={dfmProjectText} format="markdown" />
            {/* YouTube Video Viewer */}
            <div style={{ margin: '32px 0', display: 'flex', justifyContent: 'center' }}>
              <iframe
                width="720"
                height="405"
                src="https://www.youtube.com/embed/Zfte2x9jnOA?si=pXrDkwteVzGz055E"
                title="DFM Project Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
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
              fontFamily: "'Times New Roman', Times, serif",    
            }}
          >
            ► DFM Project Description
          </div>
        )}
      </div>

      {/* Collapsible Model Gallery (reusable carousel) */}
      <ModelGalleryCarousel
        modelPaths={dfmModels}
        modelDescriptions={modelDescriptions}
        title="Model Gallery"
      />

      {/* Collapsible PDF Viewer */}
      <div className="collapsible-section">
        {showPdfViewer ? (
          <main className="main-block dfm-pdf-block" style={{ maxWidth: "82.5%", marginTop: "32px", position: "relative", fontFamily: "'Times New Roman', Times, serif" }}>
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
              fontFamily: "'Times New Roman', Times, serif"
            }}
          >
            ► PDF Viewer
          </div>
        )}
      </div>

      {/* Place GalleryBubble here so expand/collapse gallery appears after all sections */}
      <GalleryBubble
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        assetFolder={assetFolder}
      />
      {/* Popup block for model viewer and description (matches NASA structure) */}
      {popupIdx !== null && (
        <div className="nasa-model-popup">
          <div className="nasa-model-popup-content">
            <button className="collapse-x" onClick={closePopup} title="Close">
              &times;
            </button>
            <div style={{ width: "100%", height: "75%" }}>
              <ThreeJSViewer key={dfmModels[popupIdx]} modelPath={dfmModels[popupIdx]} rotation={popupIdx === 1 ? [Math.PI / 2, 0, 0] : undefined} />
            </div>
            <TextBlock content={modelDescriptions[popupIdx]} format="markdown" />
          </div>
          <div className="nasa-model-popup-backdrop" onClick={closePopup}></div>
        </div>
      )}
    </div>
  );
}

export default DFMProjectPage;