import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { calculateCreditScore } from '@/app/utils/loanCalculations';
import { UserProfile } from '@/app/types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface CreditScoreSimulatorProps {
  currentProfile: UserProfile;
}

export function CreditScoreSimulator({ currentProfile }: CreditScoreSimulatorProps) {
  const [simProfile, setSimProfile] = useState({ ...currentProfile });
  const [currentScore, setCurrentScore] = useState(0);
  const [projectedScore, setProjectedScore] = useState(0);
  const [scoreDiff, setScoreDiff] = useState(0);

  useEffect(() => {
    const current = calculateCreditScore(currentProfile);
    const projected = calculateCreditScore(simProfile);
    setCurrentScore(current);
    setProjectedScore(projected);
    setScoreDiff(projected - current);
  }, [currentProfile, simProfile]);

  const updateSimField = <K extends keyof UserProfile>(key: K, value: UserProfile[K]) => {
    setSimProfile((prev) => ({ ...prev, [key]: value }));
  };

  const resetSimulation = () => {
    setSimProfile({ ...currentProfile });
  };

  const getDiffColor = () => {
    if (scoreDiff > 0) return 'text-green-600 dark:text-green-400';
    if (scoreDiff < 0) return 'text-red-600 dark:text-red-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  const getDiffIcon = () => {
    if (scoreDiff > 0) return <TrendingUp className="size-5" />;
    if (scoreDiff < 0) return <TrendingDown className="size-5" />;
    return <Minus className="size-5" />;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Credit Score Simulator</CardTitle>
        <CardDescription>
          Adjust your financial parameters to see how they affect your credit score
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Score Comparison */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-lg">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Current Score</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{currentScore}</p>
          </div>
          <div className={`text-center flex flex-col items-center justify-center ${getDiffColor()}`}>
            {getDiffIcon()}
            <p className="text-2xl font-bold">
              {scoreDiff > 0 ? '+' : ''}{scoreDiff}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Projected Score</p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{projectedScore}</p>
          </div>
        </div>

        {/* Simulation Controls */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900 dark:text-white">What-If Scenarios</h4>
          
          {/* Monthly Income */}
          <div>
            <label className="flex justify-between text-sm text-gray-700 dark:text-gray-300 mb-1">
              <span>Monthly Income</span>
              <span className="font-medium">₹{simProfile.monthlyIncome.toLocaleString()}</span>
            </label>
            <input
              type="range"
              min="10000"
              max="200000"
              step="5000"
              value={simProfile.monthlyIncome}
              onChange={(e) => updateSimField('monthlyIncome', Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Monthly Expenses */}
          <div>
            <label className="flex justify-between text-sm text-gray-700 dark:text-gray-300 mb-1">
              <span>Monthly Expenses</span>
              <span className="font-medium">₹{simProfile.monthlyExpenses.toLocaleString()}</span>
            </label>
            <input
              type="range"
              min="5000"
              max="150000"
              step="2000"
              value={simProfile.monthlyExpenses}
              onChange={(e) => updateSimField('monthlyExpenses', Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Existing Loans */}
          <div>
            <label className="flex justify-between text-sm text-gray-700 dark:text-gray-300 mb-1">
              <span>Number of Loans</span>
              <span className="font-medium">{simProfile.existingLoans}</span>
            </label>
            <input
              type="range"
              min="0"
              max="10"
              step="1"
              value={simProfile.existingLoans}
              onChange={(e) => updateSimField('existingLoans', Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Existing EMI */}
          <div>
            <label className="flex justify-between text-sm text-gray-700 dark:text-gray-300 mb-1">
              <span>Monthly EMI</span>
              <span className="font-medium">₹{simProfile.existingEMI.toLocaleString()}</span>
            </label>
            <input
              type="range"
              min="0"
              max="50000"
              step="1000"
              value={simProfile.existingEMI}
              onChange={(e) => updateSimField('existingEMI', Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        </div>

        {/* Insights */}
        <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
          <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">💡 Insights</h4>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            {scoreDiff > 20 && <li>✅ Great improvement! This scenario significantly boosts your score.</li>}
            {scoreDiff > 0 && scoreDiff <= 20 && <li>👍 Positive change that will help your creditworthiness.</li>}
            {scoreDiff === 0 && <li>➖ No change in score with these parameters.</li>}
            {scoreDiff < 0 && <li>⚠️ This scenario would lower your credit score. Consider alternatives.</li>}
            {simProfile.monthlyExpenses > simProfile.monthlyIncome && (
              <li>🚨 Expenses exceed income - not sustainable!</li>
            )}
            {simProfile.existingEMI / simProfile.monthlyIncome > 0.5 && (
              <li>⚠️ EMI is more than 50% of income - high debt burden.</li>
            )}
          </ul>
        </div>

        {/* Reset Button */}
        <button
          onClick={resetSimulation}
          className="w-full py-2 px-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
        >
          Reset to Current Profile
        </button>
      </CardContent>
    </Card>
  );
}
