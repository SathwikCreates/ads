import { NextResponse } from "next/server"
import { requireUser } from "@/lib/api"
import { generateAdCreative, generateImage, generateVideo } from "@/lib/ai/openai"
import { db } from "@/lib/db"

export async function POST(request: Request) {
    const user = await requireUser()
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json().catch(() => ({}))
    const prompt = body.prompt as string
    const shouldGenerateImage = Boolean(body.generateImage)
    const shouldGenerateVideo = Boolean(body.generateVideo)

    if (!prompt) {
        return NextResponse.json({ error: "Missing prompt" }, { status: 400 })
    }

    const creative = await generateAdCreative(prompt)
    const imageUrl = shouldGenerateImage && creative?.visualConcept
        ? await generateImage(creative.visualConcept)
        : null
    const videoUrl = shouldGenerateVideo && creative?.visualConcept
        ? await generateVideo(creative.visualConcept)
        : null

    const record = await db.generatedCreative.create({
        data: {
            userId: user.id,
            sourcePrompt: prompt,
            script: creative?.script ?? null,
            imageUrl,
            videoUrl,
            formatVariants: creative,
        },
    })

    return NextResponse.json({ creative: record, output: creative })
}
