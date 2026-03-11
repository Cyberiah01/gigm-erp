import { PERMISSIONS, ROLE_PERMISSIONS, ROUTES } from "@/constants"
import type { User, UserRole } from "@/types"

export interface MockAuthUser extends User {
  password: string
  defaultRoute: string
}

export const MOCK_AUTH_USERS: MockAuthUser[] = [
  {
    id: "1",
    email: "admin@gigm.com",
    password: "password",
    name: "Admin User",
    role: "admin",
    terminalScope: ["lagos-jibowu", "benin", "abuja"],
    status: "active",
    twoFactorEnabled: true,
    defaultRoute: ROUTES.DASHBOARD,
  },
  {
    id: "2",
    email: "sarah.adebayo@gigm.com",
    password: "terminal123",
    name: "Sarah Adebayo",
    role: "terminal_manager",
    terminalScope: ["lagos-jibowu"],
    status: "active",
    twoFactorEnabled: true,
    defaultRoute: ROUTES.OPERATIONS.TERMINALS,
  },
  {
    id: "3",
    email: "james.okonkwo@gigm.com",
    password: "ticket123",
    name: "James Okonkwo",
    role: "ticketing_agent",
    terminalScope: ["lagos-jibowu"],
    status: "active",
    twoFactorEnabled: false,
    defaultRoute: ROUTES.OPERATIONS.BOOKINGS,
  },
  {
    id: "4",
    email: "amina.sani@gigm.com",
    password: "finance123",
    name: "Amina Sani",
    role: "finance_manager",
    terminalScope: ["abuja", "lagos-jibowu"],
    status: "active",
    twoFactorEnabled: true,
    defaultRoute: ROUTES.FINANCE.TRANSACTIONS,
  },
  {
    id: "5",
    email: "musa.bello@gigm.com",
    password: "logistics123",
    name: "Musa Bello",
    role: "logistics_agent",
    terminalScope: ["lagos-ojuelegba", "port-harcourt"],
    status: "active",
    twoFactorEnabled: false,
    defaultRoute: ROUTES.LOGISTICS.SHIPMENTS,
  },
  {
    id: "6",
    email: "chioma.okafor@gigm.com",
    password: "hr123456",
    name: "Chioma Okafor",
    role: "hr_manager",
    terminalScope: ["abuja"],
    status: "active",
    twoFactorEnabled: true,
    defaultRoute: ROUTES.HR.EMPLOYEES,
  },
]

const PATH_PERMISSION_RULES: Array<{ prefix: string; permission: string }> = [
  { prefix: ROUTES.SETTINGS.USERS, permission: PERMISSIONS.USERS_VIEW },
  { prefix: ROUTES.SETTINGS.CONFIG, permission: PERMISSIONS.SETTINGS_VIEW },
  { prefix: ROUTES.SETTINGS.AUDIT_LOGS, permission: PERMISSIONS.SETTINGS_VIEW },
  { prefix: ROUTES.FINANCE.TRANSACTIONS, permission: PERMISSIONS.FINANCE_VIEW },
  { prefix: ROUTES.FINANCE.CASH_REPORTS, permission: PERMISSIONS.FINANCE_VIEW },
  { prefix: ROUTES.FINANCE.INVOICES, permission: PERMISSIONS.FINANCE_VIEW },
  { prefix: ROUTES.FINANCE.PAYROLL, permission: PERMISSIONS.FINANCE_VIEW },
  { prefix: ROUTES.FINANCE.REPORTS, permission: PERMISSIONS.FINANCE_VIEW },
  { prefix: ROUTES.HR.EMPLOYEES, permission: PERMISSIONS.HR_VIEW },
  { prefix: ROUTES.HR.RECRUITMENT, permission: PERMISSIONS.HR_VIEW },
  { prefix: ROUTES.HR.LEAVE, permission: PERMISSIONS.HR_VIEW },
  { prefix: ROUTES.HR.PERFORMANCE, permission: PERMISSIONS.HR_VIEW },
  { prefix: ROUTES.LOGISTICS.SHIPMENTS, permission: PERMISSIONS.LOGISTICS_VIEW },
  { prefix: ROUTES.LOGISTICS.COURIERS, permission: PERMISSIONS.LOGISTICS_VIEW },
  { prefix: ROUTES.LOGISTICS.WAREHOUSE, permission: PERMISSIONS.LOGISTICS_VIEW },
  { prefix: ROUTES.LOGISTICS.CORPORATE, permission: PERMISSIONS.LOGISTICS_VIEW },
  { prefix: ROUTES.CUSTOMERS.PROFILES, permission: PERMISSIONS.CUSTOMERS_VIEW },
  { prefix: ROUTES.CUSTOMERS.SUPPORT, permission: PERMISSIONS.CUSTOMERS_VIEW },
  { prefix: ROUTES.CUSTOMERS.LOYALTY, permission: PERMISSIONS.CUSTOMERS_VIEW },
  { prefix: ROUTES.FLEET.VEHICLES, permission: PERMISSIONS.FLEET_VIEW },
  { prefix: ROUTES.FLEET.DRIVERS, permission: PERMISSIONS.DRIVERS_VIEW },
  { prefix: ROUTES.FLEET.MAINTENANCE, permission: PERMISSIONS.FLEET_VIEW },
  { prefix: ROUTES.FLEET.FUEL, permission: PERMISSIONS.FLEET_VIEW },
  { prefix: ROUTES.OPERATIONS.BOOKINGS, permission: PERMISSIONS.BOOKINGS_VIEW },
  { prefix: ROUTES.OPERATIONS.TRIPS, permission: PERMISSIONS.TRIPS_VIEW },
  { prefix: ROUTES.OPERATIONS.MANIFESTS, permission: PERMISSIONS.TRIPS_VIEW },
  { prefix: ROUTES.OPERATIONS.TERMINALS, permission: PERMISSIONS.TERMINALS_VIEW },
  { prefix: ROUTES.PORTAL.PAGES, permission: PERMISSIONS.PORTAL_VIEW },
  { prefix: ROUTES.PORTAL.PROMOTIONS, permission: PERMISSIONS.PORTAL_VIEW },
  { prefix: ROUTES.PORTAL.CAREERS, permission: PERMISSIONS.PORTAL_VIEW },
  { prefix: ROUTES.PORTAL.ANALYTICS, permission: PERMISSIONS.PORTAL_VIEW },
]

export function formatRole(role: UserRole) {
  return role
    .split("_")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export function getRolePermissions(role: UserRole) {
  return ROLE_PERMISSIONS[role] ?? []
}

export function getDefaultRouteForRole(role: UserRole) {
  return MOCK_AUTH_USERS.find(user => user.role === role)?.defaultRoute ?? ROUTES.DASHBOARD
}

export function sanitizeMockUser(user: MockAuthUser): User {
  const { password, defaultRoute, ...safeUser } = user
  return safeUser
}

export function authenticateMockUser(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase()
  const matchedUser = MOCK_AUTH_USERS.find(
    user => user.email.toLowerCase() === normalizedEmail && user.password === password
  )

  return matchedUser ? sanitizeMockUser(matchedUser) : null
}

export function canAccessPath(user: User | null, pathname: string) {
  if (!user) {
    return false
  }

  if (pathname === "/" || pathname === ROUTES.DASHBOARD) {
    return true
  }

  const matchedRule = PATH_PERMISSION_RULES.find(rule => pathname.startsWith(rule.prefix))

  if (!matchedRule) {
    return true
  }

  return getRolePermissions(user.role).includes(matchedRule.permission)
}