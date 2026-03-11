import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string = 'NGN'): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

export function formatDate(date: Date | string, format: 'short' | 'long' | 'time' = 'short'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  
  if (format === 'time') {
    return d.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit', hour12: true })
  }
  
  if (format === 'long') {
    return d.toLocaleDateString('en-NG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  }
  
  return d.toLocaleDateString('en-NG', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.startsWith('234')) {
    return `+${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`
  }
  if (cleaned.startsWith('0')) {
    return `+234-${cleaned.slice(1, 4)}-${cleaned.slice(4, 8)}`
  }
  return phone
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}

export function generateId(prefix: string = ''): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).slice(2, 8)
  return prefix ? `${prefix}-${timestamp}${random}` : `${timestamp}${random}`
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function getStatusColor(status: string): string {
  const statusMap: Record<string, string> = {
    active: 'status-active',
    confirmed: 'status-confirmed',
    completed: 'status-completed',
    delivered: 'status-delivered',
    pending: 'status-pending',
    scheduled: 'status-scheduled',
    'in-transit': 'status-in-transit',
    warning: 'status-warning',
    delayed: 'status-warning',
    'at-risk': 'status-warning',
    cancelled: 'status-cancelled',
    failed: 'status-cancelled',
    rejected: 'status-cancelled',
    inactive: 'status-inactive',
    retired: 'status-inactive',
    closed: 'status-inactive',
  }
  return statusMap[status.toLowerCase()] || 'status-pending'
}
