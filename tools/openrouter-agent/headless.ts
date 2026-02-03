import "dotenv/config"
import { OpenRouterAgent } from "./agent"

const apiKey = process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY
if (!apiKey) {
    throw new Error("Missing OPENROUTER_API_KEY (or OPENAI_API_KEY)")
}

const model = process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini"
const referer = process.env.OPENROUTER_REFERER
const title = process.env.OPENROUTER_TITLE

const agent = new OpenRouterAgent({
    apiKey,
    model,
    referer,
    title,
})

const prompt = process.argv.slice(2).join(" ")
if (!prompt) {
    throw new Error("Usage: npm run agent:headless -- \"your prompt\"")
}

agent.on("response", (text) => {
    // eslint-disable-next-line no-console
    console.log(text)
})

void agent.run(prompt, "You are a helpful marketing operations assistant.")
