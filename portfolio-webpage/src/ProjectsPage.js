import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "./ProjectsPage.css";
import "./components/Main.css";
import ProjectsHeaderCarousel from "./components/ProjectsHeaderCarousel";


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
					<main className="main-block">
						<h1>Projects</h1>
					</main>
				)}
				<Outlet />
			</div>
		</>
	);
}

export default ProjectsPage;