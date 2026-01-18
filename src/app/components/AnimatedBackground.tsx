import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function AnimatedBackground() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; duration: number }>>([]);

  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 15 + Math.random() * 20,
    }));
    setParticles(newParticles);
  }, []);

  const gradientVariants = {
    animate: {
      background: [
        'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 25%, #667eea 50%, #764ba2 75%, #f093fb 100%)',
        'linear-gradient(135deg, #f093fb 0%, #4facfe 25%, #00f2fe 50%, #667eea 75%, #764ba2 100%)',
        'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
      ],
      transition: {
        duration: 15,
        repeat: Infinity,
          ease: "linear" as const,
      },
    },
  };

  return (
    <div className="fixed inset-0 overflow-hidden -z-10">
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0"
        variants={gradientVariants}
        animate="animate"
      />

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 bg-white rounded-full opacity-20"
          initial={{ x: `${particle.x}%`, y: `${particle.y}%`, opacity: 0 }}
          animate={{
            y: [
              `${particle.y}%`,
              `${particle.y - 100}%`,
            ],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Grid Pattern Overlay (subtle) */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/5 to-transparent opacity-30" />

      {/* Dark overlay for light mode, less overlay for dark mode */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/20 dark:from-black/40 dark:via-transparent dark:to-black/40" />
    </div>
  );
}
