"use client"

import { useActionState } from "react"
import { resetPassword } from "@/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function ResetPasswordPage({ params }: { params: { token: string } }) {
    const [message, dispatch, pending] = useActionState(resetPassword, undefined)

    return (
        <div className="min-h-screen bg-[#F0EBFA] flex flex-col items-center justify-center p-6 font-sans">
            <div className="w-full max-w-md rounded-2xl p-8 bg-white shadow-sm">
                <h1 className="text-2xl font-serif font-medium text-slate-900 mb-2">Set a new password</h1>
                <p className="text-slate-500 text-sm mb-6">Choose a new password for your account.</p>
                <form action={dispatch} className="space-y-4">
                    <input type="hidden" name="token" value={params.token} />
                    <div className="space-y-2">
                        <Label htmlFor="password">New Password</Label>
                        <Input id="password" name="password" type="password" required className="bg-slate-50" />
                    </div>
                    <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold h-10" disabled={pending}>
                        {pending ? "Updating..." : "Update password"}
                    </Button>
                    {message && (
                        <div className="text-xs text-slate-500">{message}</div>
                    )}
                </form>
                <div className="mt-6 text-center text-sm">
                    <Link href="/login" className="text-slate-600 hover:text-slate-900">Back to login</Link>
                </div>
            </div>
        </div>
    )
}
