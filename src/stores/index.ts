import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, Terminal, Notification } from '@/types'

const isClient = typeof window !== 'undefined'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  terminalScope: string[]
  selectedTerminalId: string | null
  login: (user: User) => void
  logout: () => void
  setSelectedTerminal: (terminalId: string) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      terminalScope: [],
      selectedTerminalId: null,
      login: (user) => set({ 
        user, 
        isAuthenticated: true,
        terminalScope: user.terminalScope || [],
        selectedTerminalId: user.terminalScope?.[0] || null
      }),
      logout: () => set({ 
        user: null, 
        isAuthenticated: false,
        terminalScope: [],
        selectedTerminalId: null 
      }),
      setSelectedTerminal: (terminalId) => set({ selectedTerminalId: terminalId }),
    }),
    {
      name: 'gigm-auth',
      skipHydration: true,
    }
  )
)

interface UIState {
  sidebarCollapsed: boolean
  notifications: Notification[]
  toggleSidebar: () => void
  setSidebarCollapsed: (collapsed: boolean) => void
  addNotification: (notification: Notification) => void
  markNotificationRead: (id: string) => void
  clearNotifications: () => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      notifications: [],
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
      addNotification: (notification) => set((state) => ({ 
        notifications: [notification, ...state.notifications].slice(0, 50) 
      })),
      markNotificationRead: (id) => set((state) => ({
        notifications: state.notifications.map(n => 
          n.id === id ? { ...n, read: true } : n
        )
      })),
      clearNotifications: () => set({ notifications: [] }),
    }),
    {
      name: 'gigm-ui',
      skipHydration: true,
    }
  )
)

interface BookingState {
  searchParams: {
    from: string
    to: string
    date: string
    class: 'economy' | 'first_class' | 'prime'
    pax: number
  }
  selectedSeats: number[]
  passengers: Array<{
    title: string
    firstName: string
    lastName: string
    phone: string
    email?: string
    nextOfKin: { name: string; phone: string; relationship: string }
    luggage: 'none' | 'standard' | 'oversized'
  }>
  setSearchParams: (params: Partial<BookingState['searchParams']>) => void
  setSelectedSeats: (seats: number[]) => void
  toggleSeat: (seatNumber: number) => void
  setPassengers: (passengers: BookingState['passengers']) => void
  clearBooking: () => void
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      searchParams: {
        from: '',
        to: '',
        date: new Date().toISOString().split('T')[0],
        class: 'economy',
        pax: 1,
      },
      selectedSeats: [],
      passengers: [],
      setSearchParams: (params) => set((state) => ({ 
        searchParams: { ...state.searchParams, ...params } 
      })),
      setSelectedSeats: (seats) => set({ selectedSeats: seats }),
      toggleSeat: (seatNumber) => set((state) => ({
        selectedSeats: state.selectedSeats.includes(seatNumber)
          ? state.selectedSeats.filter(s => s !== seatNumber)
          : [...state.selectedSeats, seatNumber]
      })),
      setPassengers: (passengers) => set({ passengers }),
      clearBooking: () => set({ 
        selectedSeats: [], 
        passengers: [],
        searchParams: {
          from: '',
          to: '',
          date: new Date().toISOString().split('T')[0],
          class: 'economy',
          pax: 1,
        }
      }),
    }),
    {
      name: 'gigm-booking',
      skipHydration: true,
    }
  )
)

interface TerminalState {
  terminals: Terminal[]
  setTerminals: (terminals: Terminal[]) => void
}

export const useTerminalStore = create<TerminalState>()(
  persist(
    (set) => ({
      terminals: [],
      setTerminals: (terminals) => set({ terminals }),
    }),
    {
      name: 'gigm-terminals',
      skipHydration: true,
    }
  )
)
