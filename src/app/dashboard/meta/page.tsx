'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { OverviewChart } from "@/components/dashboard/overview-chart"
import { Button } from "@/components/ui/button"

export default function MetaDashboardPage() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Meta Ads (Facebook & Instagram)</h2>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Connect Meta Account
                </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="bg-neutral-900 border-neutral-800 text-white">
                    <CardHeader><CardTitle>Reach</CardTitle></CardHeader>
                    <CardContent><div className="text-2xl font-bold">850K</div></CardContent>
                </Card>
                <Card className="bg-neutral-900 border-neutral-800 text-white">
                    <CardHeader><CardTitle>Clicks</CardTitle></CardHeader>
                    <CardContent><div className="text-2xl font-bold">25.4K</div></CardContent>
                </Card>
                <Card className="bg-neutral-900 border-neutral-800 text-white">
                    <CardHeader><CardTitle>Spend</CardTitle></CardHeader>
                    <CardContent><div className="text-2xl font-bold">$8,320</div></CardContent>
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
