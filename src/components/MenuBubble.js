import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./MenuBubble.css";

/* --------------------------------------------------------------------------
   MenuBubble Component
   Floating menu bubble for navigation.
   Props:
     - collapsed: whether the header is collapsed
     - show: whether to show the bubble
     - tabBubbleRef: ref for the bubble element
-------------------------------------------------------------------------- */

export default function MenuBubble({ collapsed, show, tabBubbleRef }) {
  const btnRef = useRef();
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [skillsOpen, setSkillsOpen] = useState(false);
  const skillsTimeoutRef = useRef();
  const projectsTimeoutRef = useRef();

  useEffect(() => {
    if (show) {
      console.log("MenuBubble: appeared");
    } else {
      console.log("MenuBubble: disappeared");
    }
  }, [show]);

  if (!show) return null;

  return (
    <div
      className={`menu-bubble${collapsed ? " collapsed" : ""}`}
      ref={tabBubbleRef}
      tabIndex={-1}
    >
      {/* ----------------------------------------------------------------------
        Menu Bubble Button
        Triggers the dropdown menu.
      ---------------------------------------------------------------------- */}
      <button
        className="menu-bubble-btn"
        ref={btnRef}
        aria-label="Open menu"
      >
        {/* Your menu icon here */}
        <span style={{ fontSize: "0.9em" }}>&#9776;</span>
      </button>
       {/** Dropdown Menu
        Navigation links, shown on hover/focus of the bubble.
      ---------------------------------------------------------------------- */}

      <div className="menu-bubble-dropdown">
        <Link to="/">Home</Link>
        <div
          className="skills-dropdown"
          onMouseEnter={() => {
            if (skillsTimeoutRef.current) clearTimeout(skillsTimeoutRef.current);
            skillsTimeoutRef.current = setTimeout(() => setSkillsOpen(true), 350);
          }}
          onMouseLeave={() => {
            if (skillsTimeoutRef.current) {
              clearTimeout(skillsTimeoutRef.current);
              skillsTimeoutRef.current = null;
            }
            skillsTimeoutRef.current = setTimeout(() => setSkillsOpen(false), 1200);
          }}
          onClick={() => setSkillsOpen((open) => !open)}
          style={{ position: "relative" }}
        >
          <span 
            className="skills-label menu-bubble-dropdown-link"
            style={{
              cursor: "default",
              fontWeight: "bold",
              color: "#f3eaff",
              padding: "10px 24px",
              borderRadius: "999px",
              display: "block",
              textAlign: "center",
              margin: "6px 0",
              background: "rgba(30, 33, 93, 0.85)",
              border: "2px solid #5f1d7a",
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: "1em",
              boxShadow: "0 2px 8px rgba(219,51,0,0.10)",
              transition: "background 0.2s, color 0.2s, box-shadow 0.2s, border-color 0.4s cubic-bezier(.4,2,.6,1)",
            }}
            tabIndex={-1}
            aria-disabled="true"
            onMouseOver={e => e.currentTarget.style.background = '#266da7'}
            onMouseOut={e => e.currentTarget.style.background = 'rgba(30, 33, 93, 0.85)'}
          >Skills</span>
          <div
            className="skills-dropdown-content"
            style={{
              display: skillsOpen ? "block" : "none",
              position: "absolute",
              left: "50px",
              top: "100%",
              textAlign: "left",
              background: "transparent",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              zIndex: 10,
              whiteSpace: "nowrap",
            }}
          >
            <Link to="/skills/gas-dynamics">Gas Dynamics</Link>
            <Link to="/skills/combustion">Combustion</Link>
            <Link to="/skills/thermo-dynamics">Thermodynamics</Link>
            <Link to="/skills/fluid-mechanics">Fluid Mechanics</Link>
            <Link to="/skills/mech-engr-methods">Mechanical Engineering Methods</Link>
            <Link to="/skills/instrumentation-&-measurements">Instrumentation & Measurements</Link>
            <Link to="/skills/sdc">System Dynamics & Controls</Link>
          </div>
        </div>
        {/* Projects dropdown always appears as a floating dropdown, not inline */}
        <div
          className="projects-dropdown"
          onMouseEnter={() => {
            if (projectsTimeoutRef.current) clearTimeout(projectsTimeoutRef.current);
            projectsTimeoutRef.current = setTimeout(() => setProjectsOpen(true), 350);
          }}
          onMouseLeave={() => {
            if (projectsTimeoutRef.current) {
              clearTimeout(projectsTimeoutRef.current);
              projectsTimeoutRef.current = null;
            }
            projectsTimeoutRef.current = setTimeout(() => setProjectsOpen(false), 1200);
          }}
          onClick={() => setProjectsOpen((open) => !open)}
          style={{ 
            position: "relative",
            // 7 subtabs * (height + gap) + extra gap after last subtab
            marginTop: skillsOpen ? `${(42 + 9) * 7 }px` : "0px"
          }}>
          <Link to="/projects">Projects</Link>
          <div
            className="projects-dropdown-content"
            style={{
              display: projectsOpen ? "block" : "none",
              position: "absolute",
              left: "50px",
              top: "100%",
              textAlign: "left",
              background: "transparent",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              zIndex: 10,
              whiteSpace: "nowrap",
            }}
          >
            <Link to="/projects/nasa-project">NASA Psyche</Link>
            <Link to="/projects/interactive-coder">Interactive Coder</Link>
            <Link to="/projects/dfm-project">Design for Manufacturing</Link>
            <Link to="/projects/robotic-arm-project">Robotic Arm</Link>
            <Link to="/projects/geothermal-project">Geothermal</Link>
            <Link to="/projects/turbojet-project">Turbojet Simulation</Link>
          </div>
        </div>
      </div>
    </div>
  );
}