'use client';

import { useState } from 'react';
import type { Transaction, TransactionType } from '@/types';
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '@/constants/categories';
import { currentMonth } from '@/utils/format';

interface Props {
  onAdd: (tx: Omit<Transaction, 'id' | 'createdAt'>) => Promise<void>;
}

const today = () => new Date().toISOString().slice(0, 10);

export default function TransactionForm({ onAdd }: Props) {
  const [type, setType] = useState<TransactionType>('expense');
  const [date, setDate] = useState(today());
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!date || !category || !amount) return;
    setSubmitting(true);
    await onAdd({ type, date, category, amount: Number(amount), memo });
    setCategory('');
    setAmount('');
    setMemo('');
    setSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 space-y-3">
      <h2 className="font-semibold text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">거래 추가</h2>

      <div className="flex gap-2">
        {(['income', 'expense'] as TransactionType[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => { setType(t); setCategory(''); }}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors
              ${type === t
                ? t === 'income' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
              }`}
          >
            {t === 'income' ? '+ 수입' : '- 지출'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="input-field col-span-2 sm:col-span-1"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="input-field col-span-2 sm:col-span-1"
        >
          <option value="">카테고리 선택</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="금액 (원)"
          min={1}
          required
          className="input-field col-span-2 sm:col-span-1"
        />
        <input
          type="text"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="메모 (선택)"
          className="input-field col-span-2 sm:col-span-1"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-medium transition-colors"
      >
        {submitting ? '추가 중…' : '추가하기'}
      </button>
    </form>
  );
}
