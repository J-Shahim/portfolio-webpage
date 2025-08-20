import React, { useEffect, useRef, useState } from "react";
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

      {/* ----------------------------------------------------------------------
        Dropdown Menu
        Navigation links, shown on hover/focus of the bubble.
      ---------------------------------------------------------------------- */}
      <div className="menu-bubble-dropdown">
        <Link to="/">Home</Link>
        <Link to="/about-me">About Me</Link>
        <div
          className="projects-dropdown"
          onMouseEnter={() => setProjectsOpen(true)}
          onMouseLeave={() => setProjectsOpen(false)}
          onClick={() => setProjectsOpen((open) => !open)}
          style={{ position: "relative" }}
        >
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
            <Link to="interactive-coder">Interactive Coder</Link>
            <Link to="nasa-project">NASA Project</Link>
            <Link to="dfm-project">DFM Project</Link>
            <Link to="robotic-arm-project">Robotic Arm Project</Link>
            <Link to="gas-dynamics-project">GAS Dynamics Project</Link>
            <Link to="ht-projects">HT Projects</Link>
            <Link to="robotic-circuitry-project">Robotic Circuitry Project</Link>
          </div>
        </div>
      </div>
    </div>
  );
}