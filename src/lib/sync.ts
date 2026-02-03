import { db } from "@/lib/db"
import { decryptString } from "@/lib/crypto"
import type { Platform } from "@/lib/platforms/config"
import { fetchGoogleCampaigns, fetchGoogleMetrics } from "@/lib/platforms/google"
import { fetchMetaCampaigns, fetchMetaMetrics } from "@/lib/platforms/meta"

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

    // For Google, we need the customer_id. We'll fallback to using platformAccountId 
    // or assume the account.platformAccountId holds the Google Customer ID (XXX-XXX-XXXX)
    const customerId = account.platformAccountId || ""

    const useMock = process.env.USE_MOCK_PLATFORM_DATA === "true" || (!accessToken && !process.env.GOOGLE_ADS_DEVELOPER_TOKEN)
    const campaigns = useMock
        ? buildMockCampaigns(platform)
        : await fetchPlatformCampaignsResult(platform, accessToken, customerId)

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
            : await fetchPlatformMetricsResult(platform, accessToken, customerId, campaign.platformCampaignId, startDate, endDate)

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

async function fetchPlatformCampaignsResult(
    platform: Platform,
    accessToken: string | null,
    customerId: string,
): Promise<CampaignPayload[]> {
    if (platform === "google" && accessToken) {
        return fetchGoogleCampaigns(accessToken, customerId)
    }
    if ((platform === "meta" || platform === "instagram") && accessToken) {
        // For Meta, customerId (platformAccountId) IS the Ad Account ID
        return fetchMetaCampaigns(accessToken, customerId)
    }
    // Add other platforms here (tiktok, etc)
    throw new Error(`Platform API client not configured for ${platform}`)
}

async function fetchPlatformMetricsResult(
    platform: Platform,
    accessToken: string | null,
    customerId: string,
    platformCampaignId: string,
    startDate: Date,
    endDate: Date,
): Promise<MetricPayload[]> {
    if (platform === "google" && accessToken) {
        return fetchGoogleMetrics(accessToken, customerId, platformCampaignId, startDate, endDate)
    }
    if ((platform === "meta" || platform === "instagram") && accessToken) {
        return fetchMetaMetrics(accessToken, platformCampaignId, startDate, endDate)
    }
    // Add other platforms here
    throw new Error(`Platform metrics API not configured for ${platform}`)
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
