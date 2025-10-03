
import { useState } from 'react';
import TextBlock from '../components/TextBlock';
import MenuBubble from '../components/MenuBubble';
import thermoText from '../assets/texts/skills/thermo-dynamics/Heat_Transfer_and_Thermodynamics.md';



function ThermodynamicsSkillPage() {
  const [showTextBlock, setShowTextBlock] = useState(false);
  const [showPdf, setShowPdf] = useState(false);
  const pdfOptions = [
    {
      label: "Heat Transfer Notes",
      value: process.env.PUBLIC_URL + '/assets/docs/skills/thermo-dynamics/HT-notes.pdf',
    },
    {
      label: "Thermodynamoics Notes",
      value: process.env.PUBLIC_URL + '/assets/docs/skills/thermo-dynamics/TD-notes.pdf',
    },
    {
      label: "Mini Project 1 - Heat Transfer",
      value: process.env.PUBLIC_URL + '/assets/docs/skills/thermo-dynamics/MP1-HT.pdf',
    },
    {
      label: "Mini Project 2 - Heat Transfer",
      value: process.env.PUBLIC_URL + '/assets/docs/skills/thermo-dynamics/MP2-HT.pdf'
    },
    {
      label: "HW1 - Thermodynamics",
      value: process.env.PUBLIC_URL + '/assets/docs/skills/thermo-dynamics/TD-HW1.pdf',
    },
    {
       label: "HW2 - Thermodynamics",
      value: process.env.PUBLIC_URL + '/assets/docs/skills/thermo-dynamics/TD-HW2.pdf',
    },
    {
      label: "HW3 - Thermodynamics",
      value: process.env.PUBLIC_URL + '/assets/docs/skills/thermo-dynamics/TD-HW3.pdf',
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
              <TextBlock content={thermoText} format="markdown" />
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
              ► Thermodynamics Description
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
              <h2>Thermodynamics PDF</h2>
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
                  title="Thermodynamics PDF"
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
              ► Thermodynamics PDF
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ThermodynamicsSkillPage;
