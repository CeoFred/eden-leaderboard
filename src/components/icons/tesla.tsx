import { cn } from 'utils'
import { SVGProps } from 'types'
import React, { forwardRef } from 'react'

const TeslaIcon = forwardRef<SVGSVGElement, SVGProps>(
  ({ className, ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={32}
        height={28}
        fill="none"
        className={cn(className)}
        ref={ref}
        {...props}
      >
        <g clipPath="url(#a)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.256 15.052c-.182.012-1.122.066-3.217.066-1.667 0-2.85-.048-3.266-.066-6.44-.27-11.249-1.335-11.249-2.61s4.808-2.34 11.25-2.613v4.162c.42.028 1.627.096 3.293.096 2 0 3.002-.08 3.182-.095v-4.16c6.428.272 11.225 1.337 11.225 2.61 0 1.272-4.796 2.337-11.225 2.608l.007.002Zm0-5.65V5.678h8.97V0H3.803v5.678h8.969V9.4C5.482 9.72 0 11.09 0 12.734c0 1.644 5.482 3.014 12.772 3.334V28h6.482V16.063C26.527 15.745 32 14.375 32 12.733 32 11.09 26.532 9.72 19.254 9.4l.002.002Z"
            fill="#fff"
          />
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" d="M0 0h32v28H0z" />
          </clipPath>
        </defs>
      </svg>
    )
  }
)

TeslaIcon.displayName = 'TeslaIcon'
export default TeslaIcon
