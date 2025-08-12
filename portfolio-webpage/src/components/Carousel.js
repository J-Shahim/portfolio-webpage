import React from "react";
import "./Carousel.css";
import ArrowButton from "./ArrowButton";

const Carousel = ({
  backgrounds,
  index,
  renderBg,
  prevIndex,
  nextIndex,
  farPrevIndex,
  farNextIndex,
  hasBackgrounds,
  handlePrev,
  handleNext,
}) => (
  <div className="carousel-container">
    {hasBackgrounds ? (
      <>
        {renderBg(backgrounds[farPrevIndex], 'far-left', false)}
        {renderBg(backgrounds[prevIndex], 'left', false)}
        {renderBg(backgrounds[index], 'center', true)}
        {renderBg(backgrounds[nextIndex], 'right', false)}
        {renderBg(backgrounds[farNextIndex], 'far-right', false)}
      </>
    ) : (
      <div className="carousel-placeholder">
        <p style={{ color: "#fff", padding: "40px" }}>
          No images or videos found for this section.
        </p>
      </div>
    )}
    {/* Arrow buttons */}
    <ArrowButton
      direction="left"
      onClick={handlePrev}
      ariaLabel="Previous"
    />
    <ArrowButton
      direction="right"
      onClick={handleNext}
      ariaLabel="Next"
    />
  </div>
);

export default Carousel;