import React from "react";
import { Link, Outlet } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import "./ProjectsPage.css"; // <-- Add this import

const projects = [
  {
    title: "Interactive Coder",
    image: "/portfolio-webpage/assets/images/interactive-coder.png",
    md: "## Interactive Coder\nA live coding environment for JavaScript.",
    link: "/portfolio-webpage/projects/interactive-coder"
  },
  {
    title: "NASA Project",
    image: "/portfolio-webpage/assets/images/nasa-project.png",
    md: "## NASA Project\nA web application showcasing NASA's latest missions and data.",
    link: "/portfolio-webpage/projects/nasa-project"
  },
  // Add more projects here
];

function ProjectsPage({ collapsed, setCollapsed }) {
  return (
    <>
      <Header imageDir="web" videoDir="web" collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={`main-content${collapsed ? " header-collapsed" : ""}`}>
        <h1>Projects</h1>
        {/* Grid of project panels */}
        <div className="project-grid">
          {projects.map((project, idx) => (
            <div key={idx} className="project-panel">
              <Link to={project.link}>
                <img src={project.image} alt={project.title} />
                <h2>{project.title}</h2>
              </Link>
              <ReactMarkdown>{project.md}</ReactMarkdown>
            </div>
          ))}
        </div>
        {/* Nested route will render here */}
        <Outlet />
      </div>
    </>
  );
}

export default ProjectsPage;