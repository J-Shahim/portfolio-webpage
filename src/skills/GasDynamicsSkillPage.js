
import { useState } from 'react';
import TextBlock from '../components/TextBlock';
import MenuBubble from '../components/MenuBubble';
import gasDynamicsText from '../assets/texts/skills/gas-dynamics/Gas_Dynamics.md';



function GasDynamicsSkillPage() {
  const [showTextBlock, setShowTextBlock] = useState(false);
  const [showPdf, setShowPdf] = useState(false);
  const pdfOptions = [
    { label: "Gas Dynamics notes", value: process.env.PUBLIC_URL + '/assets/docs/skills/gas-dynamics/GD-notes.pdf' },
    { label: "HW1 - Gas Dynamics", value: process.env.PUBLIC_URL + '/assets/docs/skills/gas-dynamics/HW1-GD.pdf' },
    { label: "HW2 - Gas Dynamics", value: process.env.PUBLIC_URL + '/assets/docs/skills/gas-dynamics/HW2-GD.pdf' },
    { label: "HW3 - Gas Dynamics", value: process.env.PUBLIC_URL + '/assets/docs/skills/gas-dynamics/HW3-GD.pdf' },
    { label: "HW4 - Gas Dynamics", value: process.env.PUBLIC_URL + '/assets/docs/skills/gas-dynamics/HW4-GD.pdf' },
    { label: "HW5 - Gas Dynamics", value: process.env.PUBLIC_URL + '/assets/docs/skills/gas-dynamics/HW5-GD.pdf' },
    { label: "HW6 - Gas Dynamics", value: process.env.PUBLIC_URL + '/assets/docs/skills/gas-dynamics/HW6-GD.pdf' },
    { label: "HW8 - Gas Dynamics", value: process.env.PUBLIC_URL + '/assets/docs/skills/gas-dynamics/HW8-GD.pdf' },
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
              <TextBlock content={gasDynamicsText} format="markdown" />
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
              ► Gas Dynamics Description
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
              <h2>Gas Dynamics PDF</h2>
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
                  title="Gas Dynamics PDF"
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
              ► Gas Dynamics PDF
            </div>
          )}
        </div>
      </div>
  </div>
  );
}

export default GasDynamicsSkillPage;
