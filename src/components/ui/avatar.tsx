import * as React from "react"
import { cn, getInitials } from "@/lib/utils"

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  name?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
}

export function Avatar({ src, alt, name, size = 'md', className, ...props }: AvatarProps) {
  const [error, setError] = React.useState(false)

  if (src && !error) {
    return (
      <div
        className={cn(
          "relative rounded-full overflow-hidden bg-gray-200",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        <img
          src={src}
          alt={alt || name}
          className="h-full w-full object-cover"
          onError={() => setError(true)}
        />
      </div>
    )
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-brand-green text-white font-medium",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {name ? getInitials(name) : '?'}
    </div>
  )
}
