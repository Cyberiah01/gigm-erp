"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button, Input, Select } from "@/components/ui"
import { cn, formatCurrency } from "@/lib/utils"
import { TERMINALS } from "@/constants"
import {
  Bus,
  MapPin,
  Calendar,
  Users,
  Shield,
  Clock,
  Smartphone,
  ArrowRight,
  ArrowLeft,
  Star,
  Facebook,
  Twitter,
  Instagram,
  Phone,
  Mail,
  Package,
  Briefcase,
  Award,
  Search,
} from "lucide-react"

const popularRoutes = [
  { from: "Lagos", to: "Benin", price: 8500, duration: "5-6 hrs" },
  { from: "Abuja", to: "Lagos", price: 12000, duration: "7-8 hrs" },
  { from: "Port Harcourt", to: "Owerri", price: 5500, duration: "3-4 hrs" },
  { from: "Ibadan", to: "Lagos", price: 3500, duration: "2-3 hrs" },
]

const features = [
  {
    icon: Shield,
    title: "Safety First",
    description: "Well-maintained fleet with professional, vetted drivers",
  },
  {
    icon: Clock,
    title: "Punctual Service",
    description: "Scheduled departures you can rely on",
  },
  {
    icon: Smartphone,
    title: "Easy Booking",
    description: "Book tickets online or via our mobile app",
  },
  {
    icon: Award,
    title: "Premium Comfort",
    description: "AC coaches with comfortable seating",
  },
]

export default function PortalHomePage() {
  const [searchForm, setSearchForm] = React.useState({
    from: "",
    to: "",
    date: new Date().toISOString().split('T')[0],
    passengers: "1",
    class: "economy",
  })

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-brand-green flex items-center justify-center">
                <Bus className="h-6 w-6 text-white" />
              </div>
              <span className="font-display text-2xl text-dark">GIGM</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-dark hover:text-brand-green font-medium">Home</Link>
              <Link href="/portal/trips" className="text-mid hover:text-brand-green font-medium">Book Tickets</Link>
              <Link href="/portal/tracking" className="text-mid hover:text-brand-green font-medium">Track Parcel</Link>
              <Link href="/portal/terminals" className="text-mid hover:text-brand-green font-medium">Terminals</Link>
            </nav>

            <div className="flex items-center gap-3">
              <Link href="/portal/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/portal/register">
                <Button>Register</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="relative bg-brand-green pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-brand-yellow rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-4">
              Travel in Comfort
            </h1>
            <p className="text-xl text-brand-green-light max-w-2xl mx-auto">
              Nigeria's most trusted transport company. Book your journey today.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-mid mb-1">From</label>
                <Select
                  options={TERMINALS.map(t => ({ value: t.id, label: t.name }))}
                  value={searchForm.from}
                  onChange={(e) => setSearchForm({ ...searchForm, from: e.target.value })}
                  placeholder="Select origin"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-mid mb-1">To</label>
                <Select
                  options={TERMINALS.map(t => ({ value: t.id, label: t.name }))}
                  value={searchForm.to}
                  onChange={(e) => setSearchForm({ ...searchForm, to: e.target.value })}
                  placeholder="Select destination"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-mid mb-1">Date</label>
                <Input
                  type="date"
                  value={searchForm.date}
                  onChange={(e) => setSearchForm({ ...searchForm, date: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-mid mb-1">Passengers</label>
                <Select
                  options={[
                    { value: "1", label: "1 Passenger" },
                    { value: "2", label: "2 Passengers" },
                    { value: "3", label: "3 Passengers" },
                    { value: "4", label: "4 Passengers" },
                  ]}
                  value={searchForm.passengers}
                  onChange={(e) => setSearchForm({ ...searchForm, passengers: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-mid mb-1">Class</label>
                <Select
                  options={[
                    { value: "economy", label: "Economy" },
                    { value: "first_class", label: "First Class" },
                    { value: "prime", label: "Prime" },
                  ]}
                  value={searchForm.class}
                  onChange={(e) => setSearchForm({ ...searchForm, class: e.target.value })}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-mid mb-1">&nbsp;</label>
                <Link href="/portal/trips">
                  <Button className="w-full" size="lg">
                    <Search className="h-5 w-5 mr-2" />
                    Search Trips
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold text-dark text-center mb-12">
            Why Choose GIGM
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-green-light rounded-full mb-4">
                  <feature.icon className="h-8 w-8 text-brand-green" />
                </div>
                <h3 className="font-heading font-semibold text-dark mb-2">{feature.title}</h3>
                <p className="text-mid text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold text-dark text-center mb-12">
            Popular Routes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularRoutes.map((route, index) => (
              <motion.div
                key={`${route.from}-${route.to}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="h-4 w-4 text-brand-green" />
                  <span className="font-medium text-dark">{route.from}</span>
                  <ArrowRight className="h-4 w-4 text-subtle" />
                  <span className="font-medium text-dark">{route.to}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-brand-green">{formatCurrency(route.price)}</p>
                    <p className="text-xs text-subtle">{route.duration}</p>
                  </div>
                  <Button size="sm">Book</Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-brand-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="font-heading text-3xl font-bold text-white mb-2">GIG Go</h3>
              <p className="text-brand-green-light">On-demand delivery within cities</p>
            </div>
            <div className="text-center">
              <h3 className="font-heading text-3xl font-bold text-white mb-2">GIG Logistics</h3>
              <p className="text-brand-green-light">Inter-city parcel delivery</p>
            </div>
            <div className="text-center">
              <h3 className="font-heading text-3xl font-bold text-white mb-2">GIGM+</h3>
              <p className="text-brand-green-light">Loyalty rewards program</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-dark py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-brand-green flex items-center justify-center">
                  <Bus className="h-6 w-6 text-white" />
                </div>
                <span className="font-display text-2xl text-white">GIGM</span>
              </div>
              <p className="text-gray-400 text-sm">
                God is Good Motors - Nigeria's premier transport company serving since 1998.
              </p>
            </div>
            <div>
              <h4 className="font-heading font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/portal/trips" className="hover:text-white">Book Tickets</Link></li>
                <li><Link href="/portal/tracking" className="hover:text-white">Track Parcel</Link></li>
                <li><Link href="/portal/terminals" className="hover:text-white">Terminals</Link></li>
                <li><Link href="/portal/careers" className="hover:text-white">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  +234-700-444-4446
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  info@gigm.com
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-semibold text-white mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-brand-green transition-colors">
                  <Facebook className="h-5 w-5 text-white" />
                </a>
                <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-brand-green transition-colors">
                  <Twitter className="h-5 w-5 text-white" />
                </a>
                <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-brand-green transition-colors">
                  <Instagram className="h-5 w-5 text-white" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            © 2026 GIG Mobility. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
