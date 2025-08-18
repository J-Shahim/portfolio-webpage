import React, { useEffect, useRef, Suspense } from "react";
import ThreeJSViewer from "./ThreeJSViewer";
import Plotly from "plotly.js-dist-min";

/* --------------------------------------------------------------------------
   PortalOutputViewer Component
   Renders output based on type: text, HTML, SVG, canvas, 3D/WebGL, or Plotly.
   Props:
     - type: "text" | "html" | "svg" | "canvas" | "3d" | "plotly"
     - content: string (for text, html, svg)
     - canvasDraw: function(canvas) (for canvas)
     - modelPath: string (for 3d)
     - plotlyData: array (for plotly)
     - plotlyLayout: object (for plotly)
-------------------------------------------------------------------------- */
export default function PortalOutputViewer({
  type = "text",
  content = "",
  canvasDraw,
  modelPath = "/assets/models/Test.glb",
  plotlyData,
  plotlyLayout
}) {
  const canvasRef = useRef(null);
  const plotlyRef = useRef(null);

  // Canvas rendering for 2D graphics
  useEffect(() => {
    if (type === "canvas" && canvasDraw && canvasRef.current) {
      canvasDraw(canvasRef.current);
    }
  }, [type, canvasDraw]);

  // Plotly rendering
  useEffect(() => {
    if (type === "plotly" && plotlyRef.current && plotlyData) {
      Plotly.newPlot(plotlyRef.current, plotlyData, plotlyLayout || {});
    }
  }, [type, plotlyData, plotlyLayout]);

  if (type === "text") {
    return <pre className="portal-output-text">{content}</pre>;
  }

  if (type === "html") {
    return <div className="portal-output-html" dangerouslySetInnerHTML={{ __html: content }} />;
  }

  if (type === "svg") {
    return <div className="portal-output-svg" dangerouslySetInnerHTML={{ __html: content }} />;
  }

  if (type === "canvas") {
    return (
      <canvas
        ref={canvasRef}
        width={400}
        height={300}
        style={{ border: "1px solid #ccc", background: "#fff" }}
      />
    );
  }

  if (type === "3d") {
    // Use your existing ThreeJSViewer component
    return <ThreeJSViewer modelPath={modelPath} />;
  }

  if (type === "plotly") {
    return (
      <div
        ref={plotlyRef}
        style={{ width: "100%", height: "400px" }}
        className="portal-output-plotly"
      />
    );
  }

  return <div>Unsupported output type.</div>;
}