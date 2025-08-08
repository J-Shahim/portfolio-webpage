import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import './Header.css';

// Dynamically import all images and videos from src/assets
function importAll(r, type) {
    return r.keys().map((file) => ({
        type,
        src: r(file).default || r(file),
    }));
}

const imageFiles = importAll(require.context('../assets/images', false, /\.(png|jpe?g|gif)$/), 'image');
const videoFiles = importAll(require.context('../assets/videos', false, /\.(mp4|webm|ogg)$/), 'video');

const backgrounds = [...imageFiles, ...videoFiles];

const getIndex = (i, length) => (i + length) % length;

const Header = () => {
    const [index, setIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const timerRef = useRef();

    const prevIndex = getIndex(index - 1, backgrounds.length);
    const nextIndex = getIndex(index + 1, backgrounds.length);
    const farPrevIndex = getIndex(index - 2, backgrounds.length);
    const farNextIndex = getIndex(index + 2, backgrounds.length);

    const handlePrev = () => setIndex(prevIndex);
    const handleNext = () => setIndex(nextIndex);
/*
    useEffect(() => {
        if (!isHovering) {
            timerRef.current = setInterval(() => {
                setIndex((prev) => (prev + 1) % backgrounds.length);
            }, AUTO_TRANSITION_MS);
        }
        return () => clearInterval(timerRef.current);
    }, [isHovering]);
*/

    // Helper to render a background item
    const renderBg = (bg, position, isActive) => {
        const classNames = [
            'carousel-item',
            position,
            isActive ? 'center' : '',
        ].join(' ');
        if (bg.type === 'video') {
            return (
                <video
                    key={bg.src + position}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={classNames}
                >
                    <source src={bg.src} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            );
        } else {
            return (
                <img
                    key={bg.src + position}
                    src={bg.src}
                    alt=""
                    className={classNames}
                />
            );
        }
    };

    return (
        <header className="header">
            {/* Carousel items */}
            <div className="carousel-container">
                {renderBg(backgrounds[farPrevIndex], 'far-left', false)}
                {renderBg(backgrounds[prevIndex], 'left', false)}
                {renderBg(backgrounds[index], 'center', true)}
                {renderBg(backgrounds[nextIndex], 'right', false)}
                {renderBg(backgrounds[farNextIndex], 'far-right', false)}
            </div>
            {/* Arrow buttons */}
            <button
                onClick={handlePrev}
                aria-label="Previous"
                className="arrow-btn arrow-btn-left"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                &#8592;
            </button>
            <button
                onClick={handleNext}
                aria-label="Next"
                className="arrow-btn arrow-btn-right"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                &#8594;
            </button>
            {/* Navigation */}
            <nav className="header-content">
                <ul>
                    <li><a href="#about">About</a></li>
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;