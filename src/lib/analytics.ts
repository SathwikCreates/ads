import { db } from "@/lib/db"
import type { Platform } from "@/lib/platforms/config"

type SummaryParams = {
    userId: string
    platform?: Platform
    startDate: Date
    endDate: Date
}

export async function getAnalyticsSummary({
    userId,
    platform,
    startDate,
    endDate,
}: SummaryParams) {
    const metrics = await db.campaignMetric.findMany({
        where: {
            date: {
                gte: startDate,
                lte: endDate,
            },
            campaign: {
                connectedAccount: {
                    userId,
                    ...(platform ? { platform } : {}),
                },
            },
        },
        include: {
            campaign: true,
        },
    })

    const totals = metrics.reduce(
        (acc, metric) => {
            acc.impressions += metric.impressions
            acc.clicks += metric.clicks
            acc.spend += metric.spend
            acc.conversions += metric.conversions
            return acc
        },
        { impressions: 0, clicks: 0, spend: 0, conversions: 0 },
    )

    const byCampaign = new Map<string, typeof totals>()
    metrics.forEach((metric) => {
        const key = metric.campaignId
        const current = byCampaign.get(key) || {
            impressions: 0,
            clicks: 0,
            spend: 0,
            conversions: 0,
        }
        current.impressions += metric.impressions
        current.clicks += metric.clicks
        current.spend += metric.spend
        current.conversions += metric.conversions
        byCampaign.set(key, current)
    })

    const campaignSummaries = Array.from(byCampaign.entries()).map(([campaignId, data]) => ({
        campaignId,
        ...data,
    }))

    return {
        totals,
        campaigns: campaignSummaries,
        count: metrics.length,
    }
}

export async function getCampaignSeries({
    userId,
    platform,
    startDate,
    endDate,
}: SummaryParams) {
    const metrics = await db.campaignMetric.findMany({
        where: {
            date: {
                gte: startDate,
                lte: endDate,
            },
            campaign: {
                connectedAccount: {
                    userId,
                    ...(platform ? { platform } : {}),
                },
            },
        },
        orderBy: { date: "asc" },
    })

    return metrics.map((metric) => ({
        date: metric.date.toISOString().slice(0, 10),
        impressions: metric.impressions,
        clicks: metric.clicks,
        spend: metric.spend,
        conversions: metric.conversions,
    }))
}
