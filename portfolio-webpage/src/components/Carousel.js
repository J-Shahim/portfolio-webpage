import "./Carousel.css";
import ArrowButton from "./ArrowButton";

/* --------------------------------------------------------------------------
   Carousel Component
   Displays a set of background images/videos in a sliding carousel.
   Handles navigation, transitions, and layout for the header gallery.
   Props:
     - backgrounds: Array of image/video objects to display.
     - index: Current center index.
     - renderBg: Function to render each background item.
     - prevIndex, nextIndex, farPrevIndex, farNextIndex: Indices for carousel positions.
     - hasBackgrounds: Boolean, true if backgrounds exist.
     - handlePrev, handleNext: Navigation handlers.
-------------------------------------------------------------------------- */
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
    {/* ----------------------------------------------------------------------
        Carousel Items
        Renders images/videos in their respective positions.
        If no backgrounds, shows a placeholder message.
    ---------------------------------------------------------------------- */}
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
    {/* ----------------------------------------------------------------------
        Carousel Navigation Arrows
        Left and right arrow buttons for navigation.
    ---------------------------------------------------------------------- */}
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