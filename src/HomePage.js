import { useState } from "react";
import Header from "./components/Header";
import TextBlock from "./components/TextBlock";
import aboutMeText from "./assets/texts/about/about-me.md?raw";
import SMAndCTabs from "./components/SM&Ctabs";
import "./components/SM&Ctabs.css"; // Import new CSS for tab block

// Helper to import all images/videos from a folder
function importAll(r, type) {
  return r.keys().map((file) => ({
    type,
    src: r(file).default || r(file),
  }));
}

// Import profile images and videos
const profileImageSet = importAll(
  require.context("./assets/images/profile", false, /\.(png|jpe?g|gif|PNG|JPG|JPEG|GIF)$/),
  "image"
);
const profileVideoSet = [
  ...importAll(
    require.context("./assets/images/profile", false, /\.(mp4|webm|ogg|MP4|WEBM|OGG)$/),
    "video"
  ),
  ...importAll(
    require.context("./assets/videos/profile", false, /\.(mp4|webm|ogg|MP4|WEBM|OGG)$/),
    "video"
  )
];
const profileMediaSet = [...profileImageSet, ...profileVideoSet];

function HomePage({ collapsed, setCollapsed }) {
  const [profileIndex, setProfileIndex] = useState(0);

  const handlePrev = () => {
    setProfileIndex((prev) =>
      prev === 0 ? profileMediaSet.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setProfileIndex((prev) =>
      prev === profileMediaSet.length - 1 ? 0 : prev + 1
    );
  };

  const profileMedia = profileMediaSet[profileIndex];

  return (
    <>  
      <Header imageDir="home" videoDir="home" collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={`main-content${collapsed ? " header-collapsed" : ""}`}>
        <div className="main-flex-row">
          {/* Main block: markdown content */}
          <main className="main-block">
            <TextBlock content={aboutMeText} format="markdown" />
          </main>
          <div className="profile-column">
            {/* Profile block: image/video carousel */}
            <aside className="profile-block">
              {profileMediaSet.length > 1 && (
                <button
                  className="profile-arrow arrow-btn-left"
                  onClick={handlePrev}
                  aria-label="Previous profile media"
                >
                  &lt;
                </button>
              )}
              {profileMedia ? (
                profileMedia.type === "video" ? (
                  <video
                    src={profileMedia.src}
                    className="profile-img"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <img
                    src={profileMedia.src}
                    alt="Profile"
                    className="profile-img"
                  />
                )
              ) : (
                <div className="profile-img-placeholder">No profile media found</div>
              )}
              {profileMediaSet.length > 1 && (
                <button
                  className="profile-arrow arrow-btn-right"
                  onClick={handleNext}
                  aria-label="Next profile media"
                >
                  &gt;
                </button>
              )}
            </aside>
            {/* Social Media & Contact Tabs in their own themed block */}
            <section className="smc-tabs-block">
              <SMAndCTabs />
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;