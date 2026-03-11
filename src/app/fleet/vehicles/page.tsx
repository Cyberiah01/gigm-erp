"use client"

import * as React from "react"
import { ERPLayout } from "@/components/layouts"
import { Card, CardContent, Badge, Select, Button, Input, Table, Pagination } from "@/components/ui"
import { cn, formatDate } from "@/lib/utils"
import { VEHICLE_STATUSES } from "@/constants"
import {
  Search,
  Plus,
  Bus,
  AlertTriangle,
  Wrench,
  MoreHorizontal,
} from "lucide-react"

const mockVehicles = [
  {
    id: "1",
    plateNumber: "GIGM-001",
    make: "Toyota",
    model: "Coaster",
    year: 2022,
    class: "Economy",
    capacity: 56,
    status: "active",
    currentTrip: "LOS-BEN-0042",
    nextServiceDue: "2026-03-20",
  },
  {
    id: "2",
    plateNumber: "GIGM-002",
    make: "Hino",
    model: "Genesis",
    year: 2021,
    class: "First Class",
    capacity: 48,
    status: "active",
    currentTrip: "ABJ-LGS-0098",
    nextServiceDue: "2026-03-15",
  },
  {
    id: "3",
    plateNumber: "GIGM-003",
    make: "Yutong",
    model: "ZK6129",
    year: 2023,
    class: "Prime",
    capacity: 52,
    status: "maintenance",
    currentTrip: null,
    nextServiceDue: "2026-03-10",
  },
  {
    id: "4",
    plateNumber: "GIGM-004",
    make: "Toyota",
    model: "Hiace",
    year: 2020,
    class: "Economy",
    capacity: 18,
    status: "active",
    currentTrip: "PH-OWR-0156",
    nextServiceDue: "2026-03-25",
  },
  {
    id: "5",
    plateNumber: "GIGM-005",
    make: "Mercedes",
    model: "Sprinter",
    year: 2022,
    class: "First Class",
    capacity: 24,
    status: "retired",
    currentTrip: null,
    nextServiceDue: null,
  },
]

export default function VehiclesPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [page, setPage] = React.useState(1)
  const [limit, setLimit] = React.useState(10)

  const filteredVehicles = mockVehicles.filter(vehicle => {
    const matchesSearch = !searchQuery || 
      vehicle.plateNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.make.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || vehicle.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const columns = [
    {
      key: "plateNumber",
      header: "Plate No",
      render: (vehicle: typeof mockVehicles[0]) => (
        <span className="font-mono font-medium text-dark">{vehicle.plateNumber}</span>
      ),
    },
    {
      key: "makeModel",
      header: "Make/Model",
      render: (vehicle: typeof mockVehicles[0]) => (
        <div>
          <p className="font-medium text-dark">{vehicle.make} {vehicle.model}</p>
          <p className="text-xs text-subtle">{vehicle.year}</p>
        </div>
      ),
    },
    {
      key: "class",
      header: "Class",
      render: (vehicle: typeof mockVehicles[0]) => (
        <Badge variant="outline">{vehicle.class}</Badge>
      ),
    },
    {
      key: "capacity",
      header: "Capacity",
      render: (vehicle: typeof mockVehicles[0]) => (
        <span>{vehicle.capacity} seats</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (vehicle: typeof mockVehicles[0]) => {
        const status = VEHICLE_STATUSES.find(s => s.value === vehicle.status)
        const variantMap: Record<string, "success" | "warning" | "gray"> = {
          active: "success",
          maintenance: "warning",
          retired: "gray",
        }
        return (
          <Badge variant={variantMap[vehicle.status] || "default"}>
            {status?.label || vehicle.status}
          </Badge>
        )
      },
    },
    {
      key: "currentTrip",
      header: "Current Trip",
      render: (vehicle: typeof mockVehicles[0]) => (
        vehicle.currentTrip ? (
          <span className="font-mono text-brand-green">{vehicle.currentTrip}</span>
        ) : (
          <span className="text-subtle">—</span>
        )
      ),
    },
    {
      key: "nextServiceDue",
      header: "Next Service",
      render: (vehicle: typeof mockVehicles[0]) => {
        if (!vehicle.nextServiceDue) return <span className="text-subtle">—</span>
        const isOverdue = new Date(vehicle.nextServiceDue) < new Date()
        return (
          <span className={cn(isOverdue && "text-error font-medium")}>
            {formatDate(vehicle.nextServiceDue)}
          </span>
        )
      },
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
    <ERPLayout title="Vehicles">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-subtle" />
              <input
                type="text"
                placeholder="Search vehicles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 w-64 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
              />
            </div>
            <Select
              options={[
                { value: "all", label: "All Statuses" },
                ...VEHICLE_STATUSES.map(s => ({ value: s.value, label: s.label }))
              ]}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-40"
            />
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Vehicle
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Card className="bg-brand-green-light">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand-green rounded-lg">
                  <Bus className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-brand-green">{mockVehicles.filter(v => v.status === 'active').length}</p>
                  <p className="text-sm text-brand-green">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-brand-yellow-light">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand-yellow rounded-lg">
                  <Wrench className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-brand-yellow-dark">{mockVehicles.filter(v => v.status === 'maintenance').length}</p>
                  <p className="text-sm text-brand-yellow-dark">Maintenance</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-100">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-400 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-mid">2</p>
                  <p className="text-sm text-subtle">Service Due</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-100">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-400 rounded-lg">
                  <Bus className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-mid">{mockVehicles.filter(v => v.status === 'retired').length}</p>
                  <p className="text-sm text-subtle">Retired</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <Table
            data={filteredVehicles}
            columns={columns}
            keyField="id"
          />
          <Pagination
            page={page}
            totalPages={1}
            total={filteredVehicles.length}
            limit={limit}
            onPageChange={setPage}
            onLimitChange={setLimit}
          />
        </Card>
      </div>
    </ERPLayout>
  )
}
