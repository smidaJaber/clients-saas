
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Check } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center font-bold" href="#">
          ClientPortal
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#pricing">
            Pricing
          </Link>
          <ModeToggle />
          <Link href="/login">
            <Button variant="outline" size="sm">Log in</Button>
          </Link>
          <Link href="/signup">
            <Button size="sm">Get Started</Button>
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex flex-col items-center text-center px-4 md:px-6">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none max-w-3xl">
            Manage your clients, invoices, and files in one place.
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 mt-4">
            The simplest client portal for freelancers and agencies. Professional, secure, and easy to use.
          </p>
          <div className="space-x-4 mt-8">
            <Link href="/signup">
              <Button size="lg">Start for Free</Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" size="lg">Learn More</Button>
            </Link>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/20">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Features</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Everything you need to manage your business relationships.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-4 bg-primary/10 rounded-full">
                  <svg className="h-6 w-6 text-primary" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                </div>
                <h3 className="text-xl font-bold">Client Management</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Keep track of all your clients details in one secure place.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-4 bg-primary/10 rounded-full">
                  <svg className="h-6 w-6 text-primary" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><rect height="18" rx="2" ry="2" width="18" x="3" y="3" /><line x1="3" x2="21" y1="9" y2="9" /><line x1="9" x2="9" y1="21" y2="9" /></svg>
                </div>
                <h3 className="text-xl font-bold">Invoicing</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Create and track invoices. Know exactly who owes you what.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-4 bg-primary/10 rounded-full">
                  <svg className="h-6 w-6 text-primary" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
                </div>
                <h3 className="text-xl font-bold">File Sharing</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Upload and share files with directly with your clients.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Pricing</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Simple pricing. No hidden fees.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
              {/* Free Plan */}
              <div className="flex flex-col p-6 bg-background border rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold">Starter</h3>
                <div className="mt-4 text-4xl font-bold">$0</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">/month</p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Up to 3 Clients</li>
                  <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> 10 Invoices / mo</li>
                  <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> 100MB Storage</li>
                </ul>
                <Button className="mt-8" variant="outline">Current Plan</Button>
              </div>
              {/* Pro Plan */}
              <div className="flex flex-col p-6 bg-background border rounded-lg shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-bold rounded-bl-lg">POPULAR</div>
                <h3 className="text-2xl font-bold">Pro</h3>
                <div className="mt-4 text-4xl font-bold">$29</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">/month</p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Unlimited Clients</li>
                  <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Unlimited Invoices</li>
                  <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> 10GB Storage</li>
                  <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Custom Domain</li>
                </ul>
                <Button className="mt-8">Upgrade Now</Button>
              </div>
              {/* Agency Plan */}
              <div className="flex flex-col p-6 bg-background border rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold">Agency</h3>
                <div className="mt-4 text-4xl font-bold">$99</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">/month</p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Everything in Pro</li>
                  <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> White Labeling</li>
                  <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Priority Support</li>
                  <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-primary" /> Team Members</li>
                </ul>
                <Button className="mt-8" variant="outline">Contact Sales</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2026 ClientPortal Inc. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
