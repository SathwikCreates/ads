import { NextResponse } from "next/server"
import { requireUser } from "@/lib/api"
import { db } from "@/lib/db"
import type { Platform } from "@/lib/platforms/config"

export async function POST(
    _request: Request,
    { params }: { params: Promise<{ platform: string }> },
) {
    const user = await requireUser()
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { platform } = (await params) as { platform: Platform }

    await db.connectedAccount.updateMany({
        where: { userId: user.id, platform },
        data: {
            status: "disconnected",
            accessTokenEncrypted: null,
            refreshTokenEncrypted: null,
            expiresAt: null,
        },
    })

    return NextResponse.json({ status: "disconnected" })
}
