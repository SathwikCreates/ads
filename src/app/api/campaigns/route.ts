import { NextResponse } from "next/server"
import { requireUser } from "@/lib/api"
import { db } from "@/lib/db"

export async function GET() {
    const user = await requireUser()
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const campaigns = await db.campaign.findMany({
        where: {
            connectedAccount: { userId: user.id },
        },
        orderBy: { updatedAt: "desc" },
    })

    return NextResponse.json({ campaigns })
}
