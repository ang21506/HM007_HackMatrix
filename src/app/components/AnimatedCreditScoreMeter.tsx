import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

interface AnimatedCreditScoreMeterProps {
  score: number;
  maxScore?: number;
}

export function AnimatedCreditScoreMeter({ score, maxScore = 900 }: AnimatedCreditScoreMeterProps) {
  const percentage = (score / maxScore) * 100;
  const circumference = 2 * Math.PI * 45;

  // Determine color based on score
  let color = '#ef4444'; // red
  if (score >= 750) color = '#22c55e'; // green
  else if (score >= 650) color = '#eab308'; // yellow
  else if (score >= 550) color = '#f97316'; // orange

  const getScoreLabel = (s: number) => {
    if (s >= 750) return 'Excellent';
    if (s >= 650) return 'Good';
    if (s >= 550) return 'Fair';
    return 'Poor';
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Animated Circular Progress */}
      <motion.div className="relative w-40 h-40">
        {/* Background Circle */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-200 dark:text-gray-700"
          />

          {/* Animated Progress Circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - (percentage / 100) * circumference }}
            transition={{
              duration: 2,
              ease: 'easeOut',
            }}
            strokeDasharray={circumference}
            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
          />
        </svg>

        {/* Center Content */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <motion.div
            className="text-4xl font-bold"
            animate={{ color: [color, color] }}
          >
            {score}
          </motion.div>
          <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
            {getScoreLabel(score)}
          </div>
        </motion.div>

        {/* Pulsing Icon */}
        <motion.div
          className="absolute -top-4 -right-4"
          animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="p-2 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full">
            <TrendingUp className="size-5 text-white" />
          </div>
        </motion.div>
      </motion.div>

      {/* Score Range */}
      <motion.div
        className="w-full text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-sm text-gray-600 dark:text-gray-400">Score Range: 300 - {maxScore}</p>
      </motion.div>
    </div>
  );
}
