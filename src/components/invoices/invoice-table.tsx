
"use client"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { updateInvoiceStatus } from "@/app/dashboard/invoices/actions"
import { CheckCircle, XCircle, Clock } from "lucide-react"

export function InvoiceTable({ invoices }: { invoices: any[] }) {
    return (
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.clients?.name || 'Unknown Client'}</TableCell>
                        <TableCell>${invoice.amount}</TableCell>
                        <TableCell>
                            <Badge variant={invoice.status === 'paid' ? 'default' : invoice.status === 'unpaid' ? 'destructive' : 'secondary'}>
                                {invoice.status}
                            </Badge>
                        </TableCell>
                        <TableCell>{invoice.due_date ? new Date(invoice.due_date).toISOString().split('T')[0] : 'N/A'}</TableCell>
                        <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                                {invoice.status !== 'paid' && (
                                    <form action={async () => {
                                        await updateInvoiceStatus(invoice.id, 'paid')
                                    }}>
                                        <Button variant="ghost" size="icon" title="Mark as Paid">
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                        </Button>
                                    </form>
                                )}
                                {invoice.status !== 'unpaid' && invoice.status !== 'pending' && (
                                    <form action={async () => {
                                        await updateInvoiceStatus(invoice.id, 'unpaid')
                                    }}>
                                        <Button variant="ghost" size="icon" title="Mark as Unpaid">
                                            <XCircle className="h-4 w-4 text-red-500" />
                                        </Button>
                                    </form>
                                )}
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
                {invoices.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center">No invoices found.</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}
