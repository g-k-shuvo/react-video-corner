import React, { useState } from 'react';
import VideoCorner from 'react-video-corner';
import { Settings, Youtube } from 'lucide-react';

function App() {
  const [videoSettings, setVideoSettings] = useState({
    videoSrc: import.meta.env.VITE_DEMO_VIDEO_URL || '/sample.mp4',
    isYoutube: import.meta.env.VITE_DEMO_IS_YOUTUBE === 'true' || false,
    position: 'bottom-right',
    smallSize: 150,
    largeSize: 320,
    borderRadius: 100,
    borderColor: '#3b82f6',
    backgroundColor: '#ffffff',
    autoplay: true,
    initiallyMuted: true,
  });

  const [showSettings, setShowSettings] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setVideoSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : type === 'number' 
          ? Number(value) 
          : value
    }));
  };

  const toggleVideoType = () => {
    console.log(import.meta.env.VITE_DEMO_YOUTUBE_URL);
    setVideoSettings(prev => {
      if (prev.isYoutube) {
        return {
          ...prev,
          isYoutube: false,
          videoSrc: import.meta.env.VITE_DEMO_VIDEO_URL
        };
      } else {
        // Switch to YouTube video
        return {
          ...prev,
          isYoutube: true,
          videoSrc: import.meta.env.VITE_DEMO_YOUTUBE_URL
        };
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Video Corner Component Demo</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Customization Panel</h2>
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              <Settings size={18} />
              {showSettings ? 'Hide Settings' : 'Show Settings'}
            </button>
          </div>
          
          {showSettings && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="w-full md:w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Video Source</label>
                  <div className="flex">
                    <input
                      type="text"
                      name="videoSrc"
                      value={videoSettings.videoSrc}
                      onChange={handleInputChange}
                      className="flex-grow rounded-l-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={videoSettings.isYoutube ? "YouTube URL" : "Video URL"}
                    />
                    <button
                      onClick={toggleVideoType}
                      className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-r-md flex items-center justify-center"
                      title={videoSettings.isYoutube ? "Switch to local video" : "Switch to YouTube video"}
                    >
                      {videoSettings.isYoutube ? (
                        <span className="flex items-center gap-1">
                          <Youtube size={18} />
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          Local
                        </span>
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="w-full md:w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                  <select
                    name="position"
                    value={videoSettings.position as string}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="bottom-right">Bottom Right</option>
                    <option value="bottom-left">Bottom Left</option>
                    <option value="top-right">Top Right</option>
                    <option value="top-left">Top Left</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Small Size (px)</label>
                  <input
                    type="number"
                    name="smallSize"
                    value={videoSettings.smallSize}
                    onChange={handleInputChange}
                    min="80"
                    max="300"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Large Size (px)</label>
                  <input
                    type="number"
                    name="largeSize"
                    value={videoSettings.largeSize}
                    onChange={handleInputChange}
                    min="200"
                    max="800"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Border Radius (px)</label>
                  <input
                    type="number"
                    name="borderRadius"
                    value={videoSettings.borderRadius}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Border Color</label>
                  <input
                    type="color"
                    name="borderColor"
                    value={videoSettings.borderColor}
                    onChange={handleInputChange}
                    className="w-full h-10 rounded-md border border-gray-300 px-1 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Background Color</label>
                  <input
                    type="color"
                    name="backgroundColor"
                    value={videoSettings.backgroundColor}
                    onChange={handleInputChange}
                    className="w-full h-10 rounded-md border border-gray-300 px-1 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="autoplay"
                      name="autoplay"
                      checked={videoSettings.autoplay}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="autoplay" className="ml-2 block text-sm text-gray-700">
                      Autoplay
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="initiallyMuted"
                      name="initiallyMuted"
                      checked={videoSettings.initiallyMuted}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="initiallyMuted" className="ml-2 block text-sm text-gray-700">
                      Initially Muted
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Demo Content</h2>
          <p className="mb-4">
            This is a demo page showing how the Video Corner component works. The Video Corner appears in the 
            {videoSettings.position.split('-').join(' ')} corner of the screen.
          </p>
          <p className="mb-4">
            The Video Corner initially plays in a smaller size ({videoSettings.smallSize}px) and expands to a larger size ({videoSettings.largeSize}px) when clicked.
            When expanded, you can control the video with the playback controls at the bottom.
          </p>
          <p>
            You can customize all aspects of the Video Corner using the settings panel above. Try changing the position, size, colors, and other properties to see how they affect the Video Corner.
          </p>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
            <h3 className="text-lg font-medium mb-2">Implementation Example</h3>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
              {`import VideoCorner from 'react-video-corner';

// In your component:
<VideoCorner
  videoSrc="${videoSettings.videoSrc}"
  isYoutube={${videoSettings.isYoutube}}
  position="${videoSettings.position}"
  smallSize={${videoSettings.smallSize}}
  largeSize={${videoSettings.largeSize}}
  borderRadius={${videoSettings.borderRadius}}
  borderColor="${videoSettings.borderColor}"
  backgroundColor="${videoSettings.backgroundColor}"
  autoplay={${videoSettings.autoplay}}
  initiallyMuted={${videoSettings.initiallyMuted}}
/>`}
            </pre>
          </div>
        </div>
      </div>
      
      {/* The actual VideoCorner component */}
      <VideoCorner
        videoSrc={videoSettings.videoSrc}
        isYoutube={videoSettings.isYoutube}
        position={videoSettings.position as 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'}
        smallSize={videoSettings.smallSize}
        largeSize={videoSettings.largeSize}
        borderRadius={videoSettings.borderRadius}
        borderColor={videoSettings.borderColor}
        backgroundColor={videoSettings.backgroundColor}
        autoplay={videoSettings.autoplay}
        initiallyMuted={videoSettings.initiallyMuted}
      />
    </div>
  );
}

export default App;