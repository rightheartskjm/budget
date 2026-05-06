const krw = new Intl.NumberFormat('ko-KR');

export function formatAmount(amount: number): string {
  return krw.format(amount) + '원';
}

export function formatDate(dateStr: string): string {
  // YYYY-MM-DD → YYYY.MM.DD
  return dateStr.replace(/-/g, '.');
}

export function currentMonth(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

export function monthLabel(month: string): string {
  const [year, mon] = month.split('-');
  return `${year}.${mon}`;
}
