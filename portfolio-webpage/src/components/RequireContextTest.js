import { useEffect } from 'react';

/* --------------------------------------------------------------------------
   RequireContextTest Component
   Tests Webpack's require.context for images and videos.
   On mount, attempts to load all image and video files from assets folders.
   Results are logged to the browser console for debugging.
-------------------------------------------------------------------------- */
const RequireContextTest = () => {
    useEffect(() => {
        // Test loading images from ../assets/images
        try {
            const testImages = require.context('../assets/images', false, /\.(png|jpe?g|gif)$/);
            console.log('Images:', testImages.keys());
        } catch (e) {
            console.error('Image require.context error:', e);
        }
        // Test loading videos from ../assets/videos
        try {
            const testVideos = require.context('../assets/videos', false, /\.(mp4|webm|ogg)$/);
            console.log('Videos:', testVideos.keys());
        } catch (e) {
            console.error('Video require.context error:', e);
        }
    }, []);

    // Render a message to check the console for results
    return <div>Check the browser console for require.context test results.</div>;
};

export default RequireContextTest;