import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const month = req.nextUrl.searchParams.get('month');
  const rows = await prisma.transaction.findMany({
    where: month ? { date: { startsWith: month } } : undefined,
    orderBy: { date: 'desc' },
  });

  const header = '거래일,유형,카테고리,금액,메모';
  const csvRows = rows.map((t: { date: string; type: string; category: string; amount: number; memo: string | null }) =>
    [t.date, t.type === 'income' ? '수입' : '지출', t.category, t.amount, `"${t.memo}"`].join(',')
  );
  // UTF-8 BOM — Excel 한글 깨짐 방지
  const csv = '\uFEFF' + [header, ...csvRows].join('\n');

  const filename = encodeURIComponent(`가계부_${month ?? '전체'}.csv`);
  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename*=UTF-8''${filename}`,
    },
  });
}
