"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"

interface DropdownProps {
  trigger: React.ReactNode
  children: React.ReactNode
  align?: 'start' | 'end' | 'center'
}

export function Dropdown({ trigger, children, align = 'start' }: DropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  const alignClasses = {
    start: 'left-0',
    end: 'right-0',
    center: 'left-1/2 -translate-x-1/2',
  }

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "absolute z-50 mt-1 min-w-[180px] rounded-md border border-border bg-surface shadow-md py-1",
              alignClasses[align]
            )}
          >
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child as React.ReactElement<{ onClose?: () => void }>, {
                  onClose: () => setIsOpen(false),
                })
              }
              return child
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface DropdownItemProps {
  children: React.ReactNode
  onClick?: () => void
  icon?: React.ReactNode
  danger?: boolean
  disabled?: boolean
  onClose?: () => void
}

export function DropdownItem({ children, onClick, icon, danger, disabled, onClose }: DropdownItemProps) {
  return (
    <button
      onClick={() => {
        onClick?.()
        onClose?.()
      }}
      disabled={disabled}
      className={cn(
        "w-full flex items-center gap-2 px-3 py-2 text-sm text-left transition-colors",
        danger ? "text-error hover:bg-error-light" : "text-dark hover:bg-gray-100",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      {icon}
      {children}
    </button>
  )
}

export function DropdownSeparator() {
  return <div className="h-px bg-border my-1" />
}

interface DropdownSubMenuProps {
  label: string
  icon?: React.ReactNode
  children: React.ReactNode
}

export function DropdownSubMenu({ label, icon, children }: DropdownSubMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="w-full flex items-center justify-between px-3 py-2 text-sm text-dark hover:bg-gray-100">
        <span className="flex items-center gap-2">
          {icon}
          {label}
        </span>
        <ChevronRight className="h-4 w-4" />
      </button>
      {isOpen && (
        <div className="absolute left-full top-0 ml-0.5 min-w-[160px] rounded-md border border-border bg-surface shadow-md py-1">
          {children}
        </div>
      )}
    </div>
  )
}
