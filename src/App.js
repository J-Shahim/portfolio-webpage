import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./components/Main.css";
// Import pages
import HomePage from "./HomePage";
import AboutMePage from "./AboutMePage";
import ProjectsPage from "./ProjectsPage";
import InteractiveCoderPage from "./InteractiveCoderPage";
import NasaProjectPage from "./NasaProjectPage";
import DFMProjectPage from "./DFMProjectPage";
import RoboticArmProjectPage from "./RoboticArmProjectPage";
import GeothermalProjectPage from "./GeothermalProjectPage";
import RequireContextTest from "./components/RequireContextTest";
// Import skill pages
import GasDynamicsSkillPage from "./skills/GasDynamicsSkillPage";
import CombustionSkillPage from "./skills/CombustionSkillPage";
import ThermodynamicsSkillPage from "./skills/ThermodynamicsSkillPage";
import FluidMechanicsSkillPage from "./skills/FluidMechanicsSkillPage";
import MechEngrMethodsSkillPage from "./skills/MechEngrMethodsSkillPage";
import InstrumentationMeasurementsSkillPage from "./skills/InstrumentationMeasurementsSkillPage";

// Removed SkillsPage overview to prevent wide underlined tab

function App() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <BrowserRouter basename="/portfolio-webpage">
      <div className="App">
        {/* <RequireContextTest /> debug tool*/}
        <Routes>
          <Route
            path="/"
            element={<HomePage collapsed={collapsed} setCollapsed={setCollapsed} />}
          />
          {/* Skills tab and subroutes */}
          <Route path="/skills/gas-dynamics" element={<GasDynamicsSkillPage />} />
          <Route path="/skills/combustion" element={<CombustionSkillPage />} />
          <Route path="/skills/thermo-dynamics" element={<ThermodynamicsSkillPage />} />
          <Route path="/skills/fluid-mechanics" element={<FluidMechanicsSkillPage />} />
          <Route path="/skills/mech-engr-methods" element={<MechEngrMethodsSkillPage />} />
          <Route path="/skills/instrumentation-&-measurements" element={<InstrumentationMeasurementsSkillPage />} />
          {/* Projects grid with nested routes for subtabs */}
          <Route
            path="/projects"
            element={<ProjectsPage collapsed={collapsed} setCollapsed={setCollapsed} />}
          >
            <Route path="nasa-project" element={<NasaProjectPage />} />
            <Route path="interactive-coder" element={<InteractiveCoderPage />} />
            <Route path="dfm-project" element={<DFMProjectPage />} />
            <Route path="robotic-arm-project" element={<RoboticArmProjectPage />} />
            <Route path="geothermal-project" element={<GeothermalProjectPage />} />
          </Route>
          <Route
            path="*"
            element={<HomePage collapsed={collapsed} setCollapsed={setCollapsed} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;