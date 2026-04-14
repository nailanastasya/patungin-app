import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // ✅ NEXT 14+
    const { id } = await context.params

    console.log("PARAMS ID:", id)

    if (!id) {
      return NextResponse.json(
        { error: "Missing id" },
        { status: 400 }
      )
    }

    const bill = await prisma.bill.findUnique({
      where: { id },
      include: {
        items: true,
        participants: true,
      },
    })

    if (!bill) {
      return NextResponse.json(
        { message: "Bill not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(bill)

  } catch (error: unknown) {
    // ✅ FIX: no any lagi
    const err = error as Error

    console.error("🔥 GET BILL ERROR:", err.message)

    return NextResponse.json(
      {
        error: err.message || "Internal Server Error",
      },
      { status: 500 }
    )
  }
}