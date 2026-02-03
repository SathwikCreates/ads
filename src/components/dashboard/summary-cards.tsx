"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Summary = {
    totals: {
        impressions: number
        clicks: number
        spend: number
        conversions: number
    }
}

const formatNumber = (value: number) => value.toLocaleString()
const formatCurrency = (value: number) => `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`

export function DashboardSummary() {
    const [summary, setSummary] = useState<Summary | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let active = true
        async function load() {
            setLoading(true)
            try {
                await fetch("/api/sync/run", { method: "POST" })
                const response = await fetch("/api/analytics/summary")
                if (!response.ok) throw new Error("Failed to load summary")
                const data = await response.json()
                if (active) setSummary(data)
            } catch {
                if (active) {
                    setSummary({
                        totals: { impressions: 0, clicks: 0, spend: 0, conversions: 0 },
                    })
                }
            } finally {
                if (active) setLoading(false)
            }
        }
        load()
        return () => {
            active = false
        }
    }, [])

    const totals = summary?.totals ?? { impressions: 0, clicks: 0, spend: 0, conversions: 0 }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-neutral-900 border-neutral-800 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Impressions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{loading ? "—" : formatNumber(totals.impressions)}</div>
                    <p className="text-xs text-neutral-400">All connected platforms</p>
                </CardContent>
            </Card>
            <Card className="bg-neutral-900 border-neutral-800 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{loading ? "—" : formatNumber(totals.clicks)}</div>
                    <p className="text-xs text-neutral-400">All connected platforms</p>
                </CardContent>
            </Card>
            <Card className="bg-neutral-900 border-neutral-800 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Spend</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{loading ? "—" : formatCurrency(totals.spend)}</div>
                    <p className="text-xs text-neutral-400">All connected platforms</p>
                </CardContent>
            </Card>
            <Card className="bg-neutral-900 border-neutral-800 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Conversions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{loading ? "—" : formatNumber(totals.conversions)}</div>
                    <p className="text-xs text-neutral-400">All connected platforms</p>
                </CardContent>
            </Card>
        </div>
    )
}
