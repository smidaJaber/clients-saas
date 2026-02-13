
'use server'

import { createClient as createSupabaseClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getClients() {
    try {
        const supabase = await createSupabaseClient()
        const { data: clients, error } = await supabase
            .from('clients')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Error fetching clients:', error)
            return []
        }
        return clients
    } catch (error) {
        console.error("Unexpected error fetching clients:", error)
        return []
    }
}

export async function createClient(formData: FormData) {
    const supabase = await createSupabaseClient()

    const rawData = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        company: formData.get('company') as string,
    }

    // Get user with error handling
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
        console.error('Auth Error during createClient (getUser):', authError)

        // Try to recover session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()

        if (sessionError || !session?.user) {
            console.error('Auth Error during createClient (getSession):', sessionError)
            return { error: 'User not authenticated. Please log in again.' }
        }

        // If we talk here, we have a valid session user
        const recoveredUser = session.user

        const { error } = await supabase
            .from('clients')
            .insert({ ...rawData, user_id: recoveredUser.id })

        if (error) {
            console.error('Error creating client:', error)
            return { error: 'Failed to create client in database' }
        }

        revalidatePath('/dashboard/clients')
        return { success: true }
    }

    const { error } = await supabase
        .from('clients')
        .insert({ ...rawData, user_id: user.id })

    if (error) {
        console.error('Error creating client:', error)
        return { error: 'Failed to create client in database' }
    }

    revalidatePath('/dashboard/clients')
    return { success: true }
}

export async function deleteClient(id: string) {
    const supabase = await createSupabaseClient()
    const { error } = await supabase.from('clients').delete().eq('id', id)

    if (error) {
        console.error('Error deleting client:', error)
        return { error: 'Failed to delete client' }
    }
    revalidatePath('/dashboard/clients')
    return { success: true }
}
