// Mock data generator for dashboard graphs

export const generateMockData = (points: number, min: number, max: number) => {
    return Array.from({ length: points }, (_, i) => ({
        name: `Day ${i + 1}`,
        value: Math.floor(Math.random() * (max - min + 1)) + min,
    }))
}

export const generateCampaigns = (platform: string) => {
    return [
        { id: 1, name: 'Summer Sale', status: 'Active', impressions: 12500, clicks: 450, cost: 230 },
        { id: 2, name: 'Brand Awareness', status: 'Paused', impressions: 45000, clicks: 1200, cost: 850 },
        { id: 3, name: 'Retargeting', status: 'Active', impressions: 8900, clicks: 320, cost: 180 },
    ]
}
