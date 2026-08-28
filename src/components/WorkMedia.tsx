import React from 'react';

export function isVideo(url: string) {
  return /\.(mp4|webm|ogg|mov)$/i.test(url);
}

interface WorkMediaProps {
  src: string;
  alt?: string;
  style?: React.CSSProperties;
}

export default function WorkMedia({ src, alt, style }: WorkMediaProps) {
  if (isVideo(src)) {
    return (
      <video
        src={src}
        style={style}
        autoPlay
        loop
        muted
        playsInline
      />
    );
  }
  return <img src={src} alt={alt} style={style} />;
}
