import type { SVGProps } from 'react'

// Placeholder wordmark. Swap in the real brand SVG when available.
export const Raymond = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 130 28" xmlns="http://www.w3.org/2000/svg" {...props}>
        <text
            x="0"
            y="20"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            fontSize="20"
            fontWeight="600">
            Raymond
        </text>
    </svg>
)
