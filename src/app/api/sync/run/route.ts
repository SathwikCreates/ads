import { NextResponse } from "next/server"
import { requireUser } from "@/lib/api"
import { syncPlatformData } from "@/lib/sync"
import type { Platform } from "@/lib/platforms/config"

export async function POST(request: Request) {
    const user = await requireUser()
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json().catch(() => ({}))
    const platform = body.platform as Platform | undefined
    const startDate = body.startDate ? new Date(body.startDate) : new Date(Date.now() - 7 * 86400000)
    const endDate = body.endDate ? new Date(body.endDate) : new Date()

    const result = await syncPlatformData({
        userId: user.id,
        platform,
        startDate,
        endDate,
    })

    return NextResponse.json(result)
}
