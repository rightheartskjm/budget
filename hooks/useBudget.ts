'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Budget } from '@/types';
import { currentMonth } from '@/utils/format';

export function useBudget(month?: string) {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);
  const m = month ?? currentMonth();

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/budgets?month=${m}`);
    const data: Budget[] = await res.json();
    setBudgets(data);
    setLoading(false);
  }, [m]);

  useEffect(() => { load(); }, [load]);

  async function setBudgetAmount(category: string, amount: number) {
    const budget: Budget = { category, amount, month: m };
    const res = await fetch('/api/budgets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(budget),
    });
    const saved: Budget = await res.json();
    setBudgets((prev) => {
      const idx = prev.findIndex((b) => b.category === category);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = saved;
        return next;
      }
      return [...prev, saved];
    });
  }

  return { budgets, loading, setBudgetAmount, reload: load };
}
