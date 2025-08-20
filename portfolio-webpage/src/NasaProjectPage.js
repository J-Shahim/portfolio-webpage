import React from "react";
import Header from './components/Header';
import TextBlock from './components/TextBlock';
import nasaProjectText from './assets/texts/nasa-project.md?raw'; // adjust path as needed

function NasaProjectPage({ collapsed, setCollapsed }) {
  return (
    <>
      <div className={`main-content${collapsed ? " header-collapsed" : ""}`}>
        <div className="main-flex-row">
          <main className="main-block">
            <h1>NASA Project</h1>
            <TextBlock content={nasaProjectText} format="markdown" />
            {/* Add more NASA project UI/components here */}
          </main>
        </div>
      </div>
    </>
  );
}

export default NasaProjectPage;