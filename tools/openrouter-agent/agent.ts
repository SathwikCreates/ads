import { OpenRouter } from "@openrouter/sdk"
import EventEmitter from "eventemitter3"
import { z } from "zod"

const ToolSchema = z.object({
    name: z.string(),
    description: z.string(),
    run: z.function().args(z.string()).returns(z.promise(z.string())),
})

export type AgentTool = z.infer<typeof ToolSchema>

type AgentOptions = {
    apiKey: string
    model: string
    referer?: string
    title?: string
    tools?: AgentTool[]
}

type AgentMessage = {
    role: "system" | "user" | "assistant"
    content: string
}

export class OpenRouterAgent extends EventEmitter {
    private client: OpenRouter
    private model: string
    private tools: AgentTool[]

    constructor(options: AgentOptions) {
        super()
        this.client = new OpenRouter({
            apiKey: options.apiKey,
            defaultHeaders: {
                ...(options.referer ? { "HTTP-Referer": options.referer } : {}),
                ...(options.title ? { "X-Title": options.title } : {}),
            },
        })
        this.model = options.model
        this.tools = options.tools ?? []
    }

    async run(prompt: string, system?: string) {
        const messages: AgentMessage[] = []
        if (system) {
            messages.push({ role: "system", content: system })
        }
        messages.push({ role: "user", content: prompt })

        const completion = await this.client.chat.send({
            model: this.model,
            messages,
            stream: false,
        })

        const text = completion.choices?.[0]?.message?.content ?? ""
        this.emit("response", text)
        return text
    }
}
