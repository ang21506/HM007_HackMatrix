import { motion, AnimatePresence } from 'framer-motion';
import { Award, Star, Zap, Trophy, Target, Flame } from 'lucide-react';

interface AchievementUnlockProps {
  title: string;
  description: string;
  icon?: 'award' | 'star' | 'zap' | 'trophy' | 'target' | 'flame';
  onComplete?: () => void;
}

export function AchievementUnlock({
  title,
  description,
  icon = 'award',
  onComplete,
}: AchievementUnlockProps) {
  const iconMap = {
    award: <Award className="size-12 text-yellow-400" />,
    star: <Star className="size-12 text-yellow-400 fill-yellow-400" />,
    zap: <Zap className="size-12 text-blue-400" />,
    trophy: <Trophy className="size-12 text-yellow-500" />,
    target: <Target className="size-12 text-purple-400" />,
    flame: <Flame className="size-12 text-orange-400 fill-orange-400" />,
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-8 right-8 pointer-events-none z-50"
        initial={{ opacity: 0, x: 400, scale: 0.5 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 400 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 20,
        }}
        onAnimationComplete={() => {
          // Auto-remove after 4 seconds
          setTimeout(() => onComplete?.(), 4000);
        }}
      >
        <motion.div
          className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl p-6 shadow-2xl max-w-xs"
          animate={{
            boxShadow: [
              '0 0 20px rgba(168, 85, 247, 0.5)',
              '0 0 40px rgba(59, 130, 246, 0.8)',
              '0 0 20px rgba(168, 85, 247, 0.5)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          {/* Animated Background Gradient */}
          <motion.div
            className="absolute inset-0 rounded-xl opacity-50"
            animate={{
              background: [
                'linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)',
                'linear-gradient(135deg, #3b82f6 0%, #a855f7 100%)',
                'linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)',
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex items-center gap-4">
            {/* Icon Container */}
            <motion.div
              className="flex-shrink-0"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 10, 0, -10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            >
              <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                {iconMap[icon]}
              </div>
            </motion.div>

            {/* Text */}
            <div className="text-white">
              <motion.h3
                className="font-bold text-lg"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {title}
              </motion.h3>
              <motion.p
                className="text-sm text-white/80"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {description}
              </motion.p>
            </div>
          </div>

          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 rounded-xl opacity-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 0.5,
            }}
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
