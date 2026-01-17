import { useEffect, useRef, useState } from 'react';

interface AnimatedMeshProps {
  interactive?: boolean;
}

export function AnimatedMesh({ interactive = true }: AnimatedMeshProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
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

    // Create mesh grid
    const gridSize = 40;
    const cols = Math.ceil(width / gridSize) + 1;
    const rows = Math.ceil(height / gridSize) + 1;
    const mesh: Array<{ x: number; y: number; originalX: number; originalY: number }> = [];

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * gridSize;
        const y = j * gridSize;
        mesh.push({
          x,
          y,
          originalX: x,
          originalY: y,
        });
      }
    }

    let animationId: number;

    const animate = () => {
      // Clear with semi-transparent background
      ctx.fillStyle = 'rgba(10, 10, 20, 0.15)';
      ctx.fillRect(0, 0, width, height);

      timeRef.current += 0.016;

      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#00f2fe');
      gradient.addColorStop(0.25, '#4facfe');
      gradient.addColorStop(0.5, '#2F4BC0');
      gradient.addColorStop(0.75, '#E945F5');
      gradient.addColorStop(1, '#00f2fe');

      // Update mesh points
      mesh.forEach((point, idx) => {
        const wave1 = Math.sin((timeRef.current * 2 + point.originalX * 0.01)) * 15;
        const wave2 = Math.cos((timeRef.current * 1.5 + point.originalY * 0.01)) * 15;

        point.x = point.originalX + wave1;
        point.y = point.originalY + wave2;

        // Mouse interaction
        if (interactive && mousePos) {
          const dx = mousePos.x - point.x;
          const dy = mousePos.y - point.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 150;

          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            point.x += (dx / distance) * force * 20;
            point.y += (dy / distance) * force * 20;
          }
        }
      });

      // Draw mesh lines
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.3;

      for (let i = 0; i < cols - 1; i++) {
        for (let j = 0; j < rows - 1; j++) {
          const idx1 = i * rows + j;
          const idx2 = (i + 1) * rows + j;
          const idx3 = i * rows + (j + 1);
          const idx4 = (i + 1) * rows + (j + 1);

          if (mesh[idx1] && mesh[idx2] && mesh[idx3] && mesh[idx4]) {
            // Horizontal lines
            ctx.beginPath();
            ctx.moveTo(mesh[idx1].x, mesh[idx1].y);
            ctx.lineTo(mesh[idx2].x, mesh[idx2].y);
            ctx.stroke();

            // Vertical lines
            ctx.beginPath();
            ctx.moveTo(mesh[idx1].x, mesh[idx1].y);
            ctx.lineTo(mesh[idx3].x, mesh[idx3].y);
            ctx.stroke();
          }
        }
      }

      // Draw mesh points
      ctx.globalAlpha = 0.6;
      ctx.fillStyle = gradient;
      mesh.forEach((point) => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
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
