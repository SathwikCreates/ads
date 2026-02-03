import { OAuthConfig, Platform, getOAuthConfig } from "./config"
import { generateCodeChallenge } from "../oauth"

export function buildAuthUrl(platform: Platform, state: string, codeVerifier?: string): string {
    const config = getOAuthConfig(platform)
    ensureConfig(config, platform)
    const params = new URLSearchParams({
        client_id: config.clientId,
        redirect_uri: config.redirectUri,
        response_type: "code",
        scope: config.scopes.join(" "),
        state,
    })

    if (config.usePKCE && codeVerifier) {
        params.set("code_challenge_method", "S256")
        params.set("code_challenge", generateCodeChallenge(codeVerifier))
    }

    return `${config.authUrl}?${params.toString()}`
}

export type TokenResponse = {
    access_token: string
    refresh_token?: string
    expires_in?: number
    scope?: string
    token_type?: string
    platform_account_id?: string
}

export async function exchangeCodeForToken(
    platform: Platform,
    code: string,
    codeVerifier?: string,
): Promise<TokenResponse> {
    const config = getOAuthConfig(platform)
    ensureConfig(config, platform)

    const body = new URLSearchParams({
        grant_type: "authorization_code",
        code,
        client_id: config.clientId,
        client_secret: config.clientSecret,
        redirect_uri: config.redirectUri,
    })

    if (config.usePKCE && codeVerifier) {
        body.set("code_verifier", codeVerifier)
    }

    const response = await fetch(config.tokenUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
    })

    if (!response.ok) {
        const text = await response.text()
        throw new Error(`Token exchange failed for ${platform}: ${text}`)
    }

    return response.json()
}

function ensureConfig(config: OAuthConfig, platform: Platform) {
    const missing: string[] = []
    if (!config.authUrl) missing.push("authUrl")
    if (!config.tokenUrl) missing.push("tokenUrl")
    if (!config.clientId) missing.push("clientId")
    if (!config.clientSecret) missing.push("clientSecret")
    if (!config.redirectUri) missing.push("redirectUri")
    if (!config.scopes.length) missing.push("scopes")
    if (missing.length) {
        throw new Error(
            `${platform} OAuth configuration incomplete: ${missing.join(", ")}`,
        )
    }
}
