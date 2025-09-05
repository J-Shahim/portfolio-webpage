import { useRef, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import MenuBubble from "./MenuBubble";
import ArrowButton from "./ArrowButton";
import "./Carousel.css";
import "./Header.css";
import "../components/Main.css";
import "./ArrowButton.css";
import "../ProjectsPage.css";

function importAll(r) {
  const images = {};
  r.keys().forEach((file) => {
    const name = file.replace('./', '');
    images[name] = r(file).default || r(file);
  });
  return images;
}

// Import all project images from src/assets/images
const projectImages = importAll(
  require.context("../assets/images", true, /\.(png|jpe?g|gif|svg)$/)
);

// Keep projects array here
const projects = [
  {
    title: "NASA Project",
    image: projectImages["nasa-project/NASA-project-panel-img.png"],
    link: "/projects/nasa-project",
  },
  {
    title: "Interactive Coder",
    image: projectImages["interactive-coder/interactive-coder.png"],
    link: "/projects/interactive-coder"
  },
  {
    image: projectImages["dfm-project.png"],
    link: "/projects/dfm-project"
  },
  {
    image: projectImages["robotic-arm-project.png"],
    link: "/projects/robotic-arm-project"
  },
  {
    image: projectImages["gas-dynamics-project.png"],
    link: "/projects/gas-dynamics-project"
  },
  {
    image: projectImages["ht-projects.png"],
    link: "/projects/ht-projects"
  },
  {
    image: projectImages["robotic-circuitry-project.png"],
    link: "/projects/robotic-circuitry-project"
  }
];

const getIndex = (i, length) => (i + length) % length;

const ProjectsHeaderCarousel = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  const headerRef = useRef(null);
  const menuBubbleRef = useRef(null);

  const [showMenuBubble, setShowMenuBubble] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const [shrinking, setShrinking] = useState(false);
  useEffect(() => {
  setCollapsed(true);
  }, [location.pathname, setCollapsed]);

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


  const [index, setIndex] = useState(0);

  // Carousel navigation handlers
  const handlePrev = () => setIndex((prev) => getIndex(prev - 1, projects.length));
  const handleNext = () => setIndex((prev) => getIndex(prev + 1, projects.length));

  // Render a project panel for the carousel
  const renderPanel = (project, position, isCenter) => {
    if (!project) return null;
    const uniqueKey = `${project.link}-${position}`;
    return (
      <Link
        key={uniqueKey}
        to={project.link}
        className={`carousel-item project-panel ${position}${isCenter ? " center" : ""}`}
        style={{ textDecoration: "none", color: "inherit"}}
      >
              {/* Title above the image, centered */}
      {project.title && (
        <h2>{project.title}</h2>
      )}
        <img src={project.image} alt={project.title} />
      </Link>
    );
  };

  // Five-panel offset indices
  const farPrevIndex = getIndex(index - 2, projects.length);
  const prevIndex = getIndex(index - 1, projects.length);
  const nextIndex = getIndex(index + 1, projects.length);
  const farNextIndex = getIndex(index + 2, projects.length);

  return (
    <>
      {collapsed ? (
        <button
          className="header-float-expand-btn"
          onClick={() => {
            if (typeof setCollapsed === "function") {
              setCollapsed(false);
              setShrinking(true);
              setContentVisible(false);
              setTimeout(() => {
                setShrinking(false);
                setContentVisible(true);
              }, 50);
            }
          }}
          aria-label="Expand projects"
          title="Expand Projects"
        >
          {/* Project icon SVG (example: folder) */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M3 7a2 2 0 0 1 2-2h4l2 3h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" fill="#fff" stroke="#5f1d7a" strokeWidth="2"/>
            <rect x="3" y="7" width="18" height="12" rx="2" fill="none" stroke="#5f1d7a" strokeWidth="2"/>
          </svg>
        </button>
      ) : (
        <header
          className={`header${collapsed ? " collapsed" : ""}${shrinking ? " shrink-out" : ""}`}
          ref={headerRef}
        >
          <button
            className="header-collapse-btn"
            onClick={() => {
              if (typeof setCollapsed === "function") {
                setContentVisible(false);
                setShrinking(true);
                setTimeout(() => {
                  setShrinking(false);
                  setCollapsed(true);
                }, 700);
              }
            }}
            aria-label="Collapse gallery"
          >
            X
          </button>
          <div className={`header-content${contentVisible ? " visible" : ""}`}>
            {/* Use Carousel component for five-panel offset */}
            <div className="gallery-header-carousel" style={{ position: "relative", height: "350px" }}>
              <ArrowButton direction="left" onClick={handlePrev} ariaLabel="Previous project" className="arrow-btn-left" />
              {renderPanel(projects[farPrevIndex], "far-left")}
              {renderPanel(projects[prevIndex], "left")}
              {renderPanel(projects[index], "center", true)}
              {renderPanel(projects[nextIndex], "right")}
              {renderPanel(projects[farNextIndex], "far-right")}
              <ArrowButton direction="right" onClick={handleNext} ariaLabel="Next project" className="arrow-btn-right" />
            </div>
          </div>
        </header>
      )}

      <MenuBubble
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        show={true}
        tabBubbleRef={menuBubbleRef}
      />
    </>
  );
};

export default ProjectsHeaderCarousel;