import { cn } from 'utils'
import { SVGProps } from 'types'
import React, { forwardRef } from 'react'

const WhiteLogoIcon = forwardRef<SVGSVGElement, SVGProps>(
  ({ className, ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={32}
        height={32}
        fill="none"
        className={cn(className)}
        ref={ref}
        {...props}
      >
        <path
          d="M27.997 4v2.667A9.333 9.333 0 0 1 18.664 16h-1.333v1.333h6.666v9.334a2.667 2.667 0 0 1-2.666 2.666H10.664a2.667 2.667 0 0 1-2.667-2.666v-9.334h6.667v-4A9.333 9.333 0 0 1 23.997 4h4ZM7.331 2.667a9.986 9.986 0 0 1 8.165 4.225 10.613 10.613 0 0 0-2.165 6.441v1.333h-.667a10 10 0 0 1-10-10v-2h4.667Z"
          fill="#fff"
        />
      </svg>
    )
  }
)

WhiteLogoIcon.displayName = 'WhiteLogoIcon'
export default WhiteLogoIcon
