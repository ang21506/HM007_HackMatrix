import { useEffect, useRef, useState } from 'react';

interface AnimatedGlobeProps {
  interactive?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  distance: number;
  originalDistance: number;
  velocity: number;
  size: number;
}

export function AnimatedGlobe({ interactive = true }: AnimatedGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.parentElement?.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = (rect?.width || 1080) * dpr;
    canvas.height = (rect?.height || 1080) * dpr;
    ctx.scale(dpr, dpr);

    const width = canvas.width / dpr;
    const height = canvas.height / dpr;

    const centerX = width / 2;
    const centerY = height / 2;
    const globeRadius = 150;
    const particleCount = 200;

    // Initialize particles in a spherical pattern
    particlesRef.current = [];
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = globeRadius * (0.5 + Math.random() * 0.5);
      const size = Math.random() * 2 + 0.5;

      particlesRef.current.push({
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        angle: angle,
        distance: distance,
        originalDistance: distance,
        velocity: Math.random() * 0.5 + 0.2,
        size: size,
      });
    }

    let animationId: number;

    const animate = () => {
      // Clear canvas with trail effect
      ctx.fillStyle = 'rgba(10, 10, 20, 0.1)';
      ctx.fillRect(0, 0, width, height);

      timeRef.current += 0.016;

      // Create gradient for particles
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, globeRadius);
      gradient.addColorStop(0, '#E945F5');
      gradient.addColorStop(0.5, '#2F4BC0');
      gradient.addColorStop(1, '#00f2fe');

      // Update particles
      particlesRef.current.forEach((particle, idx) => {
        // Orbital motion
        particle.angle += particle.velocity * 0.01;
        particle.distance = particle.originalDistance + Math.sin(timeRef.current * 2 + idx) * 20;

        // Position based on angle and distance
        const targetX = centerX + Math.cos(particle.angle) * particle.distance;
        const targetY = centerY + Math.sin(particle.angle) * particle.distance;

        // Smooth movement toward target
        particle.x += (targetX - particle.x) * 0.1;
        particle.y += (targetY - particle.y) * 0.1;

        // Mouse interaction - particles disperse away
        if (interactive && mousePos) {
          const dx = particle.x - mousePos.x;
          const dy = particle.y - mousePos.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 300;

          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            const angle = Math.atan2(dy, dx);
            
            // Push particle away from mouse
            particle.x += Math.cos(angle) * force * 8;
            particle.y += Math.sin(angle) * force * 8;
            
            // Increase distance from globe center (disperse effect)
            particle.distance += force * 15;
          } else {
            // Gradually return to original distance
            particle.distance += (particle.originalDistance - particle.distance) * 0.02;
          }
        } else {
          // Gradual return to original state
          particle.distance += (particle.originalDistance - particle.distance) * 0.02;
        }
      });

      // Draw glowing globe effect
      const glowGradient = ctx.createRadialGradient(centerX, centerY, globeRadius * 0.3, centerX, centerY, globeRadius * 1.2);
      glowGradient.addColorStop(0, 'rgba(233, 69, 245, 0.2)');
      glowGradient.addColorStop(0.5, 'rgba(47, 75, 192, 0.1)');
      glowGradient.addColorStop(1, 'rgba(0, 242, 254, 0)');

      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, globeRadius * 1.2, 0, Math.PI * 2);
      ctx.fill();

      // Draw particles
      particlesRef.current.forEach((particle) => {
        const distanceFromCenter = Math.sqrt(
          (particle.x - centerX) ** 2 + (particle.y - centerY) ** 2
        );
        
        // Opacity based on distance from center
        const opacity = Math.max(0.2, 1 - (distanceFromCenter / (globeRadius * 2)));

        // Create gradient for each particle
        const particleGradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 3
        );
        particleGradient.addColorStop(0, `rgba(233, 69, 245, ${opacity})`);
        particleGradient.addColorStop(0.5, `rgba(47, 75, 192, ${opacity * 0.6})`);
        particleGradient.addColorStop(1, `rgba(0, 242, 254, 0)`);

        ctx.fillStyle = particleGradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw connection lines to nearby particles
        particlesRef.current.forEach((otherParticle, otherIdx) => {
          if (otherIdx <= particlesRef.current.indexOf(particle)) return;

          const dx = otherParticle.x - particle.x;
          const dy = otherParticle.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.strokeStyle = `rgba(233, 69, 245, ${(1 - distance / 100) * 0.1})`;
            ctx.lineWidth = 0.5;
            ctx.globalAlpha = (1 - distance / 100) * 0.2;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        });
      });

      animationId = requestAnimationFrame(animate);
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

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [interactive, mousePos]);

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
