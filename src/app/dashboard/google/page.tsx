import { PlatformDashboard, platformConfigs } from "@/components/dashboard/platform-dashboard"

export default function GoogleDashboardPage() {
    return <PlatformDashboard config={platformConfigs.google} />
}
