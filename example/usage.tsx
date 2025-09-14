import React from 'react';
import VideoCorner from 'react-video-corner';

// Example 1: Basic local video
export const BasicExample = () => (
  <VideoCorner
    videoSrc="/sample-video.mp4"
    position="bottom-right"
    smallSize={150}
    largeSize={320}
  />
);

// Example 2: YouTube video
export const YouTubeExample = () => (
  <VideoCorner
    videoSrc="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    isYoutube={true}
    position="top-left"
    smallSize={180}
    largeSize={400}
    borderColor="#ff0000"
    backgroundColor="#000000"
  />
);

// Example 3: Custom styling
export const CustomStyledExample = () => (
  <VideoCorner
    videoSrc="/promo-video.mp4"
    position="bottom-left"
    smallSize={100}
    largeSize={350}
    borderRadius={20}
    borderColor="#00ff00"
    backgroundColor="#f0f0f0"
    autoplay={false}
    initiallyMuted={false}
    zIndex={9999}
  />
);

// Example 4: Multiple video corners
export const MultipleCornersExample = () => (
  <div>
    <VideoCorner
      videoSrc="/video1.mp4"
      position="bottom-right"
      smallSize={150}
      largeSize={300}
    />
    <VideoCorner
      videoSrc="/video2.mp4"
      position="top-left"
      smallSize={120}
      largeSize={280}
      borderColor="#ff6b6b"
    />
  </div>
);

// Example 5: Dynamic video switching
export const DynamicVideoExample = () => {
  const [currentVideo, setCurrentVideo] = React.useState('/video1.mp4');
  const [isYoutube, setIsYoutube] = React.useState(false);

  const videos = [
    { src: '/video1.mp4', isYoutube: false },
    { src: '/video2.mp4', isYoutube: false },
    { src: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', isYoutube: true },
  ];

  const switchVideo = (index: number) => {
    setCurrentVideo(videos[index].src);
    setIsYoutube(videos[index].isYoutube);
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => switchVideo(0)}>Video 1</button>
        <button onClick={() => switchVideo(1)}>Video 2</button>
        <button onClick={() => switchVideo(2)}>YouTube Video</button>
      </div>
      <VideoCorner
        videoSrc={currentVideo}
        isYoutube={isYoutube}
        position="bottom-right"
        smallSize={150}
        largeSize={320}
      />
    </div>
  );
};
