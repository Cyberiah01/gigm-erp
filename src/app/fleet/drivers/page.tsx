"use client"

import * as React from "react"
import { ERPLayout } from "@/components/layouts"
import { Card, CardContent, Badge, Select, Button, Input, Table, Pagination, Avatar } from "@/components/ui"
import { cn, formatDate } from "@/lib/utils"
import { DRIVER_STATUSES } from "@/constants"
import {
  Search,
  Plus,
  UserCheck,
  Star,
  AlertTriangle,
  MoreHorizontal,
} from "lucide-react"

const mockDrivers = [
  {
    id: "1",
    name: "Chidi Okonkwo",
    employeeId: "DRV-001",
    licenceNumber: "NG-LIC-123456",
    licenceExpiry: "2026-12-15",
    licenceClass: "CD",
    terminal: "Lagos Jibowu",
    status: "active",
    phone: "+234-803-111-1111",
    rating: 4.8,
    totalTrips: 1245,
    onTimeRate: 96,
    lastTrip: "2026-03-11",
  },
  {
    id: "2",
    name: "Samuel Adeyemi",
    employeeId: "DRV-002",
    licenceNumber: "NG-LIC-234567",
    licenceExpiry: "2026-08-20",
    licenceClass: "CD",
    terminal: "Abuja",
    status: "active",
    phone: "+234-803-222-2222",
    rating: 4.5,
    totalTrips: 892,
    onTimeRate: 92,
    lastTrip: "2026-03-11",
  },
  {
    id: "3",
    name: "Emmanuel Ighalo",
    employeeId: "DRV-003",
    licenceNumber: "NG-LIC-345678",
    licenceExpiry: "2026-02-28",
    licenceClass: "CD",
    terminal: "Benin",
    status: "suspended",
    phone: "+234-803-333-3333",
    rating: 3.9,
    totalTrips: 567,
    onTimeRate: 78,
    lastTrip: "2026-02-20",
  },
  {
    id: "4",
    name: "Friday Joseph",
    employeeId: "DRV-004",
    licenceNumber: "NG-LIC-456789",
    licenceExpiry: "2027-01-10",
    licenceClass: "CD",
    terminal: "Port Harcourt",
    status: "on_leave",
    phone: "+234-803-444-4444",
    rating: 4.6,
    totalTrips: 1103,
    onTimeRate: 94,
    lastTrip: "2026-03-05",
  },
  {
    id: "5",
    name: "Paulinus Mbah",
    employeeId: "DRV-005",
    licenceNumber: "NG-LIC-567890",
    licenceExpiry: "2026-11-30",
    licenceClass: "CD",
    terminal: "Enugu",
    status: "active",
    phone: "+234-803-555-5555",
    rating: 4.9,
    totalTrips: 1567,
    onTimeRate: 98,
    lastTrip: "2026-03-11",
  },
]

export default function DriversPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [page, setPage] = React.useState(1)
  const [limit, setLimit] = React.useState(10)

  const filteredDrivers = mockDrivers.filter(driver => {
    const matchesSearch = !searchQuery || 
      driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.employeeId.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || driver.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const columns = [
    {
      key: "name",
      header: "Driver",
      render: (driver: typeof mockDrivers[0]) => (
        <div className="flex items-center gap-3">
          <Avatar name={driver.name} size="sm" />
          <div>
            <p className="font-medium text-dark">{driver.name}</p>
            <p className="text-xs text-subtle">{driver.employeeId}</p>
          </div>
        </div>
      ),
    },
    {
      key: "licenceNumber",
      header: "Licence No",
      render: (driver: typeof mockDrivers[0]) => (
        <span className="font-mono text-sm">{driver.licenceNumber}</span>
      ),
    },
    {
      key: "licenceExpiry",
      header: "Licence Expiry",
      render: (driver: typeof mockDrivers[0]) => {
        const isExpiringSoon = new Date(driver.licenceExpiry) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        const isExpired = new Date(driver.licenceExpiry) < new Date()
        return (
          <span className={cn(
            isExpired && "text-error font-medium",
            isExpiringSoon && !isExpired && "text-brand-yellow-dark font-medium"
          )}>
            {formatDate(driver.licenceExpiry)}
          </span>
        )
      },
    },
    {
      key: "terminal",
      header: "Terminal",
    },
    {
      key: "status",
      header: "Status",
      render: (driver: typeof mockDrivers[0]) => {
        const status = DRIVER_STATUSES.find(s => s.value === driver.status)
        const variantMap: Record<string, "success" | "warning" | "error" | "gray"> = {
          active: "success",
          suspended: "error",
          on_leave: "warning",
          retired: "gray",
        }
        return (
          <Badge variant={variantMap[driver.status] || "default"}>
            {status?.label || driver.status}
          </Badge>
        )
      },
    },
    {
      key: "rating",
      header: "Rating",
      render: (driver: typeof mockDrivers[0]) => (
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 text-brand-yellow fill-brand-yellow" />
          <span>{driver.rating.toFixed(1)}</span>
        </div>
      ),
    },
    {
      key: "onTimeRate",
      header: "On-Time %",
      render: (driver: typeof mockDrivers[0]) => (
        <span className={cn(
          driver.onTimeRate >= 90 && "text-brand-green font-medium",
          driver.onTimeRate >= 80 && driver.onTimeRate < 90 && "text-brand-yellow-dark",
          driver.onTimeRate < 80 && "text-error"
        )}>
          {driver.onTimeRate}%
        </span>
      ),
    },
    {
      key: "totalTrips",
      header: "Total Trips",
    },
    {
      key: "actions",
      header: "Actions",
      className: "w-16",
      render: () => (
        <button className="p-1.5 hover:bg-gray-100 rounded">
          <MoreHorizontal className="h-4 w-4 text-mid" />
        </button>
      ),
    },
  ]

  return (
    <ERPLayout title="Drivers">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-subtle" />
              <input
                type="text"
                placeholder="Search drivers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 w-64 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
              />
            </div>
            <Select
              options={[
                { value: "all", label: "All Statuses" },
                ...DRIVER_STATUSES.map(s => ({ value: s.value, label: s.label }))
              ]}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-40"
            />
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Driver
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Card className="bg-brand-green-light">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand-green rounded-lg">
                  <UserCheck className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-brand-green">{mockDrivers.filter(d => d.status === 'active').length}</p>
                  <p className="text-sm text-brand-green">Active Drivers</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-brand-yellow-light">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand-yellow rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-brand-yellow-dark">1</p>
                  <p className="text-sm text-brand-yellow-dark">Licence Expiring</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-blue-100">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-info rounded-lg">
                  <Star className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-info">4.7</p>
                  <p className="text-sm text-info">Avg Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-100">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-400 rounded-lg">
                  <UserCheck className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-mid">{mockDrivers.filter(d => d.status === 'on_leave').length}</p>
                  <p className="text-sm text-subtle">On Leave</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <Table
            data={filteredDrivers}
            columns={columns}
            keyField="id"
          />
          <Pagination
            page={page}
            totalPages={1}
            total={filteredDrivers.length}
            limit={limit}
            onPageChange={setPage}
            onLimitChange={setLimit}
          />
        </Card>
      </div>
    </ERPLayout>
  )
}
