import OpenAI from "openai"

const apiKey = process.env.OPENAI_API_KEY
const baseURL = process.env.OPENAI_BASE_URL
const openRouterReferer = process.env.OPENROUTER_REFERER
const openRouterTitle = process.env.OPENROUTER_TITLE

export const openai = new OpenAI({
    apiKey: apiKey || "",
    baseURL,
    defaultHeaders: {
        ...(openRouterReferer ? { "HTTP-Referer": openRouterReferer } : {}),
        ...(openRouterTitle ? { "X-Title": openRouterTitle } : {}),
    },
})

function requireKey() {
    if (!apiKey) {
        throw new Error("Missing OPENAI_API_KEY")
    }
}

export async function generateAdCreative(prompt: string) {
    requireKey()
    const model = process.env.OPENAI_TEXT_MODEL || "gpt-4o-mini"
    const response = await openai.chat.completions.create({
        model,
        messages: [
            {
                role: "system",
                content:
                    "You are an expert ad strategist. Respond in JSON with keys: concept, targetAudience, script, visualConcept, recommendedPlatform.",
            },
            { role: "user", content: prompt },
        ],
        response_format: { type: "json_object" },
    })

    const content = response.choices[0]?.message?.content || "{}"
    return JSON.parse(content)
}

export async function generateInsight(context: string) {
    requireKey()
    const model = process.env.OPENAI_TEXT_MODEL || "gpt-4o-mini"
    const response = await openai.chat.completions.create({
        model,
        messages: [
            {
                role: "system",
                content:
                    "Return JSON with keys: issue, severity, evidence, recommendation, confidenceScore.",
            },
            { role: "user", content: context },
        ],
        response_format: { type: "json_object" },
    })

    const content = response.choices[0]?.message?.content || "{}"
    return JSON.parse(content)
}

export async function coachChat(context: string, question: string) {
    requireKey()
    const model = process.env.OPENAI_TEXT_MODEL || "gpt-4o-mini"
    const response = await openai.chat.completions.create({
        model,
        messages: [
            { role: "system", content: "You are a helpful ad performance coach." },
            { role: "user", content: `Context:\n${context}\n\nQuestion:\n${question}` },
        ],
    })

    return response.choices[0]?.message?.content || ""
}

export async function generateImage(prompt: string) {
    requireKey()
    const model = process.env.OPENAI_IMAGE_MODEL || "gpt-image-1"
    const response = await openai.images.generate({
        model,
        prompt,
        size: "1024x1024",
    })

    return response.data?.[0]?.url || null
}

export async function generateVideo(prompt: string) {
    const videoEndpoint = process.env.VIDEO_PROVIDER_URL
    const videoApiKey = process.env.VIDEO_PROVIDER_API_KEY
    if (!videoEndpoint || !videoApiKey) {
        throw new Error("Video provider not configured")
    }

    const response = await fetch(videoEndpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${videoApiKey}`,
        },
        body: JSON.stringify({ prompt }),
    })

    if (!response.ok) {
        const text = await response.text()
        throw new Error(`Video provider error: ${text}`)
    }

    const data = await response.json()
    return data?.videoUrl || null
}
