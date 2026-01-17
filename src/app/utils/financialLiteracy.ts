export interface Lesson {
  id: string;
  title: string;
  category: string;
  content: string;
  duration: string;
  icon: string;
}

export interface DailyTip {
  id: string;
  tip: string;
  category: string;
  date: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  xpReward: number;
}

export const lessons: Lesson[] = [
  {
    id: 'cibil-score',
    title: 'What is CIBIL Score?',
    category: 'Credit Basics',
    icon: '📊',
    duration: '2 min',
    content: `**CIBIL Score** is a 3-digit number (300-900) that represents your creditworthiness.

**Why it matters:**
- Banks use it to approve loans
- Higher score = better interest rates
- Reflects your credit history

**Score Ranges:**
- 300-549: Poor
- 550-649: Average
- 650-749: Good
- 750-900: Excellent

**Key Factors:**
1. Payment history (35%)
2. Credit utilization (30%)
3. Credit age (15%)
4. Credit mix (10%)
5. Recent inquiries (10%)`,
  },
  {
    id: 'emi-basics',
    title: 'Understanding EMI',
    category: 'Loans',
    icon: '💰',
    duration: '2 min',
    content: `**EMI (Equated Monthly Installment)** is a fixed payment you make monthly to repay a loan.

**Formula:**
EMI = [P × R × (1+R)^N] / [(1+R)^N-1]

Where:
- P = Principal (loan amount)
- R = Monthly interest rate
- N = Number of months

**Example:**
Loan: ₹5,00,000
Rate: 12% per year
Tenure: 3 years (36 months)
EMI: ₹16,607

**Pro Tips:**
- Shorter tenure = Higher EMI but less total interest
- Longer tenure = Lower EMI but more total interest
- Prepay when possible to save interest`,
  },
  {
    id: 'interest-rates',
    title: 'Interest Rates Explained',
    category: 'Finance',
    icon: '📈',
    duration: '2 min',
    content: `**Interest Rate** is the cost of borrowing money, expressed as a percentage.

**Types:**
1. **Fixed Rate** - Stays constant throughout loan tenure
2. **Floating Rate** - Changes with market conditions

**Common Rates in India (2026):**
- Home Loan: 8-10% per annum
- Personal Loan: 10-16% per annum
- Car Loan: 8-12% per annum
- Credit Card: 24-42% per annum

**How to Get Lower Rates:**
- Maintain high credit score (750+)
- Choose shorter tenure
- Make larger down payment
- Compare multiple lenders
- Negotiate based on relationship`,
  },
  {
    id: 'credit-utilization',
    title: 'Credit Utilization Ratio',
    category: 'Credit Basics',
    icon: '🎯',
    duration: '2 min',
    content: `**Credit Utilization** is how much credit you're using vs. your total credit limit.

**Formula:**
(Total Credit Used / Total Credit Limit) × 100

**Example:**
Credit Card Limit: ₹1,00,000
Amount Used: ₹30,000
Utilization: 30%

**Ideal Ranges:**
- Below 30%: Excellent
- 30-50%: Good
- 50-70%: Fair
- Above 70%: Poor (hurts credit score)

**Tips to Improve:**
- Pay off balances regularly
- Request credit limit increase
- Don't close old credit cards
- Spread purchases across cards`,
  },
  {
    id: 'loan-types',
    title: 'Types of Loans',
    category: 'Loans',
    icon: '🏦',
    duration: '2 min',
    content: `**Secured Loans** (backed by collateral):
- Home Loan - Property as collateral
- Car Loan - Vehicle as collateral
- Gold Loan - Gold jewelry as collateral
✅ Lower interest rates
❌ Risk of losing asset

**Unsecured Loans** (no collateral):
- Personal Loan
- Credit Cards
- Education Loan (sometimes)
✅ Faster approval
❌ Higher interest rates

**When to Choose:**
- Secured: Large amounts, long tenure
- Unsecured: Small amounts, short tenure`,
  },
  {
    id: 'debt-management',
    title: 'Smart Debt Management',
    category: 'Finance',
    icon: '💡',
    duration: '2 min',
    content: `**50-30-20 Rule for Debt:**
- 50% Income: Essentials
- 30% Income: Lifestyle
- 20% Income: Savings + Debt Repayment

**Debt Repayment Strategies:**

1. **Avalanche Method**
   - Pay highest interest rate first
   - Saves most money

2. **Snowball Method**
   - Pay smallest debt first
   - Builds motivation

**Warning Signs:**
- EMI > 50% of income
- Missing payment deadlines
- Taking loans to repay loans

**Action Steps:**
- Create emergency fund (6 months)
- Avoid unnecessary loans
- Prepay high-interest debt`,
  },
];

export const dailyTips: DailyTip[] = [
  {
    id: 'tip1',
    tip: 'Pay your credit card bills in full before the due date to avoid interest charges and maintain a good credit score.',
    category: 'Credit Cards',
    date: new Date().toISOString(),
  },
  {
    id: 'tip2',
    tip: 'Keep your credit utilization below 30% for a healthy credit score. If your limit is ₹1 lakh, use less than ₹30,000.',
    category: 'Credit Score',
    date: new Date().toISOString(),
  },
  {
    id: 'tip3',
    tip: 'Check your CIBIL score for free once a year to catch errors and monitor your credit health.',
    category: 'Credit Monitoring',
    date: new Date().toISOString(),
  },
  {
    id: 'tip4',
    tip: 'EMI should not exceed 40% of your monthly income to maintain financial stability.',
    category: 'Loans',
    date: new Date().toISOString(),
  },
  {
    id: 'tip5',
    tip: 'Avoid taking multiple loans at once - it signals financial stress to lenders and hurts your credit score.',
    category: 'Loans',
    date: new Date().toISOString(),
  },
  {
    id: 'tip6',
    tip: 'Build an emergency fund of 6 months expenses before taking on major debt like home loans.',
    category: 'Financial Planning',
    date: new Date().toISOString(),
  },
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What is a good CIBIL score for loan approval?',
    options: ['Below 600', '600-700', '700-750', 'Above 750'],
    correctAnswer: 3,
    explanation: 'A CIBIL score above 750 is considered excellent and significantly improves your chances of loan approval with better interest rates.',
    xpReward: 20,
  },
  {
    id: 'q2',
    question: 'What does EMI stand for?',
    options: [
      'Easy Monthly Income',
      'Equated Monthly Installment',
      'Equal Money Investment',
      'Estimated Monthly Interest',
    ],
    correctAnswer: 1,
    explanation: 'EMI stands for Equated Monthly Installment - a fixed payment you make each month to repay a loan.',
    xpReward: 15,
  },
  {
    id: 'q3',
    question: 'What is the ideal credit utilization ratio?',
    options: ['Below 10%', 'Below 30%', 'Below 50%', 'Below 70%'],
    correctAnswer: 1,
    explanation: 'Keeping credit utilization below 30% is ideal for maintaining a healthy credit score.',
    xpReward: 20,
  },
  {
    id: 'q4',
    question: 'Which type of loan typically has the lowest interest rate?',
    options: ['Personal Loan', 'Credit Card', 'Home Loan', 'Gold Loan'],
    correctAnswer: 2,
    explanation: 'Home loans typically have the lowest interest rates (8-10%) because they are secured by property.',
    xpReward: 15,
  },
  {
    id: 'q5',
    question: 'How often should you check your credit report?',
    options: ['Monthly', 'Quarterly', 'Annually', 'Never'],
    correctAnswer: 2,
    explanation: 'You should check your credit report at least once a year to catch errors and monitor your credit health.',
    xpReward: 15,
  },
  {
    id: 'q6',
    question: 'What percentage of income should your EMI not exceed?',
    options: ['20%', '30%', '40%', '50%'],
    correctAnswer: 2,
    explanation: 'Your total EMI payments should not exceed 40% of your monthly income to maintain financial stability.',
    xpReward: 20,
  },
];

export function getTodaysTip(): DailyTip {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return dailyTips[dayOfYear % dailyTips.length];
}
