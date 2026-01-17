import { useRef, useEffect, useState } from 'react';

interface MouseTrackerProps {
  color?: string;
  particleCount?: number;
  trackingStrength?: number;
}

export function MouseTracker({
  color = '#5227FF',
  particleCount = 8,
  trackingStrength = 0.15,
}: MouseTrackerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    // Initialize particles
    const initialParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setParticles(initialParticles);

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      // Update particle positions to follow mouse
      setParticles((prev) =>
        prev.map((p) => {
          const dx = mouseRef.current.x - (p.x * rect.width) / 100;
          const dy = mouseRef.current.y - (p.y * rect.height) / 100;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 300;

          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            const moveX = (dx / distance) * force * trackingStrength;
            const moveY = (dy / distance) * force * trackingStrength;

            return {
              ...p,
              x: p.x + (moveX * 100) / rect.width,
              y: p.y + (moveY * 100) / rect.height,
            };
          }
          return p;
        })
      );
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [particleCount, trackingStrength]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1a0033 0%, #330066 50%, #1a0033 100%)',
      }}
    >
      {/* Animated gradient blobs */}
      <div
        className="absolute rounded-full blur-3xl opacity-30 animate-pulse"
        style={{
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, #5227FF, #FF9FFC)',
          top: '-10%',
          left: '-10%',
        }}
      />
      <div
        className="absolute rounded-full blur-3xl opacity-30 animate-pulse"
        style={{
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, #FF9FFC, #5227FF)',
          bottom: '-10%',
          right: '-10%',
          animationDelay: '1s',
        }}
      />

      {/* Interactive particles that follow mouse */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full blur-sm transition-all duration-300"
          style={{
            width: '12px',
            height: '12px',
            background: color,
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: 0.6,
            transform: 'translate(-50%, -50%)',
            boxShadow: `0 0 20px ${color}`,
          }}
        />
      ))}

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(82, 39, 255, 0.1) 25%, rgba(82, 39, 255, 0.1) 26%, transparent 27%, transparent 74%, rgba(82, 39, 255, 0.1) 75%, rgba(82, 39, 255, 0.1) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(82, 39, 255, 0.1) 25%, rgba(82, 39, 255, 0.1) 26%, transparent 27%, transparent 74%, rgba(82, 39, 255, 0.1) 75%, rgba(82, 39, 255, 0.1) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
}
