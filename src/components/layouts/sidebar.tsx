"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { canAccessPath } from "@/lib/auth"
import { useUIStore } from "@/stores"
import { Avatar } from "@/components/ui"
import { useAuthStore } from "@/stores"
import {
  LayoutDashboard,
  Ticket,
  MapPin,
  ClipboardList,
  Building2,
  Bus,
  UserCheck,
  Wrench,
  Fuel,
  Package,
  Bike,
  Warehouse,
  Briefcase,
  Users,
  MessageSquare,
  Star,
  CreditCard,
  Banknote,
  FileText,
  Wallet,
  BarChart2,
  Users2,
  UserPlus,
  CalendarOff,
  TrendingUp,
  Globe,
  Tag,
  BookOpen,
  LineChart,
  ShieldCheck,
  Settings,
  ScrollText,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, section: "main" },
  { name: "OPERATIONS", href: "", icon: null, section: "header" },
  { name: "Bookings", href: "/bookings", icon: Ticket, section: "operations" },
  { name: "Trips & Routes", href: "/trips", icon: MapPin, section: "operations" },
  { name: "Manifests", href: "/manifests", icon: ClipboardList, section: "operations" },
  { name: "Terminals", href: "/terminals", icon: Building2, section: "operations" },
  { name: "FLEET", href: "", icon: null, section: "header" },
  { name: "Vehicles", href: "/fleet/vehicles", icon: Bus, section: "fleet" },
  { name: "Drivers", href: "/fleet/drivers", icon: UserCheck, section: "fleet" },
  { name: "Maintenance", href: "/fleet/maintenance", icon: Wrench, section: "fleet" },
  { name: "Fuel & Assets", href: "/fleet/fuel", icon: Fuel, section: "fleet" },
  { name: "LOGISTICS (GIGL)", href: "", icon: null, section: "header" },
  { name: "Shipments", href: "/logistics/shipments", icon: Package, section: "logistics" },
  { name: "Couriers", href: "/logistics/couriers", icon: Bike, section: "logistics" },
  { name: "Warehouse", href: "/logistics/warehouse", icon: Warehouse, section: "logistics" },
  { name: "Corporate Clients", href: "/logistics/corporate", icon: Briefcase, section: "logistics" },
  { name: "CUSTOMERS", href: "", icon: null, section: "header" },
  { name: "Customer Profiles", href: "/customers/profiles", icon: Users, section: "customers" },
  { name: "Support Tickets", href: "/customers/support", icon: MessageSquare, section: "customers" },
  { name: "Loyalty / GIGM+", href: "/customers/loyalty", icon: Star, section: "customers" },
  { name: "FINANCE", href: "", icon: null, section: "header" },
  { name: "Transactions", href: "/finance/transactions", icon: CreditCard, section: "finance" },
  { name: "Cash Reports", href: "/finance/cash-reports", icon: Banknote, section: "finance" },
  { name: "Invoices", href: "/finance/invoices", icon: FileText, section: "finance" },
  { name: "Payroll", href: "/finance/payroll", icon: Wallet, section: "finance" },
  { name: "Reports", href: "/finance/reports", icon: BarChart2, section: "finance" },
  { name: "HR", href: "", icon: null, section: "header" },
  { name: "Employees", href: "/hr/employees", icon: Users2, section: "hr" },
  { name: "Recruitment", href: "/hr/recruitment", icon: UserPlus, section: "hr" },
  { name: "Leave", href: "/hr/leave", icon: CalendarOff, section: "hr" },
  { name: "Performance", href: "/hr/performance", icon: TrendingUp, section: "hr" },
  { name: "PUBLIC PORTAL", href: "", icon: null, section: "header" },
  { name: "Pages & Content", href: "/portal/pages", icon: Globe, section: "portal" },
  { name: "Promotions", href: "/portal/promotions", icon: Tag, section: "portal" },
  { name: "Careers", href: "/portal/careers", icon: BookOpen, section: "portal" },
  { name: "Analytics", href: "/portal/analytics", icon: LineChart, section: "portal" },
  { name: "SETTINGS", href: "", icon: null, section: "header" },
  { name: "Users & Roles", href: "/settings/users", icon: ShieldCheck, section: "settings" },
  { name: "System Config", href: "/settings/config", icon: Settings, section: "settings" },
  { name: "Audit Logs", href: "/settings/audit-logs", icon: ScrollText, section: "settings" },
]

export function Sidebar() {
  const pathname = usePathname()
  const { sidebarCollapsed, toggleSidebar } = useUIStore()
  const { user, logout } = useAuthStore()

  const visibleNavigation = React.useMemo(() => {
    const items = [] as typeof navigation
    let pendingHeader: (typeof navigation)[number] | null = null

    for (const item of navigation) {
      if (item.section === "header") {
        pendingHeader = item
        continue
      }

      if (item.href && !canAccessPath(user, item.href)) {
        continue
      }

      if (pendingHeader) {
        items.push(pendingHeader)
        pendingHeader = null
      }

      items.push(item)
    }

    return items
  }, [user])

  const activeNav = visibleNavigation.find(
    (item) => item.href && pathname.startsWith(item.href)
  )

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarCollapsed ? 64 : 240 }}
      transition={{ duration: 0.2 }}
      className="fixed left-0 top-0 h-screen bg-surface border-r border-border z-40 flex flex-col"
    >
      <div className={cn(
        "flex items-center gap-3 px-4 py-5 border-b border-border",
        sidebarCollapsed && "justify-center px-2"
      )}>
        <div className="h-10 w-10 rounded-lg bg-brand-green flex items-center justify-center flex-shrink-0">
          <span className="text-white font-display text-xl">G</span>
        </div>
        {!sidebarCollapsed && (
          <div>
            <span className="font-heading font-bold text-lg text-dark">GIGM</span>
            <span className="text-xs text-subtle ml-1">ERP</span>
          </div>
        )}
      </div>

      <div className={cn(
        "flex items-center gap-3 px-4 py-4 border-b border-border",
        sidebarCollapsed && "justify-center px-2"
      )}>
        <Avatar name={user?.name || "User"} size="sm" />
        {!sidebarCollapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-dark truncate">{user?.name || "User"}</p>
            <p className="text-xs text-subtle capitalize">{user?.role?.replace('_', ' ') || "Staff"}</p>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {visibleNavigation.map((item, index) => {
            if (item.section === "header") {
              return (
                <li key={item.name} className={cn(
                  "px-2 py-2",
                  sidebarCollapsed && "hidden"
                )}>
                  <span className="text-xs font-semibold text-subtle uppercase tracking-wider">
                    {item.name}
                  </span>
                </li>
              )
            }

            const isActive = item.href && pathname === item.href
            const Icon = item.icon

            return (
              <li key={item.name}>
                <Link
                  href={item.href || "#"}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors relative group",
                    isActive
                      ? "bg-brand-green-light text-brand-green font-medium"
                      : "text-mid hover:bg-gray-100 hover:text-dark",
                    !item.href && "pointer-events-none",
                    sidebarCollapsed && "justify-center px-2"
                  )}
                  title={sidebarCollapsed ? item.name : undefined}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-brand-green rounded-r"
                    />
                  )}
                  {Icon && <Icon className="h-5 w-5 flex-shrink-0" />}
                  {!sidebarCollapsed && <span>{item.name}</span>}
                  {sidebarCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-dark text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                      {item.name}
                    </div>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="border-t border-border p-2">
        <button
          onClick={toggleSidebar}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-mid hover:bg-gray-100 rounded-md transition-colors"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <>
              <ChevronLeft className="h-5 w-5" />
              <span>Collapse</span>
            </>
          )}
        </button>
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-error hover:bg-error-light rounded-md transition-colors"
        >
          <LogOut className="h-5 w-5" />
          {!sidebarCollapsed && <span>Log Out</span>}
        </button>
      </div>
    </motion.aside>
  )
}
