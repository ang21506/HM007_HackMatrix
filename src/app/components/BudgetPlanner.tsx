import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { Trash2, Plus, TrendingDown } from 'lucide-react';

interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  color: string;
}

export function BudgetPlanner() {
  const [budgets, setBudgets] = useState<Budget[]>([
    { id: '1', category: 'Food & Dining', limit: 500, spent: 320, color: '#FF6B6B' },
    { id: '2', category: 'Transportation', limit: 300, spent: 180, color: '#4ECDC4' },
    { id: '3', category: 'Entertainment', limit: 200, spent: 150, color: '#95E1D3' },
    { id: '4', category: 'Utilities', limit: 400, spent: 380, color: '#FFE66D' },
  ]);

  const [newCategory, setNewCategory] = useState('');
  const [newLimit, setNewLimit] = useState('');
  const [showForm, setShowForm] = useState(false);

  const addBudget = () => {
    if (!newCategory || !newLimit) return;

    const colors = ['#FF6B6B', '#4ECDC4', '#95E1D3', '#FFE66D', '#A8E6CF', '#FF8B94'];
    const newBudget: Budget = {
      id: Date.now().toString(),
      category: newCategory,
      limit: parseFloat(newLimit),
      spent: 0,
      color: colors[budgets.length % colors.length],
    };

    setBudgets([...budgets, newBudget]);
    setNewCategory('');
    setNewLimit('');
    setShowForm(false);
  };

  const deleteBudget = (id: string) => {
    setBudgets(budgets.filter((b) => b.id !== id));
  };

  const updateSpent = (id: string, amount: number) => {
    setBudgets(
      budgets.map((b) => (b.id === id ? { ...b, spent: Math.max(0, b.spent + amount) } : b))
    );
  };

  const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const remainingBudget = totalBudget - totalSpent;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Budget Planner</h2>
        <p className="text-gray-600 dark:text-gray-400">Manage and track your spending across categories</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Budget</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{totalBudget.toLocaleString()}</p>
              </div>
              <div className="text-3xl">💰</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Spent</p>
                <p className="text-2xl font-bold text-red-600">₹{totalSpent.toLocaleString()}</p>
              </div>
              <div className="text-3xl">📊</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Remaining</p>
                <p className={`text-2xl font-bold ${remainingBudget >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ₹{remainingBudget.toLocaleString()}
                </p>
              </div>
              <div className="text-3xl">✨</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Budget Form */}
      {showForm && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Category name (e.g., Food, Transport)"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="number"
                placeholder="Budget limit"
                value={newLimit}
                onChange={(e) => setNewLimit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <div className="flex gap-2">
                <button
                  onClick={addBudget}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Add Budget
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add Budget Button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          <Plus className="size-5" />
          Add New Budget
        </button>
      )}

      {/* Budget List */}
      <div className="space-y-4">
        {budgets.map((budget) => {
          const percentage = Math.min((budget.spent / budget.limit) * 100, 100);
          const isOverBudget = budget.spent > budget.limit;

          return (
            <Card key={budget.id} className={isOverBudget ? 'border-red-500' : ''}>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: budget.color }}
                      />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{budget.category}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          ₹{budget.spent.toLocaleString()} of ₹{budget.limit.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteBudget(budget.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="size-5" />
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          isOverBudget ? 'bg-red-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600 dark:text-gray-400">
                        {percentage.toFixed(0)}% used
                      </span>
                      <span className={isOverBudget ? 'text-red-600 font-semibold' : 'text-green-600'}>
                        {isOverBudget ? `Over by ₹${(budget.spent - budget.limit).toLocaleString()}` : `₹${(budget.limit - budget.spent).toLocaleString()} left`}
                      </span>
                    </div>
                  </div>

                  {/* Quick Add/Subtract */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateSpent(budget.id, -50)}
                      className="flex-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800 font-medium py-2 px-3 rounded transition-colors text-sm"
                    >
                      -₹50
                    </button>
                    <button
                      onClick={() => updateSpent(budget.id, 50)}
                      className="flex-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800 font-medium py-2 px-3 rounded transition-colors text-sm"
                    >
                      +₹50
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {budgets.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <TrendingDown className="size-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">No budgets yet. Create one to get started!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
