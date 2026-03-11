"use client"

import * as React from "react"
import { ERPLayout } from "@/components/layouts"
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Input, Table, Pagination } from "@/components/ui"
import { cn, formatCurrency, formatDate } from "@/lib/utils"
import {
  Search,
  Download,
  DollarSign,
  TrendingUp,
  CreditCard,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

const mockTransactions = [
  {
    id: "1",
    reference: "TXN-20260311-001",
    type: "booking_payment",
    description: "Booking #BK-29841 - Lagos to Benin",
    amount: 8500,
    method: "Card",
    status: "completed",
    terminal: "Lagos Jibowu",
    createdAt: "2026-03-11 10:30",
  },
  {
    id: "2",
    reference: "TXN-20260311-002",
    type: "booking_payment",
    description: "Booking #BK-29842 - Abuja to Lagos",
    amount: 15000,
    method: "POS",
    status: "completed",
    terminal: "Abuja",
    createdAt: "2026-03-11 11:15",
  },
  {
    id: "3",
    reference: "TXN-20260311-003",
    type: "refund",
    description: "Refund - Booking #BK-29835 Cancelled",
    amount: -5500,
    method: "Wallet",
    status: "completed",
    terminal: "Ibadan",
    createdAt: "2026-03-11 12:00",
  },
  {
    id: "4",
    reference: "TXN-20260311-004",
    type: "logistics_payment",
    description: "Shipment #GIGL-2026-0001",
    amount: 5500,
    method: "Bank Transfer",
    status: "pending",
    terminal: "Lagos Ojuelegba",
    createdAt: "2026-03-11 13:45",
  },
  {
    id: "5",
    reference: "TXN-20260311-005",
    type: "wallet_topup",
    description: "Wallet Top-up",
    amount: 50000,
    method: "Bank Transfer",
    status: "completed",
    terminal: "Online",
    createdAt: "2026-03-11 14:20",
  },
]

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [typeFilter, setTypeFilter] = React.useState("all")
  const [page, setPage] = React.useState(1)
  const [limit, setLimit] = React.useState(10)

  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesSearch = !searchQuery || 
      transaction.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === "all" || transaction.type === typeFilter
    return matchesSearch && matchesType
  })

  const totalRevenue = mockTransactions
    .filter(t => t.status === "completed" && t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0)

  const totalRefunds = mockTransactions
    .filter(t => t.status === "completed" && t.amount < 0)
    .reduce((acc, t) => acc + Math.abs(t.amount), 0)

  const columns = [
    {
      key: "reference",
      header: "Reference",
      render: (transaction: typeof mockTransactions[0]) => (
        <span className="font-mono text-sm text-dark">{transaction.reference}</span>
      ),
    },
    {
      key: "description",
      header: "Description",
      render: (transaction: typeof mockTransactions[0]) => (
        <div>
          <p className="font-medium text-dark">{transaction.description}</p>
          <p className="text-xs text-subtle">{transaction.terminal}</p>
        </div>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      render: (transaction: typeof mockTransactions[0]) => (
        <div className="flex items-center gap-2">
          {transaction.amount > 0 ? (
            <ArrowUpRight className="h-4 w-4 text-brand-green" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-error" />
          )}
          <span className={cn(
            "font-medium",
            transaction.amount > 0 ? "text-brand-green" : "text-error"
          )}>
            {formatCurrency(Math.abs(transaction.amount))}
          </span>
        </div>
      ),
    },
    {
      key: "method",
      header: "Payment Method",
      render: (transaction: typeof mockTransactions[0]) => (
        <Badge variant="outline">{transaction.method}</Badge>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (transaction: typeof mockTransactions[0]) => (
        <Badge variant={transaction.status === "completed" ? "success" : "warning"}>
          {transaction.status}
        </Badge>
      ),
    },
    {
      key: "createdAt",
      header: "Date & Time",
      render: (transaction: typeof mockTransactions[0]) => (
        <span className="text-sm text-mid">{transaction.createdAt}</span>
      ),
    },
  ]

  return (
    <ERPLayout title="Transactions">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-subtle" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 w-64 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
              />
            </div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
            >
              <option value="all">All Types</option>
              <option value="booking_payment">Booking Payment</option>
              <option value="refund">Refund</option>
              <option value="logistics_payment">Logistics Payment</option>
              <option value="wallet_topup">Wallet Top-up</option>
            </select>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Card className="bg-brand-green-light">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-brand-green">Today's Revenue</p>
                  <p className="text-2xl font-bold text-brand-green">{formatCurrency(totalRevenue)}</p>
                </div>
                <div className="p-3 bg-brand-green rounded-lg">
                  <DollarSign className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-error-light">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-error">Total Refunds</p>
                  <p className="text-2xl font-bold text-error">{formatCurrency(totalRefunds)}</p>
                </div>
                <div className="p-3 bg-error rounded-lg">
                  <ArrowDownRight className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-info">Net Revenue</p>
                  <p className="text-2xl font-bold text-info">{formatCurrency(totalRevenue - totalRefunds)}</p>
                </div>
                <div className="p-3 bg-info rounded-lg">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-purple-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600">Pending</p>
                  <p className="text-2xl font-bold text-purple-600">{formatCurrency(5500)}</p>
                </div>
                <div className="p-3 bg-purple-500 rounded-lg">
                  <Wallet className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <Table
            data={filteredTransactions}
            columns={columns}
            keyField="id"
          />
          <Pagination
            page={page}
            totalPages={1}
            total={filteredTransactions.length}
            limit={limit}
            onPageChange={setPage}
            onLimitChange={setLimit}
          />
        </Card>
      </div>
    </ERPLayout>
  )
}
