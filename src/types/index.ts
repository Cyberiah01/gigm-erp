export type UserRole = 
  | 'ceo'
  | 'terminal_manager'
  | 'ticketing_agent'
  | 'driver'
  | 'finance_manager'
  | 'logistics_agent'
  | 'content_editor'
  | 'hr_manager'
  | 'admin'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  terminalScope?: string[]
  avatar?: string
  lastLogin?: Date
  status: 'active' | 'inactive'
  twoFactorEnabled: boolean
}

export interface Terminal {
  id: string
  name: string
  city: string
  state: string
  address: string
  phone: string
  managerId?: string
  status: 'active' | 'inactive'
}

export interface Route {
  id: string
  name: string
  origin: Terminal
  destination: Terminal
  stops: Terminal[]
  distance: number
  estimatedDuration: number
  notes?: string
}

export interface Vehicle {
  id: string
  plateNumber: string
  make: string
  model: string
  year: number
  class: 'economy' | 'first_class' | 'prime'
  capacity: number
  status: 'active' | 'maintenance' | 'retired'
  terminalId: string
  insuranceExpiry: Date
  roadworthinessExpiry: Date
  currentTripId?: string
  nextServiceDue?: Date
}

export interface Driver {
  id: string
  name: string
  employeeId: string
  licenceNumber: string
  licenceExpiry: Date
  licenceClass: string
  terminalId: string
  status: 'active' | 'suspended' | 'on_leave' | 'retired'
  phone: string
  email?: string
  photo?: string
  rating: number
  totalTrips: number
  onTimeRate: number
  lastTrip?: Date
}

export interface Trip {
  id: string
  routeId: string
  route: Route
  departureTime: Date
  arrivalTime: Date
  vehicleId: string
  vehicle: Vehicle
  driverId: string
  driver: Driver
  class: 'economy' | 'first_class' | 'prime'
  price: number
  status: 'scheduled' | 'boarding' | 'departed' | 'arrived' | 'cancelled'
  seatsSold: number
  seatsTotal: number
  terminalId: string
}

export interface Booking {
  id: string
  referenceNumber: string
  tripId: string
  trip: Trip
  passengerName: string
  passengerPhone: string
  passengerEmail?: string
  seatNumber: number
  class: 'economy' | 'first_class' | 'prime'
  amount: number
  paymentMethod: 'card' | 'pos' | 'cash' | 'wallet' | 'bank_transfer' | 'corporate'
  status: 'confirmed' | 'boarded' | 'cancelled' | 'no_show' | 'pending' | 'refunded'
  bookedAt: Date
  agentId: string
  agent?: User
  luggage?: {
    type: 'none' | 'standard' | 'oversized'
    weight?: number
    surcharge?: number
  }
  nextOfKin?: {
    name: string
    phone: string
    relationship: string
  }
}

export interface Manifest {
  id: string
  tripId: string
  trip: Trip
  passengers: ManifestPassenger[]
  luggageSummary: {
    count: number
    totalWeight: number
    specialItems: number
  }
  status: 'open' | 'locked'
  createdAt: Date
}

export interface ManifestPassenger {
  seatNumber: number
  name: string
  phone: string
  nextOfKinContact?: string
  luggage: string
  status: 'boarded' | 'not_yet' | 'no_show'
}

export interface Shipment {
  id: string
  trackingNumber: string
  sender: {
    name: string
    phone: string
    terminalId: string
    address?: string
  }
  recipient: {
    name: string
    phone: string
    city: string
    address: string
  }
  item: {
    description: string
    weight: number
    dimensions?: { length: number; width: number; height: number }
    declaredValue: number
    fragile: boolean
    insurance: boolean
  }
  serviceType: 'express' | 'standard' | 'economy' | 'international'
  status: 'awaiting_pickup' | 'picked_up' | 'in_transit' | 'at_hub' | 'out_for_delivery' | 'delivered' | 'failed' | 'returned'
  courierId?: string
  cost: number
  createdAt: Date
  deliveredAt?: Date
}

export interface Customer {
  id: string
  name: string
  phone: string
  email?: string
  tier: 'regular' | 'silver' | 'gold' | 'platinum'
  totalBookings: number
  totalSpend: number
  gigmPoints: number
  lastTripDate?: Date
  registeredAt: Date
  status: 'active' | 'blacklisted'
}

export interface SupportTicket {
  id: string
  ticketNumber: string
  customerId: string
  customer?: Customer
  category: 'booking' | 'payment' | 'luggage' | 'service' | 'complaint' | 'other'
  subject: string
  description: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  assignedTo?: string
  slaDeadline?: Date
  createdAt: Date
  messages: TicketMessage[]
}

export interface TicketMessage {
  id: string
  ticketId: string
  senderId: string
  senderType: 'customer' | 'agent'
  message: string
  isInternal: boolean
  createdAt: Date
}

export interface Employee {
  id: string
  employeeId: string
  name: string
  email: string
  phone: string
  department: string
  role: string
  terminalId?: string
  status: 'active' | 'inactive' | 'on_leave'
  contractType: 'full_time' | 'contract' | 'part_time'
  startDate: Date
  photo?: string
}

export interface CashReport {
  id: string
  terminalId: string
  terminal?: Terminal
  date: Date
  openingFloat: number
  agentCollections: number
  totalCash: number
  paymentBreakdown: {
    cash: number
    pos: number
    transfer: number
  }
  verifiedAmount?: number
  variance?: number
  status: 'draft' | 'submitted' | 'verified' | 'approved'
  submittedBy?: string
  verifiedBy?: string
  approvedBy?: string
}

export interface Notification {
  id: string
  userId: string
  type: 'info' | 'warning' | 'error' | 'success'
  title: string
  message: string
  read: boolean
  createdAt: Date
  link?: string
}

export interface AuditLog {
  id: string
  userId: string
  user?: User
  role: string
  ipAddress: string
  action: 'create' | 'update' | 'delete' | 'login' | 'approve'
  resource: string
  recordId: string
  before?: Record<string, any>
  after?: Record<string, any>
  timestamp: Date
}

export interface KPIData {
  label: string
  value: number
  previousValue?: number
  change?: number
  changeType?: 'increase' | 'decrease'
  format?: 'currency' | 'percentage' | 'number'
}

export interface ActivityEvent {
  id: string
  type: 'trip_departure' | 'new_booking' | 'cash_report' | 'maintenance_alert'
  message: string
  timestamp: Date
  terminalId?: string
}
