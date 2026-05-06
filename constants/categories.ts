export const INCOME_CATEGORIES = ['급여', '부업', '용돈', '기타수입'] as const;

export const EXPENSE_CATEGORIES = [
  '식비', '교통', '쇼핑', '의료', '문화/여가', '공과금', '저축', '기타지출',
] as const;

export type IncomeCategory = (typeof INCOME_CATEGORIES)[number];
export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];

export const ALL_CATEGORIES = [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES];
