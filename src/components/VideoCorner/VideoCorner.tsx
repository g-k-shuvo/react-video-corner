import React, { useState, useRef, useEffect } from 'react';

// Inline SVG Icons
const XIcon = ({ size = 16, color = "white" }: { size?: number; color?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
  
);



const PlayIcon = ({ size = 20, color = "white" }: { size?: number; color?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="5,3 19,12 5,21"></polygon>
  </svg>
);

const PauseIcon = ({ size = 20, color = "white" }: { size?: number; color?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="6" y="4" width="4" height="16"></rect>
    <rect x="14" y="4" width="4" height="16"></rect>
  </svg>
);

const Volume2Icon = ({ size = 20, color = "white" }: { size?: number; color?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="11,5 6,9 2,9 2,15 6,15 11,19"></polygon>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
  </svg>
);

const VolumeXIcon = ({ size = 20, color = "white" }: { size?: number; color?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="11,5 6,9 2,9 2,15 6,15 11,19"></polygon>
    <line x1="23" y1="9" x2="17" y2="15"></line>
    <line x1="17" y1="9" x2="23" y2="15"></line>
  </svg>
);

const RefreshCwIcon = ({ size = 20, color = "white" }: { size?: number; color?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="23,4 23,10 17,10"></polyline>
    <polyline points="1,20 1,14 7,14"></polyline>
    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
  </svg>
);


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
        <div 
          style={{ 
            position: 'fixed',
            ...getCloseButtonStyles(), 
            zIndex: 1001 
          }}
        >
          <button
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              borderRadius: '50%',
              padding: '4px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            }}
            onClick={closeVideoCorner}
            aria-label="Close video"
          >
            <XIcon size={16} color="white" />
          </button>
        </div>
      )}

      <div
        style={{
          position: 'fixed',
          transition: 'all 0.3s ease-in-out',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
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
          <div 
            style={{
              position: 'absolute',
              zIndex: 10,
              top: '8px',
              right: '8px',
            }}
          >
            <button
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '50%',
                padding: '4px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
              }}
              onClick={toggleExpand}
              aria-label="Minimize video"
            >
              <XIcon size={16} color="white" />
            </button>
          </div>
        )}

        {/* Video content */}
        <div 
          style={{
            width: '100%',
            height: '100%',
            cursor: isExpanded ? 'default' : 'pointer',
          }}
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
              style={{ 
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                pointerEvents: isExpanded ? 'auto' : 'none' 
              }}
              muted={isMuted}
              loop
              playsInline
            />
          )}
        </div>

        {/* Controls (only visible when expanded) */}
        {isExpanded && (
          <div 
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              padding: '8px',
              display: 'flex',
              justifyContent: 'center',
              gap: '12px',
            }}
          >
            <button
              style={{
                color: 'white',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#93c5fd';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'white';
              }}
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <PauseIcon size={20} /> : <PlayIcon size={20} />}
            </button>
            <button
              style={{
                color: 'white',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#93c5fd';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'white';
              }}
              onClick={toggleMute}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeXIcon size={20} /> : <Volume2Icon size={20} />}
            </button>
            <button
              style={{
                color: 'white',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#93c5fd';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'white';
              }}
              onClick={restartVideo}
              aria-label="Restart"
            >
              <RefreshCwIcon size={20} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default VideoCorner;