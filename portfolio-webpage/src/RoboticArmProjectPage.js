import React from "react";
import Header from './components/Header';
import TextBlock from './components/TextBlock';
import roboticArmText from './assets/texts/robotic-arm-project.md?raw'; // adjust path as needed

function RoboticArmProjectPage({ collapsed, setCollapsed }) {
  return (
    <>
      <Header imageDir="robotic-arm" videoDir="robotic-arm" collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={`main-content${collapsed ? " header-collapsed" : ""}`}>
        <div className="main-flex-row">
          <main className="main-block">
            <h1>3D Robotic Arm Linkage Project</h1>
            <TextBlock content={roboticArmText} format="markdown" />
            {/* Add more robotic arm project UI/components here */}
          </main>
        </div>
      </div>
    </>
  );
}

export default RoboticArmProjectPage;