import React from "react";
import Header from "./Header";

/* --------------------------------------------------------------------------
   SectionPage Component
   Generic wrapper for a page section.
   Accepts children and optional title/description props.
-------------------------------------------------------------------------- */
const SectionPage = ({ title, description, children }) => (
  <section className="section-page">
    {/* ----------------------------------------------------------------------
        Section Title
        Displays the section's title if provided.
    ---------------------------------------------------------------------- */}
    {title && <h2 className="section-title">{title}</h2>}

    {/* ----------------------------------------------------------------------
        Section Description
        Displays the section's description if provided.
    ---------------------------------------------------------------------- */}
    {description && <p className="section-description">{description}</p>}

    {/* ----------------------------------------------------------------------
        Section Content
        Renders any children passed to the component.
    ---------------------------------------------------------------------- */}
    <div className="section-content">{children}</div>
  </section>
);

export default SectionPage;