
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { DeleteClientButton } from "./delete-client-button"

export function ClientTable({ clients }: { clients: any[] }) {
    return (
        <Table>
            <TableCaption>A list of your recent clients.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {clients.map((client) => (
                    <TableRow key={client.id}>
                        <TableCell className="font-medium">{client.name}</TableCell>
                        <TableCell>{client.email}</TableCell>
                        <TableCell>{client.company}</TableCell>
                        <TableCell className="text-right">
                            <DeleteClientButton id={client.id} />
                        </TableCell>
                    </TableRow>
                ))}
                {clients.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center">No clients found.</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}
