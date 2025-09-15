import React, { useState } from 'react';
import { VideoCorner } from 'react-video-corner';
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
        <h1 className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          React Video Corner
        </h1>
        <p className="text-xl text-gray-600 text-center mb-2">Interactive Demo</p>
        <p className="text-gray-500 text-center mb-8 max-w-2xl mx-auto">
          A customizable floating video player component for React applications. 
          Supports local videos and YouTube integration with expand/collapse functionality.
        </p>
        
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
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-600">🎯 Current Configuration</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Position:</span> {videoSettings.position.split('-').join(' ')}</p>
                <p><span className="font-medium">Video Type:</span> {videoSettings.isYoutube ? 'YouTube' : 'Local Video'}</p>
                <p><span className="font-medium">Small Size:</span> {videoSettings.smallSize}px</p>
                <p><span className="font-medium">Large Size:</span> {videoSettings.largeSize}px</p>
                <p><span className="font-medium">Autoplay:</span> {videoSettings.autoplay ? 'Enabled' : 'Disabled'}</p>
                <p><span className="font-medium">Initially Muted:</span> {videoSettings.initiallyMuted ? 'Yes' : 'No'}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-green-600">✨ Features</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center"><span className="mr-2">🎥</span> Local & YouTube video support</li>
                <li className="flex items-center"><span className="mr-2">📱</span> Responsive design</li>
                <li className="flex items-center"><span className="mr-2">🎨</span> Fully customizable styling</li>
                <li className="flex items-center"><span className="mr-2">🎮</span> Interactive controls</li>
                <li className="flex items-center"><span className="mr-2">⚡</span> Zero dependencies</li>
                <li className="flex items-center"><span className="mr-2">🔧</span> TypeScript support</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">💡 Usage Instructions</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-blue-700">
              <li>Click the Video Corner to expand it to full size</li>
              <li>Use the controls at the bottom to play/pause, mute/unmute, or restart</li>
              <li>Click the X button to minimize or close the video</li>
              <li>Customize the appearance using the settings panel above</li>
            </ol>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
            <h3 className="text-lg font-medium mb-2">Implementation Example</h3>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
              {`import { VideoCorner } from 'react-video-corner';

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
        
        {/* Footer */}
        <footer className="bg-white rounded-lg shadow-md p-6 mt-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">📦 Get Started</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Install</h4>
                <code className="text-sm bg-gray-800 text-white p-2 rounded block">
                  npm install react-video-corner
                </code>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Import</h4>
                <code className="text-sm bg-gray-800 text-white p-2 rounded block">
                  import {'{'} VideoCorner {'}'} from 'react-video-corner'
                </code>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Use</h4>
                <code className="text-sm bg-gray-800 text-white p-2 rounded block">
                  &lt;VideoCorner videoSrc="/video.mp4" /&gt;
                </code>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <p className="text-gray-600 mb-2">
                Made with ❤️ by <a href="https://github.com/g-k-shuvo" className="text-blue-600 hover:underline">Golam Kibria</a>
              </p>
              <div className="flex justify-center space-x-4 text-sm">
                <a href="https://github.com/g-k-shuvo/react-video-corner" className="text-blue-600 hover:underline">GitHub</a>
                <a href="https://www.npmjs.com/package/react-video-corner" className="text-blue-600 hover:underline">NPM</a>
                <a href="https://github.com/g-k-shuvo/react-video-corner/issues" className="text-blue-600 hover:underline">Issues</a>
              </div>
            </div>
          </div>
        </footer>
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