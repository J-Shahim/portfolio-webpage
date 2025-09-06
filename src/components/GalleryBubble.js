import { useMemo, useState } from "react";
import Carousel from "./Carousel";
import "./GalleryBubble.css";
import "./Header.css";

function importAll(r, type) {
    return r.keys().map((file) => ({
        type,
        src: r(file).default || r(file),
    }));
}




// Statically import all possible image and video subfolders
const allImageSets = {
  'home': importAll(require.context('../assets/images/home', false, /\.(png|jpe?g|gif|PNG|JPG|JPEG|GIF)$/), 'image'),
  'about': importAll(require.context('../assets/images/about', false, /\.(png|jpe?g|gif|PNG|JPG|JPEG|GIF)$/), 'image'),
  'nasa-project': importAll(require.context('../assets/images/nasa-project', false, /\.(png|jpe?g|gif|PNG|JPG|JPEG|GIF)$/), 'image'),
  'gas-dynamics-project': importAll(require.context('../assets/images/gas-dynamics-project', false, /\.(png|jpe?g|gif|PNG|JPG|JPEG|GIF)$/), 'image'),
  'ht-projects': importAll(require.context('../assets/images/ht-projects', false, /\.(png|jpe?g|gif|PNG|JPG|JPEG|GIF)$/), 'image'),
  'interactive-coder': importAll(require.context('../assets/images/interactive-coder', false, /\.(png|jpe?g|gif|PNG|JPG|JPEG|GIF)$/), 'image'),
  'profile': importAll(require.context('../assets/images/profile', false, /\.(png|jpe?g|gif|PNG|JPG|JPEG|GIF)$/), 'image'),
  'robotic-arm-project': importAll(require.context('../assets/images/robotic-arm-project', false, /\.(png|jpe?g|gif|PNG|JPG|JPEG|GIF)$/), 'image'),
  'robotic-circuitry-project': importAll(require.context('../assets/images/robotic-circuitry-project', false, /\.(png|jpe?g|gif|PNG|JPG|JPEG|GIF)$/), 'image'),
};

const allVideoSets = {
  'home': importAll(require.context('../assets/videos/home', false, /\.(mp4|webm|ogg)$/), 'video'),
  'about': importAll(require.context('../assets/videos/about', false, /\.(mp4|webm|ogg)$/), 'video'),
  'nasa-project': importAll(require.context('../assets/videos/nasa-project', false, /\.(mp4|webm|ogg)$/), 'video'),
  'gas-dynamics-project': importAll(require.context('../assets/videos/gas-dynamics-project', false, /\.(mp4|webm|ogg)$/), 'video'),
  'ht-projects': importAll(require.context('../assets/videos/ht-projects', false, /\.(mp4|webm|ogg)$/), 'video'),
  'interactive-coder': importAll(require.context('../assets/videos/interactive-coder', false, /\.(mp4|webm|ogg)$/), 'video'),
  'profile': importAll(require.context('../assets/videos/profile', false, /\.(mp4|webm|ogg)$/), 'video'),
  'robotic-arm-project': importAll(require.context('../assets/videos/robotic-arm-project', false, /\.(mp4|webm|ogg)$/), 'video'),
  'robotic-circuitry-project': importAll(require.context('../assets/videos/robotic-circuitry-project', false, /\.(mp4|webm|ogg)$/), 'video'),
  'dfm-project': importAll(require.context('../assets/videos/dfm-project', false, /\.(mp4|webm|ogg)$/), 'video'),
};

const getIndex = (i, length) => (i + length) % length;

const GalleryBubble = ({ collapsed, setCollapsed, assetFolder = "home" }) => {
  const [contentVisible, setContentVisible] = useState(false);
  const [shrinking, setShrinking] = useState(false);
  // Only use images and videos from the specified subfolder
  console.log('GalleryBubble: assetFolder prop =', assetFolder);
  console.log('GalleryBubble: allImageSets keys =', Object.keys(allImageSets));
  const backgrounds = useMemo(() => {
    const images = allImageSets[assetFolder] || [];
    const videos = allVideoSets[assetFolder] || [];
    if (assetFolder === 'nasa-project') {
      console.log('GalleryBubble: nasa-project images', images);
      console.log('GalleryBubble: nasa-project videos', videos);
    }
    return [...images, ...videos];
  }, [assetFolder]);
  const hasBackgrounds = backgrounds.length > 0;
  const [index, setIndex] = useState(0);
  const prevIndex = getIndex(index - 1, backgrounds.length);
  const nextIndex = getIndex(index + 1, backgrounds.length);
  const farPrevIndex = getIndex(index - 2, backgrounds.length);
  const farNextIndex = getIndex(index + 2, backgrounds.length);

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

  const handlePrev = () => setIndex((prev) => getIndex(prev - 1, backgrounds.length));
  const handleNext = () => setIndex((prev) => getIndex(prev + 1, backgrounds.length));

  return (
    <div>
      {collapsed ? (
        <button
          className="gallerybubble-inline-expand-btn"
          onClick={() => {
            setCollapsed(false);
            setShrinking(true);
            setContentVisible(false);
            setTimeout(() => {
              setShrinking(false);
              setContentVisible(true);
            }, 50);
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
        <div
          className={`gallerybubble-header${shrinking ? " shrink-out" : ""}`}
        >
          <button
            className="header-collapse-btn"
            onClick={() => {
              setContentVisible(false);
              setShrinking(true);
              setTimeout(() => {
                setShrinking(false);
                setCollapsed(true);
              }, 700);
            }}
            aria-label="Collapse gallery"
          >
            X
          </button>
          <div className={`gallerybubble-header-content${contentVisible ? " visible" : ""}`}>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
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
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryBubble;
