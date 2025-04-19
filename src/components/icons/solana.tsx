import { cn } from 'utils'
import { SVGProps } from 'types'
import React, { forwardRef } from 'react'

const SolanaIcon = forwardRef<SVGSVGElement, SVGProps>(
  ({ className, ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={28}
        height={28}
        fill="none"
        className={cn(className)}
        ref={ref}
        {...props}
      >
        <g clipPath="url(#a)">
          <path
            d="m26.643 18.559-3.478 4.554a.92.92 0 0 1-.637.357L3.862 25.556a.469.469 0 0 1-.259-.045.438.438 0 0 1-.159-.667l3.481-4.554a.92.92 0 0 1 .635-.358l18.665-2.085a.47.47 0 0 1 .259.045.438.438 0 0 1 .16.667Zm-4.863-7.844a.92.92 0 0 0-.7-.208L2.413 12.592a.47.47 0 0 0-.243.1.438.438 0 0 0-.008.686l4.4 3.674a.922.922 0 0 0 .699.209l18.664-2.086a.47.47 0 0 0 .243-.1.438.438 0 0 0 .008-.686l-4.397-3.674ZM2.116 9.92 20.78 7.835a.941.941 0 0 0 .637-.358l3.478-4.554a.443.443 0 0 0 .031-.49.453.453 0 0 0-.19-.176.469.469 0 0 0-.259-.045L5.814 4.297a.941.941 0 0 0-.636.357l-3.48 4.554a.444.444 0 0 0-.031.49c.045.076.11.138.19.177.08.039.17.055.259.045Z"
            fill="#fff"
          />
        </g>
        <defs>
          <clipPath id="a">
            <path
              fill="#fff"
              transform="rotate(-6.375 29.997 -6.543)"
              d="M0 0h24v24H0z"
            />
          </clipPath>
        </defs>
      </svg>
    )
  }
)

SolanaIcon.displayName = 'SolanaIcon'
export default SolanaIcon
