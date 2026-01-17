import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { lessons, dailyTips, getTodaysTip, Lesson } from '@/app/utils/financialLiteracy';
import { Book, Lightbulb, Clock, ArrowRight } from 'lucide-react';

export function FinancialLiteracy() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const todaysTip = getTodaysTip();

  if (selectedLesson) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedLesson(null)}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
        >
          ← Back to Lessons
        </button>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="text-4xl">{selectedLesson.icon}</div>
              <div>
                <CardTitle>{selectedLesson.title}</CardTitle>
                <CardDescription className="flex items-center gap-3 mt-1">
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs font-medium">
                    {selectedLesson.category}
                  </span>
                  <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                    <Clock className="size-3" />
                    {selectedLesson.duration} read
                  </span>
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose dark:prose-invert max-w-none">
              {selectedLesson.content.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('**') && paragraph.includes(':**')) {
                  const [title, ...content] = paragraph.split(':**');
                  return (
                    <div key={idx} className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {title.replace(/\*\*/g, '')}:
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                        {content.join(':**')}
                      </p>
                    </div>
                  );
                }
                return (
                  <p key={idx} className="text-gray-700 dark:text-gray-300 mb-3 whitespace-pre-line">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Daily Tip */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-300 dark:border-yellow-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-900 dark:text-yellow-200">
            <Lightbulb className="size-5" />
            💡 Daily Tip
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-yellow-900 dark:text-yellow-100 font-medium">{todaysTip.tip}</p>
          <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-2">
            Category: {todaysTip.category}
          </p>
        </CardContent>
      </Card>

      {/* Lessons Library */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Book className="size-5" />
            Financial Literacy Lessons
          </CardTitle>
          <CardDescription>Learn the basics of credit, loans, and personal finance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lessons.map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => setSelectedLesson(lesson)}
                className="p-4 border dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="text-3xl">{lesson.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {lesson.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{lesson.category}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-500 mt-2">
                        <Clock className="size-3" />
                        {lesson.duration} read
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="size-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* All Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Tips Collection</CardTitle>
          <CardDescription>Essential financial wisdom at a glance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {dailyTips.map((tip, idx) => (
              <div
                key={tip.id}
                className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-700"
              >
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 dark:text-gray-300">{tip.tip}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{tip.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
