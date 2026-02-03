import { NextResponse } from "next/server"
import { requireUser } from "@/lib/api"
import { db } from "@/lib/db"
import { coachChat } from "@/lib/ai/openai"

export async function POST(request: Request) {
    const user = await requireUser()
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json().catch(() => ({}))
    const question = body.question as string

    if (!question) {
        return NextResponse.json({ error: "Missing question" }, { status: 400 })
    }

    const campaigns = await db.campaign.findMany({
        where: {
            connectedAccount: { userId: user.id },
        },
        include: {
            metrics: true,
        },
        take: 5,
    })

    const context = campaigns
        .map((campaign) => {
            const totals = campaign.metrics.reduce(
                (acc, metric) => {
                    acc.impressions += metric.impressions
                    acc.clicks += metric.clicks
                    acc.spend += metric.spend
                    acc.conversions += metric.conversions
                    return acc
                },
                { impressions: 0, clicks: 0, spend: 0, conversions: 0 },
            )

            return `Campaign: ${campaign.name}\nTotals: ${JSON.stringify(totals)}`
        })
        .join("\n\n")

    const answer = await coachChat(context, question)
    return NextResponse.json({ answer })
}
