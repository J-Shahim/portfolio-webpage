import ReactMarkdown from "react-markdown";

/* --------------------------------------------------------------------------
   TextBlock Component
   Renders a block of text in plain, markdown, or HTML format.
   Props:
     - content: the text content to display
     - format: "plain", "markdown", or "html" (default: "plain")
-------------------------------------------------------------------------- */
export default function TextBlock({ content, format = "plain" }) {
  // Return nothing if no content is provided
  if (!content) return null;

  // Render based on format prop
  switch (format) {
    case "html":
      // Render HTML content safely (be cautious with untrusted input)
      return <div className="text-block" dangerouslySetInnerHTML={{ __html: content }} />;
    case "markdown":
      // Render markdown content using ReactMarkdown
      return <div className="text-block"><ReactMarkdown>{content}</ReactMarkdown></div>;
    default:
      // Render plain text, wrapped in a paragraph
      return <div className="text-block"><p>{content}</p></div>;
  }
}