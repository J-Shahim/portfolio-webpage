import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./HomePage";
import AboutMePage from "./AboutMePage";
import ProjectsPage from "./ProjectsPage";
import InteractiveCoderPage from "./InteractiveCoderPage";
import NasaProjectPage from "./NasaProjectPage";
import DFMProjectPage from "./DFMProjectPage";
import RoboticArmProjectPage from "./RoboticArmProjectPage";
import GasDynamicsProjectPage from "./GasDynamicsProjectPage";
import HTProjectsPage from "./HTProjectsPage";
import RoboticCircuitryProjectPage from "./RoboticCircuitryProjectPage";
import EmailPage from "./EmailPage";

import './styles/main.css';
import './components/Main.css';
import './components/CodeEditorPortal.css';

import testText from './assets/texts/test.md?raw';
import examplsText from './assets/texts/exampls.md?raw';




function App() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <BrowserRouter basename="/portfolio-webpage">
      <div className="App">
        <RequireContextTest />
        <Routes>
          <Route path="/" element={<HomePage collapsed={collapsed} setCollapsed={setCollapsed} />} />
          <Route path="/about-me" element={<AboutMePage collapsed={collapsed} setCollapsed={setCollapsed} />} />
          {/* Projects grid with nested routes for subtabs */}
          <Route path="/projects" element={<ProjectsPage collapsed={collapsed} setCollapsed={setCollapsed} />}>
            <Route path="interactive-coder" element={<InteractiveCoderPage />} />
            <Route path="nasa-project" element={<NasaProjectPage />} />
            <Route path="dfm-project" element={<DFMProjectPage />} />
            <Route path="robotic-arm-project" element={<RoboticArmProjectPage />} />
            <Route path="gas-dynamics-project" element={<GasDynamicsProjectPage />} />
            <Route path="ht-projects" element={<HTProjectsPage />} />
            <Route path="robotic-circuitry-project" element={<RoboticCircuitryProjectPage />} />
          </Route>
          <Route path="/email" element={<EmailPage collapsed={collapsed} setCollapsed={setCollapsed} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;