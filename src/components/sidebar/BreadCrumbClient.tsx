'use client'

import { usePathname } from 'next/navigation'
import React from 'react'
import { BreadcrumbPage } from '../ui/breadcrumb';

const BreadCrumbClient = () => {
    const pathname = usePathname();

    const getPageTitle = (pathname: string) => {
        switch (pathname) {
            case '/dashboard':
                return 'Dashboard';
            case '/dashboard/create':
                return 'Create';
            case "/dashboard/projects":
                return "Projects";
            case "/dashboard/settings":
                return "Settings";
            default:
                return "Dashboard";
        }
    }
    return (
        <BreadcrumbPage className="text-foreground text-sm font-medium">
            {getPageTitle(pathname)}
        </BreadcrumbPage>
    )
}

export default BreadCrumbClient