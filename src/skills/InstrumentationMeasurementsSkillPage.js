
import { useState } from 'react';
import TextBlock from '../components/TextBlock';
import MenuBubble from '../components/MenuBubble';
import GalleryBubble from '../components/GalleryBubble';
import { useLocation } from 'react-router-dom';
import { assetFolderMap } from '../utils/assetFolderMap';
import instrMeasText from '../assets/texts/skills/instrumentation-&-measurements/Instrumentation_and_Measurement.md';



function InstrumentationMeasurementsSkillPage() {
  const [showTextBlock, setShowTextBlock] = useState(false);
  const [showPdf, setShowPdf] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const location = useLocation();
  const assetFolder = assetFolderMap[location.pathname] || 'home';
  const pdfOptions = [
    {
      label: "Instrumentation & Measurements Overview",
      value: process.env.PUBLIC_URL + '/assets/docs/skills/instrumentation-&-measurements/overview.pdf',
    },
    // Add more PDFs here if needed
  ];
  const [selectedPdf, setSelectedPdf] = useState(pdfOptions[0].value);
  return (
    <div className="skills-page">
      <MenuBubble collapsed={false} show={true} tabBubbleRef={null} />
      <div className="main-content">
        <div className="collapsible-section">
          {showTextBlock ? (
          <main className="main-block nasa-pdf-block" style={{ maxWidth: '90%', marginTop: '32px', position: 'relative', fontFamily: "'Times New Roman', Times, serif" }}>
              <button
                className="collapse-x"
                onClick={() => setShowTextBlock(false)}
                title="Collapse"
              >
                &times;
              </button>
              <TextBlock content={instrMeasText} format="markdown" />
              <div style={{ margin: '32px 0', display: 'flex', justifyContent: 'center' }}>
                <iframe
                  width="720"
                  height="405"
                  src="https://www.youtube.com/embed/Y-EJppDuWSI?si=21Tndzj9gAZ8dHNw"
                  title="Instrumentation and Measurement Skills Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
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
              ► Instrumentation & Measurements Description
            </div>
          )}
        </div>
      </div>
      {/* GalleryBubble for instrumentation skills */}
      <GalleryBubble
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        assetFolder={assetFolder}
      />
    </div>
  );
}

export default InstrumentationMeasurementsSkillPage;
