import { useState, useEffect } from 'react';
import { UserProfile, CreditScoreData } from '@/app/types';
import { calculateCreditScore, generateMockCreditHistory } from '@/app/utils/loanCalculations';
import { FinancialProfile } from '@/app/components/FinancialProfile';
import { CreditScoreTracker } from '@/app/components/CreditScoreTracker';
import { LoanEligibilityChecker } from '@/app/components/LoanEligibilityChecker';
import { EMICalculator } from '@/app/components/EMICalculator';
import { LoanComparison } from '@/app/components/LoanComparison';
import { Login } from '@/app/components/Login';
import { ProfileSetup } from '@/app/components/ProfileSetup';
import { FinancialLiteracy } from '@/app/components/FinancialLiteracy';
import { FinancialQuiz } from '@/app/components/FinancialQuiz';
import { GamificationDashboard } from '@/app/components/GamificationDashboard';
import { AnimatedBackground } from '@/app/components/AnimatedBackground';
import { XPGain } from '@/app/components/XPGain';
import { LevelUpAnimation } from '@/app/components/LevelUpAnimation';
import { AnimatedCreditScoreMeter } from '@/app/components/AnimatedCreditScoreMeter';
import { AchievementUnlock } from '@/app/components/AchievementUnlock';
import { SplashScreen } from '@/app/components/SplashScreen';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { TrendingUp, Calculator, FileCheck, GitCompare, User, Activity, LogOut, Moon, Sun, BookOpen } from 'lucide-react';
import {
  UserStats,
  calculateLevel,
  calculateXPForNextLevel,
  checkAchievements,
  calculateStreak,
  awardXP,
} from '@/app/utils/gamification';

const DEFAULT_PROFILE: UserProfile = {
  name: 'TEJASWINI BURKULE',
  age: 19,
  employmentType: 'salaried',
  monthlyIncome: 75000,
  monthlyExpenses: 35000,
  existingLoans: 1,
  existingEMI: 12000,
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [profileComplete, setProfileComplete] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });
  
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('userProfile');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });

  const [creditScore, setCreditScore] = useState<number>(0);
  const [creditHistory, setCreditHistory] = useState<CreditScoreData[]>([]);
  const [userStats, setUserStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('userStats');
    if (saved) return JSON.parse(saved);
    return {
      level: 1,
      xp: 0,
      xpToNextLevel: 100,
      streak: 1,
      lastVisit: new Date().toISOString(),
      achievements: [],
    };
  });

  // Animation states
  const [xpGains, setXpGains] = useState<Array<{ id: number; xp: number; x: number; y: number }>>([]);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState(0);
  const [showAchievement, setShowAchievement] = useState(false);
  const [unlockedAchievement, setUnlockedAchievement] = useState<any>(null);

  useEffect(() => {
    const score = calculateCreditScore(profile);
    setCreditScore(score);
    const history = generateMockCreditHistory(score);
    setCreditHistory(history);

    // Update achievements
    const achievements = checkAchievements(profile, score, userStats);
    const updatedStats = { ...userStats, achievements };
    setUserStats(updatedStats);
    localStorage.setItem('userStats', JSON.stringify(updatedStats));
  }, [profile]);

  const handleLogin = (email: string, name: string) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    setProfile((prev) => ({ ...prev, name }));
    localStorage.setItem('userEmail', email);
    localStorage.setItem('isLoggedIn', 'true');
    
    // Check if profile was already completed
    const completed = localStorage.getItem('profileComplete');
    setProfileComplete(completed === 'true');

    // Award login XP and update streak
    const xp = awardXP('login');
    const newStreak = calculateStreak(userStats.lastVisit);
    const newXP = userStats.xp + xp;
    const newLevel = calculateLevel(newXP);
    const updatedStats: UserStats = {
      ...userStats,
      xp: newXP,
      level: newLevel,
      xpToNextLevel: calculateXPForNextLevel(newLevel),
      streak: newStreak,
      lastVisit: new Date().toISOString(),
    };
    setUserStats(updatedStats);
    localStorage.setItem('userStats', JSON.stringify(updatedStats));
    localStorage.setItem('userStreak', String(newStreak));
  };

  const handleProfileComplete = (newProfile: UserProfile) => {
    setProfile(newProfile);
    setProfileComplete(true);
    localStorage.setItem('userProfile', JSON.stringify(newProfile));
    localStorage.setItem('profileComplete', 'true');

    // Award XP for profile completion
    const xp = awardXP('profile_update');
    const newXP = userStats.xp + xp;
    const newLevel = calculateLevel(newXP);
    const updatedStats = {
      ...userStats,
      xp: newXP,
      level: newLevel,
      xpToNextLevel: calculateXPForNextLevel(newLevel),
    };
    setUserStats(updatedStats);
    localStorage.setItem('userStats', JSON.stringify(updatedStats));
  };

  const handleProfileSkip = () => {
    setProfileComplete(true);
    localStorage.setItem('profileComplete', 'true');
  };

  const handleXPEarned = (xp: number) => {
    const newXP = userStats.xp + xp;
    const newLevel = calculateLevel(newXP);
    const oldLevel = userStats.level;
    
    // Trigger XP gain animation
    const id = Date.now();
    setXpGains((prev) => [
      ...prev,
      { id, xp, x: Math.random() * 80 + 10, y: Math.random() * 60 + 20 },
    ]);

    const updatedStats: UserStats = {
      ...userStats,
      xp: newXP,
      level: newLevel,
      xpToNextLevel: calculateXPForNextLevel(newLevel),
    };
    setUserStats(updatedStats);
    localStorage.setItem('userStats', JSON.stringify(updatedStats));

    // Trigger level up animation if leveled up
    if (newLevel > oldLevel) {
      setNewLevel(newLevel);
      setShowLevelUp(true);
    }

    // Remove XP gain after animation
    setTimeout(() => {
      setXpGains((prev) => prev.filter((g) => g.id !== id));
    }, 2100);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    setProfileComplete(false);
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('profileComplete');
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Check if user was previously logged in
  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    const wasLoggedIn = localStorage.getItem('isLoggedIn');
    if (savedEmail && wasLoggedIn) {
      setIsLoggedIn(true);
      setUserEmail(savedEmail);
    }
  }, []);

  // Show splash screen first
  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  if (!profileComplete) {
    return (
      <ProfileSetup
        onComplete={handleProfileComplete}
        onSkip={handleProfileSkip}
        userName={profile.name}
      />
    );
  }

  const handleProfileUpdate = (newProfile: UserProfile) => {
    setProfile(newProfile);
    localStorage.setItem('userProfile', JSON.stringify(newProfile));
  };

  const disposableIncome = profile.monthlyIncome - profile.monthlyExpenses - profile.existingEMI;
  const financialHealthScore = Math.min(100, Math.round((disposableIncome / profile.monthlyIncome) * 200));

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''} bg-background text-foreground`}>
      <AnimatedBackground />
      
      {/* XP Gain Animations */}
      {xpGains.map((gain) => (
        <XPGain key={gain.id} xp={gain.xp} x={gain.x} y={gain.y} />
      ))}

      {/* Level Up Animation */}
      {showLevelUp && (
        <LevelUpAnimation
          level={newLevel}
          onComplete={() => setShowLevelUp(false)}
        />
      )}

      {/* Achievement Unlock */}
      {showAchievement && unlockedAchievement && (
        <AchievementUnlock
          title={unlockedAchievement.name}
          description={unlockedAchievement.description}
          icon={unlockedAchievement.icon || 'award'}
          onComplete={() => setShowAchievement(false)}
        />
      )}

      <header className="bg-background border-b border-border sticky top-0 z-10 shadow-sm relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <TrendingUp className="size-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">CreditWise</h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">Your Credit Health Platform</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-300">Level</p>
                <p className="text-xl font-bold text-purple-600 dark:text-purple-400">{userStats.level}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-300">Credit Score</p>
                <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{creditScore}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-300">Financial Health</p>
                <p className="text-xl font-bold text-green-600 dark:text-green-400">{financialHealthScore}%</p>
              </div>
              <button
                onClick={toggleDarkMode}
                className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? <Sun className="size-5" /> : <Moon className="size-5" />}
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <LogOut className="size-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0">
          <CardHeader>
            <CardTitle className="text-white">Welcome back, {profile.name}!</CardTitle>
            <CardDescription className="text-white">
              Track your credit health, check loan eligibility, and make informed financial decisions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <p className="text-sm text-blue-100">Credit Score</p>
                <p className="text-2xl font-bold">{creditScore}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <p className="text-sm text-blue-100">Monthly Income</p>
                <p className="text-2xl font-bold">₹{(profile.monthlyIncome / 1000).toFixed(0)}K</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <p className="text-sm text-blue-100">Disposable Income</p>
                <p className="text-2xl font-bold">₹{(disposableIncome / 1000).toFixed(0)}K</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <p className="text-sm text-blue-100">Active Loans</p>
                <p className="text-2xl font-bold">{profile.existingLoans}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-8 h-auto gap-2">
            <TabsTrigger value="dashboard" className="flex items-center gap-2 py-3">
              <Activity className="size-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2 py-3">
              <TrendingUp className="size-4" />
              <span className="hidden sm:inline">Progress</span>
            </TabsTrigger>
            <TabsTrigger value="simulator" className="flex items-center gap-2 py-3">
              <BookOpen className="size-4" />
              <span className="hidden sm:inline">Learn</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2 py-3">
              <User className="size-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="credit" className="flex items-center gap-2 py-3">
              <TrendingUp className="size-4" />
              <span className="hidden sm:inline">Score</span>
            </TabsTrigger>
            <TabsTrigger value="eligibility" className="flex items-center gap-2 py-3">
              <FileCheck className="size-4" />
              <span className="hidden sm:inline">Eligibility</span>
            </TabsTrigger>
            <TabsTrigger value="compare" className="flex items-center gap-2 py-3">
              <GitCompare className="size-4" />
              <span className="hidden sm:inline">Compare</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CreditScoreTracker creditScore={creditScore} history={creditHistory} />
              <div className="space-y-6">
                <FinancialProfile profile={profile} onUpdate={handleProfileUpdate} />
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common tasks and tools</CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        const tabsList = document.querySelector('[data-tab-trigger="eligibility"]') as HTMLElement;
                        tabsList?.click();
                      }}
                      className="p-4 border border-border rounded-lg bg-card hover:bg-muted transition-colors text-left"
                    >
                      <FileCheck className="size-5 text-blue-600 mb-2" />
                      <p className="font-medium text-sm text-foreground">Check Eligibility</p>
                    </button>
                    <button
                      onClick={() => {
                        const tabsList = document.querySelector('[data-tab-trigger="calculator"]') as HTMLElement;
                        tabsList?.click();
                      }}
                      className="p-4 border border-border rounded-lg bg-card hover:bg-muted transition-colors text-left"
                    >
                      <Calculator className="size-5 text-green-600 mb-2" />
                      <p className="font-medium text-sm text-foreground">Calculate EMI</p>
                    </button>
                    <button
                      onClick={() => {
                        const tabsList = document.querySelector('[data-tab-trigger="compare"]') as HTMLElement;
                        tabsList?.click();
                      }}
                      className="p-4 border border-border rounded-lg bg-card hover:bg-muted transition-colors text-left"
                    >
                      <GitCompare className="size-5 text-purple-600 mb-2" />
                      <p className="font-medium text-sm text-foreground">Compare Loans</p>
                    </button>
                    <button
                      onClick={() => {
                        const tabsList = document.querySelector('[data-tab-trigger="credit"]') as HTMLElement;
                        tabsList?.click();
                      }}
                      className="p-4 border border-border rounded-lg bg-card hover:bg-muted transition-colors text-left"
                    >
                      <TrendingUp className="size-5 text-orange-600 mb-2" />
                      <p className="font-medium text-sm text-foreground">View Trends</p>
                    </button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="achievements">
            <GamificationDashboard stats={userStats} />
          </TabsContent>

          <TabsContent value="simulator" className="space-y-6">
            <FinancialLiteracy />
            <FinancialQuiz onXPEarned={handleXPEarned} />
          </TabsContent>

          <TabsContent value="profile">
            <FinancialProfile profile={profile} onUpdate={handleProfileUpdate} />
          </TabsContent>

          <TabsContent value="credit">
            <CreditScoreTracker creditScore={creditScore} history={creditHistory} />
          </TabsContent>

          <TabsContent value="eligibility">
            <LoanEligibilityChecker profile={profile} />
          </TabsContent>

          <TabsContent value="calculator">
            <EMICalculator />
          </TabsContent>

          <TabsContent value="compare">
            <LoanComparison />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-background border-t border-border mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">About CreditWise</h3>
              <p>
                Empowering users to understand and improve their credit health through
                accessible tools and insights.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">SDG Alignment</h3>
              <p>SDG 8: Decent Work and Economic Growth</p>
              <p>SDG 10: Reduced Inequalities</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Disclaimer</h3>
              <p>
                This platform provides simulated data for educational purposes. Always
                consult financial advisors for real loan decisions.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
