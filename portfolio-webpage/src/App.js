import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";

import ThreeJSViewer from './components/ThreeJSViewer';
import CodeEditorPortal from "./components/CodeEditorPortal";
import Header from './components/Header';
import TextBlock from './components/TextBlock';
import RequireContextTest from './components/RequireContextTest';
import './styles/main.css';
import './components/Main.css';
import './components/CodeEditorPortal.css';

import testText from './assets/texts/test.md?raw';
import examplsText from './assets/texts/exampls.md?raw';

// --- Profile Media Preload Helper ---
function importAll(r, type) {
  return r.keys().map((file) => ({
    type,
    src: r(file).default || r(file),
  }));
}

const profileImageSet = importAll(
  require.context('./assets/images/profile', false, /\.(png|jpe?g|gif|PNG|JPG|JPEG|GIF)$/),
  'image'
);
const profileVideoSet = [
  ...importAll(
    require.context('./assets/images/profile', false, /\.(mp4|webm|ogg|MP4|WEBM|OGG)$/),
    'video'
  ),
  ...importAll(
    require.context('./assets/videos/profile', false, /\.(mp4|webm|ogg|MP4|WEBM|OGG)$/),
    'video'
  )
];
const profileMediaSet = [...profileImageSet, ...profileVideoSet];

function HomePage({ collapsed, setCollapsed }) {
  const [profileIndex, setProfileIndex] = useState(0);

  const handlePrev = () => {
    setProfileIndex((prev) =>
      prev === 0 ? profileMediaSet.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setProfileIndex((prev) =>
      prev === profileMediaSet.length - 1 ? 0 : prev + 1
    );
  };

  const profileMedia = profileMediaSet[profileIndex];

  return (
    <>
      <Header imageDir="home" videoDir="home" collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={`main-content${collapsed ? " header-collapsed" : ""}`}>
        <div className="main-flex-row">
          <main className="main-block">
            <TextBlock content={testText} format="markdown" />
          </main>
          <aside className="profile-block">
            {profileMediaSet.length > 1 && (
              <button
                className="profile-arrow arrow-btn-left"
                onClick={handlePrev}
                aria-label="Previous profile media"
              >
                &lt;
              </button>
            )}
            {profileMedia ? (
              profileMedia.type === 'video' ? (
                <video
                  src={profileMedia.src}
                  className="profile-img"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <img
                  src={profileMedia.src}
                  alt="Profile"
                  className="profile-img"
                />
              )
            ) : (
              <div className="profile-img-placeholder">No profile media found</div>
            )}
            {profileMediaSet.length > 1 && (
              <button
                className="profile-arrow arrow-btn-right"
                onClick={handleNext}
                aria-label="Next profile media"
              >
                &gt;
              </button>
            )}
          </aside>
        </div>
      </div>
    </>
  );
}

function AboutMePage({ collapsed, setCollapsed }) {
  return (
    <>
      <Header imageDir="about" videoDir="about" collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={`main-content about-main-content${collapsed ? " header-collapsed" : ""}`}>
        <div className="main-flex-row">
          <main className="main-block">
            <h1>About Me</h1>
            <ThreeJSViewer />
            <TextBlock content={testText} format="markdown" />
          </main>
        </div>
      </div>
    </>
  );
}

function SkillsPage({ collapsed, setCollapsed }) {
  return (
    <>
      <Header imageDir="skills" videoDir="skills" collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={`main-content${collapsed ? " header-collapsed" : ""}`}>
            <div className="main-flex-row">
                <main className="main-block">
                    <h1>Skills</h1>
                    <p>This is the Skills page, styled like the main block.</p>
                </main>
            </div>
        </div>
    </>
  );
}

const exampleCodes = {
  javascript: `// Example: 2D Sinusoidal Plot with Plotly.js
const x = [];
const y = [];
for (let i = 0; i <= 100; i++) {
  const xi = i * 0.1;
  x.push(xi);
  y.push(Math.sin(xi));
}
const trace = { x, y, mode: 'lines', name: 'sin(x)' };
Plotly.newPlot(outputDiv, [trace], { title: '2D Sinusoidal Plot' });`,

  python: `# Example: 2D Sinusoidal Plot in Python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(0, 2 * np.pi, 100)
y = np.sin(x)
plt.plot(x, y)
plt.title("2D Sinusoidal Plot")`
};

// --- Improved Helper: Parse examples from exampls.md ---
function getExamplesByLanguage(markdown, language) {
  const exampleRegex = /###\s*(.*?)\s*\r?\n+```(\w+)\r?\n([\s\S]*?)```/g;
  const matches = [...markdown.matchAll(exampleRegex)];
  const examples = matches
    .filter(match => match[2].toLowerCase() === language)
    .map(match => ({
      title: match[1].trim(),
      code: match[3].trim()
    }));
  return examples;
}

function WebProjectsPage({ collapsed, setCollapsed }) {
  const [language, setLanguage] = React.useState("javascript");
  const [transcript, setTranscript] = React.useState([]);
  const [code, setCode] = React.useState(exampleCodes["javascript"]);
  const [selectedExample, setSelectedExample] = React.useState("");

  // Get examples for the current language
  const examples = getExamplesByLanguage(examplsText, language);

  // Debug: See what examples are parsed
  console.log("Examples:", examples);

  // When dropdown changes, set code to selected example
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

  console.log("Markdown:", examplsText);
  console.log("Examples:", examples);
  console.log("Raw markdown:", examplsText);
  const matches = examplsText.match(/###\s*(.*?)\s*\r?\n+```(\w+)\r?\n([\s\S]*?)```/g);
  console.log("Raw matches:", matches);

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
        {/* Place CodeEditorPortal below main-block */}
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

function ClassProjectsPage({ collapsed, setCollapsed }) {
  return (
    <>
      <Header imageDir="mobile" videoDir="mobile" collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={`main-content${collapsed ? " header-collapsed" : ""}`}>
        <div className="main-flex-row">
          <main className="main-block">
            <h1>Class Projects</h1>
            <p>This is the Class Projects page, styled like the main block.</p>
          </main>
        </div>
      </div>
    </>
  );
}

function EmailPage({ collapsed, setCollapsed }) {
  return (
    <>
      <Header imageDir="email" videoDir="email" collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={`main-content${collapsed ? " header-collapsed" : ""}`}>
        <div className="main-flex-row">
          <main className="main-block">
            <h1>Email Projects</h1>
            <p>This is the Email Projects page, styled like the main block.</p>
          </main>
        </div>
      </div>
    </>
  );
}

function SocialPage({ collapsed, setCollapsed }) {
  return (
    <>
      <Header imageDir="social" videoDir="social" collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={`main-content${collapsed ? " header-collapsed" : ""}`}>
        <div className="main-flex-row">
          <main className="main-block">
            <h1>Social Projects</h1>
            <p>This is the Social Projects page, styled like the main block.</p>
          </main>
        </div>
      </div>
    </>
  );
}

function App() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <BrowserRouter basename="/portfolio-webpage">
      <div className="App">
        <RequireContextTest />
        <Routes>
          <Route path="/" element={<HomePage collapsed={collapsed} setCollapsed={setCollapsed} />} />
          <Route path="/about-me" element={<AboutMePage collapsed={collapsed} setCollapsed={setCollapsed} />} />
          <Route path="/skills" element={<SkillsPage collapsed={collapsed} setCollapsed={setCollapsed} />} />
          <Route path="/web-projects" element={<WebProjectsPage collapsed={collapsed} setCollapsed={setCollapsed} />} />
          <Route path="/class-projects" element={<ClassProjectsPage collapsed={collapsed} setCollapsed={setCollapsed} />} />
          <Route path="/email" element={<EmailPage collapsed={collapsed} setCollapsed={setCollapsed} />} />
          <Route path="/social" element={<SocialPage collapsed={collapsed} setCollapsed={setCollapsed} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;