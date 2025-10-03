import { useState } from "react";
import ThreeJSViewer from "./components/ThreeJSViewer";
import ModelGalleryCarousel from "./components/ModelGalleryCarousel";
import "./components/NasaProjectPage.css";
import GalleryBubble from './components/GalleryBubble';
import { useLocation } from 'react-router-dom';
import { assetFolderMap } from './utils/assetFolderMap';
import TextBlock from './components/TextBlock';

// Model paths and markdown descriptions
const nasaModels = [
  "/portfolio-webpage/assets/models/nasa-project/Ball-Hinge-Bottom-Plate.STL",
  "/portfolio-webpage/assets/models/nasa-project/Ball_Hinge_top_plate.STL",
  "/portfolio-webpage/assets/models/nasa-project/Base-Plate-V4.STL",
  "/portfolio-webpage/assets/models/nasa-project/Black-Box-V2.STL",
  "/portfolio-webpage/assets/models/nasa-project/Drive-shaft.STL",
  "/portfolio-webpage/assets/models/nasa-project/Gimbal-Attachment-Ring-V2.STL",
  "/portfolio-webpage/assets/models/nasa-project/Half-Inch-Nut.STL",
  "/portfolio-webpage/assets/models/nasa-project/Housing-Top-Plate.STL",
  "/portfolio-webpage/assets/models/nasa-project/Latch-Gear-Straight-Bevel-Pinion-V2.STL",
  "/portfolio-webpage/assets/models/nasa-project/Latch-Gear-Straight-Bevel-Pinion-V4.STL",
  "/portfolio-webpage/assets/models/nasa-project/Latch-Gear.STL",
  "/portfolio-webpage/assets/models/nasa-project/Leg-Axle-V1.STL",
  "/portfolio-webpage/assets/models/nasa-project/Leg-Axle-V2.STL",
  "/portfolio-webpage/assets/models/nasa-project/Leg-Axle-V3.STL",
  "/portfolio-webpage/assets/models/nasa-project/Leg_Cap_V1.STL",
  "/portfolio-webpage/assets/models/nasa-project/Main-Drive-Gear-Straight-Bevel.STL",
  "/portfolio-webpage/assets/models/nasa-project/Main-Motor-Bracket.STL",
  "/portfolio-webpage/assets/models/nasa-project/Main-Motor-Drive-Shaft.STL",
  "/portfolio-webpage/assets/models/nasa-project/Mock-Leg-V1.STL",
  "/portfolio-webpage/assets/models/nasa-project/Mock-Leg-V2.STL",
  "/portfolio-webpage/assets/models/nasa-project/Mounting-Plate.STL",
  "/portfolio-webpage/assets/models/nasa-project/Secondary-Drive-Gear-Straight-Bevel-Pinion.STL",
  "/portfolio-webpage/assets/models/nasa-project/Spur-Rack-Key-V1.STL",
  "/portfolio-webpage/assets/models/nasa-project/Spur-Rack-Key-V2.STL",
  "/portfolio-webpage/assets/models/nasa-project/SupportCapV3.STL",
  "/portfolio-webpage/assets/models/nasa-project/Swivel-Base.STL",
  "/portfolio-webpage/assets/models/nasa-project/Swivel-Washer.STL",
  "/portfolio-webpage/assets/models/nasa-project/Tether-Attachment-Pin.STL",
  "/portfolio-webpage/assets/models/nasa-project/Tether.STL",
  "/portfolio-webpage/assets/models/nasa-project/Tertiary-Gear-Straight-Bevel-Pinion-V4.STL",
  "/portfolio-webpage/assets/models/nasa-project/Foot.STL"
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
import model10Desc from "./assets/texts/nasa-project/model10.md";
import model11Desc from "./assets/texts/nasa-project/model11.md";
import model12Desc from "./assets/texts/nasa-project/model12.md";
import model13Desc from "./assets/texts/nasa-project/model13.md";
import model14Desc from "./assets/texts/nasa-project/model14.md";
import model15Desc from "./assets/texts/nasa-project/model15.md";
import model16Desc from "./assets/texts/nasa-project/model16.md";
import model17Desc from "./assets/texts/nasa-project/model17.md";
import model18Desc from "./assets/texts/nasa-project/model18.md";
import model19Desc from "./assets/texts/nasa-project/model19.md";
import model20Desc from "./assets/texts/nasa-project/model20.md";
import model21Desc from "./assets/texts/nasa-project/model21.md";
import model22Desc from "./assets/texts/nasa-project/model22.md";
import model23Desc from "./assets/texts/nasa-project/model23.md";
import model24Desc from "./assets/texts/nasa-project/model24.md";
import model25Desc from "./assets/texts/nasa-project/model25.md";
import model26Desc from "./assets/texts/nasa-project/model26.md";
import model27Desc from "./assets/texts/nasa-project/model27.md";
import model28Desc from "./assets/texts/nasa-project/model28.md";
import model29Desc from "./assets/texts/nasa-project/model29.md";
import model30Desc from "./assets/texts/nasa-project/model30.md";
import model31Desc from "./assets/texts/nasa-project/model31.md";
import nasaProjectText from "./assets/texts/nasa-project/nasa-project.md";

const modelDescriptions = [
  model1Desc, model2Desc, model3Desc, model4Desc, model5Desc, model6Desc, model7Desc, model8Desc, model9Desc, model10Desc,
  model11Desc, model12Desc, model13Desc, model14Desc, model15Desc, model16Desc, model17Desc, model18Desc, model19Desc, model20Desc,
  model21Desc, model22Desc, model23Desc, model24Desc, model25Desc, model26Desc, model27Desc, model28Desc, model29Desc, model30Desc,
  model31Desc,
];

// List of available PDFs
const pdfOptions = [
  {
    label: "NASA Psyche Space Elevator Anchor Proposal",
    value: "/portfolio-webpage/assets/docs/nasa-project/Design-Proposal.pdf",
  },
    {
    label: "NASA Psyche Space Elevator Anchor Final Report",
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
    {
    label: "Engineering Expo Poster",
    value: "/portfolio-webpage/assets/docs/nasa-project/Engineering-Expo-Poster.pdf",
  },
    {
    label: "Team Check-in Presentation Low-Fidelity Prototyping",
    value: "/portfolio-webpage/assets/docs/nasa-project/Team-Check-in-Prototyping.pdf",
  },
    {
    label: "Team Check-in Presentation High-Fidelity Prototyping",
    value: "/portfolio-webpage/assets/docs/nasa-project/Team-Check-in-High-Fidelity-Prototype.pdf",
  },
  {
    label: "Second Term Progress Update #1",
    value: "/portfolio-webpage/assets/docs/nasa-project/2nd-Term-Progress-Update-1.pdf",
  },
    {
    label: "Second Term Progress Update #2",
    value: "/portfolio-webpage/assets/docs/nasa-project/2nd-Term-Progress-Update-2.pdf",
  },
  // Add more PDFs as needed
];


function NasaProjectPage() {
  const [collapsed, setCollapsed] = useState(true);
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

  const location = useLocation();
  // Carousel state
  const [carouselIndex, setCarouselIndex] = useState(0);
  const assetFolder = assetFolderMap[location.pathname] || 'nasa-project';

  return (
    <div className={`main-content${collapsed ? " header-collapsed" : ""}`}>
      {/* Collapsible NASA.md Text Block */}
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
              fontFamily: "'Times New Roman', Times, serif",
            }}
          >
            ► NASA Psyche Project Portal Description
          </div>
        )}
      </div>

      {/* Collapsible Model Gallery (reusable carousel) */}
      <ModelGalleryCarousel
        modelPaths={nasaModels}
        modelDescriptions={modelDescriptions}
        title="Model Gallery"
      />

      {/* Collapsible PDF Viewer */}
      <div className="collapsible-section">
        {showPdfViewer ? (
          <main className="main-block nasa-pdf-block" style={{ maxWidth: "85%", marginTop: "32px", position: "relative", fontFamily: "'Times New Roman', Times, serif" }}>
            <button
              className="collapse-x"
              onClick={() => setShowPdfViewer(false)}
              title="Collapse"
            >
              &times;
            </button>
            <h2>NASA Psyche Project PDF's</h2>
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
  {/* ModelGalleryCarousel handles its own popup */}
    </div>
  );
}


export default NasaProjectPage;