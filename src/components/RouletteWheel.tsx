'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './RouletteWheel.module.css';

interface RouletteWheelProps {
    items: string[];
}

export default function RouletteWheel({ items }: RouletteWheelProps) {
    const [rotation, setRotation] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    // Colors for segments
    const colors = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD',
        '#D4A5A5', '#9B59B6', '#3498DB', '#E67E22', '#2ECC71',
        '#F1C40F', '#E74C3C', '#1ABC9C', '#8E44AD', '#2C3E50',
        '#F39C12', '#D35400', '#C0392B', '#BDC3C7', '#7F8C8D'
    ];

    const spin = () => {
        if (isSpinning) return;

        setIsSpinning(true);
        setSelectedItem(null);

        // Calculate a new random rotation
        // Minimum 5 full spins (360 * 5) + random buffer
        const minSpins = 5;
        const segmentAngle = 360 / items.length;

        // Pick a random index
        const winningIndex = Math.floor(Math.random() * items.length);

        // Calculate the angle to land on this index
        // The pointer is at the TOP (0 degrees in CSS transform context usually, 
        // but we need to align the segment to the top)
        // If we have segments 0..N, segment 0 starts at angle 0.
        // To get segment `i` to the top, we need to rotate the WHEEL such that segment `i` aligns with -90deg (or whatever the pointer is).
        // Let's assume standard CSS rotation where 0 is 3 o'clock, but we'll use a conic gradient starting at 0 (12 o'clock).

        // Actually, let's keep it simple:
        // Generate a huge random rotation.
        const randomRotation = Math.floor(Math.random() * 360) + (360 * minSpins);
        const newTotalRotation = rotation + randomRotation;

        setRotation(newTotalRotation);

        // Calculate the result based on the final angle
        // Normalize to 0-360
        const finalAngle = newTotalRotation % 360;

        // In our gradient, index 0 starts at 0deg. Pointer is at 0deg (top).
        // However, usually 0deg in conic-gradient is Top (12 o'clock).
        // The wheel rotates CLOCKWISE.
        // If we rotate 90 degrees clockwise, the segment at 270 degrees (Left) moves to Top.
        // So the segment at `(360 - (rotation % 360)) % 360` should be the one at the top.

        setTimeout(() => {
            // Calculate winning index based on rotation
            // Each segment is `segmentAngle` wide.
            // The angle passing the pointer (at 0/360) is effectively `360 - finalAngle`.
            // We need to account for the pointer position being at the top.
            const adjustedAngle = (360 - finalAngle) % 360;
            const index = Math.floor(adjustedAngle / segmentAngle);

            setSelectedItem(items[index]);
            setIsSpinning(false);
        }, 4000); // 4s matches CSS transition
    };

    const conicGradient = items.map((_, index) => {
        const start = (index * 100) / items.length;
        const end = ((index + 1) * 100) / items.length;
        return `${colors[index % colors.length]} ${start}% ${end}%`;
    }).join(', ');

    return (
        <div>
            <div className={styles.wheelContainer}>
                <div className={styles.pointer} />
                <div
                    className={styles.wheel}
                    style={{
                        background: `conic-gradient(${conicGradient})`,
                        transform: `rotate(${rotation}deg)`
                    }}
                >
                    {items.map((item, index) => {
                        const angle = (360 / items.length) * index + (360 / items.length) / 2;
                        return (
                            <div
                                key={index}
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: `translate(-50%, -50%) rotate(${angle}deg) translate(0, -110px)`,
                                    width: '20px',
                                    textAlign: 'center',
                                    color: '#fff',
                                    fontSize: '10px',
                                    fontWeight: 'bold',
                                    textShadow: '0 0 2px rgba(0,0,0,0.8)',
                                    whiteSpace: 'nowrap',
                                    writingMode: 'vertical-rl'
                                }}
                            >
                                {item}
                            </div>
                        );
                    })}
                </div>
            </div>

            <button
                className={styles.spinButton}
                onClick={spin}
                disabled={isSpinning}
            >
                {isSpinning ? 'SPINNING...' : 'SPIN!'}
            </button>

            {selectedItem && (
                <div className={styles.result}>
                    Result: {selectedItem}
                </div>
            )}
        </div>
    );
}
