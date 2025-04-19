import { cn } from 'utils'
import { SVGProps } from 'types'
import React, { forwardRef } from 'react'

const LogoIcon = forwardRef<SVGSVGElement, SVGProps>(
  ({ className, ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={19}
        height={20}
        fill="none"
        className={cn(className)}
        ref={ref}
        {...props}
      >
        <path
          d="M18.998 1v2a7 7 0 0 1-7 7h-1v1h5v7a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-7h5V8a7 7 0 0 1 7-7h3Zm-15.5-1a7.49 7.49 0 0 1 6.124 3.169A7.96 7.96 0 0 0 7.998 8v1h-.5a7.5 7.5 0 0 1-7.5-7.5V0h3.5Z"
          fill="#9669ED"
        />
      </svg>
    )
  }
)

LogoIcon.displayName = 'LogoIcon'
export default LogoIcon
