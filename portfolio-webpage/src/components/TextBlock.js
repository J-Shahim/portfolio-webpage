import React from "react";
import ReactMarkdown from "react-markdown";

export default function TextBlock({ content, format = "plain" }) {
  if (!content) return null;

  switch (format) {
    case "html":
      return <div className="text-block" dangerouslySetInnerHTML={{ __html: content }} />;
    case "markdown":
      return <div className="text-block"><ReactMarkdown>{content}</ReactMarkdown></div>;
    default:
      // plain text, auto-wrap in <p>
      return <div className="text-block"><p>{content}</p></div>;
  }
}