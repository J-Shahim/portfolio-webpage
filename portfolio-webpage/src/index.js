import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ErrorBoundary } from "./ErrorBoundary"; // <-- Import ErrorBoundary

if (process.env.NODE_ENV === "production") {
  window.addEventListener("error", function (e) {
    if (e.message && e.message.includes("Unexpected token '<'") && e.filename && e.filename.includes("stackframe.js")) {
      e.preventDefault();
      return false;
    }
  });
}

ReactDOM.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  document.getElementById("root")
);