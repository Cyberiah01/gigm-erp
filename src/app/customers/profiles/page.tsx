"use client"

import * as React from "react"
import { ERPLayout } from "@/components/layouts"
import { Card, CardContent, Badge, Button, Input, Table, Pagination, Avatar } from "@/components/ui"
import { cn, formatCurrency, formatDate } from "@/lib/utils"
import {
  Search,
  Plus,
  Star,
  MoreHorizontal,
} from "lucide-react"

const mockCustomers = [
  {
    id: "1",
    name: "Chukwuemeka Nwosu",
    phone: "+234-803-111-1111",
    email: "emeka.nwosu@email.com",
    tier: "platinum",
    totalBookings: 156,
    totalSpend: 1250000,
    gigmPoints: 45000,
    lastTripDate: "2026-03-10",
    registeredAt: "2022-01-15",
    status: "active",
  },
  {
    id: "2",
    name: "Adaeze Okonkwo",
    phone: "+234-806-222-2222",
    email: "adaeze.o@email.com",
    tier: "gold",
    totalBookings: 78,
    totalSpend: 620000,
    gigmPoints: 22000,
    lastTripDate: "2026-03-08",
    registeredAt: "2023-03-20",
    status: "active",
  },
  {
    id: "3",
    name: "Ibrahim Mohammed",
    phone: "+234-805-333-3333",
    email: "ibrahim.m@email.com",
    tier: "silver",
    totalBookings: 34,
    totalSpend: 245000,
    gigmPoints: 8500,
    lastTripDate: "2026-02-28",
    registeredAt: "2024-06-10",
    status: "active",
  },
  {
    id: "4",
    name: "Grace Adeyemi",
    phone: "+234-807-444-4444",
    email: "grace.adeyemi@email.com",
    tier: "regular",
    totalBookings: 12,
    totalSpend: 78000,
    gigmPoints: 2100,
    lastTripDate: "2026-01-15",
    registeredAt: "2025-01-05",
    status: "active",
  },
  {
    id: "5",
    name: "Oluwaseun Oladipo",
    phone: "+234-809-555-5555",
    email: "seun.oladipo@email.com",
    tier: "platinum",
    totalBookings: 203,
    totalSpend: 1680000,
    gigmPoints: 62000,
    lastTripDate: "2026-03-11",
    registeredAt: "2021-08-22",
    status: "blacklisted",
  },
]

const tierColors: Record<string, "purple" | "warning" | "gray" | "info"> = {
  platinum: "purple",
  gold: "warning",
  silver: "gray",
  regular: "info",
}

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [tierFilter, setTierFilter] = React.useState("all")
  const [page, setPage] = React.useState(1)
  const [limit, setLimit] = React.useState(10)

  const filteredCustomers = mockCustomers.filter(customer => {
    const matchesSearch = !searchQuery || 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTier = tierFilter === "all" || customer.tier === tierFilter
    return matchesSearch && matchesTier
  })

  const columns = [
    {
      key: "name",
      header: "Customer",
      render: (customer: typeof mockCustomers[0]) => (
        <div className="flex items-center gap-3">
          <Avatar name={customer.name} size="sm" />
          <div>
            <div className="flex items-center gap-2">
              <p className="font-medium text-dark">{customer.name}</p>
              {customer.status === "blacklisted" && (
                <Badge variant="error">Blacklisted</Badge>
              )}
            </div>
            <p className="text-xs text-subtle">{customer.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "phone",
      header: "Phone",
      render: (customer: typeof mockCustomers[0]) => (
        <span className="font-mono text-sm">{customer.phone}</span>
      ),
    },
    {
      key: "tier",
      header: "Tier",
      render: (customer: typeof mockCustomers[0]) => (
        <Badge variant={tierColors[customer.tier]} className="capitalize">
          <Star className="h-3 w-3 mr-1" />
          {customer.tier}
        </Badge>
      ),
    },
    {
      key: "totalBookings",
      header: "Bookings",
    },
    {
      key: "totalSpend",
      header: "Total Spend",
      render: (customer: typeof mockCustomers[0]) => (
        <span className="font-medium text-dark">{formatCurrency(customer.totalSpend)}</span>
      ),
    },
    {
      key: "gigmPoints",
      header: "Points",
      render: (customer: typeof mockCustomers[0]) => (
        <span className="font-mono text-brand-green">{customer.gigmPoints.toLocaleString()}</span>
      ),
    },
    {
      key: "lastTripDate",
      header: "Last Trip",
      render: (customer: typeof mockCustomers[0]) => (
        <span className="text-sm">{formatDate(customer.lastTripDate)}</span>
      ),
    },
    {
      key: "registeredAt",
      header: "Joined",
      render: (customer: typeof mockCustomers[0]) => (
        <span className="text-sm text-subtle">{formatDate(customer.registeredAt)}</span>
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
    <ERPLayout title="Customer Profiles">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-subtle" />
              <input
                type="text"
                placeholder="Search by name, phone, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 w-72 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
              />
            </div>
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              className="px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
            >
              <option value="all">All Tiers</option>
              <option value="platinum">Platinum</option>
              <option value="gold">Gold</option>
              <option value="silver">Silver</option>
              <option value="regular">Regular</option>
            </select>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Card className="bg-purple-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500 rounded-lg">
                  <Star className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-700">{mockCustomers.filter(c => c.tier === 'platinum').length}</p>
                  <p className="text-sm text-purple-600">Platinum Members</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-yellow-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-500 rounded-lg">
                  <Star className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-yellow-700">{mockCustomers.filter(c => c.tier === 'gold').length}</p>
                  <p className="text-sm text-yellow-600">Gold Members</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <Star className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-700">{mockCustomers.filter(c => c.tier === 'silver' || c.tier === 'regular').length}</p>
                  <p className="text-sm text-blue-600">Other Members</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-400 rounded-lg">
                  <Star className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-mid">{mockCustomers.reduce((acc, c) => acc + c.totalBookings, 0)}</p>
                  <p className="text-sm text-subtle">Total Bookings</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <Table
            data={filteredCustomers}
            columns={columns}
            keyField="id"
          />
          <Pagination
            page={page}
            totalPages={1}
            total={filteredCustomers.length}
            limit={limit}
            onPageChange={setPage}
            onLimitChange={setLimit}
          />
        </Card>
      </div>
    </ERPLayout>
  )
}
