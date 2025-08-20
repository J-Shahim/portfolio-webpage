import React from "react";
import "./ArrowButton.css";

/* --------------------------------------------------------------------------
   ArrowButton Component
   Reusable button for carousel or profile navigation.
   Props:
     - direction: "left" or "right" (arrow direction)
     - onClick: click handler
     - onMouseEnter, onMouseLeave: mouse event handlers
     - ariaLabel: accessibility label
     - className: additional CSS classes
     - profile: if true, applies profile-arrow styles
     - ...props: any other button props
-------------------------------------------------------------------------- */
const ArrowButton = ({
  direction = "left", // "left" or "right"
  onClick,
  onMouseEnter,
  onMouseLeave,
  ariaLabel = "Arrow",
  className = "",
  profile = false, // if true, use profile-arrow styles
  ...props
}) => (
  <button
    className={`arrow-btn arrow-btn-${direction}${profile ? " profile-arrow" : ""} ${className}`}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    aria-label={ariaLabel}
    {...props}
  >
    {/* Use < and > for arrows */}
    {direction === "left" ? "<" : ">"}
  </button>
);

export default ArrowButton;