import { useState } from "react";
import CodeEditorPortal from './components/CodeEditorPortal';
import { getExamplesByLanguage, exampleCodes, examplesText } from './utils/exampleHelpers'; // adjust import paths as needed
import TextBlock from "./components/TextBlock";
import InteractiveCodeTxt from "./assets/texts/interactive-coder/README.md"; 

function InteractiveCoderPage({ collapsed, setCollapsed }) {
  const [language, setLanguage] = useState("javascript");
  const [transcript, setTranscript] = useState([]);
  const [code, setCode] = useState(exampleCodes["javascript"]);
  const [selectedExample, setSelectedExample] = useState("");
  const [showEditor, setShowEditor] = useState(true); // Collapsible state for code editor
  const [showTextBlock, setShowTextBlock] = useState(true); // Collapsible state for text block

  const examples = getExamplesByLanguage(examplesText, language);

  const handleExampleChange = (e) => {
    const idx = Number(e.target.value);
    setSelectedExample(idx);
    if (examples[idx]) {
      setCode(examples[idx].code);
    }
  };

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    setCode(exampleCodes[lang]);
    setSelectedExample("");
  };

  const handleTranscript = (entry) => {
    setTranscript((prev) => [...prev, entry]);
  };

  return (
    <>
      <div className={`main-content${collapsed ? " header-collapsed" : ""}`}>
        {/* Selector bar above the code editor */}
  <div style={{ width: "100%", maxWidth: "90%", margin: "45px auto 0 auto", display: "flex", justifyContent: "center", gap: "24px", alignItems: "center" }}>
          <label>
            Language:&nbsp;
            <select value={language} onChange={handleLanguageChange}>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
            </select>
          </label>
          <label>
            Example:&nbsp;
            <select value={selectedExample} onChange={handleExampleChange}>
              <option value="">-- Select Example --</option>
              {examples.map((ex, idx) => (
                <option key={idx} value={idx}>{ex.title}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="collapsible-section">
          {showEditor ? (
            <main className="main-block" style={{ padding: "20px", marginTop: "32px", maxWidth: "90%", position: "relative", fontFamily: "'Playwrite AU QLD', Arial, sans-serif" }}>
              <button
                className="collapse-x"
                onClick={() => setShowEditor(false)}
                title="Collapse"
                style={{ top: 8, right: 8 }}
              >
                &times;
              </button>
              <h1 style={{ margin: "0 0 40px 0", fontSize: "2rem", color: "#d404f0", fontFamily: "'Playwrite AU QLD', Arial, sans-serif" }}>Interactive Code Editor Portal</h1>
              <div className="code-editor-portal-wrapper">
                <CodeEditorPortal
                  language={language}
                  code={code}
                  setCode={setCode}
                />
              </div>
            </main>
          ) : (
            <div
              className="collapsed-bar"
              onClick={() => setShowEditor(true)}
              title="Expand"
              style={{ marginTop: "40px", width: "90%", justifySelf: "center", fontFamily: "'Times New Roman', Times, serif" }}
            >
              ► Interactive Code Editor Portal
            </div>
          )}
        </div>
      </div>
      <div className={`main-content${collapsed ? " header-collapsed" : ""}`}>
        <div style={{ width: "100%" }}>
          <div className="collapsible-section">
            {showTextBlock ? (
              <main className="main-block" style={{ padding: "20px", margin: "0 auto 80px auto", maxWidth: "90%", position: "relative", fontFamily: "'Times New Roman', Times, serif" }}>
                <button
                  className="collapse-x"
                  onClick={() => setShowTextBlock(false)}
                  title="Collapse"
                  style={{ top: 8, right: 8 }}
                >
                  &times;
                </button>
                <TextBlock content={InteractiveCodeTxt} format="markdown" />
              </main>
            ) : (
              <div
                className="collapsed-bar"
                onClick={() => setShowTextBlock(true)}
                title="Expand"
                style={{ marginTop: "40px", width: "90%", marginLeft: "auto", marginRight: "auto", fontFamily: "'Times New Roman', Times, serif" }}
              >
                ► Interactive Coder Info
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default InteractiveCoderPage;