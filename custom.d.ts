declare module '*.svg' {
	import type { ReactElement, SVGProps } from 'react'

	const content: React.FC<React.SVGProps<SVGSVGElement>>
	export default content
}

declare module '*.module.css' {
	const classes: { [key: string]: string }
	export default classes
}

declare module '*.module.scss' {
	const classes: { [key: string]: string }
	export default classes
}

declare module 'react-datepicker' {
	export interface CalendarContainerProps {
		className?: string | undefined
		children?: React.ReactNode | React.ReactNode[] | undefined
		showPopperArrow?: boolean | undefined
		arrowProps?: { [propName: string]: any } | undefined
	}
}
