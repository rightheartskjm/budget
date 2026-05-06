'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { Transaction } from '@/types';
import { monthLabel } from '@/utils/format';

interface Props {
  transactions: Transaction[];
}

function last6Months() {
  const months = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
  }
  return months;
}

export default function MonthlyBarChart({ transactions }: Props) {
  const months = last6Months();
  const data = months.map((m) => {
    const list = transactions.filter((t) => t.date.startsWith(m));
    return {
      month: monthLabel(m),
      수입: list.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0),
      지출: list.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0),
    };
  });

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
      <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4">최근 6개월 수입/지출</h2>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <XAxis dataKey="month" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v / 10000).toFixed(0)}만`} />
          <Tooltip formatter={(v) => typeof v === 'number' ? `${v.toLocaleString()}원` : v} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar dataKey="수입" fill="#60a5fa" radius={[4, 4, 0, 0]} />
          <Bar dataKey="지출" fill="#f87171" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
