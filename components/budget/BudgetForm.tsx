'use client';

import { useState } from 'react';
import { EXPENSE_CATEGORIES } from '@/constants/categories';
import type { Budget, Transaction } from '@/types';
import BudgetStatus from './BudgetStatus';

interface Props {
  budgets: Budget[];
  transactions: Transaction[];
  onSet: (category: string, amount: number) => Promise<void>;
}

export default function BudgetForm({ budgets, transactions, onSet }: Props) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(EXPENSE_CATEGORIES.map((c) => [c, String(budgets.find((b) => b.category === c)?.amount ?? '')]))
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await Promise.all(
      EXPENSE_CATEGORIES.map((cat) => {
        const v = Number(values[cat]);
        if (v > 0) return onSet(cat, v);
      }).filter(Boolean)
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 space-y-3">
        <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">예산 설정</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {EXPENSE_CATEGORIES.map((cat) => (
            <div key={cat} className="flex items-center gap-2">
              <label className="text-sm w-24 shrink-0">{cat}</label>
              <input
                type="number"
                min={0}
                value={values[cat]}
                onChange={(e) => setValues((prev) => ({ ...prev, [cat]: e.target.value }))}
                placeholder="0"
                className="input-field flex-1 text-sm"
              />
            </div>
          ))}
        </div>
        <button type="submit" className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors">
          저장하기
        </button>
      </div>

      {budgets.length > 0 && (
        <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 space-y-4">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">예산 현황</h2>
          {budgets.filter((b) => b.amount > 0).map((b) => (
            <BudgetStatus key={b.category} budget={b} transactions={transactions} />
          ))}
        </div>
      )}
    </form>
  );
}
