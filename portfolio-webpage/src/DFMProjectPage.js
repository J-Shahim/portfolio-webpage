import React from "react";
import Header from './components/Header';
import TextBlock from './components/TextBlock';
import dfmProjectText from "./assets/texts/dfm-project/dfm-project.md"; // adjust path as needed

function DFMProjectPage({ collapsed, setCollapsed }) {
  return (
    <>
      <Header imageDir="dfm" videoDir="dfm" collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={`main-content${collapsed ? " header-collapsed" : ""}`}>
        <div className="main-flex-row">
          <main className="main-block">
            <h1>Design For Manufacturing (DFM) Project</h1>
            <TextBlock content={dfmProjectText} format="markdown" />
            {/* Add more DFM project UI/components here */}
          </main>
        </div>
      </div>
    </>
  );
}

export default DFMProjectPage;