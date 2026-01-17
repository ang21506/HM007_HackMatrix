export type EmploymentType = 'salaried' | 'self-employed' | 'student' | 'unemployed';

export interface UserProfile {
  name: string;
  age: number;
  employmentType: EmploymentType;
  monthlyIncome: number; // INR
  monthlyExpenses: number; // INR
  existingLoans: number;
  existingEMI: number; // INR
}

export interface CreditScoreData {
  date: string; // ISO date
  score: number; // 300 - 900
}
