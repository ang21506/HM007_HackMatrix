import { UserProfile, CreditScoreData } from '@/app/types';

export function calculateCreditScore(profile: UserProfile): number {
  const disposable = Math.max(0, profile.monthlyIncome - profile.monthlyExpenses - profile.existingEMI);
  const utilization = (profile.existingEMI + profile.monthlyExpenses) / Math.max(1, profile.monthlyIncome);
  const base = 600;
  const incomeBoost = Math.min(200, Math.floor((disposable / Math.max(1, profile.monthlyIncome)) * 300));
  const loansPenalty = Math.min(200, profile.existingLoans * 40);
  const utilizationPenalty = Math.floor(utilization * 150);
  const score = base + incomeBoost - loansPenalty - utilizationPenalty;
  return Math.max(300, Math.min(900, score));
}

export function generateMockCreditHistory(currentScore: number): CreditScoreData[] {
  const months = 12;
  const today = new Date();
  const history: CreditScoreData[] = [];
  let score = currentScore;
  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setMonth(today.getMonth() - i);
    // small random walk
    const delta = Math.floor((Math.random() - 0.4) * 20);
    score = Math.max(300, Math.min(900, score + delta));
    history.push({ date: d.toISOString().slice(0, 10), score });
  }
  return history;
}

export function monthlyEmi(principal: number, annualRatePct: number, months: number): number {
  const r = annualRatePct / 12 / 100;
  if (r === 0) return principal / months;
  const pow = Math.pow(1 + r, months);
  const emi = (principal * r * pow) / (pow - 1);
  return emi;
}
