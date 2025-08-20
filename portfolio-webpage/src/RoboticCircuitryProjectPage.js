import React from "react";
import Header from './components/Header';
import TextBlock from './components/TextBlock';
import roboticCircuitryText from './assets/texts/robotic-circuitry-project.md?raw'; // adjust path as needed

function RoboticCircuitryProjectPage({ collapsed, setCollapsed }) {
  return (
    <>
      <Header imageDir="robotic-circuitry" videoDir="robotic-circuitry" collapsed={collapsed} setCollapsed={setCollapsed} />
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