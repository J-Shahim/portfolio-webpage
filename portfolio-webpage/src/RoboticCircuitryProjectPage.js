import React from "react";
import Header from './components/Header';
import TextBlock from './components/TextBlock';
import roboticCircuitryText from "./assets/texts/robotic-circuitry-project/robotic-circuitry-project.md"; // adjust path as needed

function RoboticCircuitryProjectPage({ collapsed, setCollapsed }) {
  return (
    <>
      <div className={`main-content${collapsed ? " header-collapsed" : ""}`}>
        <div className="main-flex-row">
          <main className="main-block">
            <h1>Robotic Circuitry Project</h1>
            <TextBlock content={roboticCircuitryText} format="markdown" />
            {/* Add more robotic circuitry project UI/components here */}
          </main>
        </div>
      </div>
    </>
  );
}

export default RoboticCircuitryProjectPage;