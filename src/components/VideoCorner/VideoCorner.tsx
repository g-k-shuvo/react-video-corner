import React, { useState, useRef, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, RefreshCw } from 'lucide-react';


export interface VideoCornerProps {
  videoSrc: string;
  isYoutube?: boolean;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  smallSize?: number;
  largeSize?: number;
  borderRadius?: number;
  borderColor?: string;
  backgroundColor?: string;
  autoplay?: boolean;
  initiallyMuted?: boolean;
  zIndex?: number;
}

const VideoCorner: React.FC<VideoCornerProps> = ({
  videoSrc,
  isYoutube = false,
  position = 'bottom-right',
  smallSize = 150,
  largeSize = 320,
  borderRadius = 100,
  borderColor = '#3b82f6',
  backgroundColor = '#ffffff',
  autoplay = true,
  initiallyMuted = true,
  zIndex = 1000,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(initiallyMuted);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isVisible, setIsVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // Position styles
  const getPositionStyles = () => {
    switch (position) {
      case 'bottom-right':
        return { bottom: '20px', right: '20px' };
      case 'bottom-left':
        return { bottom: '20px', left: '20px' };
      case 'top-right':
        return { top: '20px', right: '20px' };
      case 'top-left':
        return { top: '20px', left: '20px' };
      default:
        return { bottom: '20px', right: '20px' };
    }
  };

  // Close button position styles
  const getCloseButtonStyles = () => {
    switch (position) {
      case 'bottom-right':
        return { bottom: smallSize + 8, right: 8 };
      case 'bottom-left':
        return { bottom: smallSize + 8, left: 8 };
      case 'top-right':
        return { top: smallSize + 8, right: 8 };
      case 'top-left':
        return { top: smallSize + 8, left: 8 };
      default:
        return { bottom: smallSize + 8, right: 8 };
    }
  };

  // Handle video controls
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const togglePlay = () => {
    if (isYoutube && iframeRef.current) {
      // For YouTube videos
      if (isPlaying) {
        // Pause YouTube video
        iframeRef.current.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      } else {
        // Play YouTube video
        iframeRef.current.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      }
    } else if (videoRef.current) {
      // For local videos
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (isYoutube && iframeRef.current) {
      // For YouTube videos
      if (isMuted) {
        // Unmute YouTube video
        iframeRef.current.contentWindow?.postMessage('{"event":"command","func":"unMute","args":""}', '*');
      } else {
        // Mute YouTube video
        iframeRef.current.contentWindow?.postMessage('{"event":"command","func":"mute","args":""}', '*');
      }
    } else if (videoRef.current) {
      // For local videos
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const restartVideo = () => {
    if (isYoutube && iframeRef.current) {
      // Restart YouTube video
      iframeRef.current.contentWindow?.postMessage('{"event":"command","func":"seekTo","args":[0, true]}', '*');
      if (!isPlaying) {
        iframeRef.current.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        setIsPlaying(true);
      }
    } else if (videoRef.current) {
      // Restart local video
      videoRef.current.currentTime = 0;
      if (!isPlaying) {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const closeVideoCorner = () => {
    setIsVisible(false);
  };

  // Handle autoplay for local videos
  useEffect(() => {
    if (!isYoutube && videoRef.current && autoplay) {
      videoRef.current.muted = initiallyMuted;
      videoRef.current.play().catch(error => {
        console.error('Autoplay failed:', error);
        setIsPlaying(false);
      });
    }
  }, [autoplay, initiallyMuted, isYoutube]);

  // Prepare YouTube URL with parameters
  const getYoutubeEmbedUrl = () => {
    // Extract video ID from various YouTube URL formats
    let videoId = videoSrc;
    
    if (videoSrc.includes('youtube.com') || videoSrc.includes('youtu.be')) {
      if (videoSrc.includes('v=')) {
        videoId = videoSrc.split('v=')[1].split('&')[0];
      } else if (videoSrc.includes('youtu.be/')) {
        videoId = videoSrc.split('youtu.be/')[1].split('?')[0];
      }
    }
    
    // Construct embed URL with parameters
    return `https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=${autoplay ? 1 : 0}&mute=${initiallyMuted ? 1 : 0}&controls=0&rel=0&modestbranding=1`;
  };

  if (!isVisible) return null;

  const currentSize = isExpanded ? largeSize : smallSize;
  const positionStyles = getPositionStyles();

  return (
    <>
      {/* Separate close button container */}
      {!isExpanded && (
        <div className="fixed" style={{ ...getCloseButtonStyles(), zIndex: 1001 }}>
          <button
            className="bg-black bg-opacity-50 rounded-full p-1 hover:bg-opacity-70 transition-all"
            onClick={closeVideoCorner}
            aria-label="Close video"
          >
            <X size={16} color="white" />
          </button>
        </div>
      )}

      <div
        className="fixed transition-all duration-300 ease-in-out shadow-lg"
        style={{
          ...positionStyles,
          width: `${currentSize}px`,
          height: `${currentSize}px`,
          borderRadius: `${isExpanded ? Math.min(borderRadius, 20) : borderRadius}px`,
          border: `2px solid ${borderColor}`,
          backgroundColor,
          overflow: 'hidden',
          zIndex,
        }}
      >
        {/* Show minimize button only when expanded */}
        {isExpanded && (
          <div className="absolute z-10 top-2 right-2">
            <button
              className="bg-black bg-opacity-50 rounded-full p-1 hover:bg-opacity-70 transition-all"
              onClick={toggleExpand}
              aria-label="Minimize video"
            >
              <X size={16} color="white" />
            </button>
          </div>
        )}

        {/* Video content */}
        <div 
          className="w-full h-full cursor-pointer"
          onClick={isExpanded ? undefined : toggleExpand}
        >
          {isYoutube ? (
            <iframe
              ref={iframeRef}
              width="100%"
              height="100%"
              src={getYoutubeEmbedUrl()}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ pointerEvents: isExpanded ? 'auto' : 'none' }}
            />
          ) : (
            <video
              ref={videoRef}
              src={videoSrc}
              className="w-full h-full object-cover"
              muted={isMuted}
              loop
              playsInline
              style={{ pointerEvents: isExpanded ? 'auto' : 'none' }}
            />
          )}
        </div>

        {/* Controls (only visible when expanded) */}
        {isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 flex justify-center gap-3">
            <button
              className="text-white hover:text-blue-300 transition-colors"
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button
              className="text-white hover:text-blue-300 transition-colors"
              onClick={toggleMute}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <button
              className="text-white hover:text-blue-300 transition-colors"
              onClick={restartVideo}
              aria-label="Restart"
            >
              <RefreshCw size={20} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default VideoCorner;