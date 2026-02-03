import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { OverviewChartLoader } from "@/components/dashboard/overview-chart-loader"
import { DashboardSummary } from "@/components/dashboard/summary-cards"
import { auth } from "@/auth"

export default async function DashboardPage() {
    const session = await auth()

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <div className="flex items-center space-x-2">
                    {/* Add DatePicker here later */}
                </div>
            </div>
            <DashboardSummary />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 bg-neutral-900 border-neutral-800 text-white">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <OverviewChartLoader />
                    </CardContent>
                </Card>
                <Card className="col-span-3 bg-neutral-900 border-neutral-800 text-white">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        {/* Add recent sales/activity list here */}
                    </CardHeader>
                    <CardContent>
                        <p className="text-neutral-400">Connection to ad platforms active.</p>
                        <div className="mt-4 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>YouTube Ads</span>
                                <span className="text-green-500">Connected</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Meta Ads</span>
                                <span className="text-green-500">Connected</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Google Ads</span>
                                <span className="text-yellow-500">Pending</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
