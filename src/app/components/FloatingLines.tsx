import { useEffect, useRef, useState } from 'react';

interface FloatingLinesProps {
  linesGradient?: string[];
  animationSpeed?: number;
  interactive?: boolean;
  bendRadius?: number;
  bendStrength?: number;
  mouseDamping?: number;
  parallax?: boolean;
  parallaxStrength?: number;
}

export function FloatingLines({
  linesGradient = ['#E945F5', '#2F4BC0', '#E945F5'],
  animationSpeed = 1,
  interactive = true,
  bendRadius = 5,
  bendStrength = -0.5,
  mouseDamping = 0.05,
  parallax = true,
  parallaxStrength = 0.2,
}: FloatingLinesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.parentElement?.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    canvas.width = (rect?.width || 1080) * dpr;
    canvas.height = (rect?.height || 1080) * dpr;
    ctx.scale(dpr, dpr);

    const width = canvas.width / dpr;
    const height = canvas.height / dpr;

    // Particle system
    const particles: any[] = [];
    const particleCount = 20;

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8 * animationSpeed,
        vy: (Math.random() - 0.5) * 0.8 * animationSpeed,
        radius: Math.random() * 2 + 1,
        originalX: 0,
        originalY: 0,
      });
    }

    let time = 0;

    const animate = () => {
      // Clear canvas with slight transparency for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
      ctx.fillRect(0, 0, width, height);

      time += 0.005 * animationSpeed;

      // Update particles
      particles.forEach((particle, idx) => {
        // Smooth wave movement
        particle.x += particle.vx * 0.3;
        particle.y += particle.vy * 0.3;

        // Perlin-like noise for organic movement
        particle.x += Math.sin(time + idx) * 0.5;
        particle.y += Math.cos(time + idx * 0.7) * 0.5;

        // Bounce
        if (particle.x < 0) {
          particle.x = width;
          particle.vx *= -1;
        }
        if (particle.x > width) {
          particle.x = 0;
          particle.vx *= -1;
        }
        if (particle.y < 0) {
          particle.y = height;
          particle.vy *= -1;
        }
        if (particle.y > height) {
          particle.y = 0;
          particle.vy *= -1;
        }

        // Mouse interaction
        if (interactive && mousePos) {
          const dx = mousePos.x - particle.x;
          const dy = mousePos.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = bendRadius * 100;

          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            particle.vx +=
              (dx / distance) * force * bendStrength * mouseDamping * 0.01;
            particle.vy +=
              (dy / distance) * force * bendStrength * mouseDamping * 0.01;
          }
        }
      });

      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      for (let i = 0; i < linesGradient.length; i++) {
        gradient.addColorStop(i / (linesGradient.length - 1), linesGradient[i]);
      }

      // Draw lines between particles
      particles.forEach((particle, idx) => {
        // Connect to nearby particles
        for (let j = idx + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = other.x - particle.x;
          const dy = other.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 250) {
            const opacity = (1 - distance / 250) * 0.4;
            ctx.strokeStyle = gradient;
            ctx.globalAlpha = opacity;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      });

      // Draw particles
      ctx.globalAlpha = 0.8;
      particles.forEach((particle) => {
        const grad = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.radius * 2
        );
        grad.addColorStop(0, linesGradient[0]);
        grad.addColorStop(1, linesGradient[linesGradient.length - 1]);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      const newRect = canvas.parentElement?.getBoundingClientRect();
      if (newRect) {
        canvas.width = newRect.width * dpr;
        canvas.height = newRect.height * dpr;
        ctx.scale(dpr, dpr);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [linesGradient, animationSpeed, interactive, bendRadius, bendStrength, mouseDamping, mousePos]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        filter: 'blur(0.5px)',
      }}
    />
  );
}
