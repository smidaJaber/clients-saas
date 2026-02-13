"use client"

import { Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { deleteClient } from "@/app/dashboard/clients/actions"
import { toast } from "sonner"

export function DeleteClientButton({ id }: { id: string }) {
    async function handleDelete() {
        const result = await deleteClient(id)
        if (result?.error) {
            toast.error(result.error)
        } else {
            toast.success("Client deleted")
        }
    }

    return (
        <form action={handleDelete}>
            <Button variant="ghost" size="icon" type="submit">
                <Trash className="h-4 w-4" />
            </Button>
        </form>
    )
}
