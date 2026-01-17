import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { UserStats, Achievement } from '@/app/utils/gamification';
import { Trophy, Star, Flame, TrendingUp } from 'lucide-react';

interface GamificationDashboardProps {
  stats: UserStats;
}

export function GamificationDashboard({ stats }: GamificationDashboardProps) {
  const progressPercent = (stats.xp / stats.xpToNextLevel) * 100;
  const unlockedAchievements = stats.achievements.filter((a) => a.unlocked);
  const lockedAchievements = stats.achievements.filter((a) => !a.unlocked);

  return (
    <div className="space-y-6">
      {/* Level & Progress Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="size-5 text-yellow-500" />
            Your Progress
          </CardTitle>
          <CardDescription>Keep tracking your credit health to level up!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Level Display */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Current Level</p>
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">Level {stats.level}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400">XP</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {stats.xp} / {stats.xpToNextLevel}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
              <span>Progress to Level {stats.level + 1}</span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Streak Counter */}
          <div className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
            <Flame className="size-8 text-orange-500" />
            <div>
              <p className="font-semibold text-orange-900 dark:text-orange-300">
                {stats.streak} Day Streak! 🔥
              </p>
              <p className="text-sm text-orange-700 dark:text-orange-400">
                Keep logging in daily to maintain your streak
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="size-5 text-yellow-500" />
            Achievements
          </CardTitle>
          <CardDescription>
            {unlockedAchievements.length} of {stats.achievements.length} unlocked
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Unlocked Achievements */}
          {unlockedAchievements.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Unlocked ({unlockedAchievements.length})
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {unlockedAchievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="p-3 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-2 border-yellow-400 dark:border-yellow-600 rounded-lg text-center"
                  >
                    <div className="text-3xl mb-1">{achievement.icon}</div>
                    <p className="font-semibold text-xs text-gray-900 dark:text-white">
                      {achievement.title}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {achievement.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Locked Achievements */}
          {lockedAchievements.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Locked ({lockedAchievements.length})
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {lockedAchievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="p-3 bg-gray-100 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-center opacity-60"
                  >
                    <div className="text-3xl mb-1 grayscale">{achievement.icon}</div>
                    <p className="font-semibold text-xs text-gray-700 dark:text-gray-300">
                      {achievement.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {achievement.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="size-5 text-green-500" />
            Your Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.level}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Level</p>
            </div>
            <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.xp}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Total XP</p>
            </div>
            <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.streak}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Day Streak</p>
            </div>
            <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {unlockedAchievements.length}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Achievements</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
