import React, { useState } from 'react';
import ThreeJSViewer from './ThreeJSViewer';
import TextBlock from './TextBlock';
import './NasaProjectPage.css';

/**
 * ModelGalleryCarousel - a reusable carousel for 3D models with markdown popups.
 * @param {Object} props
 * @param {string[]} props.modelPaths - Array of model file paths (GLB/STL).
 * @param {string[]} props.modelDescriptions - Array of markdown file imports for each model.
 * @param {string} [props.title] - Optional title for the gallery.
 * @param {string} [props.panelClass] - Optional className for the main block.
 */

function ModelGalleryCarousel({ modelPaths, modelDescriptions, title = 'Model Gallery', panelClass = '' }) {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [popupIdx, setPopupIdx] = useState(null);
  const [panelReloadKeys, setPanelReloadKeys] = useState(Array(modelPaths.length).fill(0));
  const [showGallery, setShowGallery] = useState(false);

  const handlePanelClick = (idx) => setPopupIdx(idx);
  const closePopup = () => {
    setPopupIdx(null);
    setPanelReloadKeys(keys => keys.map((key, i) => (i === popupIdx ? key + 1 : key)));
  };

  const handlePrev = () => {
    setCarouselIndex(i => (i - 3 + modelPaths.length) % modelPaths.length);
  };
  const handleNext = () => {
    setCarouselIndex(i => (i + 3) % modelPaths.length);
  };

  return (
    <div className="collapsible-section">
      {showGallery ? (
        <main className={`main-block nasa-models-block ${panelClass}`} style={{ maxWidth: '85%', height: '65%', minHeight: '800px', position: 'relative', fontFamily: "'Times New Roman', Times, serif" }}>
          <button className="collapse-x" onClick={() => setShowGallery(false)} title="Collapse">&times;</button>
          {title && <h2 style={{ textAlign: 'center', marginBottom: 16 }}>{title}</h2>}
          <div
            className="nasa-models-carousel"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24,
              minWidth: 3 * 260 + 2 * 24,
            }}
          >
            <button
              aria-label="Previous Model"
              style={{ fontSize: 32, background: 'none', border: 'none', cursor: 'pointer', color: '#5f1d7a', padding: 8 }}
              onClick={handlePrev}
            >&#8592;</button>
            {[-1, 0, 1].map(offset => {
              const i = (carouselIndex + offset + modelPaths.length) % modelPaths.length;
              return (
                <div
                  key={i}
                  className="nasa-model-panel"
                  onDoubleClick={() => handlePanelClick(i)}
                  style={{
                    minWidth: 260, maxWidth: 520, maxHeight: 720, width: '100%', height: 720, flex: 1,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box',
                  }}
                >
                  <div style={{ width: '100%', height: '100%', maxWidth: 520, maxHeight: 520 }}>
                    <ThreeJSViewer modelPath={modelPaths[i]} />
                  </div>
                  <div className="nasa-model-title" style={{ marginTop: 8 }}>Model {i + 1}</div>
                  <button
                    style={{ marginTop: 8, fontSize: 14, background: '#5f1d7a', color: '#fff', border: 'none', borderRadius: 8, padding: '4px 12px', cursor: 'pointer' }}
                    onClick={() => handlePanelClick(i)}
                  >View Details</button>
                </div>
              );
            })}
            <button
              aria-label="Next Model"
              style={{ fontSize: 32, background: 'none', border: 'none', cursor: 'pointer', color: '#5f1d7a', padding: 8 }}
              onClick={handleNext}
            >&#8594;</button>
          </div>
        </main>
      ) : (
        <div
          className="collapsed-bar"
          onClick={() => setShowGallery(true)}
          title="Expand"
          style={{ width: '90%', justifySelf: 'center', fontFamily: "'Times New Roman', Times, serif" }}
        >
          ► {title}
        </div>
      )}
      {/* Popup block for model viewer and description */}
      {popupIdx !== null && (
        <div className="nasa-model-popup">
          <div className="nasa-model-popup-content">
            <button className="collapse-x" onClick={closePopup} title="Close">&times;</button>
            <div style={{ width: '100%', height: '75%' }}>
              <ThreeJSViewer key={modelPaths[popupIdx]} modelPath={modelPaths[popupIdx]} />
            </div>
            <TextBlock content={modelDescriptions[popupIdx]} format="markdown" />
          </div>
          <div className="nasa-model-popup-backdrop" onClick={closePopup}></div>
        </div>
      )}
    </div>
  );
}

export default ModelGalleryCarousel;
