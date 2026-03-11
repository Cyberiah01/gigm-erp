"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useUIStore } from "@/stores"
import { Sidebar } from "./sidebar"
import { TopBar } from "./topbar"

interface ERPLayoutProps {
  children: React.ReactNode
  title?: string
}

export function ERPLayout({ children, title }: ERPLayoutProps) {
  const { sidebarCollapsed } = useUIStore()

  return (
    <div className="min-h-screen bg-bg">
      <Sidebar />
      <TopBar title={title} />
      <main
        className={cn(
          "pt-16 min-h-screen transition-all duration-200",
          sidebarCollapsed ? "pl-16" : "pl-60"
        )}
      >
        <div className="p-6 max-w-content">
          {title && (
            <h1 className="text-2xl font-heading font-bold text-dark mb-6">{title}</h1>
          )}
          {children}
        </div>
      </main>
    </div>
  )
}
