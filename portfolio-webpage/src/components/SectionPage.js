import React from "react";
import Header from "./Header";

function SectionPage({ title }) {
  return (
    <>
      <Header sectionTitle={title} />
      <main className="main-block">
        <h1>{title}</h1>
      </main>
    </>
  );
}

export default SectionPage;