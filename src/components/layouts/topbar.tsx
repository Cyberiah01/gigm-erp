"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useUIStore, useAuthStore } from "@/stores"
import { Avatar, Badge } from "@/components/ui"
import { Select } from "@/components/ui"
import { TERMINALS } from "@/constants"
import {
  Bell,
  HelpCircle,
  ChevronDown,
  Menu,
  X,
} from "lucide-react"

interface TopBarProps {
  title?: string
}

export function TopBar({ title }: TopBarProps) {
  const pathname = usePathname()
  const { sidebarCollapsed, notifications, toggleSidebar } = useUIStore()
  const { user, selectedTerminalId, setSelectedTerminal, terminalScope } = useAuthStore()
  const [showNotifications, setShowNotifications] = React.useState(false)
  const [showUserMenu, setShowUserMenu] = React.useState(false)
  const [showTerminalSelector, setShowTerminalSelector] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  const unreadCount = notifications.filter(n => !n.read).length
  
  const userTerminals = TERMINALS.filter(t => 
    terminalScope.length === 0 || terminalScope.includes(t.id)
  )

  const selectedTerminal = TERMINALS.find(t => t.id === selectedTerminalId)

  const breadcrumbs = pathname.split('/').filter(Boolean).map((segment, index, arr) => {
    const path = '/' + arr.slice(0, index + 1).join('/')
    const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')
    return { label, path }
  })

  return (
    <header className={cn(
      "fixed top-0 right-0 h-16 bg-surface border-b border-border z-30 flex items-center justify-between px-4 transition-all duration-200",
      sidebarCollapsed ? "left-16" : "left-60"
    )}>
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100"
        >
          <Menu className="h-5 w-5 text-mid" />
        </button>

        <nav className="hidden sm:flex items-center gap-2 text-sm">
          <Link href="/dashboard" className="text-subtle hover:text-brand-green">
            Home
          </Link>
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.path}>
              <span className="text-subtle">/</span>
              <Link
                href={crumb.path}
                className={cn(
                  index === breadcrumbs.length - 1
                    ? "text-dark font-medium"
                    : "text-subtle hover:text-brand-green"
                )}
              >
                {crumb.label}
              </Link>
            </React.Fragment>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-2">
        {terminalScope.length > 1 && (
          <div className="relative">
            <button
              onClick={() => setShowTerminalSelector(!showTerminalSelector)}
              className="flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-md hover:bg-gray-50"
            >
              <span className="text-mid">{selectedTerminal?.name || "Select Terminal"}</span>
              <ChevronDown className="h-4 w-4 text-subtle" />
            </button>
            {showTerminalSelector && (
              <div className="absolute right-0 top-full mt-1 w-56 bg-surface border border-border rounded-lg shadow-lg py-1 z-50">
                {userTerminals.map(terminal => (
                  <button
                    key={terminal.id}
                    onClick={() => {
                      setSelectedTerminal(terminal.id)
                      setShowTerminalSelector(false)
                    }}
                    className={cn(
                      "w-full text-left px-4 py-2 text-sm hover:bg-gray-100",
                      selectedTerminalId === terminal.id && "bg-brand-green-light text-brand-green"
                    )}
                  >
                    {terminal.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-md hover:bg-gray-100"
          >
            <Bell className="h-5 w-5 text-mid" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 h-4 w-4 bg-error text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
          {showNotifications && (
            <div className="absolute right-0 top-full mt-1 w-80 bg-surface border border-border rounded-lg shadow-lg z-50">
              <div className="px-4 py-3 border-b border-border">
                <h3 className="font-semibold text-dark">Notifications</h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="px-4 py-8 text-center text-subtle text-sm">
                    No notifications
                  </div>
                ) : (
                  notifications.slice(0, 10).map(notification => (
                    <div
                      key={notification.id}
                      className={cn(
                        "px-4 py-3 border-b border-border last:border-0 hover:bg-gray-50 cursor-pointer",
                        !notification.read && "bg-brand-green-light/50"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "h-2 w-2 rounded-full mt-1.5 flex-shrink-0",
                          notification.type === 'error' && "bg-error",
                          notification.type === 'warning' && "bg-warning",
                          notification.type === 'success' && "bg-brand-green",
                          notification.type === 'info' && "bg-info"
                        )} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-dark">{notification.title}</p>
                          <p className="text-xs text-mid mt-0.5 line-clamp-2">{notification.message}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="px-4 py-3 border-t border-border">
                <Link href="/notifications" className="text-sm text-brand-green hover:underline">
                  View all notifications
                </Link>
              </div>
            </div>
          )}
        </div>

        <button className="p-2 rounded-md hover:bg-gray-100">
          <HelpCircle className="h-5 w-5 text-mid" />
        </button>

        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 pl-2"
          >
            <Avatar name={user?.name || "User"} size="sm" />
            <ChevronDown className="h-4 w-4 text-subtle hidden sm:block" />
          </button>
          {showUserMenu && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-surface border border-border rounded-lg shadow-lg py-1 z-50">
              <div className="px-4 py-3 border-b border-border">
                <p className="text-sm font-medium text-dark">{user?.name || "User"}</p>
                <p className="text-xs text-subtle">{user?.email}</p>
              </div>
              <Link
                href="/profile"
                className="block px-4 py-2 text-sm text-dark hover:bg-gray-100"
              >
                My Profile
              </Link>
              <Link
                href="/settings"
                className="block px-4 py-2 text-sm text-dark hover:bg-gray-100"
              >
                Settings
              </Link>
              <button
                onClick={() => {
                  useAuthStore.getState().logout()
                }}
                className="w-full text-left px-4 py-2 text-sm text-error hover:bg-error-light"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
