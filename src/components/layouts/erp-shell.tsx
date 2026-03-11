"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, Button } from "@/components/ui"
import { ROUTES } from "@/constants"
import { canAccessPath, getDefaultRouteForRole } from "@/lib/auth"
import { useAuthStore, useUIStore } from "@/stores"
import { Sidebar } from "./sidebar"
import { TopBar } from "./topbar"
import { ShieldAlert } from "lucide-react"

interface ERPLayoutProps {
  children: React.ReactNode
  title?: string
}

export function ERPLayout({ children, title }: ERPLayoutProps) {
  const { sidebarCollapsed } = useUIStore()
  const router = useRouter()
  const pathname = usePathname()
  const { user, isAuthenticated } = useAuthStore()
  const [isReady, setIsReady] = React.useState(false)

  React.useEffect(() => {
    void Promise.resolve(useAuthStore.persist.rehydrate()).finally(() => {
      setIsReady(true)
    })
  }, [])

  React.useEffect(() => {
    if (!isReady) {
      return
    }

    if (!isAuthenticated) {
      router.replace(ROUTES.AUTH.LOGIN)
    }
  }, [isAuthenticated, isReady, router])

  if (!isReady) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-sm font-medium text-dark">Loading workspace...</p>
          <p className="text-sm text-subtle mt-1">Restoring your test session</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return null
  }

  const hasAccess = canAccessPath(user, pathname)

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
          {hasAccess ? (
            children
          ) : (
            <Card className="max-w-2xl">
              <CardHeader>
                <div className="flex items-center gap-3 text-dark">
                  <ShieldAlert className="h-5 w-5 text-error" />
                  <CardTitle>Access denied</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-mid">
                  Your current role does not have permission to open this section in the frontend test environment.
                </p>
                <div className="flex gap-3">
                  <Link href={getDefaultRouteForRole(user.role)}>
                    <Button>Go to allowed area</Button>
                  </Link>
                  <Link href={ROUTES.DASHBOARD}>
                    <Button variant="outline">Back to dashboard</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
