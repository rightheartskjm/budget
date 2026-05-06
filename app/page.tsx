'use client';

import { useState, useEffect } from 'react';
import type { Transaction } from '@/types';
import { currentMonth } from '@/utils/format';
import SummaryCards from '@/components/dashboard/SummaryCards';
import MonthlyBarChart from '@/components/dashboard/MonthlyBarChart';
import CategoryPieChart from '@/components/dashboard/CategoryPieChart';

function last6Months() {
  const now = new Date();
  const months = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
  }
  return months;
}

export default function DashboardPage() {
  const [all, setAll] = useState<Transaction[]>([]);
  const [current, setCurrent] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const months = last6Months();
        const results = await Promise.all(
          months.map((m) =>
            fetch(`/api/transactions?month=${m}`).then((r) => {
              if (!r.ok) throw new Error(`API error: ${r.status}`);
              return r.json() as Promise<Transaction[]>;
            })
          )
        );
        const flat: Transaction[] = results.flat();
        setAll(flat);
        setCurrent(flat.filter((t) => t.date.startsWith(currentMonth())));
      } catch (e) {
        console.error('데이터 로드 실패:', e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-gray-400 text-sm">불러오는 중…</div>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">대시보드</h1>
      <SummaryCards transactions={current} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <MonthlyBarChart transactions={all} />
        <CategoryPieChart transactions={current} />
      </div>
    </div>
  );
}
