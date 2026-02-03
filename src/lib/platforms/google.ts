import { google } from "googleapis"

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

// Ensure these env vars are set in Step 1 of the Guide
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const DEVELOPER_TOKEN = process.env.GOOGLE_ADS_DEVELOPER_TOKEN
// Accessing Ads API requires a customer_id, often retrieved from the user profile or a specific login flow
// For MVP, we might assume the connected account stores the 'customer_id' in platformAccountId or separate field.
// Here we might need to query the customer accounts if not stored.

export function getGoogleAdsClient(accessToken: string, refreshToken?: string) {
    const auth = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET)
    auth.setCredentials({
        access_token: accessToken,
        refresh_token: refreshToken,
    })
    return auth
}

/**
 * Fetches campaigns for a given customerId.
 * Note: Google Ads API requires a 'login-customer-id' header or specifying the operating customer in the resource name.
 * We will assume we are querying a client customer account directly.
 */
export async function fetchGoogleCampaigns(
    accessToken: string,
    customerId: string, // The Google Ads Customer ID (XXX-XXX-XXXX), NOT the OAuth sub
    refreshToken?: string
): Promise<CampaignPayload[]> {
    if (!DEVELOPER_TOKEN) {
        throw new Error("Missing GOOGLE_ADS_DEVELOPER_TOKEN")
    }

    // Google Ads API REST Endpoint:
    // https://googleads.googleapis.com/v14/customers/{customerId}/googleAds:searchStream

    // NOTE: The 'googleapis' node library is huge. For Vercel efficiency, many prefer direct REST calls 
    // or the specific 'google-ads-api' library. However, we'll try a direct fetch to the REST API 
    // using the access token to avoid massive bundle sizes if we don't strictly need the full SDK types.
    // Or we can use the 'google.googleads' if installed, but it is often complex to configure.

    // Let's use a direct fetch wrapper to ensure we target the correct endpoint V14 or V15.
    const query = `
        SELECT 
            campaign.id, 
            campaign.name, 
            campaign.status 
        FROM campaign 
        WHERE campaign.status != 'REMOVED'
    `

    const cleanCustomerId = customerId.replace(/-/g, "")
    const url = `https://googleads.googleapis.com/v16/customers/${cleanCustomerId}/googleAds:search`

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "developer-token": DEVELOPER_TOKEN,
            Authorization: `Bearer ${accessToken}`,
            // 'login-customer-id': ... might be needed if managing sub-accounts
        },
        body: JSON.stringify({ query }),
    })

    if (!response.ok) {
        const errorText = await response.text()
        console.error("Google Ads API Error:", errorText)
        throw new Error(`Google Ads fetch failed: ${response.statusText}`)
    }

    const data = await response.json()
    // data.results is the array of rows
    const results = data.results || []

    return results.map((row: any) => ({
        platformCampaignId: String(row.campaign.id),
        name: row.campaign.name,
        status: row.campaign.status, // ENABLED, PAUSED, etc.
    }))
}

export async function fetchGoogleMetrics(
    accessToken: string,
    customerId: string,
    campaignId: string,
    startDate: Date,
    endDate: Date
): Promise<MetricPayload[]> {
    if (!DEVELOPER_TOKEN) {
        throw new Error("Missing GOOGLE_ADS_DEVELOPER_TOKEN")
    }

    const start = startDate.toISOString().split("T")[0] // YYYY-MM-DD
    const end = endDate.toISOString().split("T")[0]

    // We query report metrics segmented by date
    const query = `
        SELECT 
            segments.date, 
            metrics.impressions, 
            metrics.clicks, 
            metrics.cost_micros, 
            metrics.conversions 
        FROM campaign 
        WHERE 
            campaign.id = ${campaignId} 
            AND segments.date BETWEEN '${start}' AND '${end}'
    `

    const cleanCustomerId = customerId.replace(/-/g, "")
    const url = `https://googleads.googleapis.com/v16/customers/${cleanCustomerId}/googleAds:search`

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "developer-token": DEVELOPER_TOKEN,
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ query }),
    })

    if (!response.ok) {
        console.error("Google Ads Metrics Error:", await response.text())
        return []
    }

    const data = await response.json()
    const results = data.results || []

    return results.map((row: any) => ({
        date: new Date(row.segments.date),
        impressions: Long(row.metrics.impressions),
        clicks: Long(row.metrics.clicks),
        spend: microsToCurrency(row.metrics.costMicros),
        conversions: Number(row.metrics.conversions),
    }))
}

// Helpers
function Long(val: any): number {
    return Number(val) || 0
}

function microsToCurrency(micros: any): number {
    // 1,000,000 micros = 1 unit of currency (e.g., $1)
    return (Number(micros) || 0) / 1_000_000
}
