import type { Transaction } from '@/types';
import { formatAmount, formatDate } from '@/utils/format';

interface Props {
  tx: Transaction;
  onDelete: (id: string) => void;
}

export default function TransactionItem({ tx, onDelete }: Props) {
  const isIncome = tx.type === 'income';
  return (
    <div className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            {tx.category}
          </span>
          {tx.memo && (
            <span className="text-xs text-gray-400 truncate">{tx.memo}</span>
          )}
        </div>
        <p className="text-xs text-gray-400 mt-0.5">{formatDate(tx.date)}</p>
      </div>
      <span className={`font-semibold text-sm shrink-0 ${isIncome ? 'text-blue-600 dark:text-blue-400' : 'text-red-500 dark:text-red-400'}`}>
        {isIncome ? '+' : '-'}{formatAmount(tx.amount)}
      </span>
      <button
        onClick={() => onDelete(tx.id)}
        className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all text-xs"
        aria-label="삭제"
      >
        ✕
      </button>
    </div>
  );
}
