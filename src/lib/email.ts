import nodemailer from "nodemailer"
import { Resend } from "resend"

type MailPayload = {
    to: string
    subject: string
    html: string
}

const smtpHost = process.env.SMTP_HOST
const smtpPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined
const smtpUser = process.env.SMTP_USER
const smtpPass = process.env.SMTP_PASS
const smtpFrom = process.env.SMTP_FROM
const resendApiKey = process.env.RESEND_API_KEY
const resend = resendApiKey ? new Resend(resendApiKey) : null

function requireSmtp() {
    if (!smtpHost || !smtpPort || !smtpUser || !smtpPass || !smtpFrom) {
        throw new Error("Missing SMTP configuration")
    }
}

export async function sendEmail(payload: MailPayload) {
    if (resend && smtpFrom) {
        await resend.emails.send({
            from: smtpFrom,
            to: payload.to,
            subject: payload.subject,
            html: payload.html,
        })
        return
    }

    requireSmtp()
    const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
            user: smtpUser,
            pass: smtpPass,
        },
    })

    await transporter.sendMail({
        from: smtpFrom,
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
    })
}

export function verificationEmailHtml(name: string | null, url: string) {
    const displayName = name || "there"
    return `
        <div style="font-family: Arial, sans-serif; line-height:1.6;">
            <h2>Verify your email</h2>
            <p>Hi ${displayName},</p>
            <p>Click the button below to verify your email and finish setting up your account.</p>
            <p>
                <a href="${url}" style="background:#111;color:#fff;padding:10px 16px;text-decoration:none;border-radius:6px;">
                    Verify Email
                </a>
            </p>
            <p>If you didn't request this, you can ignore this email.</p>
        </div>
    `
}

export function resetEmailHtml(name: string | null, url: string) {
    const displayName = name || "there"
    return `
        <div style="font-family: Arial, sans-serif; line-height:1.6;">
            <h2>Reset your password</h2>
            <p>Hi ${displayName},</p>
            <p>Click the button below to reset your password.</p>
            <p>
                <a href="${url}" style="background:#111;color:#fff;padding:10px 16px;text-decoration:none;border-radius:6px;">
                    Reset Password
                </a>
            </p>
            <p>This link expires in 1 hour.</p>
        </div>
    `
}
