'use server'

import { z } from 'zod'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { signIn } from '@/auth'
import { AuthError } from 'next-auth'
import crypto from 'crypto'
import { sendEmail, resetEmailHtml, verificationEmailHtml } from '@/lib/email'

const SignupSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    name: z.string().min(1, { message: 'Name is required' }),
})

export async function signup(prevState: string | undefined, formData: FormData) {
    const result = SignupSchema.safeParse(Object.fromEntries(formData))

    if (!result.success) {
        return 'Invalid input'
    }

    const { email, password, name } = result.data

    try {
        const existingUser = await db.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            return 'User already exists'
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await db.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        })

        await sendVerificationEmail(email, name)

        return 'verify'

    } catch (error) {
        if (error instanceof AuthError) {
            return 'An error occurred during sign in'
        }
        console.error(error)
        return 'An unexpected error occurred'
    }
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        const email = formData.get('email')?.toString()
        if (email) {
            const user = await db.user.findUnique({ where: { email } })
            if (user && !user.emailVerified) {
                return 'Please verify your email before logging in.'
            }
        }
        await signIn('credentials', formData)
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.'
                default:
                    return 'Something went wrong.'
            }
        }
        throw error
    }
}

const ForgotSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
})

export async function requestPasswordReset(
    prevState: string | undefined,
    formData: FormData,
) {
    const result = ForgotSchema.safeParse(Object.fromEntries(formData))
    if (!result.success) {
        return 'Invalid email'
    }

    const { email } = result.data
    const user = await db.user.findUnique({ where: { email } })
    if (!user) {
        return 'If the email exists, you will receive a reset link.'
    }

    const token = crypto.randomBytes(32).toString('hex')
    const tokenHash = hashToken(token)
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000)

    await db.passwordResetToken.create({
        data: {
            userId: user.id,
            token: tokenHash,
            expiresAt,
        },
    })

    const appUrl = process.env.APP_URL || process.env.NEXTAUTH_URL || 'http://localhost:3000'
    const resetUrl = `${appUrl}/reset-password/${token}`
    await sendEmail({
        to: email,
        subject: 'Reset your password',
        html: resetEmailHtml(user.name, resetUrl),
    })

    return 'sent'
}

const ResetSchema = z.object({
    token: z.string().min(10),
    password: z.string().min(6),
})

export async function resetPassword(
    prevState: string | undefined,
    formData: FormData,
) {
    const result = ResetSchema.safeParse(Object.fromEntries(formData))
    if (!result.success) {
        return 'Invalid input'
    }

    const { token, password } = result.data
    const tokenHash = hashToken(token)

    const stored = await db.passwordResetToken.findUnique({
        where: { token: tokenHash },
        include: { user: true },
    })

    if (!stored || stored.expiresAt.getTime() < Date.now()) {
        return 'Reset link is invalid or expired'
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await db.user.update({
        where: { id: stored.userId },
        data: { password: hashedPassword },
    })

    await db.passwordResetToken.delete({
        where: { token: tokenHash },
    })

    return 'success'
}

export async function resendVerification(
    prevState: string | undefined,
    formData: FormData,
) {
    const result = ForgotSchema.safeParse(Object.fromEntries(formData))
    if (!result.success) {
        return 'Invalid email'
    }

    const { email } = result.data
    const user = await db.user.findUnique({ where: { email } })
    if (!user) {
        return 'If the email exists, a verification email was sent.'
    }

    await sendVerificationEmail(email, user.name)
    return 'sent'
}

async function sendVerificationEmail(email: string, name: string) {
    const token = crypto.randomBytes(32).toString('hex')
    const tokenHash = hashToken(token)
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)

    await db.verificationToken.create({
        data: {
            identifier: email,
            token: tokenHash,
            expires,
        },
    })

    const appUrl = process.env.APP_URL || process.env.NEXTAUTH_URL || 'http://localhost:3000'
    const verifyUrl = `${appUrl}/api/auth/verify?token=${token}`
    await sendEmail({
        to: email,
        subject: 'Verify your email',
        html: verificationEmailHtml(name, verifyUrl),
    })
}

function hashToken(token: string) {
    return crypto.createHash('sha256').update(token).digest('hex')
}
