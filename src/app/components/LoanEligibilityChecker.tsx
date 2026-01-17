import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { UserProfile } from '@/app/types';
import { monthlyEmi } from '@/app/utils/loanCalculations';

export function LoanEligibilityChecker({ profile }: { profile: UserProfile }) {
  const disposable = Math.max(0, profile.monthlyIncome - profile.monthlyExpenses - profile.existingEMI);
  const safeEmi = disposable * 0.4; // assume max 40% of disposable goes to EMI
  const months = 60; // 5 years
  const rate = 12; // 12% APR
  // invert EMI to get principal roughly
  const r = rate / 12 / 100;
  const pow = Math.pow(1 + r, months);
  const principal = safeEmi * (pow - 1) / (r * pow);
  const eligible = principal > 100000; // > ₹1L

  return (
    <Card>
      <CardHeader>
        <CardTitle>Loan Eligibility</CardTitle>
        <CardDescription>Estimated capacity based on profile</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="text-gray-700 dark:text-gray-300">Disposable Income</div>
          <div className="text-right font-medium text-gray-900 dark:text-white">₹{disposable.toLocaleString('en-IN')}</div>
          <div className="text-gray-700 dark:text-gray-300">Safe EMI (40%)</div>
          <div className="text-right font-medium text-gray-900 dark:text-white">₹{safeEmi.toFixed(0)}</div>
          <div className="text-gray-700 dark:text-gray-300">Assumed Tenure</div>
          <div className="text-right text-gray-900 dark:text-white">{months} months</div>
          <div className="text-gray-700 dark:text-gray-300">Assumed Rate</div>
          <div className="text-right text-gray-900 dark:text-white">{rate}% APR</div>
        </div>
        <div className="mt-3 p-3 rounded border dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">Estimated Max Principal</div>
          <div className="text-xl font-bold text-gray-900 dark:text-white">₹{Math.round(principal).toLocaleString('en-IN')}</div>
          <div className="text-sm mt-1 text-gray-600 dark:text-gray-400">Example EMI: ₹{monthlyEmi(principal, rate, months).toFixed(0)}</div>
        </div>
        <div className={`mt-2 text-sm font-semibold ${eligible ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
          {eligible ? 'Eligible for typical personal loan.' : 'May not be eligible; improve disposable income.'}
        </div>
      </CardContent>
    </Card>
  );
}
