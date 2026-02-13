
import { getClients } from "./actions"
import { ClientDialog } from "@/components/clients/client-dialog"
import { ClientTable } from "@/components/clients/client-table"

export default async function ClientsPage() {
    const clients = await getClients()

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Clients</h2>
                <div className="flex items-center space-x-2">
                    <ClientDialog />
                </div>
            </div>
            <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
                <ClientTable clients={clients} />
            </div>
        </div>
    )
}
