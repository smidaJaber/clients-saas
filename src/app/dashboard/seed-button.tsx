
'use client'

import { Button } from "@/components/ui/button"
import { seedData } from "./actions"
import { toast } from "sonner"
import { Database } from "lucide-react"

export function SeedButton() {
    return (
        <form action={async () => {
            const result = await seedData()
            if (result?.error) {
                toast.error(result.error)
            } else if (result?.message) {
                toast.info(result.message)
            } else {
                toast.success("Database seeded successfully!")
            }
        }}>
            <Button variant="outline" size="sm" type="submit">
                <Database className="mr-2 h-4 w-4" />
                Seed Data
            </Button>
        </form>
    )
}
