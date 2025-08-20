import React from "react";
import Header from './components/Header';
import TextBlock from './components/TextBlock';
import gasDynamicsText from "./assets/texts/gas-dynamics-project/gas-dynamics-project.md"; // adjust path as needed

function GasDynamicsProjectPage({ collapsed, setCollapsed }) {
  return (
    <>
      <div className={`main-content${collapsed ? " header-collapsed" : ""}`}>
        <div className="main-flex-row">
          <main className="main-block">
            <h1>GAS Dynamics Project</h1>
            <TextBlock content={gasDynamicsText} format="markdown" />
            {/* Add more GAS Dynamics project UI/components here */}
          </main>
        </div>
      </div>
    </>
  );
}

export default GasDynamicsProjectPage;