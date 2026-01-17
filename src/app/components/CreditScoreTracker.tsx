import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { CreditScoreData } from '@/app/types';

export function CreditScoreTracker({ creditScore, history }: { creditScore: number; history: CreditScoreData[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Credit Score</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">{creditScore}</div>
          <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded">
            <div className="h-2 bg-blue-600 dark:bg-blue-400 rounded" style={{ width: `${(creditScore - 300) / 6}%` }} />
          </div>
        </div>
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">12-month trend</h4>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-xs text-gray-600 dark:text-gray-400">
            {history.map((h) => (
              <div key={h.date} className="p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700">
                <div>{new Date(h.date).toLocaleDateString()}</div>
                <div className="font-semibold">{h.score}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
