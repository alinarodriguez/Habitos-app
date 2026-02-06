import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET
export async function GET() {
  const habits = await prisma.habit.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(habits);
}

// POST
export async function POST(req: Request) {
  const body = await req.json();

  const habit = await prisma.habit.create({
    data: {
      title: body.title,
      date: body.date,
      completed: false,
    },
  });

  return NextResponse.json(habit);
}
