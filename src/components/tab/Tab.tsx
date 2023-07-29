import React, { useRef, useState, useEffect } from 'react'

import styles from './Tab.module.scss'

export const Tab = ({
	name,
	label,
	active,
	onClick,
	value,
}: {
	name?: string
	label: string
	active?: boolean
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
	value?: string | number
}) => {
	return (
		<button
			name={name}
			role="tab"
			onClick={onClick}
			className={active ? styles.activeTab : styles.tab}
			value={value}
		>
			{label}
		</button>
	)
}

export const Tabs = ({
	selectedTab,
	onChange,
	children,
}: {
	selectedTab: number
	onChange: (
		e: React.MouseEvent<HTMLButtonElement>,
		value: string | number,
	) => void
	children: React.ReactElement[]
}) => {
	const containerRef = useRef<HTMLDivElement>(null)
	const [containerWidth, setContainerWidth] = useState(0)

	useEffect(() => {
		setContainerWidth(containerRef.current?.getBoundingClientRect().width ?? 0)
	}, [containerRef])

	const sliderWidth = containerWidth / children.length

	const tabs = children.map((child) => {
		const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
			onChange(e, child.props.value)
		}

		return React.cloneElement(child, {
			key: child.props.value,
			active: child.props.value === selectedTab,
			onClick: handleClick,
			value: child.props.value,
		})
	})

	return (
		<div className={styles.tabWrapper} ref={containerRef}>
			<div className={styles.tabHolder}>{tabs}</div>
			<div
				className={styles.tabSlider}
				style={{
					width: sliderWidth,
					transform: `translateX(${sliderWidth * selectedTab}px)`,
				}}
			/>
		</div>
	)
}
