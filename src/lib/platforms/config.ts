export type Platform = "google" | "youtube" | "meta" | "instagram" | "tiktok"

export type OAuthConfig = {
    authUrl: string
    tokenUrl: string
    clientId: string
    clientSecret: string
    redirectUri: string
    scopes: string[]
    usePKCE?: boolean
}

const env = (key: string) => process.env[key] || ""

const scopeList = (value: string) =>
    value
        .split(",")
        .map((scope) => scope.trim())
        .filter(Boolean)

export function getOAuthConfig(platform: Platform): OAuthConfig {
    switch (platform) {
        case "google":
        case "youtube":
            return {
                authUrl: env("GOOGLE_AUTH_URL"),
                tokenUrl: env("GOOGLE_TOKEN_URL"),
                clientId: env("GOOGLE_CLIENT_ID"),
                clientSecret: env("GOOGLE_CLIENT_SECRET"),
                redirectUri: env("GOOGLE_REDIRECT_URI"),
                scopes: scopeList(env("GOOGLE_SCOPES")),
                usePKCE: true,
            }
        case "meta":
        case "instagram":
            return {
                authUrl: env("META_AUTH_URL"),
                tokenUrl: env("META_TOKEN_URL"),
                clientId: env("META_CLIENT_ID"),
                clientSecret: env("META_CLIENT_SECRET"),
                redirectUri: env("META_REDIRECT_URI"),
                scopes: scopeList(env("META_SCOPES")),
            }
        case "tiktok":
            return {
                authUrl: env("TIKTOK_AUTH_URL"),
                tokenUrl: env("TIKTOK_TOKEN_URL"),
                clientId: env("TIKTOK_CLIENT_ID"),
                clientSecret: env("TIKTOK_CLIENT_SECRET"),
                redirectUri: env("TIKTOK_REDIRECT_URI"),
                scopes: scopeList(env("TIKTOK_SCOPES")),
            }
        default:
            throw new Error(`Unsupported platform: ${platform}`)
    }
}
