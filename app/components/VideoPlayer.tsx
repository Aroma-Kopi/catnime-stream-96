'use client';
import React, { useEffect, useState } from 'react';

export default function VideoPlayer({ url }: { url: string }) {
  const [isMounted, setIsMounted] = useState(url);

  useEffect(() => {
    setIsMounted(url);
  }, []);

  if (!isMounted) return <div className="w-full h-full bg-black animate-pulse" />;
  const isNativeVideo = url.endsWith('.mp4') || url.includes('.mkv');

  if (isNativeVideo) {
    return (
      <video 
        key={url}
        controls 
        autoPlay 
        className="w-full h-full object-contain"
        poster="https://via.placeholder.com/1280x720?text=Loading+Video..."
      >
        <source src={url} type="video/mp4" />
        Browser Anda tidak mendukung tag video.
      </video>
    );
  }
  return (
    <iframe 
      key={url}
      src={url}
      className="w-full h-full border-none"
      allowFullScreen
      allow="autoplay; encrypted-media"
      title="Video Stream"
    />
  );
}