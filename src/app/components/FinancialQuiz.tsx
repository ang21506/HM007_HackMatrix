import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { quizQuestions, QuizQuestion } from '@/app/utils/financialLiteracy';
import { Trophy, CheckCircle, XCircle, Award } from 'lucide-react';

interface QuizProps {
  onXPEarned: (xp: number) => void;
}

export function FinancialQuiz({ onXPEarned }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState(0);
  const [totalXP, setTotalXP] = useState(0);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
  const allCompleted = completedQuestions === quizQuestions.length;

  const handleAnswerSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setShowResult(true);
    
    if (isCorrect) {
      setScore(score + 1);
      const xp = currentQuestion.xpReward;
      setTotalXP(totalXP + xp);
      onXPEarned(xp);
    }
    setCompletedQuestions(completedQuestions + 1);
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setCompletedQuestions(0);
    setTotalXP(0);
  };

  if (allCompleted) {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="size-6 text-yellow-500" />
            Quiz Completed!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="space-y-2">
            <div className="text-6xl font-bold text-blue-600 dark:text-blue-400">{percentage}%</div>
            <p className="text-xl text-gray-700 dark:text-gray-300">
              You scored {score} out of {quizQuestions.length}
            </p>
          </div>

          <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg">
            <div className="flex items-center justify-center gap-2 text-purple-700 dark:text-purple-300">
              <Award className="size-6" />
              <span className="text-2xl font-bold">+{totalXP} XP Earned!</span>
            </div>
          </div>

          {percentage >= 80 && (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-2 border-green-300 dark:border-green-700">
              <p className="text-green-800 dark:text-green-200 font-semibold">
                🎉 Excellent! You're a financial literacy pro!
              </p>
            </div>
          )}

          {percentage >= 60 && percentage < 80 && (
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-2 border-blue-300 dark:border-blue-700">
              <p className="text-blue-800 dark:text-blue-200 font-semibold">
                👍 Good job! Keep learning to master financial concepts.
              </p>
            </div>
          )}

          {percentage < 60 && (
            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-2 border-orange-300 dark:border-orange-700">
              <p className="text-orange-800 dark:text-orange-200 font-semibold">
                📚 Review the lessons and try again to improve your score!
              </p>
            </div>
          )}

          <button
            onClick={handleRestart}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Retake Quiz
          </button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Financial Literacy Quiz</CardTitle>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Question {currentQuestionIndex + 1} of {quizQuestions.length}
          </div>
        </div>
        <CardDescription>Test your knowledge and earn XP!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Bar */}
        <div>
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Progress</span>
            <span>{Math.round(((currentQuestionIndex + 1) / quizQuestions.length) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {currentQuestion.question}
          </h3>

          {/* Options */}
          <div className="space-y-2">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className={`w-full p-3 text-left rounded-lg border-2 transition-all ${
                  selectedAnswer === index
                    ? showResult
                      ? isCorrect
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : showResult && index === currentQuestion.correctAnswer
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-900 dark:text-white">{option}</span>
                  {showResult && (
                    <>
                      {index === currentQuestion.correctAnswer && (
                        <CheckCircle className="size-5 text-green-600" />
                      )}
                      {selectedAnswer === index && !isCorrect && (
                        <XCircle className="size-5 text-red-600" />
                      )}
                    </>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Explanation */}
        {showResult && (
          <div className={`p-4 rounded-lg ${
            isCorrect
              ? 'bg-green-50 dark:bg-green-900/20 border border-green-300 dark:border-green-700'
              : 'bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700'
          }`}>
            <h4 className={`font-semibold mb-2 ${
              isCorrect ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
            }`}>
              {isCorrect ? '✅ Correct!' : '❌ Incorrect'}
            </h4>
            <p className={`text-sm ${
              isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
            }`}>
              {currentQuestion.explanation}
            </p>
            {isCorrect && (
              <p className="text-sm font-medium mt-2 text-purple-700 dark:text-purple-300">
                +{currentQuestion.xpReward} XP earned!
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          {!showResult ? (
            <button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              {currentQuestionIndex < quizQuestions.length - 1 ? 'Next Question' : 'View Results'}
            </button>
          )}
        </div>

        {/* Score Display */}
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>Current Score: {score}/{completedQuestions}</span>
          <span>Total XP: {totalXP}</span>
        </div>
      </CardContent>
    </Card>
  );
}
