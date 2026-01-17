import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { CreditScoreData } from '@/app/types';
import { AnimatedCreditScoreMeter } from '@/app/components/AnimatedCreditScoreMeter';

export function CreditScoreTracker({ creditScore, history }: { creditScore: number; history: CreditScoreData[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Credit Score</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <AnimatedCreditScoreMeter score={creditScore} maxScore={900} />
        </div>
        <div>
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
