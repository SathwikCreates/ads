import { NextResponse } from "next/server"
import { requireUser } from "@/lib/api"
import { db } from "@/lib/db"
import { generateInsight } from "@/lib/ai/openai"

export async function POST(request: Request) {
    const user = await requireUser()
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json().catch(() => ({}))
    const campaignId = body.campaignId as string | undefined

    if (!campaignId) {
        return NextResponse.json({ error: "Missing campaignId" }, { status: 400 })
    }

    const campaign = await db.campaign.findUnique({
        where: { id: campaignId },
        include: {
            metrics: true,
        },
    })

    if (!campaign) {
        return NextResponse.json({ error: "Campaign not found" }, { status: 404 })
    }

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

    const context = [
        `Campaign: ${campaign.name}`,
        `Status: ${campaign.status}`,
        `Totals: ${JSON.stringify(totals)}`,
        `Metrics Count: ${campaign.metrics.length}`,
    ].join("\n")

    const insight = await generateInsight(context)

    const record = await db.aIInsight.create({
        data: {
            userId: user.id,
            relatedCampaignId: campaign.id,
            insightText: insight?.recommendation || insight?.issue || "No insight returned",
            severity: insight?.severity || "medium",
            confidenceScore: Number(insight?.confidenceScore) || 0.5,
        },
    })

    return NextResponse.json({ insight: record, raw: insight })
}
