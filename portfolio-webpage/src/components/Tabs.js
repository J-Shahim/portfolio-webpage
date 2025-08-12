import React from "react";
import { Link } from "react-router-dom";
import "./Tabs.css";

export default function Tabs(props) {
  return (
    <nav className="header-tabs" ref={props.ref}>
      <div className="tab-group">
        {/* Home Tab (no dropdown) */}
        <div className="tab">
          <Link className="tab-btn" to="/">Home</Link>
        </div>
        {/* About Tab with dropdown */}
        <div className="tab" tabIndex={0}>
          <button className="tab-btn" type="button">About</button>
          <div className="dropdown">
            <Link to="/about-me">About Me</Link>
            <Link to="/skills">Skills</Link>
          </div>
        </div>
        {/* Projects Tab with dropdown */}
        <div className="tab" tabIndex={0}>
          <button className="tab-btn" type="button">Projects</button>
          <div className="dropdown">
            <Link to="/web-projects">Web Projects</Link>
            <Link to="/class-projects">Class Projects</Link>
          </div>
        </div>
        {/* Contact Tab with dropdown */}
        <div className="tab" tabIndex={0}>
          <button className="tab-btn" type="button">Contact</button>
          <div className="dropdown">
            <Link to="/email">Email</Link>
            <Link to="/social">Social</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}