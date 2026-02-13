
'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function seedData() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'User not authenticated' }
    }

    const userId = user.id

    // Check if data already exists to avoid duplicates or mess
    const { count } = await supabase.from('clients').select('*', { count: 'exact', head: true })
    if (count && count > 0) {
        return { message: 'Data already exists, skipping seed.' }
    }

    const clients = [
        { name: 'Acme Corp', email: 'contact@acme.com', company: 'Acme Inc.', user_id: userId },
        { name: 'Globex', email: 'info@globex.com', company: 'Globex Corporation', user_id: userId },
        { name: 'Soylent Corp', email: 'sales@soylent.com', company: 'Soylent Corp', user_id: userId },
        { name: 'Initech', email: 'help@initech.com', company: 'Initech', user_id: userId },
        { name: 'Umbrella Corp', email: 'secure@umbrella.com', company: 'Umbrella Corporation', user_id: userId },
        { name: 'Stark Ind', email: 'tony@stark.com', company: 'Stark Industries', user_id: userId },
    ]

    const { data: insertedClients, error: clientError } = await supabase
        .from('clients')
        .insert(clients)
        .select()

    if (clientError || !insertedClients) {
        console.error('Error seeding clients:', clientError)
        return { error: 'Failed to seed clients' }
    }

    const invoices = [
        { client_id: insertedClients[0].id, amount: 1500.00, status: 'paid', due_date: new Date().toISOString(), user_id: userId },
        { client_id: insertedClients[1].id, amount: 2300.50, status: 'paid', due_date: new Date().toISOString(), user_id: userId },
        { client_id: insertedClients[2].id, amount: 450.00, status: 'unpaid', due_date: new Date(Date.now() + 86400000 * 7).toISOString(), user_id: userId },
        { client_id: insertedClients[3].id, amount: 1200.00, status: 'pending', due_date: new Date(Date.now() + 86400000 * 14).toISOString(), user_id: userId },
    ]

    const { error: invoiceError } = await supabase.from('invoices').insert(invoices)
    if (invoiceError) {
        console.error('Error seeding invoices:', invoiceError)
        return { error: 'Failed to seed invoices' }
    }

    // Dummy files
    const files = [
        { client_id: insertedClients[0].id, file_url: 'https://placehold.co/600x400.png', user_id: userId, created_at: new Date().toISOString() },
        { client_id: insertedClients[1].id, file_url: 'https://placehold.co/600x400.png', user_id: userId, created_at: new Date().toISOString() },
    ]

    // We try to insert into 'files' table.
    // NOTE: This assumes 'files' table has 'file_url' column as per previous context (create table files ... file_url text ...)
    const { error: fileError } = await supabase.from('files').insert(files)
    if (fileError) {
        console.error('Error seeding files:', fileError)
        // Not returning error here, as files are less critical
    }

    revalidatePath('/dashboard')
    return { success: true }
}
