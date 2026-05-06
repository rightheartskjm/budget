'use client';

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { Transaction } from '@/types';

const COLORS = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6'];

interface Props {
  transactions: Transaction[];
}

export default function CategoryPieChart({ transactions }: Props) {
  const expenses = transactions.filter((t) => t.type === 'expense');
  const map: Record<string, number> = {};
  for (const t of expenses) {
    map[t.category] = (map[t.category] ?? 0) + t.amount;
  }
  const data = Object.entries(map).map(([name, value]) => ({ name, value }));

  if (data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-center h-[280px]">
        <p className="text-gray-400 text-sm">지출 내역이 없습니다</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
      <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4">이번 달 카테고리별 지출</h2>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" paddingAngle={2}>
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip formatter={(v) => typeof v === 'number' ? `${v.toLocaleString()}원` : v} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
