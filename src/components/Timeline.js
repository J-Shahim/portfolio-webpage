import "./Timeline.css";

function Timeline() {
  return (
    <div className="timeline-tree">
      {/* Root block */}
      <div className="timeline-main-block main-block">
        <h2>Root Event</h2>
        <p>This is the start of the timeline tree.</p>
      </div>
      <div className="timeline-root-connector"></div>
      {/* First branch with two arms */}
      <div className="timeline-branch">
        <div className="timeline-arm">
          <div className="timeline-connector"></div>
          <div className="timeline-main-block main-block">
            <h3>Left Branch</h3>
            <p>Details about the left branch event.</p>
          </div>
        </div>
        <div className="timeline-arm">
          <div className="timeline-connector"></div>
          <div className="timeline-main-block main-block">
            <h3>Right Branch</h3>
            <p>Details about the right branch event.</p>
          </div>
        </div>
      </div>
      {/* Second branch with three arms */}
      <div className="timeline-branch">
        <div className="timeline-arm">
          <div className="timeline-connector"></div>
          <div className="timeline-main-block main-block">
            <h3>Left Leaf</h3>
            <p>Details about the left leaf event.</p>
          </div>
        </div>
        <div className="timeline-arm">
          <div className="timeline-connector"></div>
          <div className="timeline-main-block main-block">
            <h3>Center Leaf</h3>
            <p>Details about the center leaf event.</p>
          </div>
        </div>
        <div className="timeline-arm">
          <div className="timeline-connector"></div>
          <div className="timeline-main-block main-block">
            <h3>Right Leaf</h3>
            <p>Details about the right leaf event.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Timeline;