
"use client" // This must be a client component to handle form submission

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login } from "../auth/actions"
import { toast } from "sonner"
import { useState } from "react"

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(formData: FormData) {
        setIsLoading(true)
        const result = await login(formData)
        if (result?.error) {
            toast.error(result.error)
            setIsLoading(false)
        }
    }

    return (
        <div className="flex h-screen w-full items-center justify-center px-4">
            <div className="w-full max-w-sm space-y-6">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Login to your account
                    </h1>
                    <p className="text-sm text-gray-500">
                        Enter your email below to login to your account
                    </p>
                </div>
                <form action={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" placeholder="m@example.com" required type="email" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" required type="password" />
                    </div>
                    <Button className="w-full" type="submit" disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Login"}
                    </Button>
                </form>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            Or
                        </span>
                    </div>
                </div>
                <form action={handleSubmit}>
                    <input type="hidden" name="email" value="demo@clientportal.com" />
                    <input type="hidden" name="password" value="demo123456" />
                    <Button variant="outline" className="w-full" type="submit" disabled={isLoading}>
                        Demo Account Login
                    </Button>
                </form>

                <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" className="underline">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    )
}
