import React, { useState } from "react";
import Header from './components/Header';
import CodeEditorPortal from './components/CodeEditorPortal';
import { getExamplesByLanguage, exampleCodes, examplsText } from './utils/exampleHelpers'; // adjust import paths as needed

function InteractiveCoderPage({ collapsed, setCollapsed }) {
  const [language, setLanguage] = useState("javascript");
  const [transcript, setTranscript] = useState([]);
  const [code, setCode] = useState(exampleCodes["javascript"]);
  const [selectedExample, setSelectedExample] = useState("");

  const examples = getExamplesByLanguage(examplsText, language);

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
      <Header imageDir="web" videoDir="web" collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={`main-content${collapsed ? " header-collapsed" : ""}`}>
        <div className="main-flex-row">
          <main className="main-block">
            <h1>Interactive Code Editor Portal</h1>
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