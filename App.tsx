import { useState, useEffect } from 'react';
import { UserProfile, CreditScoreData } from '@/app/types';
import { calculateCreditScore, generateMockCreditHistory } from '@/app/utils/loanCalculations';
import { FinancialProfile } from '@/app/components/FinancialProfile';
import { CreditScoreTracker } from '@/app/components/CreditScoreTracker';
import { LoanEligibilityChecker } from '@/app/components/LoanEligibilityChecker';
import { EMICalculator } from '@/app/components/EMICalculator';
import { LoanComparison } from '@/app/components/LoanComparison';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { TrendingUp, Calculator, FileCheck, GitCompare, User, Activity } from 'lucide-react';

// Default user profile
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
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('userProfile');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });

  const [creditScore, setCreditScore] = useState<number>(0);
  const [creditHistory, setCreditHistory] = useState<CreditScoreData[]>([]);

  useEffect(() => {
    const score = calculateCreditScore(profile);
    setCreditScore(score);
    const history = generateMockCreditHistory(score);
    setCreditHistory(history);
  }, [profile]);

  const handleProfileUpdate = (newProfile: UserProfile) => {
    setProfile(newProfile);
    localStorage.setItem('userProfile', JSON.stringify(newProfile));
  };

  const disposableIncome = profile.monthlyIncome - profile.monthlyExpenses - profile.existingEMI;
  const financialHealthScore = Math.min(100, Math.round((disposableIncome / profile.monthlyIncome) * 200));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <TrendingUp className="size-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">CreditWise</h1>
                <p className="text-sm text-gray-600">Your Credit Health Platform</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <div className="text-right">
                <p className="text-sm text-gray-600">Credit Score</p>
                <p className="text-xl font-bold text-blue-600">{creditScore}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Financial Health</p>
                <p className="text-xl font-bold text-green-600">{financialHealthScore}%</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <Card className="mb-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0">
          <CardHeader>
            <CardTitle className="text-white">Welcome back, {profile.name}!</CardTitle>
            <CardDescription className="text-blue-100">
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

        {/* Main Navigation Tabs */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 h-auto gap-2">
            <TabsTrigger value="dashboard" className="flex items-center gap-2 py-3">
              <Activity className="size-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2 py-3">
              <User className="size-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="credit" className="flex items-center gap-2 py-3">
              <TrendingUp className="size-4" />
              <span className="hidden sm:inline">Credit Score</span>
            </TabsTrigger>
            <TabsTrigger value="eligibility" className="flex items-center gap-2 py-3">
              <FileCheck className="size-4" />
              <span className="hidden sm:inline">Eligibility</span>
            </TabsTrigger>
            <TabsTrigger value="calculator" className="flex items-center gap-2 py-3">
              <Calculator className="size-4" />
              <span className="hidden sm:inline">EMI Calc</span>
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
                        const tabsList = document.querySelector('[value="eligibility"]') as HTMLElement;
                        tabsList?.click();
                      }}
                      className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left"
                    >
                      <FileCheck className="size-5 text-blue-600 mb-2" />
                      <p className="font-medium text-sm">Check Eligibility</p>
                    </button>
                    <button
                      onClick={() => {
                        const tabsList = document.querySelector('[value="calculator"]') as HTMLElement;
                        tabsList?.click();
                      }}
                      className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left"
                    >
                      <Calculator className="size-5 text-green-600 mb-2" />
                      <p className="font-medium text-sm">Calculate EMI</p>
                    </button>
                    <button
                      onClick={() => {
                        const tabsList = document.querySelector('[value="compare"]') as HTMLElement;
                        tabsList?.click();
                      }}
                      className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left"
                    >
                      <GitCompare className="size-5 text-purple-600 mb-2" />
                      <p className="font-medium text-sm">Compare Loans</p>
                    </button>
                    <button
                      onClick={() => {
                        const tabsList = document.querySelector('[value="credit"]') as HTMLElement;
                        tabsList?.click();
                      }}
                      className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left"
                    >
                      <TrendingUp className="size-5 text-orange-600 mb-2" />
                      <p className="font-medium text-sm">View Trends</p>
                    </button>
                  </CardContent>
                </Card>
              </div>
            </div>
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

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
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
              <h3 className="font-semibold text-gray-900 mb-2">SDG Alignment</h3>
              <p>SDG 8: Decent Work and Economic Growth</p>
              <p>SDG 10: Reduced Inequalities</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Disclaimer</h3>
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
