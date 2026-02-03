import { NextResponse } from "next/server"
import { requireUser } from "@/lib/api"
import { db } from "@/lib/db"

export async function GET() {
    const user = await requireUser()
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const accounts = await db.connectedAccount.findMany({
        where: { userId: user.id },
        select: {
            id: true,
            platform: true,
            platformAccountId: true,
            status: true,
            expiresAt: true,
            createdAt: true,
            updatedAt: true,
        },
    })

    return NextResponse.json({ accounts })
}
