'use client'

import { useActionState, useState } from 'react'
import { authenticate, resendVerification } from '@/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { signIn } from 'next-auth/react'

export function LoginForm() {
    const [errorMessage, dispatch, isPending] = useActionState(authenticate, undefined)
    const [verifyMessage, verifyDispatch, verifyPending] = useActionState(resendVerification, undefined)
    const [email, setEmail] = useState('')

    return (
        <div className="flex items-center justify-center min-h-screen bg-black text-white p-4">
            <Card className="w-full max-w-md border-neutral-800 bg-neutral-950 text-white">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
                    <CardDescription className="text-center text-neutral-400">
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-2 mb-4">
                        <Button
                            type="button"
                            className="w-full bg-white text-black hover:bg-neutral-200"
                            onClick={() => signIn('google')}
                        >
                            Continue with Google
                        </Button>
                        <Button
                            type="button"
                            className="w-full bg-blue-600 text-white hover:bg-blue-500"
                            onClick={() => signIn('facebook')}
                        >
                            Continue with Facebook
                        </Button>
                    </div>
                    <div className="text-center text-xs text-neutral-500 mb-4">or use email</div>
                    <form action={dispatch} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                className="bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-500 focus-visible:ring-neutral-700"
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <Link href="/forgot-password" className="text-xs text-neutral-500 hover:text-white">
                                    Forgot password?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="bg-neutral-900 border-neutral-800 text-white focus-visible:ring-neutral-700"
                            />
                        </div>
                        {errorMessage && (
                            <div
                                className="text-red-500 text-sm font-medium"
                                role="alert"
                            >
                                {errorMessage}
                            </div>
                        )}
                        <Button
                            type="submit"
                            className="w-full bg-white text-black hover:bg-neutral-200"
                            disabled={isPending}
                        >
                            {isPending ? 'Logging in...' : 'Login'}
                        </Button>
                    </form>
                    <form action={verifyDispatch} className="mt-3">
                        <input type="hidden" name="email" value={email} />
                        <Button
                            type="submit"
                            variant="ghost"
                            className="w-full text-neutral-400 hover:text-white"
                            disabled={verifyPending}
                        >
                            Resend verification email
                        </Button>
                        {verifyMessage && (
                            <div className="text-xs text-neutral-400 mt-2">{verifyMessage}</div>
                        )}
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <div className="text-sm text-neutral-400">
                        Don't have an account?{' '}
                        <Link href="/signup" className="text-white hover:underline">
                            Sign up
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
