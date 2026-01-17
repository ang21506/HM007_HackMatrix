import { motion } from 'framer-motion';

interface XPGainProps {
  xp: number;
  x?: number;
  y?: number;
  onComplete?: () => void;
}

export function XPGain({ xp, x = 50, y = 50, onComplete }: XPGainProps) {
  return (
    <motion.div
      className="fixed pointer-events-none flex items-center justify-center"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(-50%, -50%)',
      }}
      initial={{ opacity: 1, y: 0, scale: 1 }}
      animate={{
        opacity: 0,
        y: -100,
        scale: 1.2,
      }}
      transition={{
        duration: 2,
        ease: 'easeOut',
      }}
      onAnimationComplete={onComplete}
    >
      <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 drop-shadow-lg">
        +{xp} XP
      </div>
    </motion.div>
  );
}
