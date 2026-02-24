'use client';
import React from 'react';
import SpriteRenderer from './SpriteRenderer';
import { BACKGROUNDS, GROUNDS } from './backgrounds';

export default function PixelScene({ config }) {
    if (!config) return null;

    const bg = BACKGROUNDS[config.background] || BACKGROUNDS.overworld;
    const ground = GROUNDS[config.ground] || GROUNDS.grass;
    const groundHeight = config.groundHeight || 32;

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            height: '160px',
            overflow: 'hidden',
            borderRadius: '0.75rem',
            imageRendering: 'pixelated',
            animation: 'fadeScaleIn 0.4s ease-out',
        }}>
            {/* Sky / background layer */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: bg,
            }} />

            {/* Ground layer */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: `${groundHeight}px`,
                background: ground,
            }} />

            {/* Sprite elements */}
            {config.elements && config.elements.map((el, i) => {
                // Support count: render multiple copies with spacing
                const count = el.count || 1;
                return Array.from({ length: count }, (__, ci) => (
                    <div key={`${i}-${ci}`} style={{
                        position: 'absolute',
                        left: el.x ? (typeof el.x === 'string' ? `calc(${el.x} + ${ci * 36}px)` : el.x + ci * 36) : undefined,
                        bottom: el.y || `${groundHeight}px`,
                        zIndex: el.zIndex || 1,
                        filter: el.opacity ? `opacity(${el.opacity})` : undefined,
                        animation: el.animation || undefined,
                    }}>
                        <SpriteRenderer
                            sprite={el.sprite}
                            scale={el.scale || 1}
                            flip={el.flip || false}
                        />
                    </div>
                ));
            })}
        </div>
    );
}
