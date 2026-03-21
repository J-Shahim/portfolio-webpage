import "./components/Main.css";
import "./TurbojetProjectPage.css";
import turbojetImage from "./assets/images/turbojet-project/turbojet-panel.png";

const turbojetUrl = "https://j-shahim.github.io/Turbojet-Project/";

function TurbojetProjectPage() {
  return (
    <div className="main-content">
      <main className="main-block turbojet-project">
        <h1>Turbojet Simulation</h1>
        <p className="turbojet-description">
          Interactive turbojet engine web tool that visualizes a real-time
          thermodynamic analysis along the flowpath. Explore how key stages
          respond as you adjust operating conditions, then launch the live
          simulation for hands-on exploration.
        </p>
        <div className="turbojet-hero">
          <img
            src={turbojetImage}
            alt="Turbojet Engine - Real-time Thermodynamic Analysis"
          />
        </div>
        <a
          className="turbojet-launch"
          href={turbojetUrl}
          target="_blank"
          rel="noreferrer"
        >
          Launch Tool
        </a>
      </main>
    </div>
  );
}

export default TurbojetProjectPage;
