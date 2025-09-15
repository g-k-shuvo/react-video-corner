# React Video Corner

A customizable React component for displaying videos in the corner of your screen with expand/collapse functionality. Perfect for creating floating video players that don't interfere with your main content.

## Features

- 🎥 **Multiple Video Sources**: Support for both local video files and YouTube videos
- 📱 **Responsive Design**: Automatically adapts to different screen sizes
- 🎨 **Highly Customizable**: Control position, size, colors, and behavior
- ⚡ **Lightweight**: Minimal dependencies, optimized bundle size
- 🔧 **TypeScript Support**: Full TypeScript definitions included
- 🎮 **Interactive Controls**: Play/pause, mute/unmute, and restart functionality
- 📍 **Flexible Positioning**: Choose from 4 corner positions
- 🎯 **Easy Integration**: Simple props-based API

## Installation

```bash
npm install react-video-corner
```

or

```bash
yarn add react-video-corner
```

## Quick Start

```tsx
import React from 'react';
import VideoCorner from 'react-video-corner';

function App() {
  return (
    <div>
      <h1>My App</h1>
      <VideoCorner
        videoSrc="/path/to/your/video.mp4"
        position="bottom-right"
        smallSize={150}
        largeSize={320}
      />
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `videoSrc` | `string` | **required** | URL or path to the video file, or YouTube URL |
| `isYoutube` | `boolean` | `false` | Set to `true` if using a YouTube video |
| `position` | `'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left'` | `'bottom-right'` | Position of the video corner |
| `smallSize` | `number` | `150` | Size of the video when collapsed (in pixels) |
| `largeSize` | `number` | `320` | Size of the video when expanded (in pixels) |
| `borderRadius` | `number` | `100` | Border radius for the video container |
| `borderColor` | `string` | `'#3b82f6'` | Color of the border around the video |
| `backgroundColor` | `string` | `'#ffffff'` | Background color of the video container |
| `autoplay` | `boolean` | `true` | Whether the video should autoplay |
| `initiallyMuted` | `boolean` | `true` | Whether the video should start muted |
| `zIndex` | `number` | `1000` | CSS z-index of the video container |

## Examples

### Basic Usage

```tsx
import VideoCorner from 'react-video-corner';

<VideoCorner
  videoSrc="/sample-video.mp4"
  position="bottom-right"
  smallSize={120}
  largeSize={300}
/>
```

### YouTube Video

```tsx
import VideoCorner from 'react-video-corner';

<VideoCorner
  videoSrc="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  isYoutube={true}
  position="top-left"
  smallSize={180}
  largeSize={400}
  borderColor="#ff0000"
  backgroundColor="#000000"
/>
```

### Custom Styling

```tsx
import VideoCorner from 'react-video-corner';

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
```

### Multiple Video Corners

```tsx
import VideoCorner from 'react-video-corner';

function App() {
  return (
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
}
```

## Styling

The component uses Tailwind CSS classes internally, but you can override styles using the provided props. The component is designed to be self-contained and won't interfere with your existing styles.

### Custom CSS (Optional)

If you need additional styling, you can target the component using CSS:

```css
/* Target the video corner container */
.react-video-corner {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

/* Target the controls */
.react-video-corner .controls {
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
}
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Development

### Prerequisites

- Node.js 16+
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/g-k-shuvo/react-video-corner.git

# Install dependencies
npm install

# Build the library
npm run build
```

### Demo Project

The repository includes a demo project that showcases all features:

```bash
# Install demo dependencies
npm run demo:install

# Start demo development server
npm run demo:dev

# Build demo
npm run demo:build
```

The demo will be available at `http://localhost:5175` and includes:
- Interactive settings panel
- Real-time customization
- All component features demonstration

### Testing

```bash
# Run linting
npm run lint

# Build the library
npm run build
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

### 1.0.0
- Initial release
- Support for local videos and YouTube videos
- Customizable positioning and styling
- TypeScript support
- Interactive controls

## Support

If you encounter any issues or have questions, please:

1. Check the [Issues](https://github.com/yourusername/react-video-corner/issues) page
2. Create a new issue with detailed information
3. Contact us at [your-email@example.com]

## Acknowledgments

- Built with [React](https://reactjs.org/)
- Icons by [Lucide](https://lucide.dev/)
- Bundled with [Vite](https://vitejs.dev/)
