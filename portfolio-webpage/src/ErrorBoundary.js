import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // Optionally log error
  }
  render() {
    if (this.state.hasError) {
      // Render nothing or a fallback UI
      return null;
    }
    return this.props.children;
  }
}