import { useRef, useEffect } from 'react';

export function BlobAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Blob configuration
    const blobs = [
      {
        x: canvas.width * 0.25,
        y: canvas.height * 0.25,
        radius: 100,
        color: '#5227FF',
        speed: 0.002,
        offset: 0,
      },
      {
        x: canvas.width * 0.75,
        y: canvas.height * 0.35,
        radius: 120,
        color: '#FF9FFC',
        speed: 0.0015,
        offset: Math.PI / 3,
      },
      {
        x: canvas.width * 0.5,
        y: canvas.height * 0.75,
        radius: 90,
        color: '#A8E6CF',
        speed: 0.0018,
        offset: (2 * Math.PI) / 3,
      },
      {
        x: canvas.width * 0.15,
        y: canvas.height * 0.65,
        radius: 110,
        color: '#FFE66D',
        speed: 0.0016,
        offset: Math.PI,
      },
    ];

    const animate = () => {
      // Clear canvas with fade
      ctx.fillStyle = 'rgba(26, 0, 51, 0.95)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      timeRef.current += 1;

      blobs.forEach((blob) => {
        ctx.save();

        // Create blob shape with morphing points
        const points = 6;
        ctx.beginPath();

        for (let i = 0; i < points; i++) {
          const angle = (i / points) * Math.PI * 2;
          
          // Morphing effect using sine waves
          const wave1 = Math.sin(timeRef.current * blob.speed + blob.offset) * 30;
          const wave2 = Math.sin(timeRef.current * blob.speed * 0.7 + blob.offset + Math.PI / 2) * 25;
          const wave3 = Math.sin(timeRef.current * blob.speed * 1.3 + blob.offset + Math.PI) * 20;
          
          const radius = blob.radius + wave1 + wave2 + wave3;
          
          const x = blob.x + Math.cos(angle) * radius;
          const y = blob.y + Math.sin(angle) * radius;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        // Close path with curve
        const angle = 0;
        const wave1 = Math.sin(timeRef.current * blob.speed + blob.offset) * 30;
        const wave2 = Math.sin(timeRef.current * blob.speed * 0.7 + blob.offset + Math.PI / 2) * 25;
        const wave3 = Math.sin(timeRef.current * blob.speed * 1.3 + blob.offset + Math.PI) * 20;
        const radius = blob.radius + wave1 + wave2 + wave3;
        ctx.lineTo(blob.x + Math.cos(angle) * radius, blob.y + Math.sin(angle) * radius);

        // Smooth the blob using quadratic curves
        ctx.closePath();

        // Create gradient
        const gradient = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.radius * 1.5);
        gradient.addColorStop(0, blob.color + '40');
        gradient.addColorStop(1, blob.color + '10');

        ctx.fillStyle = gradient;
        ctx.fill();

        // Add glow
        ctx.strokeStyle = blob.color + '30';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.restore();
      });

      // Add subtle grid overlay
      ctx.globalAlpha = 0.05;
      ctx.strokeStyle = '#5227FF';
      ctx.lineWidth = 1;

      for (let x = 0; x < canvas.width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

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
