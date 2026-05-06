import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { Budget } from '@/types';

export async function GET(req: NextRequest) {
  try {
    const month = req.nextUrl.searchParams.get('month');
    const rows = await prisma.budget.findMany({
      where: month ? { month } : undefined,
    });
    return NextResponse.json(rows);
  } catch (e) {
    console.error('GET /api/budgets error:', e);
    return NextResponse.json({ error: 'DB 연결 실패' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json() as Budget;
  const saved = await prisma.budget.upsert({
    where: { category_month: { category: body.category, month: body.month } },
    update: { amount: body.amount },
    create: { category: body.category, amount: body.amount, month: body.month },
  });
  return NextResponse.json(saved, { status: 201 });
}
