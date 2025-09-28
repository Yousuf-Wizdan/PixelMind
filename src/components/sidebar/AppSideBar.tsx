"use server"

import React from 'react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { Settings, Sparkles, User } from 'lucide-react';
import Link from 'next/link';
import MobileSidebarClose from './MobileSidebarClose';
import SidebarMenuItems from './SidebarMenuItems';
import Upgrade from './Upgrade';
import Credits from './Credits';
import { UserButton } from '@daveyplate/better-auth-ui';

const AppSideBar = () => {
  return (
    <Sidebar className="from-background via-purple-50/20 to-blue-50/20 border-r-0 bg-gradient-to-b shadow-lg shadow-purple-500/5">
      <SidebarContent className="px-3">
        <MobileSidebarClose />
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary mt-6 mb-8 flex flex-col items-start justify-start px-2">
            <Link href="/" className="mb-1 flex items-center gap-2">
              <div className="rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 p-1 shadow-lg shadow-purple-500/25">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <p className="from-purple-600 via-blue-600 to-teal-600 bg-gradient-to-r bg-clip-text text-2xl font-bold tracking-tight text-transparent">
                PixelMind
              </p>
            </Link>
            <p className="text-muted-foreground ml-8 text-sm font-medium tracking-wide">
              AI Image Editor
            </p>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              <SidebarMenuItems />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-gradient-to-r from-purple-50/50 to-blue-50/50 border-t border-purple-200/30 p-3">
        <div className="mb-3 flex w-full items-center justify-center gap-2 text-xs">
          <Credits />
          <Upgrade />
        </div>
        <UserButton
          variant="outline"
          className="border-purple-200/50 hover:border-purple-400/60 hover:bg-purple-50/50 w-full transition-all duration-200 backdrop-blur-sm"
          disableDefaultLinks={true}
          additionalLinks={[
            {
              label: "Customer Portal",
              href: "/dashboard/customer-portal",
              icon: <User className="h-4 w-4" />,
            },
            {
              label: "Settings",
              href: "/dashboard/settings",
              icon: <Settings className="h-4 w-4" />,
            },
          ]}
        />
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSideBar