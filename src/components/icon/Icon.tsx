import React, { type CSSProperties } from 'react'

import { type MaterialSymbol } from 'material-symbols'

import 'material-symbols/outlined.css'
import styles from './Icon.module.scss'

const Icon = ({
	id,
	icon,
	className,
	style,
	onClick,
}: {
	id?: string
	icon: MaterialSymbol
	className?: string
	style?: CSSProperties
	onClick?: React.MouseEventHandler
}) => {
	return (
		<span
			id={id}
			style={style}
			className={`material-symbols-outlined ${styles.icon} ${className ?? ''}`}
			onClick={onClick}
		>
			{icon}
		</span>
	)
}
export default Icon
