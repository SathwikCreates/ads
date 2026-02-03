import crypto from "crypto"

const KEY_ENV = "TOKEN_ENCRYPTION_KEY"

function getKey(): Buffer {
    const raw = process.env[KEY_ENV]
    if (!raw) {
        throw new Error(`Missing ${KEY_ENV}`)
    }
    const key = Buffer.from(raw, "base64")
    if (key.length !== 32) {
        throw new Error(`${KEY_ENV} must be 32 bytes base64`)
    }
    return key
}

export function encryptString(value: string): string {
    const key = getKey()
    const iv = crypto.randomBytes(12)
    const cipher = crypto.createCipheriv("aes-256-gcm", key, iv)
    const encrypted = Buffer.concat([cipher.update(value, "utf8"), cipher.final()])
    const tag = cipher.getAuthTag()
    return [
        iv.toString("base64"),
        tag.toString("base64"),
        encrypted.toString("base64"),
    ].join(".")
}

export function decryptString(value: string): string {
    const key = getKey()
    const [ivB64, tagB64, dataB64] = value.split(".")
    if (!ivB64 || !tagB64 || !dataB64) {
        throw new Error("Invalid encrypted payload")
    }
    const iv = Buffer.from(ivB64, "base64")
    const tag = Buffer.from(tagB64, "base64")
    const data = Buffer.from(dataB64, "base64")
    const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv)
    decipher.setAuthTag(tag)
    const decrypted = Buffer.concat([decipher.update(data), decipher.final()])
    return decrypted.toString("utf8")
}
