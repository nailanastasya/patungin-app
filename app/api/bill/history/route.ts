import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const bills = await prisma.bill.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        participants: true,
        items: true,
      },
    })

    const formatted = bills.map((bill) => {
      const total = bill.items.reduce(
        (sum, item) => sum + item.price,
        0
      )

      return {
        id: bill.id,
        title: bill.name,
        total,
        date: bill.createdAt,
        participantsCount: bill.participants.length,
        status: "LUNAS", // nanti bisa kamu logic-in dari payment
      }
    })

    return NextResponse.json(formatted)
  } catch (error: unknown) {
    const err = error as Error

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )
  }
}