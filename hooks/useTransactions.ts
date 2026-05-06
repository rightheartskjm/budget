'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Transaction, TransactionType } from '@/types';
import { currentMonth } from '@/utils/format';

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState(currentMonth());

  const load = useCallback(async (m: string) => {
    setLoading(true);
    const res = await fetch(`/api/transactions?month=${m}`);
    const data: Transaction[] = await res.json();
    setTransactions(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    load(month);
  }, [month, load]);

  async function addTransaction(tx: Omit<Transaction, 'id' | 'createdAt'>) {
    const res = await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tx),
    });
    const newTx: Transaction = await res.json();
    if (newTx.date.startsWith(month)) {
      setTransactions((prev) => [newTx, ...prev]);
    }
  }

  async function deleteTransaction(id: string) {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    await fetch(`/api/transactions/${id}`, { method: 'DELETE' });
  }

  return { transactions, loading, month, setMonth, addTransaction, deleteTransaction, reload: () => load(month) };
}

export function filterTransactions(
  list: Transaction[],
  type: 'all' | TransactionType,
  category: string
) {
  return list.filter((t) => {
    if (type !== 'all' && t.type !== type) return false;
    if (category && t.category !== category) return false;
    return true;
  });
}
