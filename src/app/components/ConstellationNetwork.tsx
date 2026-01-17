import { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  hue: number;
}

export function ConstellationNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Initialize particles
    const particleCount = 35;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1.5,
        hue: Math.random() * 60 + 250, // Purple to violet range
      });
    }

    particlesRef.current = particles;

    const connectionDistance = 150;

    const animate = () => {
      // Clear with gradient fade
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(26, 0, 51, 0.98)');
      gradient.addColorStop(1, 'rgba(51, 0, 102, 0.98)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      timeRef.current += 0.005;

      const particles = particlesRef.current;

      // Update particles
      particles.forEach((particle, idx) => {
        // Add subtle oscillation
        particle.x += particle.vx + Math.sin(timeRef.current + idx) * 0.1;
        particle.y += particle.vy + Math.cos(timeRef.current + idx * 0.7) * 0.1;

        // Bounce off edges
        if (particle.x <= 0 || particle.x >= canvas.width) particle.vx *= -1;
        if (particle.y <= 0 || particle.y >= canvas.height) particle.vy *= -1;

        // Keep in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));
      });

      // Draw connections (network lines)
      ctx.strokeStyle = 'rgba(82, 39, 255, 0.2)';
      ctx.lineWidth = 1;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - particles[i].x;
          const dy = particles[j].y - particles[i].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            // Fade lines based on distance
            const alpha = (1 - distance / connectionDistance) * 0.4;
            ctx.strokeStyle = `rgba(82, 39, 255, ${alpha})`;
            ctx.lineWidth = 1.5;

            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles (constellation stars)
      particles.forEach((particle) => {
        // Inner glow
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.radius * 3
        );
        gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 60%, 0.8)`);
        gradient.addColorStop(0.5, `hsla(${particle.hue}, 100%, 50%, 0.4)`);
        gradient.addColorStop(1, `hsla(${particle.hue}, 100%, 50%, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * 3, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.fillStyle = `hsla(${particle.hue}, 100%, 70%, 1)`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();

        // Bright center
        ctx.fillStyle = 'hsla(0, 0%, 100%, 0.9)';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * 0.4, 0, Math.PI * 2);
        ctx.fill();
      });

      // Add subtle pulsing effect
      const pulse = Math.sin(timeRef.current * 0.5) * 0.02 + 0.98;
      ctx.globalAlpha = pulse;

      // Draw pulse rings around random particles
      const pulseIdx = Math.floor(timeRef.current * 10) % particles.length;
      const pulseParticle = particles[pulseIdx];

      ctx.strokeStyle = `hsla(280, 100%, 50%, 0.3)`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(pulseParticle.x, pulseParticle.y, 20 + (timeRef.current * 50) % 30, 0, Math.PI * 2);
      ctx.stroke();

      ctx.globalAlpha = 1;

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block' }}
    />
  );
}
