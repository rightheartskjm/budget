'use client';

import { useEffect, useState } from 'react';
import { useBudget } from '@/hooks/useBudget';
import { useTransactions } from '@/hooks/useTransactions';
import BudgetForm from '@/components/budget/BudgetForm';

export default function BudgetPage() {
  const { budgets, loading: budgetLoading, setBudgetAmount } = useBudget();
  const { transactions, loading: txLoading } = useTransactions();

  if (budgetLoading || txLoading) {
    return <div className="flex items-center justify-center h-64 text-gray-400 text-sm">불러오는 중…</div>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">예산 관리</h1>
      <BudgetForm budgets={budgets} transactions={transactions} onSet={setBudgetAmount} />
    </div>
  );
}
