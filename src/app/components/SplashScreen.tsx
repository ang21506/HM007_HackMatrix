import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FloatingLines } from '@/app/components/FloatingLines';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Auto-redirect after 6.5 seconds (slower to see full animation)
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onComplete(), 700); // Slightly longer fade out
    }, 6500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Floating Lines Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <FloatingLines
            linesGradient={['#E945F5', '#2F4BC0', '#E945F5']}
            animationSpeed={0.6}
            interactive={false}
            bendRadius={5}
            bendStrength={-0.5}
            mouseDamping={0.05}
            parallax={true}
            parallaxStrength={0.2}
          />
        </div>
      </div>

      {/* Content */}
      <motion.div className="relative z-10 text-center">
        {/* Logo/Icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 0.25,
            type: 'spring',
            stiffness: 80,
            damping: 18,
          }}
          className="mb-6"
        >
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl">
            <span className="text-4xl font-bold text-white">💳</span>
          </div>
        </motion.div>

        {/* App Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.6,
            duration: 1.4,
          }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 drop-shadow-lg">
            CreditWise
          </h1>
          <p className="text-white text-lg mt-4 font-light tracking-widest">
            Your Credit Health Platform
          </p>
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 2.0,
            duration: 1.2,
          }}
          className="mt-8"
        >
          <p className="text-gray-300 text-sm">
            Empower Your Financial Future
          </p>
        </motion.div>

        {/* Loading Indicator */}
        <motion.div
          className="mt-8 flex justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-white rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{
                delay: i * 0.2,
                duration: 1.5,
                repeat: Infinity,
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Skip Button */}
      <motion.button
        className="absolute top-6 right-6 text-white/60 hover:text-white text-sm transition-colors"
        onClick={() => {
          setIsVisible(false);
          setTimeout(() => onComplete(), 500);
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        Skip
      </motion.button>
    </motion.div>
  );
}
