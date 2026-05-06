'use client';

import { useState } from 'react';
import type { Transaction, TransactionType } from '@/types';
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '@/constants/categories';
import { filterTransactions } from '@/hooks/useTransactions';
import TransactionItem from './TransactionItem';
import { monthLabel } from '@/utils/format';

interface Props {
  transactions: Transaction[];
  month: string;
  onMonthChange: (m: string) => void;
  onDelete: (id: string) => void;
  loading: boolean;
}

function monthOptions() {
  const opts = [];
  const now = new Date();
  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const val = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    opts.push(val);
  }
  return opts;
}

export default function TransactionList({ transactions, month, onMonthChange, onDelete, loading }: Props) {
  const [typeFilter, setTypeFilter] = useState<'all' | TransactionType>('all');
  const [catFilter, setCatFilter] = useState('');

  const allCats = typeFilter === 'income' ? INCOME_CATEGORIES : typeFilter === 'expense' ? EXPENSE_CATEGORIES : [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES];
  const filtered = filterTransactions(transactions, typeFilter, catFilter);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex flex-wrap gap-2">
        <select
          value={month}
          onChange={(e) => onMonthChange(e.target.value)}
          className="input-field text-sm"
        >
          {monthOptions().map((m) => (
            <option key={m} value={m}>{monthLabel(m)}</option>
          ))}
        </select>

        <select
          value={typeFilter}
          onChange={(e) => { setTypeFilter(e.target.value as 'all' | TransactionType); setCatFilter(''); }}
          className="input-field text-sm"
        >
          <option value="all">전체</option>
          <option value="income">수입</option>
          <option value="expense">지출</option>
        </select>

        <select
          value={catFilter}
          onChange={(e) => setCatFilter(e.target.value)}
          className="input-field text-sm"
        >
          <option value="">전체 카테고리</option>
          {allCats.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {loading ? (
          <p className="text-center py-10 text-gray-400 text-sm">불러오는 중…</p>
        ) : filtered.length === 0 ? (
          <p className="text-center py-10 text-gray-400 text-sm">거래 내역이 없습니다</p>
        ) : (
          filtered.map((tx) => (
            <TransactionItem key={tx.id} tx={tx} onDelete={onDelete} />
          ))
        )}
      </div>
    </div>
  );
}
