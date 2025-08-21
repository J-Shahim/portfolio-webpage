import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "./ProjectsPage.css";
import "./components/Main.css";
import ProjectsHeaderCarousel from "./components/ProjectsHeaderCarousel";
import TextBlock from './components/TextBlock';
import projectsText from "./assets/texts/projects/projects.md?raw";


function ProjectsPage({ collapsed, setCollapsed }) {
	const location = useLocation();
	const isRootProjects = location.pathname === "/projects";

	return (
		<>
			<ProjectsHeaderCarousel
				collapsed={collapsed}
				setCollapsed={setCollapsed}
			/>
			<div className={`main-content${collapsed ? " header-collapsed" : ""}`}>
				{isRootProjects && (
					<div className="main-flex-row">
						<main className="main-block">
							<TextBlock content={projectsText} format="markdown" />
						</main>
					</div>
				)}
				<Outlet />
			</div>
		</>
	);
}

export default ProjectsPage;