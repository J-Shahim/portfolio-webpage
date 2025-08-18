import React, { useRef, useState, useEffect } from "react";
import Split from 'react-split';
import MonacoEditor from "@monaco-editor/react";
import PortalOutputViewer from "./PortalOutputViewer";
import * as THREE from "three";
import Plotly from "plotly.js-dist-min";
import { ReactSVG } from 'react-svg';
import "./CodeEditorPortal.css";

let pyodideReadyPromise = null;
let pyodideInstance = null;

async function loadPyodideIfNeeded() {
  if (!pyodideInstance) {
    if (!pyodideReadyPromise) {
      pyodideReadyPromise = window.loadPyodide({

      });
    }
    pyodideInstance = await pyodideReadyPromise;
  }
  return pyodideInstance;
}

export default function CodeEditorPortal({ language, code, setCode }) {
  const [outputType, setOutputType] = useState("text");
  const [outputContent, setOutputContent] = useState("");
  const [canvasDraw, setCanvasDraw] = useState(null);
  const [modelPath, setModelPath] = useState("/assets/models/Test.glb");
  const [plotlyData, setPlotlyData] = useState(null);
  const [plotlyLayout, setPlotlyLayout] = useState(null);
  const [consoleOutput, setConsoleOutput] = useState("");
  const [plotSVG, setPlotSVG] = useState("");
  const plotRef = useRef(null);
  const editorRef = useRef(null);
  const consoleRef = useRef(null);

  // PATCH: Dynamically resize all images, SVGs, canvases in output block
  useEffect(() => {
    const plotDiv = plotRef.current;
    if (!plotDiv) return;

    const resizePlotContent = () => {
      plotDiv.querySelectorAll("img, svg, canvas").forEach(elem => {
        elem.style.width = "100%";
        elem.style.height = "100%";
        elem.style.objectFit = "contain";
        elem.style.display = "block";
      });
    };

    const observer = new window.ResizeObserver(resizePlotContent);
    observer.observe(plotDiv);

    // Initial resize
    resizePlotContent();

    return () => {
      observer.disconnect();
    };
  }, [plotSVG, plotRef, outputContent, canvasDraw, plotlyData]);

  function handleEditorDidMount(editor) {
    editorRef.current = editor;
  }

  function clearAllOutputs() {
    setConsoleOutput("");
    setOutputType("text");
    setOutputContent("");
    setCanvasDraw(null);
    setModelPath("/assets/models/Test.glb");
    setPlotlyData(null);
    setPlotlyLayout(null);
    setPlotSVG("");
    if (plotRef.current) plotRef.current.innerHTML = "";
  }

  async function runCode() {
    // Extra robust: always clear output window before running code
    clearAllOutputs();
    if (plotRef.current) plotRef.current.innerHTML = "";

    // --- JavaScript ---
    if (language === "javascript") {
      let consoleLogs = [];
      const originalConsoleLog = window.console.log;
      window.console.log = (...args) => {
        consoleLogs.push(args.join(" "));
        originalConsoleLog(...args);
      };

      try {
        const func = new Function("THREE", "outputDiv", "Plotly", code);
        func(THREE, plotRef.current, Plotly);
        setConsoleOutput(consoleLogs.join("\n"));
      } catch (err) {
        setConsoleOutput(err.toString());
        if (plotRef.current) plotRef.current.innerHTML = "";
      }
      window.console.log = originalConsoleLog;
      return;
    }

    // --- Python ---
    if (language === "python") {
      // Debug log before clearing output field
      if (plotRef.current) {
        console.log("Before clear: plotRef.current.innerHTML =", plotRef.current.innerHTML);
        plotRef.current.innerHTML = "";
        console.log("After clear: plotRef.current.innerHTML =", plotRef.current.innerHTML);
      }

      const pyodide = await loadPyodideIfNeeded();
      let svg = "";
      let textOutput = "";

      try {
        await pyodide.loadPackage("matplotlib");
        await pyodide.runPythonAsync(`
import sys
from io import StringIO
sys.stdout = sys.stderr = mystdout = StringIO()
`);
        await pyodide.runPythonAsync(`
import matplotlib.pyplot as plt
plt.ioff()
`);
        await pyodide.runPythonAsync(code);

        // Extract SVG from matplotlib
        try {
          svg = await pyodide.runPythonAsync(`
import matplotlib.pyplot as plt
import io
buf = io.StringIO()
plt.gcf().savefig(buf, format="svg")
svg_output = buf.getvalue()
buf.close()
svg_output
`);
        } catch (e) {
          svg = "";
        }
        // Get stdout (print output)
        try {
          textOutput = await pyodide.runPythonAsync("mystdout.getvalue()");
        } catch (e) {
          textOutput = "";
        }

        setConsoleOutput(textOutput && textOutput.trim() !== "" ? textOutput : "");

        if (svg && typeof svg === "string" && svg.includes("<svg")) {
          let cleanedSVG = svg.replace(/<\?xml[\s\S]*?\?>/i, "")
                              .replace(/<!DOCTYPE[\s\S]*?>/i, "");
          cleanedSVG = cleanedSVG.trim().replace(/^[\s\S]*?(<svg[\s\S]*<\/svg>)/i, "$1");
          if (plotRef.current) {
            plotRef.current.innerHTML = cleanedSVG;
            const svgElem = plotRef.current.querySelector("svg");
            if (svgElem) {
              svgElem.setAttribute("width", "100%");
              svgElem.setAttribute("height", "100%");
              svgElem.style.width = "100%";
              svgElem.style.height = "100%";
              svgElem.style.display = "block";
            }
            // Debug log after rendering SVG
            console.log("After SVG render: plotRef.current.innerHTML =", plotRef.current.innerHTML);
          }
        } else {
          // Debug log before and after clearing output field (no SVG)
          if (plotRef.current) {
            console.log("Before clear (no SVG): plotRef.current.innerHTML =", plotRef.current.innerHTML);
            plotRef.current.innerHTML = "";
            console.log("After clear (no SVG): plotRef.current.innerHTML =", plotRef.current.innerHTML);
            plotRef.current.style.display = "none";
            setTimeout(() => {
              if (plotRef.current) plotRef.current.style.display = "block";
            }, 0);
          }
        }
      } catch (err) {
        setConsoleOutput(err.toString());
        if (plotRef.current) {
          console.log("Before clear (error): plotRef.current.innerHTML =", plotRef.current.innerHTML);
          plotRef.current.innerHTML = "";
          console.log("After clear (error): plotRef.current.innerHTML =", plotRef.current.innerHTML);
          plotRef.current.style.display = "none";
          setTimeout(() => {
            if (plotRef.current) plotRef.current.style.display = "block";
          }, 0);
        }
      }
      return;
    }
  }

  const hasPlotOutput = outputType === "canvas" || outputType === "3d" || outputType === "plotly";

  return (
  <div>
    <div className="editor-portal-root" style={{ height: "80vh", width: "100%" }}>
      <Split
        className="editor-horizontal-split"
        sizes={[65, 35]}
        minSize={200}
        gutterSize={8}
        direction="horizontal"
        style={{ height: "100%", width: "100%" }}
      >
        <div className="editor-pane">
          <MonacoEditor
            height="100%"
            width="100%"
            language={language}
            value={code}
            onChange={setCode}
            onMount={handleEditorDidMount}
            options={{ fontSize: 16, minimap: { enabled: false } }}
          />
        </div>
        <div className="editor-right-pane" style={{ flex: 1, minWidth: 0, minHeight: 0, height: "100%" }}>
          <Split
            className="editor-output-console-split"
            sizes={[50, 50]}
            minSize={100}
            gutterSize={8}
            direction="vertical"
            style={{ height: "100%", width: "100%" }}
          >
            <div className="editor-output-block">
              <div className="editor-title-block">Output</div>
              <div
                id="plot-output"
                className="editor-plot-block"
                ref={plotRef}
              >
                {hasPlotOutput && plotSVG && (
                  <ReactSVG src={`data:image/svg+xml;utf8,${encodeURIComponent(plotSVG)}`} />
                )}
              </div>
            </div>
            <div className="editor-console-block">
              <div className="editor-title-block">Console</div>
              <div className="editor-console-content">
                <pre
                  ref={consoleRef}
                  className="editor-console-text"
                >
                  {consoleOutput}
                </pre>
              </div>
            </div>
          </Split>
        </div>
      </Split>
    </div>
    {/* Header below main block */}
    <div className="editor-header">
      <span className="editor-lang">
        Language: <strong>{language}</strong>
      </span>
      <div className="editor-header-actions">
        <button className="run-btn" onClick={clearAllOutputs}>
          Clear Output
        </button>
        <button className="run-btn" onClick={runCode} style={{ marginLeft: "8px" }}>
          Run Code
        </button>
      </div>
    </div>
  </div>
);
}