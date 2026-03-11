"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ERPLayout } from "@/components/layouts"
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Select, Badge, Table, Pagination } from "@/components/ui"
import { cn, formatCurrency, formatDate } from "@/lib/utils"
import { BOOKING_STATUSES } from "@/constants"
import {
  Search,
  Plus,
  Filter,
  Download,
  Eye,
  Pencil,
  XCircle,
  RefreshCcw,
  Printer,
  MoreHorizontal,
} from "lucide-react"

const mockBookings = [
  {
    id: "1",
    referenceNumber: "BK-29841",
    passengerName: "John Adebayo",
    passengerPhone: "+234-803-123-4567",
    route: "Lagos Jibowu → Benin City",
    date: "2026-03-12",
    departureTime: "08:00 AM",
    class: "Economy",
    seatNumber: "12A",
    amount: 8500,
    paymentMethod: "Card",
    status: "confirmed",
    agent: "Sarah M.",
  },
  {
    id: "2",
    referenceNumber: "BK-29840",
    passengerName: "Mary Okonkwo",
    passengerPhone: "+234-806-234-5678",
    route: "Port Harcourt → Owerri",
    date: "2026-03-12",
    departureTime: "09:30 AM",
    class: "First Class",
    seatNumber: "3B",
    amount: 12000,
    paymentMethod: "POS",
    status: "boarded",
    agent: "James K.",
  },
  {
    id: "3",
    referenceNumber: "BK-29839",
    passengerName: "David Ibrahim",
    passengerPhone: "+234-805-345-6789",
    route: "Abuja → Lagos",
    date: "2026-03-12",
    departureTime: "07:00 AM",
    class: "Prime",
    seatNumber: "1A",
    amount: 15000,
    paymentMethod: "Cash",
    status: "cancelled",
    agent: "Sarah M.",
  },
  {
    id: "4",
    referenceNumber: "BK-29838",
    passengerName: "Grace Eze",
    passengerPhone: "+234-807-456-7890",
    route: "Ibadan → Lagos",
    date: "2026-03-11",
    departureTime: "02:00 PM",
    class: "Economy",
    seatNumber: "8C",
    amount: 5500,
    paymentMethod: "Wallet",
    status: "confirmed",
    agent: "James K.",
  },
  {
    id: "5",
    referenceNumber: "BK-29837",
    passengerName: "Peter Ojo",
    passengerPhone: "+234-809-567-8901",
    route: "Enugu → Aba",
    date: "2026-03-11",
    departureTime: "10:00 AM",
    class: "Economy",
    seatNumber: "15D",
    amount: 4500,
    paymentMethod: "Bank Transfer",
    status: "pending",
    agent: "Sarah M.",
  },
]

export default function BookingsPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [dateFilter, setDateFilter] = React.useState("")
  const [page, setPage] = React.useState(1)
  const [limit, setLimit] = React.useState(10)
  const [selectedRows, setSelectedRows] = React.useState<string[]>([])

  const filteredBookings = mockBookings.filter(booking => {
    const matchesSearch = !searchQuery || 
      booking.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.passengerName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter
    const matchesDate = !dateFilter || booking.date === dateFilter
    return matchesSearch && matchesStatus && matchesDate
  })

  const columns = [
    {
      key: "referenceNumber",
      header: "Booking Ref",
      render: (booking: typeof mockBookings[0]) => (
        <span className="font-mono text-brand-green">{booking.referenceNumber}</span>
      ),
    },
    {
      key: "passengerName",
      header: "Passenger",
      render: (booking: typeof mockBookings[0]) => (
        <div>
          <p className="font-medium text-dark">{booking.passengerName}</p>
          <p className="text-xs text-subtle">{booking.passengerPhone}</p>
        </div>
      ),
    },
    {
      key: "route",
      header: "Route",
      render: (booking: typeof mockBookings[0]) => (
        <div>
          <p className="text-dark">{booking.route}</p>
          <p className="text-xs text-subtle">{booking.date} • {booking.departureTime}</p>
        </div>
      ),
    },
    {
      key: "class",
      header: "Class",
      render: (booking: typeof mockBookings[0]) => (
        <span className="text-dark">{booking.class}</span>
      ),
    },
    {
      key: "seatNumber",
      header: "Seat",
      render: (booking: typeof mockBookings[0]) => (
        <span className="font-mono">{booking.seatNumber}</span>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      render: (booking: typeof mockBookings[0]) => (
        <span className="font-medium text-dark">{formatCurrency(booking.amount)}</span>
      ),
    },
    {
      key: "paymentMethod",
      header: "Payment",
      render: (booking: typeof mockBookings[0]) => (
        <Badge variant="outline">{booking.paymentMethod}</Badge>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (booking: typeof mockBookings[0]) => {
        const status = BOOKING_STATUSES.find(s => s.value === booking.status)
        const variantMap: Record<string, "success" | "warning" | "error" | "info" | "gray" | "purple" | "default"> = {
          confirmed: "success",
          boarded: "info",
          cancelled: "error",
          no_show: "gray",
          pending: "warning",
          refunded: "purple",
        }
        return (
          <Badge variant={variantMap[booking.status] || "default"}>
            {status?.label || booking.status}
          </Badge>
        )
      },
    },
    {
      key: "agent",
      header: "Agent",
    },
    {
      key: "actions",
      header: "Actions",
      className: "w-20",
      render: (booking: typeof mockBookings[0]) => (
        <div className="flex items-center gap-1">
          <button className="p-1.5 hover:bg-gray-100 rounded" title="View">
            <Eye className="h-4 w-4 text-mid" />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded" title="Edit">
            <Pencil className="h-4 w-4 text-mid" />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded" title="Cancel">
            <XCircle className="h-4 w-4 text-error" />
          </button>
        </div>
      ),
    },
  ]

  return (
    <ERPLayout title="Bookings">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-subtle" />
              <input
                type="text"
                placeholder="Search by ref or passenger..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 w-64 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
              />
            </div>
            <Select
              options={[
                { value: "all", label: "All Statuses" },
                ...BOOKING_STATUSES.map(s => ({ value: s.value, label: s.label }))
              ]}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-40"
            />
            <Input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-40"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Booking
            </Button>
          </div>
        </div>

        {selectedRows.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 p-3 bg-brand-green-light rounded-lg"
          >
            <span className="text-sm text-brand-green font-medium">
              {selectedRows.length} selected
            </span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Printer className="h-4 w-4 mr-1" />
                Print
              </Button>
              <Button size="sm" variant="outline">
                <RefreshCcw className="h-4 w-4 mr-1" />
                Refund
              </Button>
              <Button size="sm" variant="destructive">
                <XCircle className="h-4 w-4 mr-1" />
                Cancel
              </Button>
            </div>
          </motion.div>
        )}

        <Card>
          <Table
            data={filteredBookings}
            columns={columns}
            keyField="id"
            onSelectRow={(id) => {
              setSelectedRows(prev => 
                prev.includes(id) 
                  ? prev.filter(r => r !== id)
                  : [...prev, id]
              )
            }}
            selectedRows={selectedRows}
            onSelectAll={() => {
              setSelectedRows(prev => 
                prev.length === filteredBookings.length 
                  ? [] 
                  : filteredBookings.map(b => b.id)
              )
            }}
          />
          <Pagination
            page={page}
            totalPages={1}
            total={filteredBookings.length}
            limit={limit}
            onPageChange={setPage}
            onLimitChange={setLimit}
          />
        </Card>
      </div>
    </ERPLayout>
  )
}
