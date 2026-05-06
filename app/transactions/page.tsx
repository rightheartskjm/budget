'use client';

import { useTransactions } from '@/hooks/useTransactions';
import TransactionForm from '@/components/transaction/TransactionForm';
import TransactionList from '@/components/transaction/TransactionList';

export default function TransactionsPage() {
  const { transactions, loading, month, setMonth, addTransaction, deleteTransaction } = useTransactions();

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">거래 내역</h1>
      <TransactionForm onAdd={addTransaction} />
      <TransactionList
        transactions={transactions}
        month={month}
        onMonthChange={setMonth}
        onDelete={deleteTransaction}
        loading={loading}
      />
    </div>
  );
}
