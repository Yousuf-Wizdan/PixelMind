import { Providers } from '@/components/Providers'
import AppSideBar from '@/components/sidebar/AppSideBar'
import BreadCrumbClient from '@/components/sidebar/BreadCrumbClient'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList } from '@/components/ui/breadcrumb'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@radix-ui/react-separator'
import React from 'react'

const Mainlayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Providers>
            <SidebarProvider>
                <AppSideBar />
                <SidebarInset className="flex h-screen flex-col">
                    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-border/40 sticky top-0 z-10 border-b px-6 py-3 shadow-sm backdrop-blur">
                        <div className="flex shrink-0 grow items-center gap-3">
                            <SidebarTrigger className="hover:bg-muted -ml-1 h-8 w-8 transition-colors" />
                            <Separator
                                orientation="vertical"
                                className="mr-2 h-6 data-[orientation=vertical]:h-6"
                            />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <BreadCrumbClient />
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                    </header>
                    <main className="from-background to-muted/20 flex-1 overflow-y-auto bg-gradient-to-br p-6">
                        {children}
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </Providers>
    )
}

export default Mainlayout