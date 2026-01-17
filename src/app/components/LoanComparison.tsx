import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { monthlyEmi } from '@/app/utils/loanCalculations';

const lenders = [
  { name: 'Bank A', rate: 11.5 },
  { name: 'Bank B', rate: 12.2 },
  { name: 'NBFC C', rate: 14.0 },
];

export function LoanComparison() {
  const principal = 500000; // ₹5L example
  const months = 36; // 3 years
  return (
    <Card>
      <CardHeader>
        <CardTitle>Loan Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left border-b dark:border-gray-600">
                <th className="py-2 text-gray-700 dark:text-gray-300">Lender</th>
                <th className="py-2 text-gray-700 dark:text-gray-300">Rate</th>
                <th className="py-2 text-gray-700 dark:text-gray-300">EMI (₹)</th>
                <th className="py-2 text-gray-700 dark:text-gray-300">Total (₹)</th>
              </tr>
            </thead>
            <tbody>
              {lenders.map((l) => {
                const emi = monthlyEmi(principal, l.rate, months);
                return (
                  <tr key={l.name} className="border-b dark:border-gray-700">
                    <td className="py-2 text-gray-900 dark:text-white">{l.name}</td>
                    <td className="py-2 text-gray-900 dark:text-white">{l.rate}%</td>
                    <td className="py-2 font-medium text-gray-900 dark:text-white">{emi.toFixed(0)}</td>
                    <td className="py-2 text-gray-900 dark:text-white">{(emi * months).toFixed(0)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
