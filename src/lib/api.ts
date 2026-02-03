import { auth } from "@/auth"
import { db } from "@/lib/db"

export async function requireUser() {
    const session = await auth()
    const email = session?.user?.email
    if (!email) return null
    return db.user.findUnique({ where: { email } })
}
