import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react"

interface Column<T> {
  key: string
  header: string
  sortable?: boolean
  render?: (item: T) => React.ReactNode
  className?: string
}

interface TableProps<T> {
  data: T[]
  columns: Column<T>[]
  keyField: keyof T
  sortable?: boolean
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  onSort?: (key: string) => void
  onRowClick?: (item: T) => void
  selectedRows?: string[]
  onSelectRow?: (id: string) => void
  onSelectAll?: () => void
  isLoading?: boolean
  emptyMessage?: string
}

export function Table<T extends Record<string, any>>({
  data,
  columns,
  keyField,
  sortable = true,
  sortBy,
  sortOrder = 'asc',
  onSort,
  onRowClick,
  selectedRows = [],
  onSelectRow,
  onSelectAll,
  isLoading,
  emptyMessage = "No data available",
}: TableProps<T>) {
  const allSelected = data.length > 0 && data.every(item => selectedRows.includes(item[keyField]))
  const someSelected = data.some(item => selectedRows.includes(item[keyField])) && !allSelected

  if (isLoading) {
    return (
      <div className="w-full overflow-auto rounded-lg border border-border">
        <table className="w-full">
          <thead>
            <tr className="bg-bg-alt">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-3 text-left text-sm font-semibold text-mid border-b border-border"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
              <tr key={i} className="border-b border-border">
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-4">
                    <div className="h-4 w-full skeleton" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="w-full overflow-auto rounded-lg border border-border">
        <table className="w-full">
          <thead>
            <tr className="bg-bg-alt">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-3 text-left text-sm font-semibold text-mid border-b border-border"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
        </table>
        <div className="py-12 text-center text-mid">{emptyMessage}</div>
      </div>
    )
  }

  return (
    <div className="w-full overflow-auto rounded-lg border border-border">
      <table className="w-full">
        <thead>
          <tr className="bg-bg-alt border-b border-border">
            {onSelectRow && (
              <th className="px-4 py-3 w-10">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={input => { if (input) input.indeterminate = someSelected }}
                  onChange={onSelectAll}
                  className="h-4 w-4 rounded border-border text-brand-green focus:ring-brand-green"
                />
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  "px-4 py-3 text-left text-sm font-semibold text-mid",
                  sortable && column.sortable && "cursor-pointer hover:bg-gray-100",
                  column.className
                )}
                onClick={() => sortable && column.sortable && onSort?.(column.key)}
              >
                <div className="flex items-center gap-1">
                  {column.header}
                  {sortable && column.sortable && (
                    sortBy === column.key ? (
                      sortOrder === 'asc' ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )
                    ) : (
                      <ChevronsUpDown className="h-4 w-4 opacity-50" />
                    )
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            const isSelected = selectedRows.includes(item[keyField])
            return (
              <tr
                key={String(item[keyField])}
                className={cn(
                  "border-b border-border transition-colors",
                  onRowClick && "cursor-pointer hover:bg-brand-green-light/30",
                  isSelected && "bg-brand-green-light/50"
                )}
                onClick={() => onRowClick?.(item)}
              >
                {onSelectRow && (
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onSelectRow(String(item[keyField]))}
                      className="h-4 w-4 rounded border-border text-brand-green focus:ring-brand-green"
                    />
                  </td>
                )}
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={cn("px-4 py-3 text-sm text-dark", column.className)}
                  >
                    {column.render ? column.render(item) : item[column.key]}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

interface PaginationProps {
  page: number
  totalPages: number
  total: number
  limit: number
  onPageChange: (page: number) => void
  onLimitChange?: (limit: number) => void
}

export function Pagination({ page, totalPages, total, limit, onPageChange, onLimitChange }: PaginationProps) {
  const start = (page - 1) * limit + 1
  const end = Math.min(page * limit, total)

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-bg-alt">
      <div className="flex items-center gap-4">
        <span className="text-sm text-mid">
          Showing {start} to {end} of {total} results
        </span>
        {onLimitChange && (
          <select
            value={limit}
            onChange={(e) => onLimitChange(Number(e.target.value))}
            className="h-8 rounded border border-border px-2 text-sm"
          >
            {[10, 25, 50, 100].map((n) => (
              <option key={n} value={n}>{n} per page</option>
            ))}
          </select>
        )}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="px-3 py-1 text-sm border border-border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-sm text-mid">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="px-3 py-1 text-sm border border-border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  )
}
