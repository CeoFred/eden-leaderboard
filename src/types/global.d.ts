import { type LucideIcon } from "lucide-react"
export interface SVGProps extends React.SVGAttributes<SVGSVGElement> {
    children?: React.ReactNode
}

type ThemeState = 'light' | 'dark' | 'system'


export type FeatureCardProps = {
    icon: LucideIcon
    title: string
    description: string
}