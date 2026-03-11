"use client"

import * as React from "react"
import { ERPLayout } from "@/components/layouts"
import { Card, Badge, Button, Input, Table, Pagination, Avatar, Modal } from "@/components/ui"
import { formatRole, MOCK_AUTH_USERS } from "@/lib/auth"
import { cn, formatDate } from "@/lib/utils"
import {
  Search,
  Plus,
  Shield,
  ShieldCheck,
  MoreHorizontal,
  UserPlus,
  Mail,
} from "lucide-react"

const mockUsers = MOCK_AUTH_USERS.map((user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  roles: [formatRole(user.role)],
  terminalScope: user.terminalScope?.length ? user.terminalScope : ["All Terminals"],
  lastLogin: "2026-03-11 09:30",
  status: user.status,
  twoFactorEnabled: user.twoFactorEnabled,
}))

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [page, setPage] = React.useState(1)
  const [limit, setLimit] = React.useState(10)
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = !searchQuery || 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const columns = [
    {
      key: "name",
      header: "User",
      render: (user: typeof mockUsers[0]) => (
        <div className="flex items-center gap-3">
          <Avatar name={user.name} size="sm" />
          <div>
            <p className="font-medium text-dark">{user.name}</p>
            <p className="text-xs text-subtle">{user.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "roles",
      header: "Roles",
      render: (user: typeof mockUsers[0]) => (
        <div className="flex flex-wrap gap-1">
          {user.roles.map(role => (
            <Badge key={role} variant="outline">{role}</Badge>
          ))}
        </div>
      ),
    },
    {
      key: "terminalScope",
      header: "Terminal Scope",
      render: (user: typeof mockUsers[0]) => (
        <span className="text-sm text-mid">{user.terminalScope.join(", ")}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (user: typeof mockUsers[0]) => (
        <Badge variant={user.status === "active" ? "success" : "gray"}>
          {user.status}
        </Badge>
      ),
    },
    {
      key: "twoFactorEnabled",
      header: "2FA",
      render: (user: typeof mockUsers[0]) => (
        user.twoFactorEnabled ? (
          <ShieldCheck className="h-5 w-5 text-brand-green" />
        ) : (
          <Shield className="h-5 w-5 text-subtle" />
        )
      ),
    },
    {
      key: "lastLogin",
      header: "Last Login",
      render: (user: typeof mockUsers[0]) => (
        <span className="text-sm text-subtle">{user.lastLogin}</span>
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
    <ERPLayout title="Users & Roles">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-subtle" />
              <input
                type="text"
                placeholder="Search users..."
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
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Create User
          </Button>
        </div>

        <Card>
          <Table
            data={filteredUsers}
            columns={columns}
            keyField="id"
          />
          <Pagination
            page={page}
            totalPages={1}
            total={filteredUsers.length}
            limit={limit}
            onPageChange={setPage}
            onLimitChange={setLimit}
          />
        </Card>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New User"
        description="Add a new user to the system"
        size="lg"
      >
        <div className="space-y-4">
          <Input label="Full Name" placeholder="Enter full name" required />
          <Input label="Email Address" type="email" placeholder="Enter email address" required />
          <Input label="Phone Number" type="tel" placeholder="+234-xxx-xxx-xxxx" />
          <div>
            <label className="block text-sm font-medium text-mid mb-1">
              Roles <span className="text-error">*</span>
            </label>
            <select className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-green">
              <option value="">Select role</option>
              <option value="admin">Admin</option>
              <option value="terminal_manager">Terminal Manager</option>
              <option value="ticketing_agent">Ticketing Agent</option>
              <option value="finance_manager">Finance Manager</option>
              <option value="hr_manager">HR Manager</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-mid mb-1">
              Terminal Scope <span className="text-error">*</span>
            </label>
            <select className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-green">
              <option value="all">All Terminals</option>
              <option value="lagos">Lagos</option>
              <option value="abuja">Abuja</option>
              <option value="benin">Benin</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="force2fa"
              className="h-4 w-4 rounded border-border text-brand-green focus:ring-brand-green"
            />
            <label htmlFor="force2fa" className="text-sm text-dark">
              Force Two-Factor Authentication
            </label>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button>
              <Mail className="h-4 w-4 mr-2" />
              Send Welcome Email
            </Button>
          </div>
        </div>
      </Modal>
    </ERPLayout>
  )
}
