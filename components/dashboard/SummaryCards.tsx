import type { Transaction } from '@/types';
import { formatAmount } from '@/utils/format';

interface Props {
  transactions: Transaction[];
}

export default function SummaryCards({ transactions }: Props) {
  const income = transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const expense = transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const balance = income - expense;

  const cards = [
    { label: '총 수입', value: income, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { label: '총 지출', value: expense, color: 'text-red-500 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20' },
    { label: '잔액', value: balance, color: balance >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400', bg: 'bg-green-50 dark:bg-green-900/20' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {cards.map(({ label, value, color, bg }) => (
        <div key={label} className={`${bg} rounded-xl p-4 border border-gray-200 dark:border-gray-700`}>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</p>
          <p className={`text-xl font-bold ${color}`}>{formatAmount(Math.abs(value))}</p>
        </div>
      ))}
    </div>
  );
}
