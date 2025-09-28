'use client'

import React from 'react'
import { SidebarMenuButton, SidebarMenuItem, useSidebar } from '../ui/sidebar';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { FolderOpen, LayoutDashboard, Settings, Wand2 } from 'lucide-react';
import { usePathname } from 'next/navigation';

const SidebarMenuItems = () => {
    const path = usePathname();
    const { setOpenMobile, isMobile } = useSidebar();

    let items = [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: LayoutDashboard,
            active: false,
        },
        {
            title: "Create",
            url: "/dashboard/create",
            icon: Wand2,
            active: false,
        },
        {
            title: "Projects",
            url: "/dashboard/projects",
            icon: FolderOpen,
            active: false,
        },
        {
            title: "Settings",
            url: "/dashboard/settings",
            icon: Settings,
            active: false,
        },
    ];

    items = items.map((item) => ({
        ...item,
        active: path === item.url,
    }));

    const handleMenuClick = () => {
        if (isMobile) {
            setOpenMobile(false);
        }
    };

    return (
        <>
            {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                        asChild
                        isActive={item.active}
                        className={cn(
                            "group hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-700 relative h-10 w-full justify-start rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:shadow-sm",
                            item.active && "bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 shadow-md border border-purple-200/50",
                        )}
                    >
                        <Link
                            href={item.url}
                            onClick={handleMenuClick}
                            className="flex items-center gap-3"
                        >
                            <item.icon
                                className={cn(
                                    "h-5 w-5 transition-colors duration-200",
                                    item.active
                                        ? "text-purple-600"
                                        : "text-gray-500 group-hover:text-purple-600",
                                )}
                            />
                            <span className="truncate">{item.title}</span>
                            {item.active && (
                                <div className="bg-gradient-to-b from-purple-600 to-blue-600 absolute top-1/2 left-0 h-6 w-1 -translate-y-1/2 rounded-r-full shadow-sm" />
                            )}
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </>
    )
}

export default SidebarMenuItems