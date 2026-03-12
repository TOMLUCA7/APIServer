import * as React from 'react'
import { cva } from 'class-variance-authority'

import { cn } from '../../lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 ring-offset-white',
  {
    variants: {
      variant: {
        default: 'bg-slate-900 text-slate-50 hover:bg-slate-900/90',
        secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-100/80',
        outline: 'text-slate-900 border-slate-200',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const Badge = React.forwardRef(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(badgeVariants({ variant }), className)}
    {...props}
  />
))

Badge.displayName = 'Badge'

export { Badge, badgeVariants }
