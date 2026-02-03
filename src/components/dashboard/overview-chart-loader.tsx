"use client"

import { useEffect, useState } from "react"
import { OverviewChart } from "@/components/dashboard/overview-chart"

type SeriesPoint = {
    name: string
    total: number
}

export function OverviewChartLoader() {
    const [series, setSeries] = useState<SeriesPoint[]>([])

    useEffect(() => {
        let active = true
        async function load() {
            try {
                const response = await fetch("/api/analytics/series")
                if (!response.ok) throw new Error("Failed to load series")
                const data = await response.json()
                if (!active) return
                setSeries(
                    (data.series || []).map((point: any) => ({
                        name: point.date,
                        total: point.spend ?? 0,
                    })),
                )
            } catch {
                if (active) setSeries([])
            }
        }
        load()
        return () => {
            active = false
        }
    }, [])

    return <OverviewChart data={series} />
}
