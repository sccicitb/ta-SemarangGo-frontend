import React, { type CSSProperties } from 'react'

import styles from './Button.module.scss'
import { NextIcon, PrevIcon } from '../icon/SVGIcon'

const NextButton = ({
	onClick,
	icon,
	ref,
	disabled,
	className,
	style,
}: {
	onClick?: () => void
	icon?: React.ReactNode
	ref?: React.Ref<HTMLButtonElement>
	disabled?: boolean
	className?: string
	style?: CSSProperties
}) => {
	return (
		<button
			role="button"
			aria-label="Next button"
			onClick={onClick}
			ref={ref}
			disabled={disabled}
			className={`${styles.button} ${className ?? ''}`}
			style={style}
		>
			{icon ?? <NextIcon />}
		</button>
	)
}

const PrevButton = ({
	onClick,
	icon,
	ref,
	disabled,
	className,
	style,
}: {
	onClick?: () => void
	icon?: React.ReactNode
	ref?: React.Ref<HTMLButtonElement>
	disabled?: boolean
	className?: string
	style?: CSSProperties
}) => {
	return (
		<button
			role="button"
			aria-label="Previous button"
			onClick={onClick}
			ref={ref}
			disabled={disabled}
			className={`${styles.button} ${className ?? ''}`}
			style={style}
		>
			{icon ?? <PrevIcon />}
		</button>
	)
}

export { NextButton, PrevButton }
