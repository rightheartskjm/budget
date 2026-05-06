import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { Transaction } from '@/types';

export async function GET(req: NextRequest) {
  const month = req.nextUrl.searchParams.get('month'); // YYYY-MM
  const rows = await prisma.transaction.findMany({
    where: month ? { date: { startsWith: month } } : undefined,
    orderBy: { date: 'desc' },
  });
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const body = await req.json() as Omit<Transaction, 'id' | 'createdAt'>;
  const tx = await prisma.transaction.create({
    data: {
      type: body.type,
      category: body.category,
      amount: body.amount,
      date: body.date,
      memo: body.memo ?? '',
    },
  });
  return NextResponse.json(tx, { status: 201 });
}

export async function DELETE() {
  await prisma.transaction.deleteMany();
  await prisma.budget.deleteMany();
  return NextResponse.json({ ok: true });
}
