# React Video Corner - Interactive Demo

> **A comprehensive demonstration of the React Video Corner component** - A customizable floating video player for React applications with YouTube integration and expand/collapse functionality.

## 🚀 Live Demo Features

This interactive demo showcases the full capabilities of the `react-video-corner` npm package:

### 🎯 **Interactive Customization**
- **Real-time Settings Panel**: Modify all component properties instantly
- **Video Type Toggle**: Switch between local videos and YouTube videos
- **Position Control**: Test all four corner positions (top-left, top-right, bottom-left, bottom-right)
- **Size Customization**: Adjust small and large sizes with live preview
- **Visual Styling**: Change colors, border radius, and appearance
- **Behavior Settings**: Configure autoplay, mute, and interaction behaviors

### ✨ **Component Features Demonstrated**
- ✅ **Local Video Playback**: Support for MP4, WebM, and other formats
- ✅ **YouTube Integration**: Seamless YouTube video embedding
- ✅ **Responsive Design**: Adapts to different screen sizes
- ✅ **Interactive Controls**: Play/pause, mute/unmute, restart functionality
- ✅ **Customizable Styling**: Colors, sizes, positions, and more
- ✅ **TypeScript Support**: Full type definitions and autocomplete
- ✅ **Zero Dependencies**: Self-contained with inline styles and SVG icons

## 🛠️ Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation & Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables** (optional):
   ```bash
   # Edit .env file to customize default video URLs
   VITE_DEMO_VIDEO_URL=/your-video.mp4
   VITE_DEMO_YOUTUBE_URL=https://www.youtube.com/watch?v=YOUR_VIDEO_ID
   VITE_DEMO_IS_YOUTUBE=false
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5175`

## 📱 Demo Usage Instructions

1. **Explore the Settings Panel**: Click "Show Settings" to reveal customization options
2. **Test Video Types**: Use the toggle button to switch between local and YouTube videos
3. **Customize Appearance**: Adjust position, size, colors, and other properties
4. **Interact with Video**: Click the video corner to expand, use controls to manage playback
5. **View Live Code**: See the generated implementation code in the demo

## 🎨 Demo Features

### **Current Configuration Display**
- Real-time display of current component settings
- Visual feedback for all customization options
- Live preview of changes

### **Feature Showcase**
- Comprehensive list of component capabilities
- Visual indicators for supported features
- Usage instructions and tips

### **Implementation Examples**
- Live code generation based on current settings
- Copy-paste ready code snippets
- Best practices demonstration

## 🔧 Technical Stack

This demo is built with modern web technologies:

- **React 18**: Latest React with hooks and concurrent features
- **TypeScript**: Full type safety and developer experience
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Environment Variables**: Configurable demo settings

## 📦 Package Integration

The demo imports the component from the local package:

```tsx
import { VideoCorner } from 'react-video-corner';
```

This demonstrates how users would integrate the package into their own projects. The demo automatically links to the parent package using `file:../` in package.json, so any changes to the package will be reflected in the demo.

## 🌐 SEO & Accessibility

The demo includes:
- **SEO-optimized HTML**: Meta tags, structured data, and semantic markup
- **Accessibility Features**: ARIA labels, keyboard navigation, and screen reader support
- **Performance Optimized**: Fast loading and smooth interactions
- **Mobile Responsive**: Works perfectly on all device sizes

## 📄 License

This demo is part of the React Video Corner package, licensed under the MIT License.

## 🤝 Contributing

Found an issue or want to improve the demo? Contributions are welcome!

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/g-k-shuvo/react-video-corner/issues)
- **NPM Package**: [View on npm](https://www.npmjs.com/package/react-video-corner)
- **Documentation**: [Full documentation](https://github.com/g-k-shuvo/react-video-corner#readme)
