"use client"

import { AuthUIProvider } from "@daveyplate/better-auth-ui"
import Link from "next/link"
import { redirect, useRouter } from "next/navigation"
import type { ReactNode } from "react"

import { authClient } from "@/lib/auth-client"

export function Providers({ children }: { children: ReactNode }) {
    const router = useRouter()

    return (
        <AuthUIProvider
            authClient={authClient}
            navigate={router.push}
            replace={router.replace}
            onSessionChange={async () => {
                router.refresh()

                // try {
                //     const session = await authClient.getSession();
                //     if (session.data?.user && typeof window !== 'undefined') {
                //         const currentPath = window.location.pathname
                //         console.log("yo" , currentPath)
                //         if (currentPath.startsWith('/auth/')) {
                //             router.push('/dashboard')
                //         }
                //     }
                // } catch (err) {
                //     console.log("Session Check Failed:", err)
                // }

            }}
            social={{
                providers: ["google"],
            }}
            redirectTo="/dashboard"
            Link={Link}
        >
            {children}
        </AuthUIProvider>
    )
}