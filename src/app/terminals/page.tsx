"use client"

import * as React from "react"
import { ERPLayout } from "@/components/layouts"
import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from "@/components/ui"
import { formatCurrency } from "@/lib/utils"
import {
  Plus,
  Building2,
  MapPin,
  Phone,
  Users,
  Bus,
  DollarSign,
} from "lucide-react"

const mockTerminals = [
  {
    id: "lagos-jibowu",
    name: "Lagos Jibowu",
    city: "Lagos",
    state: "Lagos",
    address: "Jibowu Terminal, Lagos",
    phone: "+234-800-111-1111",
    status: "active",
    todayStats: {
      trips: 45,
      passengers: 2150,
      revenue: 18500000,
    },
    manager: "Mrs. Folake Adeyemi",
  },
  {
    id: "lagos-ojuelegba",
    name: "Lagos Ojuelegba",
    city: "Lagos",
    state: "Lagos",
    address: "Ojuelegba Terminal, Lagos",
    phone: "+234-800-222-2222",
    status: "active",
    todayStats: {
      trips: 32,
      passengers: 1480,
      revenue: 12200000,
    },
    manager: "Mr. Adebayo Johnson",
  },
  {
    id: "benin",
    name: "Benin City",
    city: "Benin",
    state: "Edo",
    address: "Benin Terminal, Ring Road",
    phone: "+234-800-333-3333",
    status: "active",
    todayStats: {
      trips: 28,
      passengers: 1340,
      revenue: 9800000,
    },
    manager: "Mr. Emeka Omoregie",
  },
  {
    id: "abuja",
    name: "Abuja",
    city: "Abuja",
    state: "FCT",
    address: "Abuja Terminal, Zone 3",
    phone: "+234-800-444-4444",
    status: "active",
    todayStats: {
      trips: 22,
      passengers: 980,
      revenue: 14500000,
    },
    manager: "Mrs. Amina Sani",
  },
  {
    id: "port-harcourt",
    name: "Port Harcourt",
    city: "Port Harcourt",
    state: "Rivers",
    address: "PH Terminal, Trans Amadi",
    phone: "+234-800-555-5555",
    status: "active",
    todayStats: {
      trips: 18,
      passengers: 720,
      revenue: 7600000,
    },
    manager: "Mr. Chukwuemeka Nwankwo",
  },
  {
    id: "ibadan",
    name: "Ibadan",
    city: "Ibadan",
    state: "Oyo",
    address: "Ibadan Terminal, Challenge",
    phone: "+234-800-666-6666",
    status: "active",
    todayStats: {
      trips: 15,
      passengers: 580,
      revenue: 4200000,
    },
    manager: "Mr. Oladipo Adeyemi",
  },
]

export default function TerminalsPage() {
  return (
    <ERPLayout title="Terminals">
      <div className="space-y-6">
        <div className="flex justify-end">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Terminal
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTerminals.map((terminal) => (
            <Card key={terminal.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{terminal.name}</CardTitle>
                    <div className="flex items-center gap-1 mt-1 text-subtle text-sm">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{terminal.city}, {terminal.state}</span>
                    </div>
                  </div>
                  <Badge variant="success">Active</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-mid">
                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-subtle" />
                    {terminal.address}
                  </p>
                  <p className="flex items-center gap-2 mt-1">
                    <Phone className="h-4 w-4 text-subtle" />
                    {terminal.phone}
                  </p>
                  <p className="flex items-center gap-2 mt-1">
                    <Building2 className="h-4 w-4 text-subtle" />
                    Manager: {terminal.manager}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-brand-green">
                      <Bus className="h-4 w-4" />
                      <span className="font-bold">{terminal.todayStats.trips}</span>
                    </div>
                    <p className="text-xs text-subtle mt-1">Trips</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-info">
                      <Users className="h-4 w-4" />
                      <span className="font-bold">{terminal.todayStats.passengers}</span>
                    </div>
                    <p className="text-xs text-subtle mt-1">Passengers</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-brand-yellow-dark">
                      <DollarSign className="h-4 w-4" />
                      <span className="font-bold">{(terminal.todayStats.revenue / 1000000).toFixed(1)}M</span>
                    </div>
                    <p className="text-xs text-subtle mt-1">Revenue</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ERPLayout>
  )
}
