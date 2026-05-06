export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  type: TransactionType;
  category: string;
  amount: number;
  date: string;       // YYYY-MM-DD
  memo: string;
  createdAt: string;  // ISO8601
}

export interface Budget {
  category: string;
  amount: number;
  month: string;      // YYYY-MM
}

export interface Db {
  transactions: Transaction[];
  budgets: Budget[];
}

export interface FilterState {
  month: string;      // YYYY-MM
  type: 'all' | TransactionType;
  category: string;   // '' = 전체
}
