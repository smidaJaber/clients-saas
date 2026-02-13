
'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getInvoices() {
    const supabase = await createClient()
    const { data: invoices, error } = await supabase
        .from('invoices')
        .select(`
        *,
        clients (name)
    `)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching invoices:', error)
        return []
    }

    return invoices
}

export async function createInvoice(formData: FormData) {
    const supabase = await createClient()

    const rawData = {
        client_id: formData.get('client_id') as string,
        amount: parseFloat(formData.get('amount') as string),
        status: formData.get('status') as string,
        due_date: formData.get('due_date') as string,
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    // Auth Check with Recovery
    if (authError || !user) {
        console.error('Auth Error during createInvoice (getUser):', authError)

        // Try to recover session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()

        if (sessionError || !session?.user) {
            console.error('Auth Error during createInvoice (getSession):', sessionError)
            return { error: 'User not authenticated' }
        }

        // If recovered
        const recoveredUser = session.user

        const { error } = await supabase
            .from('invoices')
            .insert({ ...rawData, user_id: recoveredUser.id })

        if (error) {
            console.error('Error creating invoice:', error)
            return { error: 'Failed to create invoice' }
        }

        revalidatePath('/dashboard/invoices')
        return { success: true }
    }

    const { error } = await supabase
        .from('invoices')
        .insert({ ...rawData, user_id: user.id })

    if (error) {
        console.error('Error creating invoice:', error)
        return { error: 'Failed to create invoice' }
    }

    revalidatePath('/dashboard/invoices')
    return { success: true }
}

export async function updateInvoiceStatus(id: string, status: string) {
    const supabase = await createClient()
    const { error } = await supabase
        .from('invoices')
        .update({ status })
        .eq('id', id)

    if (error) {
        console.error('Error updating invoice:', error)
        return { error: 'Failed to update invoice' }
    }
    revalidatePath('/dashboard/invoices')
    return { success: true }
}
