'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { LayoutDashboard, Youtube, Facebook, Chrome, LogOut, PlusCircle } from 'lucide-react'
import { signOut } from 'next-auth/react'

const navItems = [
    { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { href: '/dashboard/youtube', label: 'YouTube Ads', icon: Youtube },
    { href: '/dashboard/meta', label: 'Meta Ads', icon: Facebook },
    { href: '/dashboard/google', label: 'Google Ads', icon: Chrome },
    { href: '/dashboard/create', label: 'Create Ad', icon: PlusCircle },
]

export function DashboardSidebar() {
    const pathname = usePathname()

    return (
        <div className="flex flex-col h-screen w-64 bg-neutral-950 border-r border-neutral-800 text-white">
            <div className="p-6">
                <h1 className="text-xl font-bold tracking-tighter">AdCoach</h1>
            </div>
            <nav className="flex-1 px-4 space-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                isActive
                                    ? "bg-white text-black"
                                    : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
                            )}
                        >
                            <Icon className="w-4 h-4" />
                            {item.label}
                        </Link>
                    )
                })}
            </nav>
            <div className="p-4 border-t border-neutral-800">
                <button
                    onClick={() => signOut()}
                    className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-neutral-400 hover:text-white w-full transition-colors"
                >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                </button>
            </div>
        </div>
    )
}
