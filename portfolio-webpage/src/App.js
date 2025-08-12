import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import RequireContextTest from './components/RequireContextTest';
import TextBlock from './components/TextBlock';
import ThreeJSViewer from './components/ThreeJSViewer';

import './styles/main.css';
import './components/Main.css';
import testText from './assets/texts/test.md?raw';

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

function WebProjectsPage({ collapsed, setCollapsed }) {
  return (
    <>
      <Header imageDir="web" videoDir="web" collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={`main-content${collapsed ? " header-collapsed" : ""}`}>
        <div className="main-flex-row">
          <main className="main-block">
            <h1>Web Projects</h1>
            <p>This is the Web Projects page, styled like the main block.</p>
          </main>
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
    <Router>
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
    </Router>
  );
}

export default App;