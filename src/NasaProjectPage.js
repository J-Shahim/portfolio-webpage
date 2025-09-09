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
  "/portfolio-webpage/assets/models/nasa-project/Ball_Hinge_Bottom_plate.glb",
  "/portfolio-webpage/assets/models/nasa-project/Base_Plate_V3.glb",
  "/portfolio-webpage/assets/models/nasa-project/BlackBox_V2.glb",
  "/portfolio-webpage/assets/models/nasa-project/Foot.glb",
  "/portfolio-webpage/assets/models/nasa-project/Gimbal Attachment ring.glb",
  "/portfolio-webpage/assets/models/nasa-project/HousingTopPlate.glb",
  "/portfolio-webpage/assets/models/nasa-project/legv2.glb",
  // STL files
  "/portfolio-webpage/assets/models/nasa-project/drive_shaft.STL",
  "/portfolio-webpage/assets/models/nasa-project/Latch Gear-Straight bevel pinion 48DP70PT 70GT 20PA .25FW -V2.STL",
  "/portfolio-webpage/assets/models/nasa-project/Latchgear.STL",
  "/portfolio-webpage/assets/models/nasa-project/Leg Rotation Shaft - Rack-spur - rectangular 120DP 20PA .1FW .25PH 1.5L.STL",
  "/portfolio-webpage/assets/models/nasa-project/Leg Shaft Drive Gear - Spur gear 120DP 20T 20PA .125FW ---S20O0.1H.25L0.03125N-V1.STL",
  "/portfolio-webpage/assets/models/nasa-project/Main Drive Gear-Straight bevel gear 20DP80PT 35GT 20PA 1FW.STL",
  "/portfolio-webpage/assets/models/nasa-project/mounting plate.STL",
  "/portfolio-webpage/assets/models/nasa-project/Secondary Drive Gear- Straight bevel pinion 20DP35PT 80GT 20PA 1FW.STL",
  "/portfolio-webpage/assets/models/nasa-project/swivel base.STL",
  "/portfolio-webpage/assets/models/nasa-project/Swivel-washer.STL",
  "/portfolio-webpage/assets/models/nasa-project/Tertiary gear- Straight bevel pinion 48DP70PT 70GT 20PA .25FW-V1.STL",
  "/portfolio-webpage/assets/models/nasa-project/Tether_attach_pin.STL",
  "/portfolio-webpage/assets/models/nasa-project/thether.STL",
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


const modelDescriptions = [
  model1Desc, // Ball_Hinge_Bottom_plate.glb
  model2Desc, // Base_Plate_V3.glb
  model3Desc, // BlackBox_V2.glb
  model4Desc, // Foot.glb
  model5Desc, // Gimbal Attachment ring.glb
  model6Desc, // HousingTopPlate.glb
  model7Desc, // legv2.glb
  model8Desc, // drive_shaft.STL
  model9Desc, // Latch Gear-Straight bevel pinion 48DP70PT 70GT 20PA .25FW -V2.STL
  model10Desc, // Latchgear.STL
  model11Desc, // Leg Rotation Shaft - Rack-spur - rectangular 120DP 20PA .1FW .25PH 1.5L.STL
  model12Desc, // Leg Shaft Drive Gear - Spur gear 120DP 20T 20PA .125FW ---S20O0.1H.25L0.03125N-V1.STL
  model13Desc, // Main Drive Gear-Straight bevel gear 20DP80PT 35GT 20PA 1FW.STL
  model14Desc, // mounting plate.STL
  model15Desc, // Secondary Drive Gear- Straight bevel pinion 20DP35PT 80GT 20PA 1FW.STL
  model16Desc, // swivel base.STL
  model17Desc, // Swivel-washer.STL
  model18Desc, // Tertiary gear- Straight bevel pinion 48DP70PT 70GT 20PA .25FW-V1.STL
  model19Desc, // Tether_attach_pin.STL
  model20Desc, // thether.STL

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