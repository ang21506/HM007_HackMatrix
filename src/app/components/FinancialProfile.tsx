import { useState } from 'react';
import { UserProfile } from '@/app/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';

export function FinancialProfile({ profile, onUpdate }: { profile: UserProfile; onUpdate: (p: UserProfile) => void }) {
  const [local, setLocal] = useState<UserProfile>(profile);

  const updateField = <K extends keyof UserProfile>(key: K, val: UserProfile[K]) => {
    const next = { ...local, [key]: val } as UserProfile;
    setLocal(next);
    onUpdate(next);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Profile</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="text-sm">
          <span className="text-gray-600 dark:text-gray-300">Name</span>
          <input className="mt-1 w-full border dark:border-gray-600 rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" value={local.name} onChange={(e) => updateField('name', e.target.value)} />
        </label>
        <label className="text-sm">
          <span className="text-gray-600 dark:text-gray-300">Age</span>
          <input type="number" className="mt-1 w-full border dark:border-gray-600 rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" value={local.age} onChange={(e) => updateField('age', Number(e.target.value))} />
        </label>
        <label className="text-sm">
          <span className="text-gray-600 dark:text-gray-300">Employment</span>
          <select className="mt-1 w-full border dark:border-gray-600 rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" value={local.employmentType} onChange={(e) => updateField('employmentType', e.target.value as any)}>
            <option value="salaried">Salaried</option>
            <option value="self-employed">Self Employed</option>
            <option value="student">Student</option>
            <option value="unemployed">Unemployed</option>
          </select>
        </label>
        <label className="text-sm">
          <span className="text-gray-600 dark:text-gray-300">Monthly Income (₹)</span>
          <input type="number" className="mt-1 w-full border dark:border-gray-600 rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" value={local.monthlyIncome} onChange={(e) => updateField('monthlyIncome', Number(e.target.value))} />
        </label>
        <label className="text-sm">
          <span className="text-gray-600 dark:text-gray-300">Monthly Expenses (₹)</span>
          <input type="number" className="mt-1 w-full border dark:border-gray-600 rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" value={local.monthlyExpenses} onChange={(e) => updateField('monthlyExpenses', Number(e.target.value))} />
        </label>
        <label className="text-sm">
          <span className="text-gray-600 dark:text-gray-300">Existing Loans</span>
          <input type="number" className="mt-1 w-full border dark:border-gray-600 rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" value={local.existingLoans} onChange={(e) => updateField('existingLoans', Number(e.target.value))} />
        </label>
        <label className="text-sm">
          <span className="text-gray-600 dark:text-gray-300">Existing EMI (₹)</span>
          <input type="number" className="mt-1 w-full border dark:border-gray-600 rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" value={local.existingEMI} onChange={(e) => updateField('existingEMI', Number(e.target.value))} />
        </label>
      </CardContent>
    </Card>
  );
}
