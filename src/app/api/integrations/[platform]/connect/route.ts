import { NextResponse } from "next/server"
import { requireUser } from "@/lib/api"
import { db } from "@/lib/db"
import { buildAuthUrl } from "@/lib/platforms/oauth"
import { generateCodeVerifier, generateState } from "@/lib/oauth"
import { getOAuthConfig, Platform } from "@/lib/platforms/config"

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ platform: string }> },
) {
    const user = await requireUser()
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { platform } = (await params) as { platform: Platform }
    const config = getOAuthConfig(platform)
    const state = generateState()
    const codeVerifier = config.usePKCE ? generateCodeVerifier() : undefined

    await db.oAuthState.create({
        data: {
            userId: user.id,
            platform,
            state,
            codeVerifier,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000),
        },
    })

    const url = buildAuthUrl(platform, state, codeVerifier)
    return NextResponse.json({ url })
}
