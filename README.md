
# Client Portal SaaS

A professional platform for managing clients, invoices, and files. Built with Next.js 14, Supabase, and Tailwind CSS.

## Features

- **Client Management**: Add, edit, and track clients.
- **Invoicing**: Create and manage invoices with status tracking.
- **File Sharing**: Upload and share files securely with clients.
- **Dashboard**: Overview of your business metrics.
- **Authentication**: Secure login/signup via Supabase Auth.
- **Dark Mode**: Built-in dark mode support.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn UI
- **Backend/DB**: Supabase (PostgreSQL, Auth, Storage)
- **State Management**: React Server Components & Server Actions

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/client-portal-saas.git
    cd client-portal-saas
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env.local` file and add your Supabase credentials:
    ```bash
    NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  **Open in browser:**
    Navigate to `http://localhost:3000`.

## Database Schema

- `clients`: Stores client information.
- `invoices`: Stores invoice details linked to clients.
- `files`: Stores file references linked to clients.
