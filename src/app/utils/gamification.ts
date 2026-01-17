export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface UserStats {
  level: number;
  xp: number;
  xpToNextLevel: number;
  streak: number;
  lastVisit: string;
  achievements: Achievement[];
}

export function calculateLevel(xp: number): number {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
}

export function calculateXPForNextLevel(level: number): number {
  return level * level * 100;
}

export function checkAchievements(profile: any, creditScore: number, stats: UserStats): Achievement[] {
  const achievements: Achievement[] = [
    {
      id: 'first_login',
      title: '🎯 First Steps',
      description: 'Complete your first login',
      icon: '🎯',
      unlocked: true,
      unlockedAt: new Date().toISOString(),
    },
    {
      id: 'profile_complete',
      title: '📝 Profile Master',
      description: 'Complete your financial profile',
      icon: '📝',
      unlocked: true,
      unlockedAt: new Date().toISOString(),
    },
    {
      id: 'credit_good',
      title: '⭐ Good Credit',
      description: 'Achieve a credit score above 700',
      icon: '⭐',
      unlocked: creditScore >= 700,
      unlockedAt: creditScore >= 700 ? new Date().toISOString() : undefined,
    },
    {
      id: 'credit_excellent',
      title: '💎 Excellent Credit',
      description: 'Achieve a credit score above 800',
      icon: '💎',
      unlocked: creditScore >= 800,
      unlockedAt: creditScore >= 800 ? new Date().toISOString() : undefined,
    },
    {
      id: 'low_debt',
      title: '🎈 Debt-Free Hero',
      description: 'Have no existing loans',
      icon: '🎈',
      unlocked: profile.existingLoans === 0,
      unlockedAt: profile.existingLoans === 0 ? new Date().toISOString() : undefined,
    },
    {
      id: 'savings_master',
      title: '💰 Savings Champion',
      description: 'Keep expenses below 50% of income',
      icon: '💰',
      unlocked: profile.monthlyExpenses < profile.monthlyIncome * 0.5,
      unlockedAt: profile.monthlyExpenses < profile.monthlyIncome * 0.5 ? new Date().toISOString() : undefined,
    },
    {
      id: 'streak_7',
      title: '🔥 Week Warrior',
      description: '7-day login streak',
      icon: '🔥',
      unlocked: stats.streak >= 7,
      unlockedAt: stats.streak >= 7 ? new Date().toISOString() : undefined,
    },
    {
      id: 'streak_30',
      title: '🏆 Monthly Master',
      description: '30-day login streak',
      icon: '🏆',
      unlocked: stats.streak >= 30,
      unlockedAt: stats.streak >= 30 ? new Date().toISOString() : undefined,
    },
    {
      id: 'financial_guru',
      title: '🧙 Financial Guru',
      description: 'Reach Level 5',
      icon: '🧙',
      unlocked: stats.level >= 5,
      unlockedAt: stats.level >= 5 ? new Date().toISOString() : undefined,
    },
  ];

  return achievements;
}

export function calculateStreak(lastVisit: string): number {
  const last = new Date(lastVisit);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - last.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  // If visited yesterday or today, increment streak
  if (diffDays <= 1) {
    const savedStreak = localStorage.getItem('userStreak');
    return savedStreak ? parseInt(savedStreak) + 1 : 1;
  }
  // Reset streak if more than 1 day gap
  return 1;
}

export function awardXP(action: string): number {
  const xpValues: Record<string, number> = {
    login: 10,
    profile_update: 20,
    calculator_use: 15,
    comparison_view: 15,
    eligibility_check: 25,
    simulator_use: 30,
  };
  return xpValues[action] || 5;
}
