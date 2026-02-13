
'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getFiles() {
    const supabase = await createClient()
    const { data: files, error } = await supabase
        .from('files')
        .select(`
        *,
        clients (name)
    `)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching files:', error)
        return []
    }

    return files
}

export async function saveFileRecord(fileData: { client_id: string, file_url: string }) {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    // Auth Check with Recovery
    if (authError || !user) {
        console.error('Auth Error during saveFileRecord (getUser):', authError)

        // Try to recover session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()

        if (sessionError || !session?.user) {
            console.error('Auth Error during saveFileRecord (getSession):', sessionError)
            return { error: 'User not authenticated' }
        }

        // If recovered
        const recoveredUser = session.user

        const { error } = await supabase
            .from('files')
            .insert({ ...fileData, user_id: recoveredUser.id })

        if (error) {
            console.error('Error saving file record:', error)
            return { error: 'Failed to save file record' }
        }

        revalidatePath('/dashboard/files')
        return { success: true }
    }

    const { error } = await supabase
        .from('files')
        .insert({ ...fileData, user_id: user.id })

    if (error) {
        console.error('Error saving file record:', error)
        return { error: 'Failed to save file record' }
    }

    revalidatePath('/dashboard/files')
    return { success: true }
}
