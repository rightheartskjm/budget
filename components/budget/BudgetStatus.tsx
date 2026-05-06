import type { Budget, Transaction } from '@/types';
import { formatAmount } from '@/utils/format';

interface Props {
  budget: Budget;
  transactions: Transaction[];
}

export default function BudgetStatus({ budget, transactions }: Props) {
  const spent = transactions
    .filter((t) => t.type === 'expense' && t.category === budget.category)
    .reduce((s, t) => s + t.amount, 0);

  const pct = budget.amount > 0 ? Math.min((spent / budget.amount) * 100, 100) : 0;
  const over = budget.amount > 0 && spent > budget.amount;

  const barColor =
    pct >= 100 ? 'bg-red-500' :
    pct >= 80  ? 'bg-yellow-400' :
                 'bg-green-500';

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center text-sm">
        <span className="font-medium">{budget.category}</span>
        <div className="flex items-center gap-2">
          <span className="text-gray-500 dark:text-gray-400 text-xs">{formatAmount(spent)} / {formatAmount(budget.amount)}</span>
          {over && <span className="text-xs px-1.5 py-0.5 rounded bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 font-medium">초과</span>}
        </div>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
