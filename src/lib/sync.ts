import { db } from "@/lib/db"
import { decryptString } from "@/lib/crypto"
import type { Platform } from "@/lib/platforms/config"

type SyncOptions = {
    userId: string
    platform?: Platform
    startDate: Date
    endDate: Date
}

export async function syncPlatformData({
    userId,
    platform,
    startDate,
    endDate,
}: SyncOptions) {
    const accounts = await db.connectedAccount.findMany({
        where: {
            userId,
            ...(platform ? { platform } : {}),
            status: "connected",
        },
    })

    if (!accounts.length) {
        return { synced: 0, message: "No connected accounts" }
    }

    let synced = 0
    for (const account of accounts) {
        await syncAccount(account.id, account.platform as Platform, startDate, endDate)
        synced += 1
    }

    return { synced, message: "Sync completed" }
}

async function syncAccount(
    connectedAccountId: string,
    platform: Platform,
    startDate: Date,
    endDate: Date,
) {
    const account = await db.connectedAccount.findUnique({
        where: { id: connectedAccountId },
    })
    if (!account) return

    const accessToken = account.accessTokenEncrypted
        ? decryptString(account.accessTokenEncrypted)
        : null

    const useMock = process.env.USE_MOCK_PLATFORM_DATA === "true" || !accessToken
    const campaigns = useMock
        ? buildMockCampaigns(platform)
        : await fetchPlatformCampaigns(platform, accessToken)

    for (const campaign of campaigns) {
        const dbCampaign = await db.campaign.upsert({
            where: {
                connectedAccountId_platformCampaignId: {
                    connectedAccountId,
                    platformCampaignId: campaign.platformCampaignId,
                },
            },
            update: {
                name: campaign.name,
                status: campaign.status,
            },
            create: {
                connectedAccountId,
                platformCampaignId: campaign.platformCampaignId,
                name: campaign.name,
                status: campaign.status,
            },
        })

        const metrics = useMock
            ? buildMockMetrics(startDate, endDate)
            : await fetchPlatformMetrics(platform, accessToken, campaign.platformCampaignId, startDate, endDate)

        for (const metric of metrics) {
            await db.campaignMetric.upsert({
                where: {
                    campaignId_date: {
                        campaignId: dbCampaign.id,
                        date: metric.date,
                    },
                },
                update: {
                    impressions: metric.impressions,
                    clicks: metric.clicks,
                    spend: metric.spend,
                    conversions: metric.conversions,
                },
                create: {
                    campaignId: dbCampaign.id,
                    date: metric.date,
                    impressions: metric.impressions,
                    clicks: metric.clicks,
                    spend: metric.spend,
                    conversions: metric.conversions,
                },
            })
        }
    }
}

type CampaignPayload = {
    platformCampaignId: string
    name: string
    status: string
}

type MetricPayload = {
    date: Date
    impressions: number
    clicks: number
    spend: number
    conversions: number
}

async function fetchPlatformCampaigns(
    platform: Platform,
    accessToken: string,
): Promise<CampaignPayload[]> {
    void platform
    void accessToken
    throw new Error("Platform API client not configured. Set USE_MOCK_PLATFORM_DATA=true for demo.")
}

async function fetchPlatformMetrics(
    platform: Platform,
    accessToken: string,
    platformCampaignId: string,
    startDate: Date,
    endDate: Date,
): Promise<MetricPayload[]> {
    void platform
    void accessToken
    void platformCampaignId
    void startDate
    void endDate
    throw new Error("Platform API client not configured. Set USE_MOCK_PLATFORM_DATA=true for demo.")
}

function buildMockCampaigns(platform: Platform): CampaignPayload[] {
    const label = platform.toUpperCase()
    return [
        { platformCampaignId: `${label}-001`, name: `${label} Brand Launch`, status: "ACTIVE" },
        { platformCampaignId: `${label}-002`, name: `${label} Retargeting`, status: "PAUSED" },
        { platformCampaignId: `${label}-003`, name: `${label} Conversions`, status: "ACTIVE" },
    ]
}

function buildMockMetrics(startDate: Date, endDate: Date): MetricPayload[] {
    const days = enumerateDays(startDate, endDate)
    return days.map((date) => ({
        date,
        impressions: randomInt(5000, 25000),
        clicks: randomInt(120, 1200),
        spend: randomFloat(120, 1200),
        conversions: randomInt(8, 120),
    }))
}

function enumerateDays(startDate: Date, endDate: Date): Date[] {
    const days: Date[] = []
    const current = new Date(Date.UTC(
        startDate.getUTCFullYear(),
        startDate.getUTCMonth(),
        startDate.getUTCDate(),
    ))
    const end = new Date(Date.UTC(
        endDate.getUTCFullYear(),
        endDate.getUTCMonth(),
        endDate.getUTCDate(),
    ))

    while (current <= end) {
        days.push(new Date(current))
        current.setUTCDate(current.getUTCDate() + 1)
    }
    return days
}

function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomFloat(min: number, max: number) {
    return Math.round((Math.random() * (max - min) + min) * 100) / 100
}
