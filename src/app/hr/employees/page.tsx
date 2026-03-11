"use client"

import * as React from "react"
import { ERPLayout } from "@/components/layouts"
import { Card, CardContent, Button, Badge, Input, Table, Pagination, Avatar } from "@/components/ui"
import { cn, formatDate } from "@/lib/utils"
import {
  Search,
  Plus,
  Users2,
  UserPlus,
  Briefcase,
  Mail,
  Phone,
} from "lucide-react"

const mockEmployees = [
  {
    id: "1",
    employeeId: "EMP-001",
    name: "Sarah Adebayo",
    email: "sarah.adebayo@gigm.com",
    phone: "+234-800-111-1111",
    department: "Operations",
    role: "Terminal Manager",
    terminal: "Lagos Jibowu",
    status: "active",
    contractType: "full_time",
    startDate: "2020-01-15",
    photo: null,
  },
  {
    id: "2",
    employeeId: "EMP-002",
    name: "James Okonkwo",
    email: "james.okonkwo@gigm.com",
    phone: "+234-800-222-2222",
    department: "Ticketing",
    role: "Senior Agent",
    terminal: "Lagos Jibowu",
    status: "active",
    contractType: "full_time",
    startDate: "2021-06-20",
    photo: null,
  },
  {
    id: "3",
    employeeId: "EMP-003",
    name: "Amina Sani",
    email: "amina.sani@gigm.com",
    phone: "+234-800-333-3333",
    department: "Finance",
    role: "Finance Manager",
    terminal: "Abuja",
    status: "active",
    contractType: "full_time",
    startDate: "2019-03-10",
    photo: null,
  },
  {
    id: "4",
    employeeId: "EMP-004",
    name: "Emeka Nwosu",
    email: "emeka.nwosu@gigm.com",
    phone: "+234-800-444-4444",
    department: "Fleet",
    role: "Maintenance Supervisor",
    terminal: "Benin",
    status: "active",
    contractType: "full_time",
    startDate: "2022-08-05",
    photo: null,
  },
  {
    id: "5",
    employeeId: "EMP-005",
    name: "Grace Oyedeji",
    email: "grace.oyedeji@gigm.com",
    phone: "+234-800-555-5555",
    department: "HR",
    role: "HR Officer",
    terminal: "Head Office",
    status: "on_leave",
    contractType: "full_time",
    startDate: "2021-02-14",
    photo: null,
  },
]

const departmentColors: Record<string, string> = {
  Operations: "bg-blue-100 text-blue-700",
  Ticketing: "bg-green-100 text-green-700",
  Finance: "bg-purple-100 text-purple-700",
  Fleet: "bg-orange-100 text-orange-700",
  HR: "bg-pink-100 text-pink-700",
}

export default function EmployeesPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [departmentFilter, setDepartmentFilter] = React.useState("all")
  const [page, setPage] = React.useState(1)
  const [limit, setLimit] = React.useState(10)

  const filteredEmployees = mockEmployees.filter(employee => {
    const matchesSearch = !searchQuery || 
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDept = departmentFilter === "all" || employee.department === departmentFilter
    return matchesSearch && matchesDept
  })

  const columns = [
    {
      key: "name",
      header: "Employee",
      render: (employee: typeof mockEmployees[0]) => (
        <div className="flex items-center gap-3">
          <Avatar name={employee.name} size="sm" />
          <div>
            <div className="flex items-center gap-2">
              <p className="font-medium text-dark">{employee.name}</p>
              {employee.status === "on_leave" && (
                <Badge variant="warning">On Leave</Badge>
              )}
            </div>
            <p className="text-xs text-subtle">{employee.employeeId}</p>
          </div>
        </div>
      ),
    },
    {
      key: "email",
      header: "Contact",
      render: (employee: typeof mockEmployees[0]) => (
        <div>
          <p className="flex items-center gap-1 text-sm text-dark">
            <Mail className="h-3.5 w-3.5 text-subtle" />
            {employee.email}
          </p>
          <p className="flex items-center gap-1 text-xs text-subtle mt-0.5">
            <Phone className="h-3.5 w-3.5" />
            {employee.phone}
          </p>
        </div>
      ),
    },
    {
      key: "department",
      header: "Department",
      render: (employee: typeof mockEmployees[0]) => (
        <span className={cn(
          "px-2 py-1 rounded-full text-xs font-medium",
          departmentColors[employee.department] || "bg-gray-100 text-gray-700"
        )}>
          {employee.department}
        </span>
      ),
    },
    {
      key: "role",
      header: "Role",
    },
    {
      key: "terminal",
      header: "Terminal",
    },
    {
      key: "contractType",
      header: "Contract",
      render: (employee: typeof mockEmployees[0]) => (
        <Badge variant="outline" className="capitalize">
          {employee.contractType.replace('_', ' ')}
        </Badge>
      ),
    },
    {
      key: "startDate",
      header: "Start Date",
      render: (employee: typeof mockEmployees[0]) => (
        <span className="text-sm">{formatDate(employee.startDate)}</span>
      ),
    },
  ]

  const departments = [...new Set(mockEmployees.map(e => e.department))]

  return (
    <ERPLayout title="Employees">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-subtle" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 w-64 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
              />
            </div>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Employee
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Card className="bg-brand-green-light">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand-green rounded-lg">
                  <Users2 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-brand-green">{mockEmployees.filter(e => e.status === 'active').length}</p>
                  <p className="text-sm text-brand-green">Active Employees</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-brand-yellow-light">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand-yellow rounded-lg">
                  <Briefcase className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-brand-yellow-dark">5</p>
                  <p className="text-sm text-brand-yellow-dark">Departments</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-info rounded-lg">
                  <Users2 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-info">{mockEmployees.filter(e => e.status === 'on_leave').length}</p>
                  <p className="text-sm text-info">On Leave</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-purple-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500 rounded-lg">
                  <UserPlus className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-600">3</p>
                  <p className="text-sm text-purple-600">New This Month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <Table
            data={filteredEmployees}
            columns={columns}
            keyField="id"
          />
          <Pagination
            page={page}
            totalPages={1}
            total={filteredEmployees.length}
            limit={limit}
            onPageChange={setPage}
            onLimitChange={setLimit}
          />
        </Card>
      </div>
    </ERPLayout>
  )
}
