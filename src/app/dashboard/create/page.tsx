'use client'

import { useCompletion } from '@ai-sdk/react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea" // Need to create this or use generic textarea
import { useState } from 'react'

export default function CreateAdPage() {
    const { completion, input, handleInputChange, handleSubmit, isLoading } = useCompletion({
        api: '/api/generate',
    })

    return (
        <div className="flex-1 space-y-4 p-8 pt-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Create Ad Campaign</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card className="bg-neutral-900 border-neutral-800 text-white">
                    <CardHeader>
                        <CardTitle>Campaign Details</CardTitle>
                        <CardDescription className="text-neutral-400">Describe your product or service</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="prompt">What do you want to advertise?</Label>
                                <textarea
                                    className="flex min-h-[120px] w-full rounded-md border border-neutral-800 bg-black px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-white"
                                    value={input}
                                    onChange={handleInputChange}
                                    placeholder="e.g. A premium coffee subscription service for remote workers..."
                                />
                            </div>
                            <Button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                                {isLoading ? 'Generating Concept...' : 'Generate Ad Concept'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <Card className="bg-neutral-900 border-neutral-800 text-white h-full">
                    <CardHeader>
                        <CardTitle>AI Generated Concept</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {completion ? (
                            <div className="prose prose-invert prose-sm max-w-none whitespace-pre-wrap">
                                {completion}
                            </div>
                        ) : (
                            <div className="text-neutral-500 text-sm italic">
                                Generated content will appear here...
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
