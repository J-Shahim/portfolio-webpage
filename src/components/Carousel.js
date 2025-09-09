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
}) => {
  // Calculate indices for 9 objects
  const getIndex = (i, length) => (i + length) % length;
  const farFarPrevIndex = getIndex(index - 3, backgrounds.length);
  const farFarNextIndex = getIndex(index + 3, backgrounds.length);
  const farFarFarPrevIndex = getIndex(index - 4, backgrounds.length);
  const farFarFarNextIndex = getIndex(index + 4, backgrounds.length);

  return (
    <div className="carousel-container">
      {hasBackgrounds ? (
        <>
          {renderBg(backgrounds[farFarFarPrevIndex], 'far-far-far-left', false)}
          {renderBg(backgrounds[farFarPrevIndex], 'far-far-left', false)}
          {renderBg(backgrounds[farPrevIndex], 'far-left', false)}
          {renderBg(backgrounds[prevIndex], 'left', false)}
          {renderBg(backgrounds[index], 'center', true)}
          {renderBg(backgrounds[nextIndex], 'right', false)}
          {renderBg(backgrounds[farNextIndex], 'far-right', false)}
          {renderBg(backgrounds[farFarNextIndex], 'far-far-right', false)}
          {renderBg(backgrounds[farFarFarNextIndex], 'far-far-far-right', false)}
        </>
      ) : (
        <div className="carousel-placeholder">
          <p style={{ color: "#fff", padding: "40px", fontFamily: "'Times New Roman', Times, serif" }}>
            No images or videos found for this section.
          </p>
        </div>
      )}
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
};

export default Carousel;