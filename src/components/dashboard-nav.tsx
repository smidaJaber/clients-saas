
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
    LayoutDashboard,
    Users,
    FileText,
    Files,
    Settings,
    CreditCard
} from "lucide-react"

interface NavProps {
    items: {
        title: string
        href: string
        icon: any
    }[]
}

export function DashboardNav({ items }: NavProps) {
    const pathname = usePathname()

    if (!items?.length) {
        return null
    }

    return (
        <nav className="grid items-start gap-2">
            {items.map((item, index) => {
                const Icon = item.icon
                return (
                    item.href && (
                        <Link
                            key={index}
                            href={item.href}
                            className={cn(
                                buttonVariants({ variant: "ghost", size: "sm" }),
                                item.href === pathname
                                    ? "bg-muted hover:bg-muted"
                                    : "hover:bg-transparent hover:underline",
                                "justify-start"
                            )}
                        >
                            <Icon className="mr-2 h-4 w-4" />
                            <span>{item.title}</span>
                        </Link>
                    )
                )
            })}
        </nav>
    )
}

export const navItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard
    },
    {
        title: "Clients",
        href: "/dashboard/clients",
        icon: Users
    },
    {
        title: "Invoices",
        href: "/dashboard/invoices",
        icon: FileText
    },
    {
        title: "Files",
        href: "/dashboard/files",
        icon: Files
    },
    {
        title: "Settings",
        href: "/dashboard/settings",
        icon: Settings
    },
    {
        title: "Billing",
        href: "/dashboard/billing",
        icon: CreditCard
    },
]
