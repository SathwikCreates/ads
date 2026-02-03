"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { OverviewChart } from "@/components/dashboard/overview-chart"
import { Button } from "@/components/ui/button"

type Summary = {
    totals: {
        impressions: number
        clicks: number
        spend: number
        conversions: number
    }
}

type SeriesPoint = {
    name: string
    total: number
}

type PlatformConfig = {
    platform: "google" | "meta" | "youtube"
    title: string
    buttonLabel: string
    buttonClass: string
    cards: Array<{
        label: string
        value: (summary: Summary["totals"]) => string
    }>
}

const formatNumber = (value: number) => value.toLocaleString()
const formatCurrency = (value: number) => `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`

export function PlatformDashboard({ config }: { config: PlatformConfig }) {
    const [summary, setSummary] = useState<Summary | null>(null)
    const [series, setSeries] = useState<SeriesPoint[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let active = true
        async function load() {
            setLoading(true)
            try {
                await fetch("/api/sync/run", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ platform: config.platform }),
                })
                const summaryRes = await fetch(`/api/analytics/summary?platform=${config.platform}`)
                const seriesRes = await fetch(`/api/analytics/series?platform=${config.platform}`)
                if (!summaryRes.ok || !seriesRes.ok) throw new Error("Failed to load analytics")
                const summaryData = await summaryRes.json()
                const seriesData = await seriesRes.json()
                if (!active) return
                setSummary(summaryData)
                setSeries(
                    (seriesData.series || []).map((point: any) => ({
                        name: point.date,
                        total: point.spend ?? 0,
                    })),
                )
            } catch {
                if (!active) return
                setSummary({
                    totals: { impressions: 0, clicks: 0, spend: 0, conversions: 0 },
                })
                setSeries([])
            } finally {
                if (active) setLoading(false)
            }
        }
        load()
        return () => {
            active = false
        }
    }, [config.platform])

    const totals = summary?.totals ?? { impressions: 0, clicks: 0, spend: 0, conversions: 0 }

    const handleConnect = async () => {
        const response = await fetch(`/api/integrations/${config.platform}/connect`)
        if (!response.ok) return
        const data = await response.json()
        if (data?.url) {
            window.location.href = data.url
        }
    }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">{config.title}</h2>
                <Button className={config.buttonClass} onClick={handleConnect}>
                    {config.buttonLabel}
                </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {config.cards.map((card) => (
                    <Card key={card.label} className="bg-neutral-900 border-neutral-800 text-white">
                        <CardHeader><CardTitle>{card.label}</CardTitle></CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {loading ? "—" : card.value(totals)}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <Card className="bg-neutral-900 border-neutral-800 text-white">
                <CardHeader>
                    <CardTitle>Performance Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                    <OverviewChart data={series} />
                </CardContent>
            </Card>
        </div>
    )
}

export const platformConfigs: Record<PlatformConfig["platform"], PlatformConfig> = {
    youtube: {
        platform: "youtube",
        title: "YouTube Ads",
        buttonLabel: "Connect YouTube Account",
        buttonClass: "bg-red-600 hover:bg-red-700 text-white",
        cards: [
            { label: "Impressions", value: (t) => formatNumber(t.impressions) },
            { label: "Clicks", value: (t) => formatNumber(t.clicks) },
            { label: "Spend", value: (t) => formatCurrency(t.spend) },
        ],
    },
    meta: {
        platform: "meta",
        title: "Meta Ads (Facebook & Instagram)",
        buttonLabel: "Connect Meta Account",
        buttonClass: "bg-blue-600 hover:bg-blue-700 text-white",
        cards: [
            { label: "Reach", value: (t) => formatNumber(t.impressions) },
            { label: "Clicks", value: (t) => formatNumber(t.clicks) },
            { label: "Spend", value: (t) => formatCurrency(t.spend) },
        ],
    },
    google: {
        platform: "google",
        title: "Google Ads",
        buttonLabel: "Connect Google Account",
        buttonClass: "bg-yellow-600 hover:bg-yellow-700 text-white",
        cards: [
            { label: "Impressions", value: (t) => formatNumber(t.impressions) },
            { label: "Conversions", value: (t) => formatNumber(t.conversions) },
            { label: "Spend", value: (t) => formatCurrency(t.spend) },
        ],
    },
}
