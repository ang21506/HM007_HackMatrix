import { useState } from 'react';
import { UserProfile } from '@/app/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { TrendingUp, ArrowRight, SkipForward } from 'lucide-react';

interface ProfileSetupProps {
  onComplete: (profile: UserProfile) => void;
  onSkip: () => void;
  userName: string;
}

export function ProfileSetup({ onComplete, onSkip, userName }: ProfileSetupProps) {
  const [formData, setFormData] = useState({
    name: userName,
    age: 25,
    employmentType: 'salaried' as const,
    monthlyIncome: 50000,
    monthlyExpenses: 20000,
    existingLoans: 0,
    existingEMI: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = <K extends keyof typeof formData>(key: K, value: typeof formData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (formData.age < 18) newErrors.age = 'Must be 18 or older';
    if (formData.age > 100) newErrors.age = 'Invalid age';
    if (formData.monthlyIncome <= 0) newErrors.monthlyIncome = 'Income must be positive';
    if (formData.monthlyExpenses < 0) newErrors.monthlyExpenses = 'Cannot be negative';
    if (formData.existingLoans < 0) newErrors.existingLoans = 'Cannot be negative';
    if (formData.existingEMI < 0) newErrors.existingEMI = 'Cannot be negative';
    if (formData.monthlyExpenses > formData.monthlyIncome) {
      newErrors.monthlyExpenses = 'Expenses cannot exceed income';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onComplete(formData as UserProfile);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-lg">
              <TrendingUp className="size-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Complete Your Profile</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Help us personalize your credit health insights
          </p>
        </div>

        {/* Form Card */}
        <Card>
          <CardHeader>
            <CardTitle>Financial Information</CardTitle>
            <CardDescription>
              This information helps us calculate your credit score and loan eligibility
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
                </div>

                {/* Age */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Age <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => updateField('age', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  {errors.age && <p className="text-sm text-red-600 mt-1">{errors.age}</p>}
                </div>

                {/* Employment Type */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Employment Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.employmentType}
                    onChange={(e) => updateField('employmentType', e.target.value as any)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="salaried">Salaried</option>
                    <option value="self-employed">Self-Employed</option>
                    <option value="student">Student</option>
                    <option value="unemployed">Unemployed</option>
                  </select>
                </div>

                {/* Monthly Income */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Monthly Income (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.monthlyIncome}
                    onChange={(e) => updateField('monthlyIncome', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  {errors.monthlyIncome && <p className="text-sm text-red-600 mt-1">{errors.monthlyIncome}</p>}
                </div>

                {/* Monthly Expenses */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Monthly Expenses (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.monthlyExpenses}
                    onChange={(e) => updateField('monthlyExpenses', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  {errors.monthlyExpenses && <p className="text-sm text-red-600 mt-1">{errors.monthlyExpenses}</p>}
                </div>

                {/* Existing Loans */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Number of Existing Loans
                  </label>
                  <input
                    type="number"
                    value={formData.existingLoans}
                    onChange={(e) => updateField('existingLoans', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  {errors.existingLoans && <p className="text-sm text-red-600 mt-1">{errors.existingLoans}</p>}
                </div>

                {/* Existing EMI */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Total Monthly EMI (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.existingEMI}
                    onChange={(e) => updateField('existingEMI', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  {errors.existingEMI && <p className="text-sm text-red-600 mt-1">{errors.existingEMI}</p>}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  Complete Setup
                  <ArrowRight className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={onSkip}
                  className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  Skip for Now
                  <SkipForward className="size-4" />
                </button>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
                You can update your profile anytime from the Profile tab
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
