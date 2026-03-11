"use client"

import * as React from "react"
import Link from "next/link"
import { Button, Card, Badge, Select } from "@/components/ui"
import { cn, formatCurrency } from "@/lib/utils"
import { TERMINALS } from "@/constants"
import {
  Bus,
  MapPin,
  Clock,
  ArrowLeft,
  ArrowRight,
  Calendar,
  Users,
} from "lucide-react"

const mockTrips = [
  {
    id: "1",
    route: { from: "Lagos Jibowu", to: "Benin City" },
    departureTime: "08:00 AM",
    arrivalTime: "02:00 PM",
    duration: "6 hrs",
    busClass: "Economy",
    price: 8500,
    seatsAvailable: 12,
    busType: "Toyota Coaster",
  },
  {
    id: "2",
    route: { from: "Lagos Jibowu", to: "Benin City" },
    departureTime: "10:00 AM",
    arrivalTime: "04:00 PM",
    duration: "6 hrs",
    busClass: "First Class",
    price: 12000,
    seatsAvailable: 8,
    busType: "Hino Genesis",
  },
  {
    id: "3",
    route: { from: "Lagos Jibowu", to: "Benin City" },
    departureTime: "02:00 PM",
    arrivalTime: "08:00 PM",
    duration: "6 hrs",
    busClass: "Economy",
    price: 8500,
    seatsAvailable: 34,
    busType: "Toyota Coaster",
  },
  {
    id: "4",
    route: { from: "Lagos Jibowu", to: "Benin City" },
    departureTime: "06:00 PM",
    arrivalTime: "12:00 AM",
    duration: "6 hrs",
    busClass: "Prime",
    price: 15000,
    seatsAvailable: 3,
    busType: "Yutong ZK6129",
  },
]

export default function PortalTripsPage() {
  const [selectedTrip, setSelectedTrip] = React.useState<string | null>(null)

  const getSeatsColor = (seats: number) => {
    if (seats > 10) return "text-brand-green"
    if (seats > 3) return "text-brand-yellow-dark"
    return "text-error"
  }

  return (
    <div className="min-h-screen bg-bg">
      <header className="bg-white border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2 text-brand-green hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 text-lg">
            <span className="font-medium text-dark">Lagos Jibowu</span>
            <ArrowRight className="h-5 w-5 text-subtle" />
            <span className="font-medium text-dark">Benin City</span>
            <span className="text-subtle">|</span>
            <span className="text-mid">Mar 12, 2026</span>
            <span className="text-subtle">|</span>
            <span className="text-mid">1 Passenger</span>
          </div>
        </div>

        <div className="space-y-4">
          {mockTrips.map((trip) => (
            <Card 
              key={trip.id} 
              className={cn(
                "cursor-pointer transition-all hover:shadow-md",
                selectedTrip === trip.id && "ring-2 ring-brand-green"
              )}
              onClick={() => setSelectedTrip(trip.id)}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-xl font-bold text-dark">{trip.departureTime}</p>
                    <p className="text-xs text-subtle">Depart</p>
                  </div>

                  <div className="flex-1 min-w-[200px]">
                    <div className="flex items-center gap-2 mb-1">
                      <Bus className="h-4 w-4 text-brand-green" />
                      <span className="text-sm font-medium">{trip.busType}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-subtle">
                      <Clock className="h-3 w-3" />
                      <span>{trip.duration}</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-xl font-bold text-dark">{trip.arrivalTime}</p>
                    <p className="text-xs text-subtle">Arrive</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <Badge variant={trip.busClass === "Economy" ? "outline" : trip.busClass === "First Class" ? "warning" : "default"}>
                      {trip.busClass}
                    </Badge>
                    <p className={cn("text-sm font-medium mt-1", getSeatsColor(trip.seatsAvailable))}>
                      {trip.seatsAvailable} seats left
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold text-brand-green">{formatCurrency(trip.price)}</p>
                    <p className="text-xs text-subtle">per person</p>
                  </div>

                  <Button>Select</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {selectedTrip && (
          <div className="mt-8 p-6 bg-white rounded-lg border border-border">
            <h3 className="font-heading font-semibold text-lg mb-4">Continue with selected trip?</h3>
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setSelectedTrip(null)}>
                Choose Different Trip
              </Button>
              <Link href="/portal/booking">
                <Button>Proceed to Booking</Button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
