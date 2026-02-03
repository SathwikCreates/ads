import { NextResponse } from "next/server"
import { requireUser } from "@/lib/api"
import { getCampaignSeries } from "@/lib/analytics"
import type { Platform } from "@/lib/platforms/config"

export async function GET(request: Request) {
    const user = await requireUser()
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const platform = (searchParams.get("platform") || undefined) as Platform | undefined
    const startDate = searchParams.get("start") ? new Date(searchParams.get("start") as string) : new Date(Date.now() - 7 * 86400000)
    const endDate = searchParams.get("end") ? new Date(searchParams.get("end") as string) : new Date()

    const series = await getCampaignSeries({
        userId: user.id,
        platform,
        startDate,
        endDate,
    })

    return NextResponse.json({ series })
}
