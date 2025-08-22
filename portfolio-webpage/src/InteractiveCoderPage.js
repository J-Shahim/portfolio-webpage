import { useState } from "react";
import CodeEditorPortal from './components/CodeEditorPortal';
import { getExamplesByLanguage, exampleCodes, examplesText } from './utils/exampleHelpers'; // adjust import paths as needed

function InteractiveCoderPage({ collapsed, setCollapsed }) {
  const [language, setLanguage] = useState("javascript");
  const [transcript, setTranscript] = useState([]);
  const [code, setCode] = useState(exampleCodes["javascript"]);
  const [selectedExample, setSelectedExample] = useState("");

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
        <div className="main-flex-row">
          <main className="main-block" style={{ padding: "20px", marginTop: "0", maxWidth: "75%" }}>
            <h1 style={{ margin: "0 0 16px 0", fontSize: "2rem", color: "#d404f0" }}>Interactive Code Editor Portal</h1>
            <label>
              Language:&nbsp;
              <select value={language} onChange={handleLanguageChange}>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
              </select>
            </label>
            &nbsp;&nbsp;
            <label>
              Example:&nbsp;
              <select value={selectedExample} onChange={handleExampleChange}>
                <option value="">-- Select Example --</option>
                {examples.map((ex, idx) => (
                  <option key={idx} value={idx}>{ex.title}</option>
                ))}
              </select>
            </label>
          </main>
        </div>
        <div className="code-editor-portal-wrapper">
          <CodeEditorPortal
            language={language}
            code={code}
            setCode={setCode}
          />
        </div>
      </div>
    </>
  );
}

export default InteractiveCoderPage;