'use client';
import React from 'react';

const PixelGrid = React.memo(function PixelGrid({ pixels, cellSize = 4 }) {
    if (!pixels || pixels.length === 0) return null;

    const rows = pixels.length;
    const cols = pixels[0].length;

    return (
        <div style={{
            display: 'inline-grid',
            gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
            gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
            imageRendering: 'pixelated',
        }}>
            {pixels.flat().map((color, i) => (
                <div key={i} style={color ? { backgroundColor: color } : undefined} />
            ))}
        </div>
    );
});

export default PixelGrid;
