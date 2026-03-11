"use client"

import * as React from "react"
import { ERPLayout } from "@/components/layouts"
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Input, Table, Pagination } from "@/components/ui"
import { cn, formatCurrency, formatDate } from "@/lib/utils"
import { SHIPMENT_STATUSES } from "@/constants"
import {
  Search,
  Plus,
  Package,
  MapPin,
  Clock,
  MoreHorizontal,
} from "lucide-react"

const mockShipments = [
  {
    id: "1",
    trackingNumber: "GIGL-2026-0001",
    sender: { name: "John Adebayo", city: "Lagos" },
    recipient: { name: "Mary Okonkwo", city: "Benin" },
    status: "in_transit",
    serviceType: "Express",
    cost: 5500,
    createdAt: "2026-03-11 10:30",
  },
  {
    id: "2",
    trackingNumber: "GIGL-2026-0002",
    sender: { name: "Tech Store Ltd", city: "Abuja" },
    recipient: { name: "David Ibrahim", city: "Port Harcourt" },
    status: "delivered",
    serviceType: "Standard",
    cost: 3500,
    createdAt: "2026-03-10 14:20",
  },
  {
    id: "3",
    trackingNumber: "GIGL-2026-0003",
    sender: { name: "Grace Electronics", city: "Ibadan" },
    recipient: { name: "Emmanuel Eze", city: "Enugu" },
    status: "out_for_delivery",
    serviceType: "Express",
    cost: 4200,
    createdAt: "2026-03-11 08:45",
  },
  {
    id: "4",
    trackingNumber: "GIGL-2026-0004",
    sender: { name: "Fashion House", city: "Lagos" },
    recipient: { name: "Sarah Johnson", city: "Kano" },
    status: "at_hub",
    serviceType: "Economy",
    cost: 2500,
    createdAt: "2026-03-11 06:15",
  },
  {
    id: "5",
    trackingNumber: "GIGL-2026-0005",
    sender: { name: "Auto Parts Co", city: "Benin" },
    recipient: { name: "Garage Plus", city: "Owerri" },
    status: "failed",
    serviceType: "Standard",
    cost: 3800,
    createdAt: "2026-03-09 16:00",
  },
]

const statusColumns = [
  { key: "awaiting_pickup", label: "Awaiting Pickup", color: "yellow" },
  { key: "picked_up", label: "Picked Up", color: "blue" },
  { key: "in_transit", label: "In Transit", color: "blue" },
  { key: "at_hub", label: "At Hub", color: "blue" },
  { key: "out_for_delivery", label: "Out for Delivery", color: "yellow" },
  { key: "delivered", label: "Delivered", color: "green" },
  { key: "failed", label: "Failed", color: "red" },
]

const variantMap: Record<string, "success" | "warning" | "error" | "info" | "gray"> = {
  awaiting_pickup: "warning",
  picked_up: "info",
  in_transit: "info",
  at_hub: "info",
  out_for_delivery: "warning",
  delivered: "success",
  failed: "error",
}

export default function ShipmentsPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [page, setPage] = React.useState(1)
  const [limit, setLimit] = React.useState(10)

  const filteredShipments = mockShipments.filter(shipment => {
    const matchesSearch = !searchQuery || 
      shipment.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.sender.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.recipient.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || shipment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const columns = [
    {
      key: "trackingNumber",
      header: "Tracking No",
      render: (shipment: typeof mockShipments[0]) => (
        <span className="font-mono font-medium text-brand-green">{shipment.trackingNumber}</span>
      ),
    },
    {
      key: "sender",
      header: "Sender",
      render: (shipment: typeof mockShipments[0]) => (
        <div>
          <p className="font-medium text-dark">{shipment.sender.name}</p>
          <p className="text-xs text-subtle">{shipment.sender.city}</p>
        </div>
      ),
    },
    {
      key: "recipient",
      header: "Recipient",
      render: (shipment: typeof mockShipments[0]) => (
        <div>
          <p className="font-medium text-dark">{shipment.recipient.name}</p>
          <p className="text-xs text-subtle">{shipment.recipient.city}</p>
        </div>
      ),
    },
    {
      key: "serviceType",
      header: "Service",
      render: (shipment: typeof mockShipments[0]) => (
        <Badge variant="outline">{shipment.serviceType}</Badge>
      ),
    },
    {
      key: "cost",
      header: "Cost",
      render: (shipment: typeof mockShipments[0]) => (
        <span className="font-medium text-dark">{formatCurrency(shipment.cost)}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (shipment: typeof mockShipments[0]) => {
        const status = SHIPMENT_STATUSES.find(s => s.value === shipment.status)
        return (
          <Badge variant={variantMap[shipment.status] || "default"}>
            {status?.label || shipment.status}
          </Badge>
        )
      },
    },
    {
      key: "createdAt",
      header: "Created",
      render: (shipment: typeof mockShipments[0]) => (
        <span className="text-sm text-subtle">{shipment.createdAt}</span>
      ),
    },
    {
      key: "actions",
      header: "",
      className: "w-10",
      render: () => (
        <button className="p-1.5 hover:bg-gray-100 rounded">
          <MoreHorizontal className="h-4 w-4 text-mid" />
        </button>
      ),
    },
  ]

  return (
    <ERPLayout title="Shipments">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-subtle" />
              <input
                type="text"
                placeholder="Search by tracking or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 w-64 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
            >
              <option value="all">All Statuses</option>
              {SHIPMENT_STATUSES.map(s => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Shipment
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {statusColumns.map(status => {
            const count = mockShipments.filter(s => s.status === status.key).length
            return (
              <Card 
                key={status.key} 
                className={cn(
                  "cursor-pointer transition-all hover:shadow-md",
                  statusFilter === status.key && "ring-2 ring-brand-green"
                )}
                onClick={() => setStatusFilter(statusFilter === status.key ? "all" : status.key)}
              >
                <CardContent className="p-4 text-center">
                  <div className={cn(
                    "text-2xl font-bold",
                    status.color === "green" && "text-brand-green",
                    status.color === "yellow" && "text-brand-yellow-dark",
                    status.color === "blue" && "text-info",
                    status.color === "red" && "text-error",
                  )}>
                    {count}
                  </div>
                  <p className="text-xs text-mid mt-1">{status.label}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Card>
          <Table
            data={filteredShipments}
            columns={columns}
            keyField="id"
          />
          <Pagination
            page={page}
            totalPages={1}
            total={filteredShipments.length}
            limit={limit}
            onPageChange={setPage}
            onLimitChange={setLimit}
          />
        </Card>
      </div>
    </ERPLayout>
  )
}
