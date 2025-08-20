import React from "react";
import Header from './components/Header';
import TextBlock from './components/TextBlock';
import htProjectsText from "./assets/texts/ht-projects/ht-projects.md"; // adjust path if needed

function HTProjectsPage({ collapsed, setCollapsed }) {
  return (
    <>
      <div className={`main-content${collapsed ? " header-collapsed" : ""}`}>
        <div className="main-flex-row">
          <main className="main-block">
            <h1>HT Projects</h1>
            <TextBlock content={htProjectsText} format="markdown" />
            {/* Add more HT project UI/components here */}
          </main>
        </div>
      </div>
    </>
  );
}

export default HTProjectsPage;