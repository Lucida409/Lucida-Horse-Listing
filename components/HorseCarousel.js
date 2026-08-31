'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function HorseCarousel({ images, alt }) {
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);

  if (!images || images.length === 0) {
    return (
      <div style={{
        width: '100%', aspectRatio: '1', borderRadius: '16px',
        background: 'rgba(255,255,255,0.05)'
      }} />
    );
  }

  const goPrev = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const goNext = () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (diff > 50) goNext();
    if (diff < -50) goPrev();
    setTouchStart(null);
  };

  return (
    <div>
      <div
        style={{ position: 'relative', width: '100%', aspectRatio: '1', borderRadius: '16px', overflow: 'hidden' }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={images[index]}
          alt={alt}
          fill
          style={{ objectFit: 'cover' }}
        />

        {images.length > 1 && (
          <>
            <button onClick={goPrev} style={arrowStyle('left')} aria-label="Previous photo">‹</button>
            <button onClick={goNext} style={arrowStyle('right')} aria-label="Next photo">›</button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.4rem', marginTop: '0.8rem' }}>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to photo ${i + 1}`}
              style={{
                width: i === index ? '20px' : '8px',
                height: '8px',
                borderRadius: '999px',
                border: 'none',
                background: i === index ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)',
                transition: 'width 0.2s',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function arrowStyle(side) {
  return {
    position: 'absolute',
    top: '50%',
    [side]: '0.75rem',
    transform: 'translateY(-50%)',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.9)',
    color: '#333',
    border: 'none',
    fontSize: '1.5rem',
    lineHeight: 1,
    cursor: 'pointer',
  };
}
