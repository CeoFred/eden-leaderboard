import { cn } from 'utils'
import { SVGProps } from 'types'
import React, { forwardRef } from 'react'

const EthereumIcon = forwardRef<SVGSVGElement, SVGProps>(
  ({ className, ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={23}
        height={35}
        fill="none"
        className={cn(className)}
        ref={ref}
        {...props}
      >
        <g clipPath="url(#a)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="m11.058 0 11 17.595-11 6.267-11-6.267L11.057 0Zm-.003 25.76 11.002-6.669L11.055 35 .059 19.093l10.996 6.667Z"
            fill="#fff"
          />
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" transform="translate(.057)" d="M0 0h22v35H0z" />
          </clipPath>
        </defs>
      </svg>
    )
  }
)

EthereumIcon.displayName = 'EthereumIcon'
export default EthereumIcon
