"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ERPLayout } from "@/components/layouts"
import { Card, CardContent, CardHeader, CardTitle, Badge } from "@/components/ui"
import { cn, formatCurrency } from "@/lib/utils"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Bus,
  Users,
  Ticket,
  AlertCircle,
  Clock,
  MapPin,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts"

const revenueData = [
  { day: "Mon", revenue: 4500000 },
  { day: "Tue", revenue: 5200000 },
  { day: "Wed", revenue: 4800000 },
  { day: "Thu", revenue: 6100000 },
  { day: "Fri", revenue: 5500000 },
  { day: "Sat", revenue: 6700000 },
  { day: "Sun", revenue: 4200000 },
]

const bookingChannelData = [
  { name: "Terminal Walk-in", value: 45, color: "#1A7A3E" },
  { name: "Website", value: 35, color: "#F5A623" },
  { name: "Mobile App", value: 20, color: "#1565C0" },
]

const topRoutesData = [
  { route: "Lagos - Benin", revenue: 12500000 },
  { route: "Abuja - Lagos", revenue: 9800000 },
  { route: "Port Harcourt - Owerri", revenue: 7600000 },
  { route: "Ibadan - Lagos", revenue: 5400000 },
  { route: "Enugu - Aba", revenue: 4200000 },
]

const activityFeed = [
  { id: "1", type: "trip_departure", message: "Trip LOS-BEN-0042 departed Lagos Jibowu", time: "2 mins ago" },
  { id: "2", type: "new_booking", message: "New booking #BK-29841 — Port Harcourt to Enugu", time: "5 mins ago" },
  { id: "3", type: "cash_report", message: "Cash report submitted — Abuja terminal", time: "12 mins ago" },
  { id: "4", type: "maintenance_alert", message: "Vehicle V-0091 flagged for maintenance", time: "25 mins ago" },
  { id: "5", type: "new_booking", message: "New booking #BK-29840 — Lagos to Ibadan", time: "28 mins ago" },
  { id: "6", type: "trip_arrival", message: "Trip ABJ-LGS-0098 arrived at Lagos terminal", time: "35 mins ago" },
]

interface KPICardProps {
  title: string
  value: string | number
  change?: number
  changeType?: "increase" | "decrease"
  icon: React.ReactNode
  color?: "green" | "yellow" | "blue"
}

function KPICard({ title, value, change, changeType, icon, color = "green" }: KPICardProps) {
  const colorClasses = {
    green: "bg-brand-green-light text-brand-green",
    yellow: "bg-brand-yellow-light text-brand-yellow-dark",
    blue: "bg-info-light text-info",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-mid mb-1">{title}</p>
              <p className="text-2xl font-heading font-bold text-dark">{value}</p>
              {change !== undefined && (
                <div className="flex items-center gap-1 mt-2">
                  {changeType === "increase" ? (
                    <TrendingUp className="h-4 w-4 text-brand-green" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-error" />
                  )}
                  <span className={cn(
                    "text-sm font-medium",
                    changeType === "increase" ? "text-brand-green" : "text-error"
                  )}>
                    {change}%
                  </span>
                  <span className="text-xs text-subtle">vs yesterday</span>
                </div>
              )}
            </div>
            <div className={cn("p-3 rounded-lg", colorClasses[color])}>
              {icon}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function DashboardPage() {
  return (
    <ERPLayout title="Dashboard">
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Total Revenue Today"
            value={formatCurrency(4850000)}
            change={12}
            changeType="increase"
            icon={<DollarSign className="h-5 w-5" />}
            color="green"
          />
          <KPICard
            title="Active Trips Right Now"
            value="24"
            change={8}
            changeType="increase"
            icon={<Bus className="h-5 w-5" />}
            color="blue"
          />
          <KPICard
            title="Passengers Today"
            value="1,847"
            change={5}
            changeType="increase"
            icon={<Users className="h-5 w-5" />}
            color="green"
          />
          <KPICard
            title="Fleet Utilisation"
            value="87%"
            change={3}
            changeType="increase"
            icon={<Ticket className="h-5 w-5" />}
            color="yellow"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Revenue Trend</CardTitle>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-xs bg-brand-green text-white rounded-full">7 Days</button>
                  <button className="px-3 py-1 text-xs text-mid hover:bg-gray-100 rounded-full">30 Days</button>
                  <button className="px-3 py-1 text-xs text-mid hover:bg-gray-100 rounded-full">90 Days</button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                  <XAxis dataKey="day" stroke="#888888" fontSize={12} />
                  <YAxis 
                    stroke="#888888" 
                    fontSize={12}
                    tickFormatter={(value) => `₦${(value / 1000000).toFixed(1)}M`}
                  />
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #E0E0E0",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#1A7A3E"
                    strokeWidth={2}
                    dot={{ fill: "#1A7A3E", strokeWidth: 2 }}
                    activeDot={{ r: 6, fill: "#1A7A3E" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bookings by Channel</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={bookingChannelData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {bookingChannelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-4">
                {bookingChannelData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-mid">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium text-dark">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Top Routes by Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={topRoutesData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                  <XAxis 
                    type="number" 
                    stroke="#888888" 
                    fontSize={12}
                    tickFormatter={(value) => `₦${(value / 1000000).toFixed(1)}M`}
                  />
                  <YAxis 
                    type="category" 
                    dataKey="route" 
                    stroke="#888888" 
                    fontSize={12}
                    width={120}
                  />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Bar dataKey="revenue" fill="#1A7A3E" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Live Activity</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border max-h-[320px] overflow-y-auto">
                {activityFeed.map((activity) => (
                  <div key={activity.id} className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "h-2 w-2 rounded-full mt-2 flex-shrink-0",
                        activity.type === "trip_departure" && "bg-brand-green",
                        activity.type === "new_booking" && "bg-info",
                        activity.type === "cash_report" && "bg-brand-yellow",
                        activity.type === "maintenance_alert" && "bg-error",
                        activity.type === "trip_arrival" && "bg-brand-green"
                      )} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-dark">{activity.message}</p>
                        <p className="text-xs text-subtle mt-1">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Fleet Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-brand-green-light rounded-lg">
                <p className="text-sm text-brand-green mb-1">On Trip</p>
                <p className="text-2xl font-bold text-brand-green">156</p>
              </div>
              <div className="p-4 bg-brand-yellow-light rounded-lg">
                <p className="text-sm text-brand-yellow-dark mb-1">Available</p>
                <p className="text-2xl font-bold text-brand-yellow-dark">42</p>
              </div>
              <div className="p-4 bg-blue-100 rounded-lg">
                <p className="text-sm text-info mb-1">Maintenance</p>
                <p className="text-2xl font-bold text-info">18</p>
              </div>
              <div className="p-4 bg-gray-100 rounded-lg">
                <p className="text-sm text-mid mb-1">Retired</p>
                <p className="text-2xl font-bold text-subtle">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ERPLayout>
  )
}
