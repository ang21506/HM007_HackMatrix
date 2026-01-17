import { useRef, useState } from 'react';

interface HoverAnimatedBackgroundProps {
  onHoverChange?: (isHovered: boolean) => void;
}

export function HoverAnimatedBackground({ onHoverChange }: HoverAnimatedBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredElements, setHoveredElements] = useState<Set<number>>(new Set());

  const elements = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: Math.random() * 60 + 40,
    x: Math.random() * 100,
    y: Math.random() * 100,
    color: ['#5227FF', '#FF9FFC', '#A8E6CF', '#FFE66D'][i % 4],
    delay: i * 0.1,
  }));

  const handleCardHover = (isHovered: boolean) => {
    if (isHovered) {
      setHoveredElements(new Set(elements.map((e) => e.id)));
    } else {
      setHoveredElements(new Set());
    }
    onHoverChange?.(isHovered);
  };

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
        className="absolute rounded-full blur-3xl opacity-20"
        style={{
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, #5227FF, #FF9FFC)',
          top: '-10%',
          left: '-10%',
          animation: 'pulse 4s ease-in-out infinite',
        }}
      />
      <div
        className="absolute rounded-full blur-3xl opacity-20"
        style={{
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, #FF9FFC, #5227FF)',
          bottom: '-10%',
          right: '-10%',
          animation: 'pulse 4s ease-in-out infinite 2s',
        }}
      />

      {/* Floating animated elements */}
      {elements.map((el) => {
        const isHovered = hoveredElements.has(el.id);
        return (
          <div
            key={el.id}
            className="absolute rounded-full transition-all duration-500 cursor-pointer"
            style={{
              width: `${el.size}px`,
              height: `${el.size}px`,
              left: `${el.x}%`,
              top: `${el.y}%`,
              background: `radial-gradient(circle, ${el.color}, ${el.color}99)`,
              boxShadow: isHovered ? `0 0 40px ${el.color}` : `0 0 20px ${el.color}99`,
              opacity: isHovered ? 0.9 : 0.5,
              transform: isHovered 
                ? `translate(-50%, -50%) scale(1.4) rotate(360deg)` 
                : `translate(-50%, -50%) scale(1) rotate(0deg)`,
              zIndex: isHovered ? 10 : 1,
              transitionDelay: `${el.delay}ms`,
            }}
            onMouseEnter={() => {
              setHoveredElements((prev) => new Set([...prev, el.id]));
              handleCardHover(true);
            }}
            onMouseLeave={() => {
              setHoveredElements((prev) => {
                const next = new Set(prev);
                next.delete(el.id);
                return next;
              });
            }}
          />
        );
      })}

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

      {/* Hover trigger zone for card */}
      <div
        className="absolute inset-0"
        onMouseEnter={() => handleCardHover(true)}
        onMouseLeave={() => {
          setHoveredElements(new Set());
          handleCardHover(false);
        }}
        style={{ pointerEvents: 'none' }}
      />

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  );
}
