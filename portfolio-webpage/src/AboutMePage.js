import React from "react";
import Header from './components/Header';
import TextBlock from './components/TextBlock';
import aboutMeText from "./assets/texts/about/about-me.md"; // adjust path as needed

function AboutMePage({ collapsed, setCollapsed }) {
  return (
    <>
      <Header imageDir="about" videoDir="about" collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={`main-content${collapsed ? " header-collapsed" : ""}`}>
        <div className="main-flex-row">
          <main className="main-block">
            <TextBlock content={aboutMeText} format="markdown" />
          </main>
        </div>
      </div>
    </>
  );
}

export default AboutMePage;