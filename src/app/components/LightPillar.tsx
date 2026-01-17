import { useRef, useEffect } from 'react';

interface LightPillarProps {
  topColor?: string;
  bottomColor?: string;
  intensity?: number;
  rotationSpeed?: number;
  interactive?: boolean;
  glowAmount?: number;
  pillarWidth?: number;
  pillarHeight?: number;
  noiseIntensity?: number;
  pillarRotation?: number;
}

export function LightPillar({
  topColor = '#5227FF',
  bottomColor = '#FF9FFC',
  intensity = 1,
  rotationSpeed = 0.3,
  interactive = false,
  glowAmount = 0.002,
  pillarWidth = 3,
  pillarHeight = 0.4,
  noiseIntensity = 0.5,
  pillarRotation = 25,
}: LightPillarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const animate = () => {
      // Clear with fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      timeRef.current += rotationSpeed * 0.01;

      // Create gradient for pillars
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, topColor);
      gradient.addColorStop(0.5, bottomColor);
      gradient.addColorStop(1, topColor);

      // Draw light pillars
      const pillarCount = 12;
      for (let i = 0; i < pillarCount; i++) {
        const angle = (i / pillarCount) * Math.PI * 2 + timeRef.current;
        const x = centerX + Math.cos(angle) * 200;
        const y = centerY + Math.sin(angle) * 200;

        const noise = Math.sin(timeRef.current * 2 + i) * noiseIntensity;
        const width = pillarWidth + noise;
        const height = (canvas.height / 2) * pillarHeight;

        // Draw pillar
        ctx.save();
        ctx.globalAlpha = (Math.sin(timeRef.current * 2 + i) * 0.5 + 0.5) * intensity;
        ctx.fillStyle = gradient;
        ctx.translate(centerX, centerY);
        ctx.rotate(angle + (pillarRotation * Math.PI / 180));
        ctx.fillRect(-width / 2, -height / 2, width, height);
        ctx.restore();

        // Add glow
        ctx.shadowColor = topColor;
        ctx.shadowBlur = 30 * glowAmount * 100;
        ctx.globalAlpha = (Math.sin(timeRef.current * 2 + i) * 0.3 + 0.3) * intensity * glowAmount;
        ctx.fillStyle = gradient;
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(angle + (pillarRotation * Math.PI / 180));
        ctx.fillRect(-width / 2, -height / 2, width, height);
        ctx.restore();
      }

      ctx.globalAlpha = 1;

      requestAnimationFrame(animate);
    };

    animate();

    if (interactive) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [topColor, bottomColor, intensity, rotationSpeed, glowAmount, pillarWidth, pillarHeight, noiseIntensity, pillarRotation]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
      }}
    />
  );
}
