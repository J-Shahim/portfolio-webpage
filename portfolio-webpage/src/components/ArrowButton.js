import React from "react";
import "./ArrowButton.css";

const ArrowButton = ({
  direction = "left", // "left" or "right"
  onClick,
  onMouseEnter,
  onMouseLeave,
  ariaLabel = "Arrow",
  className = "",
  profile = false, // NEW: if true, use profile-arrow styles
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
    {direction === "left" ? "\u2190" : "\u2192"}
  </button>
);

export default ArrowButton;