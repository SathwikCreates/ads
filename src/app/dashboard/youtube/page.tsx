'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { OverviewChart } from "@/components/dashboard/overview-chart"
import { Button } from "@/components/ui/button"

export default function YoutubeDashboardPage() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">YouTube Ads</h2>
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                    Connect YouTube Account
                </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="bg-neutral-900 border-neutral-800 text-white">
                    <CardHeader><CardTitle>Views</CardTitle></CardHeader>
                    <CardContent><div className="text-2xl font-bold">1.2M</div></CardContent>
                </Card>
                <Card className="bg-neutral-900 border-neutral-800 text-white">
                    <CardHeader><CardTitle>Impressions</CardTitle></CardHeader>
                    <CardContent><div className="text-2xl font-bold">4.5M</div></CardContent>
                </Card>
                <Card className="bg-neutral-900 border-neutral-800 text-white">
                    <CardHeader><CardTitle>Spend</CardTitle></CardHeader>
                    <CardContent><div className="text-2xl font-bold">$12,450</div></CardContent>
                </Card>
            </div>
            <Card className="bg-neutral-900 border-neutral-800 text-white">
                <CardHeader>
                    <CardTitle>Performance Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                    <OverviewChart />
                </CardContent>
            </Card>
        </div>
    )
}
