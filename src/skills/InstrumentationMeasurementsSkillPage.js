
import { useState } from 'react';
import TextBlock from '../components/TextBlock';
import MenuBubble from '../components/MenuBubble';
import instrMeasText from '../assets/texts/skills/instrumentation-&-measurements/Instrumentation_and_Measurement.md';



function InstrumentationMeasurementsSkillPage() {
  const [showTextBlock, setShowTextBlock] = useState(false);
  const [showPdf, setShowPdf] = useState(false);
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
            <main className="main-block" style={{ maxWidth: "82.25%", position: "relative", fontFamily: "'Times New Roman', Times, serif" }}>
              <button
                className="collapse-x"
                onClick={() => setShowTextBlock(false)}
                title="Collapse"
              >
                &times;
              </button>
              <TextBlock content={instrMeasText} format="markdown" />
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
        {/* Collapsible PDF Section (dynamic) */}
        <div className="collapsible-section">
          {showPdf ? (
            <main className="main-block" style={{ maxWidth: "82.25%", position: "relative", fontFamily: "'Times New Roman', Times, serif", marginTop: "24px" }}>
              <button
                className="collapse-x"
                onClick={() => setShowPdf(false)}
                title="Collapse"
              >
                &times;
              </button>
              <h2>Instrumentation & Measurements PDF</h2>
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
                  title="Instrumentation & Measurements PDF"
                  width="100%"
                  height="100%"
                  style={{ border: '1px solid #ccc', marginTop: 0 }}
                />
              </div>
            </main>
          ) : (
            <div
              className="collapsed-bar"
              onClick={() => setShowPdf(true)}
              title="Expand PDF"
              style={{
                marginTop: "24px",
                width: "90%",
                justifySelf: "center",
                fontFamily: "'Times New Roman', Times, serif",
              }}
            >
              ► Instrumentation & Measurements PDF
            </div>
          )}
        </div>
      </div>
  </div>
  );
}

export default InstrumentationMeasurementsSkillPage;
