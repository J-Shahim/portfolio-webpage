import { useState } from 'react';
import TextBlock from './components/TextBlock';
import MenuBubble from './components/MenuBubble';
import geothermalText from './assets/texts/geothermal-project/Geothermal_Rankine_Cycle.md';
import { assetFolderMap } from './utils/assetFolderMap';
import { useLocation } from 'react-router-dom';
import './components/NasaProjectPage.css';


const pdfOptions = [
  {
    label: 'Geothermal Project Report',
    value: process.env.PUBLIC_URL + '/assets/docs/geothermal-project/Geothermal-Ideal-Rankine-Cycle-Project.pdf',
  },
  // Add more PDFs as needed
];

function GeothermalProjectPage() {
  const [showTextBlock, setShowTextBlock] = useState(false);
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(pdfOptions[0].value);
  const [popupIdx, setPopupIdx] = useState(null);
  const location = useLocation();
  const assetFolder = assetFolderMap[location.pathname] || 'home';

  return (
    <div className="main-content">
      {/* Collapsible Markdown Section */}
      <div className="collapsible-section">
        {showTextBlock ? (
          <main className="main-block" style={{ maxWidth: '82.25%', position: 'relative', fontFamily: "'Times New Roman', Times, serif" }}>
            <button
              className="collapse-x"
              onClick={() => setShowTextBlock(false)}
              title="Collapse"
            >
              &times;
            </button>
            <h1>Geothermal Project</h1>
            <TextBlock content={geothermalText} format="markdown" />
          </main>
        ) : (
          <div
            className="collapsed-bar"
            onClick={() => setShowTextBlock(true)}
            title="Expand"
            style={{ marginTop: '120px', width: '90%', justifySelf: 'center', fontFamily: "'Times New Roman', Times, serif" }}
          >
            ► Geothermal Project Description
          </div>
        )}
      </div>

      {/* Model gallery removed as per user request */}

      {/* Collapsible PDF Viewer */}
      <div className="collapsible-section">
        {showPdfViewer ? (
          <main className="main-block" style={{ maxWidth: '82.25%', marginTop: '32px', position: 'relative', fontFamily: "'Times New Roman', Times, serif" }}>
            <button
              className="collapse-x"
              onClick={() => setShowPdfViewer(false)}
              title="Collapse"
            >
              &times;
            </button>
            <h2>Geothermal Project PDF</h2>
            <div style={{ marginBottom: '16px' }}>
              <label htmlFor="pdf-select" style={{ marginRight: '8px' }}>Select PDF:</label>
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
            <div style={{ width: '100%', height: '80vh' }}>
              <iframe
                src={selectedPdf}
                title="Geothermal Project PDF"
                width="100%"
                height="100%"
                style={{ border: 'none' }}
              />
            </div>
          </main>
        ) : (
          <div
            className="collapsed-bar"
            onClick={() => setShowPdfViewer(true)}
            title="Expand"
            style={{ width: '90%', justifySelf: 'center', fontFamily: "'Times New Roman', Times, serif" }}
          >
            ► PDF Viewer
          </div>
        )}
      </div>
    </div>
  );
}

export default GeothermalProjectPage;
