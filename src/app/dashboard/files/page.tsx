
import { getFiles } from "./actions"
import { getClients } from "@/app/dashboard/clients/actions"
import { FileUploadDialog } from "@/components/files/file-upload"
import { FileTable } from "@/components/files/file-table"

export default async function FilesPage() {
    const files = await getFiles()
    const clients = await getClients()

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Files</h2>
                <div className="flex items-center space-x-2">
                    <FileUploadDialog clients={clients} />
                </div>
            </div>
            <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
                <FileTable files={files} />
            </div>
        </div>
    )
}
