
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
import { FileIcon, Download, ExternalLink } from "lucide-react"
import Link from "next/link"

export function FileTable({ files }: { files: any[] }) {
    return (
        <Table>
            <TableCaption>A list of uploaded files.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>File</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {files.map((file) => (
                    <TableRow key={file.id}>
                        <TableCell className="font-medium flex items-center gap-2">
                            <FileIcon className="h-4 w-4" />
                            {file.file_url.split('/').pop()}
                        </TableCell>
                        <TableCell>{file.clients?.name || 'Unknown Client'}</TableCell>
                        <TableCell>{new Date(file.created_at).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                            <Button variant="ghost" size="icon" asChild>
                                <a href={file.file_url} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="h-4 w-4" />
                                </a>
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
                {files.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center">No files found.</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}
