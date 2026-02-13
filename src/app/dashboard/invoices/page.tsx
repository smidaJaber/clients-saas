
import { getInvoices } from "./actions"
import { getClients } from "@/app/dashboard/clients/actions"
import { InvoiceDialog } from "@/components/invoices/invoice-dialog"
import { InvoiceTable } from "@/components/invoices/invoice-table"

export default async function InvoicesPage() {
    const invoices = await getInvoices()
    const clients = await getClients()

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Invoices</h2>
                <div className="flex items-center space-x-2">
                    <InvoiceDialog clients={clients} />
                </div>
            </div>
            <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
                <InvoiceTable invoices={invoices} />
            </div>
        </div>
    )
}
