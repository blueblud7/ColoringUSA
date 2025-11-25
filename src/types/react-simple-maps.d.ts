declare module 'react-simple-maps' {
  import { ReactNode, CSSProperties } from 'react'

  export interface Geography {
    rsmKey: string
    properties: {
      name?: string
      fips?: string
      state?: string
      [key: string]: any
    }
    [key: string]: any
  }

  export interface GeographiesProps {
    geography: string | object
    children: (props: { geographies: Geography[] }) => ReactNode
  }

  export interface GeographyProps {
    geography: Geography
    fill?: string
    stroke?: string
    strokeWidth?: number
    style?: {
      default?: CSSProperties
      hover?: CSSProperties
      pressed?: CSSProperties
    }
    onClick?: () => void
    onMouseEnter?: () => void
    onMouseLeave?: () => void
    [key: string]: any
  }

  export interface ComposableMapProps {
    projection?: string
    style?: CSSProperties
    children?: ReactNode
  }

  export interface ZoomableGroupProps {
    children?: ReactNode
    center?: [number, number]
    zoom?: number
  }

  export const ComposableMap: React.FC<ComposableMapProps>
  export const Geographies: React.FC<GeographiesProps>
  export const Geography: React.FC<GeographyProps>
  export const ZoomableGroup: React.FC<ZoomableGroupProps>
}


