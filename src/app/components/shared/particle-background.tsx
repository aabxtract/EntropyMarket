'use client';

import { useEffect, useState } from 'react';

const ParticleBackground = () => {
  const [particles, setParticles] = useState<
    { id: number; style: React.CSSProperties }[]
  >([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 50 }).map((_, i) => {
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * -20;
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const endX = Math.random() * 100;
        const endY = Math.random() * 100;
        const color = Math.random() > 0.5 ? 'hsl(var(--primary))' : 'hsl(var(--accent))';

        return {
          id: i,
          style: {
            '--size': `${size}px`,
            '--start-x': `${startX}%`,
            '--start-y': `${startY}%`,
            '--end-x': `${endX}%`,
            '--end-y': `${endY}%`,
            width: 'var(--size)',
            height: 'var(--size)',
            backgroundColor: color,
            borderRadius: '50%',
            position: 'absolute',
            top: 'var(--start-y)',
            left: 'var(--start-x)',
            opacity: Math.random() * 0.5 + 0.1,
            animation: `move ${duration}s linear ${delay}s infinite`,
          } as React.CSSProperties,
        };
      });
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  return (
    <>
      <style jsx global>{`
        @keyframes move {
          0% {
            transform: translate(0, 0);
            opacity: 0.1;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            transform: translate(calc(var(--end-x) - var(--start-x)), calc(var(--end-y) - var(--start-y)));
            opacity: 0.1;
          }
        }
      `}</style>
      <div className="absolute inset-0 z-0 h-full w-full overflow-hidden bg-background">
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/50 via-background to-background/50" />
        {particles.map((particle) => (
          <div key={particle.id} style={particle.style} />
        ))}
      </div>
    </>
  );
};

export default ParticleBackground;
