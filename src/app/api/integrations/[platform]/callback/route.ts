import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { exchangeCodeForToken } from "@/lib/platforms/oauth"
import { encryptString } from "@/lib/crypto"
import type { Platform } from "@/lib/platforms/config"

export async function GET(
    request: Request,
    { params }: { params: Promise<{ platform: string }> },
) {
    const { platform } = (await params) as { platform: Platform }
    const { searchParams } = new URL(request.url)
    const code = searchParams.get("code")
    const state = searchParams.get("state")

    if (!code || !state) {
        return NextResponse.json({ error: "Missing code or state" }, { status: 400 })
    }

    const stateRecord = await db.oAuthState.findUnique({
        where: { state },
    })

    if (!stateRecord || stateRecord.platform !== platform) {
        return NextResponse.json({ error: "Invalid state" }, { status: 400 })
    }

    if (stateRecord.expiresAt.getTime() < Date.now()) {
        return NextResponse.json({ error: "State expired" }, { status: 400 })
    }

    const tokenResponse = await exchangeCodeForToken(
        platform,
        code,
        stateRecord.codeVerifier ?? undefined,
    )

    const expiresAt = tokenResponse.expires_in
        ? Math.floor(Date.now() / 1000) + tokenResponse.expires_in
        : undefined

    await db.connectedAccount.upsert({
        where: {
            userId_platform_platformAccountId: {
                userId: stateRecord.userId,
                platform,
                platformAccountId: tokenResponse.platform_account_id || "default",
            },
        },
        update: {
            accessTokenEncrypted: encryptString(tokenResponse.access_token),
            refreshTokenEncrypted: tokenResponse.refresh_token
                ? encryptString(tokenResponse.refresh_token)
                : undefined,
            scope: tokenResponse.scope,
            expiresAt,
            status: "connected",
        },
        create: {
            userId: stateRecord.userId,
            platform,
            platformAccountId: tokenResponse.platform_account_id || "default",
            accessTokenEncrypted: encryptString(tokenResponse.access_token),
            refreshTokenEncrypted: tokenResponse.refresh_token
                ? encryptString(tokenResponse.refresh_token)
                : undefined,
            scope: tokenResponse.scope,
            expiresAt,
            status: "connected",
        },
    })

    await db.oAuthState.delete({ where: { state } })

    return NextResponse.json({ status: "connected" })
}
