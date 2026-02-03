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

const GRAPH_API_VERSION = "v19.0"
const BASE_URL = `https://graph.facebook.com/${GRAPH_API_VERSION}`

export async function fetchMetaCampaigns(
    accessToken: string,
    platformAccountId: string // This should be the 'act_<account_id>'
): Promise<CampaignPayload[]> {
    // Note: The Ad Account ID in Meta API usually needs to be prefixed with 'act_' 
    // if it isn't already.
    const accountId = platformAccountId.startsWith("act_")
        ? platformAccountId
        : `act_${platformAccountId}`

    const fields = "id,name,status,objective"
    const url = `${BASE_URL}/${accountId}/campaigns?fields=${fields}&limit=100&access_token=${accessToken}`

    const response = await fetch(url)
    if (!response.ok) {
        const error = await response.text()
        console.error("Meta API Campaigns Error:", error)
        throw new Error(`Meta fetch failed: ${response.statusText}`)
    }

    const data = await response.json()
    // data.data is the array
    const campaigns = data.data || []

    return campaigns.map((campaign: any) => ({
        platformCampaignId: campaign.id,
        name: campaign.name,
        // Meta statuses: ACTIVE, PAUSED, DELETED, ARCHIVED
        status: campaign.status,
    }))
}

export async function fetchMetaMetrics(
    accessToken: string,
    campaignId: string,
    startDate: Date,
    endDate: Date
): Promise<MetricPayload[]> {
    const since = startDate.toISOString().split("T")[0]
    const until = endDate.toISOString().split("T")[0]

    const fields = "impressions,clicks,spend,conversions,date_start"
    // We want daily breakdown
    const url = `${BASE_URL}/${campaignId}/insights?fields=${fields}&time_range={'since':'${since}','until':'${until}'}&time_increment=1&access_token=${accessToken}`

    const response = await fetch(url)
    if (!response.ok) {
        console.error("Meta API Metrics Error:", await response.text())
        return []
    }

    const data = await response.json()
    const insights = data.data || []

    return insights.map((row: any) => {
        // Conversions in Meta are complex (actions list). 
        // We'll simplify and check for 'actions' with type 'purchase' or 'omni_purchase' or just sum all actions for MVP.
        // For accurate conversion tracking, we'd filter actions by action_type.
        const conversions = parseConversions(row.actions)

        return {
            date: new Date(row.date_start),
            impressions: Number(row.impressions) || 0,
            clicks: Number(row.clicks) || 0,
            spend: Number(row.spend) || 0,
            conversions: conversions,
        }
    })
}

function parseConversions(actions: any[]): number {
    if (!Array.isArray(actions)) return 0
    // Simplified: Summing all 'offsite_conversion' or just returning total actions count might vary.
    // Let's look for standard purchase events or leads.
    // For this MVP, let's sum 'purchase', 'lead', 'complete_registration'
    // or just return the total count of all actions for visualization.

    // Better: sum all 'actions' that are conversions.
    // Let's just return total actions for now to ensure we see data.
    return actions.reduce((sum, action) => sum + (Number(action.value) || 0), 0)
}
