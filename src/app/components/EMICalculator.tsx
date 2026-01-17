import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { monthlyEmi } from '@/app/utils/loanCalculations';

export function EMICalculator() {
  const [principal, setPrincipal] = useState(500000);
  const [rate, setRate] = useState(12);
  const [months, setMonths] = useState(36);
  const emi = monthlyEmi(principal, rate, months);
  const total = emi * months;

  return (
    <Card>
      <CardHeader>
        <CardTitle>EMI Calculator</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <label className="text-sm">
          <span className="text-gray-600 dark:text-gray-300">Principal (₹)</span>
          <input type="number" className="mt-1 w-full border dark:border-gray-600 rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} />
        </label>
        <label className="text-sm">
          <span className="text-gray-600 dark:text-gray-300">Rate (% APR)</span>
          <input type="number" className="mt-1 w-full border dark:border-gray-600 rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
        </label>
        <label className="text-sm">
          <span className="text-gray-600 dark:text-gray-300">Tenure (months)</span>
          <input type="number" className="mt-1 w-full border dark:border-gray-600 rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" value={months} onChange={(e) => setMonths(Number(e.target.value))} />
        </label>
        <div className="md:col-span-3 p-3 rounded border dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
          <div className="text-sm text-gray-600 dark:text-gray-300">Monthly EMI</div>
          <div className="text-xl font-bold text-gray-900 dark:text-white">₹{emi.toFixed(0)}</div>
          <div className="text-sm mt-1 text-gray-600 dark:text-gray-400">Total Repayment: ₹{total.toFixed(0)}</div>
        </div>
      </CardContent>
    </Card>
  );
}
