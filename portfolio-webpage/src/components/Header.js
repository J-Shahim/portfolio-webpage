import React, { useMemo, useRef, useState, useEffect } from "react";
import MenuBubble from "./MenuBubble";
import Carousel from "./Carousel";
import "./Header.css";

/* --------------------------------------------------------------------------
   Asset Import Helpers
   Dynamically imports all images and videos from asset folders for use in the carousel.
-------------------------------------------------------------------------- */
function importAll(r, type) {
    return r.keys().map((file) => ({
        type,
        src: r(file).default || r(file),
    }));
}

const allImageSets = {
    home: importAll(require.context('../assets/images/home', false, /\.(png|jpe?g|gif|PNG|JPG|JPEG|GIF)$/), 'image'),
    about: importAll(require.context('../assets/images/about', false, /\.(png|jpe?g|gif|PNG|JPG|JPEG|GIF)$/), 'image'),
    skills: importAll(require.context('../assets/images/skills', false, /\.(png|jpe?g|gif|PNG|JPG|JPEG|GIF)$/), 'image'),
    web: importAll(require.context('../assets/images/web', false, /\.(png|jpe?g|gif|PNG|JPG|JPEG|GIF)$/), 'image'),
    mobile: importAll(require.context('../assets/images/mobile', false, /\.(png|jpe?g|gif|PNG|JPG|JPEG|GIF)$/), 'image'),
    email: importAll(require.context('../assets/images/email', false, /\.(png|jpe?g|gif|PNG|JPG|JPEG|GIF)$/), 'image'),
    social: importAll(require.context('../assets/images/social', false, /\.(png|jpe?g|gif|PNG|JPG|JPEG|GIF)$/), 'image'),
};

const allVideoSets = {
    home: importAll(require.context('../assets/videos/home', false, /\.(mp4|webm|ogg)$/), 'video'),
    about: importAll(require.context('../assets/videos/about', false, /\.(mp4|webm|ogg)$/), 'video'),
    skills: importAll(require.context('../assets/videos/skills', false, /\.(mp4|webm|ogg)$/), 'video'),
    web: importAll(require.context('../assets/videos/web', false, /\.(mp4|webm|ogg)$/), 'video'),
    mobile: importAll(require.context('../assets/videos/mobile', false, /\.(mp4|webm|ogg)$/), 'video'),
    email: importAll(require.context('../assets/videos/email', false, /\.(mp4|webm|ogg)$/), 'video'),
    social: importAll(require.context('../assets/videos/social', false, /\.(mp4|webm|ogg)$/), 'video'),
};

/* --------------------------------------------------------------------------
   Carousel Index Helper
   Ensures carousel index wraps around correctly.
-------------------------------------------------------------------------- */
const getIndex = (i, length) => (i + length) % length;

/* --------------------------------------------------------------------------
   Header Component
   Displays the animated header with carousel and menu bubble.
   Handles expand/collapse, background transitions, and responsive behavior.
-------------------------------------------------------------------------- */
const Header = ({ imageDir = "home", videoDir = "home" }) => {
  // Refs for DOM elements
  const headerRef = useRef(null);
  const menuBubbleRef = useRef(null);

  // State for header visibility and animation
  const [collapsed, setCollapsed] = useState(true);
  const [showMenuBubble, setShowMenuBubble] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [shrinking, setShrinking] = useState(false);

  /* ------------------------------------------------------------------------
     Show menu bubble on scroll/resize
  ------------------------------------------------------------------------ */
  useEffect(() => {
    function updateMenuBubble() {
      setShowMenuBubble(true);
    }
    window.addEventListener("scroll", updateMenuBubble);
    window.addEventListener("resize", updateMenuBubble);
    updateMenuBubble();
    return () => {
      window.removeEventListener("scroll", updateMenuBubble);
      window.removeEventListener("resize", updateMenuBubble);
    };
  }, []);

  /* ------------------------------------------------------------------------
     Combine images and videos for carousel backgrounds
  ------------------------------------------------------------------------ */
  const backgrounds = useMemo(() => {
    const images = allImageSets[imageDir] || [];
    const videos = allVideoSets[videoDir] || [];
    return [...images, ...videos];
  }, [imageDir, videoDir]);

  const hasBackgrounds = backgrounds.length > 0;

  // Carousel index management
  const [index, setIndex] = useState(0);
  const prevIndex = getIndex(index - 1, backgrounds.length);
  const nextIndex = getIndex(index + 1, backgrounds.length);
  const farPrevIndex = getIndex(index - 2, backgrounds.length);
  const farNextIndex = getIndex(index + 2, backgrounds.length);

  /* ------------------------------------------------------------------------
     Renders a background image or video for the carousel
  ------------------------------------------------------------------------ */
  const renderBg = (bg, position, isCenter) => {
    if (!bg) return null;
    const uniqueKey = `${bg.src}-${position}`;
    if (bg.type === "image") {
      return (
        <img
          key={uniqueKey}
          src={bg.src}
          alt=""
          className={`carousel-item ${position}${isCenter ? " center" : ""}`}
        />
      );
    }
    if (bg.type === "video") {
      return (
        <video
          key={uniqueKey}
          src={bg.src}
          className={`carousel-item ${position}${isCenter ? " center" : ""}`}
          autoPlay
          loop
          muted
        />
      );
    }
    return null;
  };

  // Carousel navigation handlers
  const handlePrev = () => setIndex((prev) => getIndex(prev - 1, backgrounds.length));
  const handleNext = () => setIndex((prev) => getIndex(prev + 1, backgrounds.length));

  // Fade duration in ms (should match your CSS)
  const FADE_DURATION = 5000;

  /* ------------------------------------------------------------------------
     Render
     Shows either the floating expand button (when collapsed) or the header.
     Handles expand/collapse animation and passes backgrounds to Carousel.
  ------------------------------------------------------------------------ */
  return (
    <>
      {collapsed ? (
        // Floating expand button (shows when header is collapsed)
        <button
          className="header-float-expand-btn"
          onClick={() => {
            setCollapsed(false);      // Show header (but keep shrinking)
            setShrinking(true);       // Start small and invisible
            setContentVisible(false); // Content invisible
            setTimeout(() => {
              setShrinking(false);    // Animate to full size and visible
              setContentVisible(true);
            }, 50); // Short delay to ensure DOM update
          }}
          aria-label="Expand gallery"
          title="Expand Gallery"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="5" width="18" height="14" rx="2" fill="#fff" stroke="#5f1d7a" strokeWidth="2"/>
            <circle cx="8" cy="10" r="2" fill="#5f1d7a"/>
            <path d="M21 19l-5.5-7-4.5 6-3-4-4 5" stroke="#5f1d7a" strokeWidth="2" fill="none"/>
          </svg>
        </button>
      ) : (
        // Main header block with carousel and collapse button
        <header
          className={`header${collapsed ? " collapsed" : ""}${shrinking ? " shrink-out" : ""}`}
          ref={headerRef}
        >
          {/* Collapse button (top-right) */}
          <button
            className="header-collapse-btn"
            onClick={() => {
              setContentVisible(false); // Fade out content
              setShrinking(true);       // Shrink header
              setTimeout(() => {
                setShrinking(false);
                setCollapsed(true);     // Hide header after animation
              }, 700); // Match CSS transition duration
            }}
            aria-label="Collapse gallery"
          >
            X
          </button>
          {/* Carousel content (fades in/out) */}
          <div className={`header-content${contentVisible ? " visible" : ""}`}>
            <Carousel
              backgrounds={backgrounds}
              index={index}
              renderBg={renderBg}
              prevIndex={prevIndex}
              nextIndex={nextIndex}
              farPrevIndex={farPrevIndex}
              farNextIndex={farNextIndex}
              hasBackgrounds={hasBackgrounds}
              handlePrev={handlePrev}
              handleNext={handleNext}
            />
          </div>
        </header>
      )}

      {/* Floating menu bubble (always visible) */}
      <MenuBubble
        collapsed={collapsed}
        show={showMenuBubble}
        tabBubbleRef={menuBubbleRef}
      />
    </>
  );
};

export default Header;


