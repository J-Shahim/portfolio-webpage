import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './components/Header';
import TextBlock from './components/TextBlock';
import roboticArmText from "./assets/texts/robotic-arm-project/robotic-arm-project.md"; // adjust path as needed
import GalleryBubble from './components/GalleryBubble';
import { assetFolderMap } from './utils/assetFolderMap';

function RoboticArmProjectPage({ collapsed: collapsedProp, setCollapsed: setCollapsedProp }) {
  // Use parent collapsed state if provided, else manage locally
  const [collapsed, setCollapsed] = collapsedProp !== undefined ? [collapsedProp, setCollapsedProp] : useState(true);
  const [showTextBlock, setShowTextBlock] = useState(false);
  const location = useLocation();
  const assetFolder = assetFolderMap[location.pathname] || 'robotic-arm-project';
  return (
    <>
      <div className={`main-content${collapsed ? " header-collapsed" : ""}`}>
        {/* Collapsible Markdown Text Section */}
        <div className="collapsible-section">
          {showTextBlock ? (
            <main className="main-block" style={{ maxWidth: "82.25%", position: "relative", fontFamily: "'Times New Roman', Times, serif" }}>
              <button
                className="collapse-x"
                onClick={() => setShowTextBlock(false)}
                title="Collapse"
              >
                &times;
              </button>
              <TextBlock content={roboticArmText} format="markdown" />
            </main>
          ) : (
            <div
              className="collapsed-bar"
              onClick={() => setShowTextBlock(true)}
              title="Expand"
              style={{
                marginTop: "120px",
                width: "90%",
                justifySelf: "center",
                fontFamily: "'Times New Roman', Times, serif",
              }}
            >
              ► 3D Robotic Arm Project Description
            </div>
          )}
        </div>
        {/* GalleryBubble always visible below */}
        <GalleryBubble 
          collapsed={collapsed} 
          setCollapsed={setCollapsed} 
          assetFolder={assetFolder} 
        />
      </div>
    </>
  );
}

export default RoboticArmProjectPage;