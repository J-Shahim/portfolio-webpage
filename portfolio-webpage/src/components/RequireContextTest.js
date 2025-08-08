import React, { useEffect } from 'react';

const RequireContextTest = () => {
    useEffect(() => {
        try {
            const testImages = require.context('../assets/images', false, /\.(png|jpe?g|gif)$/);
            console.log('Images:', testImages.keys());
        } catch (e) {
            console.error('Image require.context error:', e);
        }
        try {
            const testVideos = require.context('../assets/videos', false, /\.(mp4|webm|ogg)$/);
            console.log('Videos:', testVideos.keys());
        } catch (e) {
            console.error('Video require.context error:', e);
        }
    }, []);

    return <div>Check the browser console for require.context test results.</div>;
};

export default RequireContextTest;