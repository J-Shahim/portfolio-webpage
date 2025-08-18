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
  const [invisible, setInvisible] = useState(false);

  useEffect(() => {
    if (!collapsed) {
      // Gallery is expanding: hide button, then fade in after delay
      setInvisible(true);
      const timeout = setTimeout(() => setInvisible(false), 1200); // 1.2s delay
      return () => clearTimeout(timeout);
    }
  }, [collapsed]);

  if (!show) return null;

  return (
    <div
      className={`menu-bubble${collapsed ? " collapsed" : ""}${
        invisible ? " invisible" : ""
      }`}
      ref={tabBubbleRef}
      tabIndex={-1}
    >
      {/* ----------------------------------------------------------------------
        Menu Bubble Button
        Triggers the dropdown menu.
      ---------------------------------------------------------------------- */}
      <button
        className={`menu-bubble-btn${invisible ? " invisible" : ""}`}
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
        <Link to="/skills">Skills</Link>
        <Link to="/web-projects">Web Projects</Link>
        <Link to="/class-projects">Class Projects</Link>
        <Link to="/email">Email</Link>
        <Link to="/social">Social</Link>
      </div>
    </div>
  );
}