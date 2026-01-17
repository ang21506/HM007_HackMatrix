import { motion } from 'framer-motion';
import { Star, Trophy } from 'lucide-react';

interface LevelUpProps {
  level: number;
  onComplete?: () => void;
}

export function LevelUpAnimation({ level, onComplete }: LevelUpProps) {
  // Confetti particles
  const confetti = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    delay: (i % 10) * 0.05,
    rotation: Math.random() * 360,
    duration: 2 + Math.random(),
  }));

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onAnimationComplete={onComplete}
    >
      {/* Confetti */}
      {confetti.map((conf) => (
        <motion.div
          key={conf.id}
          className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
          initial={{
            x: 0,
            y: 0,
            opacity: 1,
            rotate: 0,
          }}
          animate={{
            x: (Math.random() - 0.5) * 400,
            y: (Math.random() - 0.5) * 400,
            opacity: 0,
            rotate: conf.rotation,
          }}
          transition={{
            delay: conf.delay,
            duration: conf.duration,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Center Popup */}
      <motion.div
        className="relative flex flex-col items-center gap-4"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 15,
        }}
      >
        {/* Background Circle */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />

        {/* Trophy Icon */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
        >
          <Trophy className="size-16 text-yellow-400 drop-shadow-lg relative z-10" />
        </motion.div>

        {/* Level Text */}
        <motion.div
          className="relative z-10 text-center"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: 0.2,
          }}
        >
          <h2 className="text-5xl font-bold text-white drop-shadow-lg mb-2">LEVEL UP!</h2>
          <p className="text-3xl font-bold text-yellow-300 drop-shadow-lg">Level {level}</p>
        </motion.div>

        {/* Stars */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${30 + i * 40}%`,
              top: '20%',
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
              scale: [0, 1, 0],
            }}
            transition={{
              delay: i * 0.2,
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            <Star className="size-8 text-yellow-300 fill-yellow-300 drop-shadow-lg" />
          </motion.div>
        ))}
      </motion.div>

      {/* Background Blur */}
      <motion.div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
