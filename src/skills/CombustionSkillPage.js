
import { useState } from 'react';
import TextBlock from '../components/TextBlock';
import MenuBubble from '../components/MenuBubble';
import combustionText from '../assets/texts/skills/combustion/Combustion.md';



function CombustionSkillPage() {
  const [showTextBlock, setShowTextBlock] = useState(false);
  const [showPdf, setShowPdf] = useState(false);
    const pdfOptions = [
      { label: "ME-445 Project Report", value: process.env.PUBLIC_URL + "/assets/docs/skills/combustion/ME-445-Project-Report.pdf" },
      { label: "Combustion Notes", value: process.env.PUBLIC_URL + "/assets/docs/skills/combustion/Combustion-notes.pdf" },
      { label: "HW 1 - IC", value: process.env.PUBLIC_URL + "/assets/docs/skills/combustion/HW-1-IC.pdf" },
      { label: "HW 2 - IC", value: process.env.PUBLIC_URL + "/assets/docs/skills/combustion/HW-2-IC.pdf" },
      { label: "HW 3 - IC", value: process.env.PUBLIC_URL + "/assets/docs/skills/combustion/HW-3-IC.pdf" },
      { label: "HW 4 - IC", value: process.env.PUBLIC_URL + "/assets/docs/skills/combustion/HW-4-IC.pdf" },
      { label: "HW 6 - IC", value: process.env.PUBLIC_URL + "/assets/docs/skills/combustion/HW-6-IC.pdf" },
    ];
  const [selectedPdf, setSelectedPdf] = useState(pdfOptions[0].value);
  return (
    <div className="skills-page">
  <MenuBubble 
    collapsed={false} 
    show={true} 
    tabBubbleRef={null} 
    />
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
              <TextBlock content={combustionText} format="markdown" />
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
              ► Combustion Description
            </div>
          )}
        </div>
        {/* Collapsible PDF Section (dynamic) */}
        <div className="collapsible-section">
          {showPdf ? (
          <main className="main-block nasa-pdf-block" style={{ maxWidth: '90%', marginTop: '32px', position: 'relative', fontFamily: "'Times New Roman', Times, serif" }}>
              <button
                className="collapse-x"
                onClick={() => setShowPdf(false)}
                title="Collapse"
              >
                &times;
              </button>
              <h2>Combustion PDF</h2>
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
                  title="Combustion PDF"
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
              ► Combustion PDF
            </div>
          )}
        </div>
      </div>
  </div>
  );
}

export default CombustionSkillPage;
