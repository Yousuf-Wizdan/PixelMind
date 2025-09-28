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
                    <header className="bg-white/80 supports-[backdrop-filter]:bg-white/70 border-purple-200/40 sticky top-0 z-10 border-b px-6 py-3 shadow-sm backdrop-blur-xl">
                        <div className="flex shrink-0 grow items-center gap-3">
                            <SidebarTrigger className="hover:bg-purple-50 hover:text-purple-700 -ml-1 h-8 w-8 transition-all duration-200 rounded-lg" />
                            <Separator
                                orientation="vertical"
                                className="mr-2 h-6 bg-purple-200/60 data-[orientation=vertical]:h-6"
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
                    <main className="from-purple-50/30 via-blue-50/20 to-teal-50/30 flex-1 overflow-y-auto bg-gradient-to-br p-6">
                        {children}
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </Providers>
    )
}

export default Mainlayout