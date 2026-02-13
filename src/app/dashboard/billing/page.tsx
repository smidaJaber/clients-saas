
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, CreditCard } from "lucide-react"

export default async function BillingPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect("/login")
    }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Billing</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Free Plan */}
                <Card>
                    <CardHeader>
                        <CardTitle>Free Plan</CardTitle>
                        <CardDescription>Perfect for freelancers just starting out.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="text-2xl font-bold">$0<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                        <ul className="grid gap-2 text-sm">
                            <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Up to 3 Clients</li>
                            <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Basic Invoicing</li>
                            <li className="flex items-center gap-2"><Check className="h-4 w-4" /> 100MB Storage</li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" variant="outline" disabled>Current Plan</Button>
                    </CardFooter>
                </Card>

                {/* Pro Plan */}
                <Card className="border-primary">
                    <CardHeader>
                        <CardTitle>Pro Plan</CardTitle>
                        <CardDescription>For growing businesses and agencies.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="text-2xl font-bold">$29<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                        <ul className="grid gap-2 text-sm">
                            <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Unlimited Clients</li>
                            <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Advanced Invoicing & Payments</li>
                            <li className="flex items-center gap-2"><Check className="h-4 w-4" /> 50GB Storage</li>
                            <li className="flex items-center gap-2"><Check className="h-4 w-4" /> Priority Support</li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <form action={async () => {
                            "use server"
                            // Stripe checkout redirect would go here
                            redirect("https://buy.stripe.com/test_00w14p6TO5NvdvYcnGdnW00")
                        }}>
                            <Button className="w-full" type="submit">
                                <CreditCard className="mr-2 h-4 w-4" /> Upgrade to Pro
                            </Button>
                        </form>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
