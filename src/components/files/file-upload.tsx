
"use client"

import { useState } from "react"
import { Upload, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import { saveFileRecord } from "@/app/dashboard/files/actions"
import { toast } from "sonner"

export function FileUploadDialog({ clients }: { clients: any[] }) {
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [selectedClient, setSelectedClient] = useState<string>("")
    const [file, setFile] = useState<File | null>(null)

    async function handleUpload() {
        if (!file || !selectedClient) {
            toast.error("Please select a client and a file")
            return
        }

        setIsLoading(true)
        const supabase = createClient()
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random().toString(36).substr(2, 9)}.${fileExt}`
        const filePath = `${selectedClient}/${fileName}`

        const { error: uploadError } = await supabase.storage
            .from('files')
            .upload(filePath, file)

        if (uploadError) {
            toast.error("Failed to upload file")
            setIsLoading(false)
            return
        }

        const { data: { publicUrl } } = supabase.storage
            .from('files')
            .getPublicUrl(filePath)

        const result = await saveFileRecord({
            client_id: selectedClient,
            file_url: publicUrl
        })

        if (result?.error) {
            toast.error(result.error)
        } else {
            toast.success("File uploaded successfully")
            setOpen(false)
            setFile(null)
        }
        setIsLoading(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Upload className="mr-2 h-4 w-4" /> Upload File
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Upload File</DialogTitle>
                    <DialogDescription>
                        Upload a file for a specific client.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="client" className="text-right">
                            Client
                        </Label>
                        <div className="col-span-3">
                            <Select onValueChange={setSelectedClient} required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a client" />
                                </SelectTrigger>
                                <SelectContent>
                                    {clients?.map((client) => (
                                        <SelectItem key={client.id} value={client.id}>
                                            {client.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="file" className="text-right">
                            File
                        </Label>
                        <Input
                            id="file"
                            type="file"
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                            className="col-span-3"
                            required
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleUpload} disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Upload
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
