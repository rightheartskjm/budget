import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { Budget } from '@/types';

export async function GET(req: NextRequest) {
  const month = req.nextUrl.searchParams.get('month');
  const rows = await prisma.budget.findMany({
    where: month ? { month } : undefined,
  });
  return NextResponse.json(rows);
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
