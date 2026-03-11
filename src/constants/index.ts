export const ROUTES = {
  AUTH: {
    LOGIN: '/login',
    FORGOT_PASSWORD: '/forgot-password',
  },
  DASHBOARD: '/dashboard',
  OPERATIONS: {
    BOOKINGS: '/bookings',
    TRIPS: '/trips',
    MANIFESTS: '/manifests',
    TERMINALS: '/terminals',
  },
  FLEET: {
    VEHICLES: '/fleet/vehicles',
    DRIVERS: '/fleet/drivers',
    MAINTENANCE: '/fleet/maintenance',
    FUEL: '/fleet/fuel',
  },
  LOGISTICS: {
    SHIPMENTS: '/logistics/shipments',
    COURIERS: '/logistics/couriers',
    WAREHOUSE: '/logistics/warehouse',
    CORPORATE: '/logistics/corporate',
  },
  CUSTOMERS: {
    PROFILES: '/customers/profiles',
    SUPPORT: '/customers/support',
    LOYALTY: '/customers/loyalty',
  },
  FINANCE: {
    TRANSACTIONS: '/finance/transactions',
    CASH_REPORTS: '/finance/cash-reports',
    INVOICES: '/finance/invoices',
    PAYROLL: '/finance/payroll',
    REPORTS: '/finance/reports',
  },
  HR: {
    EMPLOYEES: '/hr/employees',
    RECRUITMENT: '/hr/recruitment',
    LEAVE: '/hr/leave',
    PERFORMANCE: '/hr/performance',
  },
  PORTAL: {
    PAGES: '/portal/pages',
    PROMOTIONS: '/portal/promotions',
    CAREERS: '/portal/careers',
    ANALYTICS: '/portal/analytics',
  },
  SETTINGS: {
    USERS: '/settings/users',
    ROLES: '/settings/roles',
    AUDIT_LOGS: '/settings/audit-logs',
    CONFIG: '/settings/config',
  },
} as const

export const PERMISSIONS = {
  DASHBOARD_VIEW: 'dashboard:view',

  // Bookings
  BOOKINGS_VIEW: 'bookings:view',
  BOOKINGS_CREATE: 'bookings:create',
  BOOKINGS_EDIT: 'bookings:edit',
  BOOKINGS_CANCEL: 'bookings:cancel',
  BOOKINGS_REFUND: 'bookings:refund',
  
  // Trips
  TRIPS_VIEW: 'trips:view',
  TRIPS_CREATE: 'trips:create',
  TRIPS_EDIT: 'trips:edit',
  TRIPS_DELETE: 'trips:delete',

  // Terminals
  TERMINALS_VIEW: 'terminals:view',
  TERMINALS_EDIT: 'terminals:edit',
  
  // Fleet
  FLEET_VIEW: 'fleet:view',
  FLEET_CREATE: 'fleet:create',
  FLEET_EDIT: 'fleet:edit',
  FLEET_DELETE: 'fleet:delete',
  
  // Drivers
  DRIVERS_VIEW: 'drivers:view',
  DRIVERS_CREATE: 'drivers:create',
  DRIVERS_EDIT: 'drivers:edit',
  
  // Finance
  FINANCE_VIEW: 'finance:view',
  FINANCE_APPROVE: 'finance:approve',
  FINANCE_REFUND: 'finance:refund',

  // Logistics
  LOGISTICS_VIEW: 'logistics:view',
  LOGISTICS_EDIT: 'logistics:edit',

  // Customers
  CUSTOMERS_VIEW: 'customers:view',
  CUSTOMERS_EDIT: 'customers:edit',
  
  // HR
  HR_VIEW: 'hr:view',
  HR_EDIT: 'hr:edit',

  // Portal
  PORTAL_VIEW: 'portal:view',
  PORTAL_EDIT: 'portal:edit',
  
  // Users
  USERS_VIEW: 'users:view',
  USERS_CREATE: 'users:create',
  USERS_EDIT: 'users:edit',
  USERS_DELETE: 'users:delete',
  
  // Settings
  SETTINGS_VIEW: 'settings:view',
  SETTINGS_EDIT: 'settings:edit',
} as const

export const ROLE_PERMISSIONS: Record<string, string[]> = {
  ceo: Object.values(PERMISSIONS),
  terminal_manager: [
    PERMISSIONS.DASHBOARD_VIEW,
    PERMISSIONS.BOOKINGS_VIEW,
    PERMISSIONS.BOOKINGS_CREATE,
    PERMISSIONS.BOOKINGS_EDIT,
    PERMISSIONS.TRIPS_VIEW,
    PERMISSIONS.TRIPS_CREATE,
    PERMISSIONS.TRIPS_EDIT,
    PERMISSIONS.TERMINALS_VIEW,
    PERMISSIONS.TERMINALS_EDIT,
    PERMISSIONS.FLEET_VIEW,
    PERMISSIONS.DRIVERS_VIEW,
    PERMISSIONS.FINANCE_VIEW,
    PERMISSIONS.HR_VIEW,
    PERMISSIONS.CUSTOMERS_VIEW,
  ],
  ticketing_agent: [
    PERMISSIONS.DASHBOARD_VIEW,
    PERMISSIONS.BOOKINGS_VIEW,
    PERMISSIONS.BOOKINGS_CREATE,
    PERMISSIONS.CUSTOMERS_VIEW,
    PERMISSIONS.TERMINALS_VIEW,
  ],
  driver: [
    PERMISSIONS.DASHBOARD_VIEW,
    PERMISSIONS.DRIVERS_VIEW,
  ],
  finance_manager: [
    PERMISSIONS.DASHBOARD_VIEW,
    PERMISSIONS.FINANCE_VIEW,
    PERMISSIONS.FINANCE_APPROVE,
    PERMISSIONS.FINANCE_REFUND,
    PERMISSIONS.BOOKINGS_VIEW,
  ],
  logistics_agent: [
    PERMISSIONS.DASHBOARD_VIEW,
    PERMISSIONS.LOGISTICS_VIEW,
    PERMISSIONS.LOGISTICS_EDIT,
    PERMISSIONS.TERMINALS_VIEW,
  ],
  content_editor: [
    PERMISSIONS.DASHBOARD_VIEW,
    PERMISSIONS.PORTAL_VIEW,
    PERMISSIONS.PORTAL_EDIT,
  ],
  hr_manager: [
    PERMISSIONS.DASHBOARD_VIEW,
    PERMISSIONS.HR_VIEW,
    PERMISSIONS.HR_EDIT,
    PERMISSIONS.USERS_VIEW,
  ],
  admin: Object.values(PERMISSIONS),
}

export const BOOKING_STATUSES = [
  { value: 'confirmed', label: 'Confirmed', color: 'green' },
  { value: 'boarded', label: 'Boarded', color: 'blue' },
  { value: 'cancelled', label: 'Cancelled', color: 'red' },
  { value: 'no_show', label: 'No-show', color: 'gray' },
  { value: 'pending', label: 'Pending', color: 'yellow' },
  { value: 'refunded', label: 'Refunded', color: 'purple' },
] as const

export const TRIP_STATUSES = [
  { value: 'scheduled', label: 'Scheduled', color: 'blue' },
  { value: 'boarding', label: 'Boarding', color: 'yellow' },
  { value: 'departed', label: 'Departed', color: 'green' },
  { value: 'arrived', label: 'Arrived', color: 'green' },
  { value: 'cancelled', label: 'Cancelled', color: 'red' },
] as const

export const VEHICLE_STATUSES = [
  { value: 'active', label: 'Active', color: 'green' },
  { value: 'maintenance', label: 'In Maintenance', color: 'yellow' },
  { value: 'retired', label: 'Retired', color: 'gray' },
] as const

export const DRIVER_STATUSES = [
  { value: 'active', label: 'Active', color: 'green' },
  { value: 'suspended', label: 'Suspended', color: 'red' },
  { value: 'on_leave', label: 'On Leave', color: 'yellow' },
  { value: 'retired', label: 'Retired', color: 'gray' },
] as const

export const SHIPMENT_STATUSES = [
  { value: 'awaiting_pickup', label: 'Awaiting Pickup', color: 'yellow' },
  { value: 'picked_up', label: 'Picked Up', color: 'blue' },
  { value: 'in_transit', label: 'In Transit', color: 'blue' },
  { value: 'at_hub', label: 'At Hub', color: 'blue' },
  { value: 'out_for_delivery', label: 'Out for Delivery', color: 'yellow' },
  { value: 'delivered', label: 'Delivered', color: 'green' },
  { value: 'failed', label: 'Failed', color: 'red' },
  { value: 'returned', label: 'Returned', color: 'gray' },
] as const

export const TERMINALS = [
  { id: 'lagos-jibowu', name: 'Lagos Jibowu', city: 'Lagos', state: 'Lagos' },
  { id: 'lagos-ojuelegba', name: 'Lagos Ojuelegba', city: 'Lagos', state: 'Lagos' },
  { id: 'aba', name: 'Aba', city: 'Aba', state: 'Abia' },
  { id: 'owerri', name: 'Owerri', city: 'Owerri', state: 'Imo' },
  { id: 'port-harcourt', name: 'Port Harcourt', city: 'Port Harcourt', state: 'Rivers' },
  { id: 'benin', name: 'Benin City', city: 'Benin', state: 'Edo' },
  { id: 'abuja', name: 'Abuja', city: 'Abuja', state: 'FCT' },
  { id: 'ibadan', name: 'Ibadan', city: 'Ibadan', state: 'Oyo' },
  { id: 'kano', name: 'Kano', city: 'Kano', state: 'Kano' },
  { id: 'enugu', name: 'Enugu', city: 'Enugu', state: 'Enugu' },
] as const

export const SEAT_CLASSES = [
  { value: 'economy', label: 'Economy', priceMultiplier: 1 },
  { value: 'first_class', label: 'First Class', priceMultiplier: 1.5 },
  { value: 'prime', label: 'Prime', priceMultiplier: 2 },
] as const
