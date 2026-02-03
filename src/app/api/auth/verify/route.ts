import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import crypto from "crypto"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get("token")

    if (!token) {
        return NextResponse.json({ error: "Missing token" }, { status: 400 })
    }

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex")
    const stored = await db.verificationToken.findUnique({
        where: { token: tokenHash },
    })

    if (!stored || stored.expires.getTime() < Date.now()) {
        return NextResponse.json({ error: "Token invalid or expired" }, { status: 400 })
    }

    await db.user.update({
        where: { email: stored.identifier },
        data: { emailVerified: new Date() },
    })

    await db.verificationToken.delete({
        where: { token: tokenHash },
    })

    const appUrl = process.env.APP_URL || process.env.NEXTAUTH_URL || "http://localhost:3000"
    return NextResponse.redirect(`${appUrl}/login?verified=1`)
}
