/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { animated, useSpring } from '@react-spring/web'

import { useOutsideClick } from '@/hooks/useOutsideClick'
import useReduceMotion from '@/hooks/useReduceMotion'

import styles from './BottomSheet.module.scss'
import {
	bottomSheetEvents,
	syncHeight,
	type TBottomSheetEventsKey,
} from './util'
import { CloseIcon } from '../icon/SVGIcon'
import Overlay from '../overlay/Overlay'

//  TODO - account for resizing the window
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
let DRAWER_HEIGHT = 0
const INITIAL_DRAWER_DISTANCE_FROM_TOP = 400
const MAX_WIDTH = 640
const DRAWER_SNAP_MARGIN = 100
const COLLAPSED_HEIGHT = 75
const THUMB_HEIGHT = 35

// resize listener
if (typeof window !== 'undefined') {
	DRAWER_HEIGHT = window.innerHeight
	window.addEventListener('resize', syncHeight)
	syncHeight()
}

interface BottomSheetProps {
	/**
	 * nested children
	 */
	children: JSX.Element
	/**
	 * optional specific aria label for close button
	 */
	closeButtonAriaLabel?: string
	/**
	 * Custom initial expanded height
	 */
	initialDrawerDistanceTop?: number
	/**
	 * Do you want to see logs instead of children in the BottomSheet?
	 */
	isDebugMode?: boolean
	/**
	 * Is the BottomSheet visible on the scren?
	 */
	isOpen: boolean
	/**
	 * Optional custom maxWidth for the BottomSheet in px
	 */
	maxWidth?: string | number
	/**
	 * Fires when close button is fired
	 */
	onClose: () => void
	/**
	 * Fires when the status changes
	 */
	onStatusChange?: (status: string) => void
	/**
	 * Optional Subtitle for the BottomSheet
	 */
	subtitle?: string
	/**
	 * Optional Title for the BottomSheet
	 */
	title?: string
}

const BottomSheet = ({
	children,
	closeButtonAriaLabel = 'Close',
	initialDrawerDistanceTop = INITIAL_DRAWER_DISTANCE_FROM_TOP,
	isDebugMode = false,
	isOpen,
	maxWidth = MAX_WIDTH,
	onClose,
	onStatusChange,
	subtitle,
	title,
}: BottomSheetProps) => {
	// STATE
	const scrollRef = useRef<HTMLDivElement>(null)
	const [bottom, setBottom] = useState(-DRAWER_HEIGHT)
	const [draggingPosition, setDraggingPosition] = useState<number | null>(null)
	const [debugLog, setDebugLog] = useState<string>('')
	const bottomSheetRef = useRef<HTMLDivElement>(null)
	useOutsideClick([bottomSheetRef], () => onClose())

	// ANIMATION
	const prefersReducedMotion = useReduceMotion()
	const animateStyles = useSpring({
		bottom,
		immediate: prefersReducedMotion,
		config: { friction: 20 },
	})

	// HANDLERS
	const handlePointerDown = (
		e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>,
	) => {
		const event = (window.TouchEvent && e.nativeEvent instanceof TouchEvent
			? e.nativeEvent.touches[0]
			: e) as unknown as MouseEvent
		document.documentElement.classList.add('is-locked')
		const newDraggingPosition =
			(e.currentTarget.parentElement?.getBoundingClientRect().bottom ?? 0) -
			event.clientY
		setDraggingPosition(newDraggingPosition)
	}

	const handlePointerMove = useCallback(
		(e: TouchEvent | MouseEvent) => {
			const event = (
				window.TouchEvent && e instanceof TouchEvent ? e.touches[0] : e
			) as MouseEvent
			if (draggingPosition != null) {
				const newBottom = window.innerHeight - event.clientY - draggingPosition
				if (newBottom !== bottom) {
					setBottom(newBottom)
				}
			}
		},
		[bottom, draggingPosition],
	)

	const handleScrollRepositioning = () => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = 0
		}
	}

	const handleStatusChange = React.useCallback(
		(status: TBottomSheetEventsKey) => {
			const newStatus = bottomSheetEvents[status]
			const newDebugLog =
				debugLog !== '' ? `${debugLog}, ${newStatus}` : newStatus
			setDebugLog(newDebugLog)
			onStatusChange?.(newStatus)
		},
		[debugLog, onStatusChange],
	)

	// LISTENERS

	// toggling the bottom sheet
	useEffect(() => {
		if (isOpen) {
			handleStatusChange('expanded')
			handleScrollRepositioning()
			setBottom(-initialDrawerDistanceTop)
		} else {
			handleStatusChange('dismissed')
			setBottom(-DRAWER_HEIGHT)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen])

	// dragging
	useEffect(() => {
		const handlePointerUp = () => {
			document.documentElement.classList.remove('is-locked')

			if (draggingPosition == null) {
				return
			}

			// snap logic
			if (bottom > -DRAWER_SNAP_MARGIN) {
				handleStatusChange('snapToTop')
				setBottom(0)
			} else if (bottom < -DRAWER_HEIGHT + COLLAPSED_HEIGHT) {
				handleStatusChange('dismissed')
				onClose()
				setBottom(-DRAWER_HEIGHT)
			} else if (
				bottom <
				COLLAPSED_HEIGHT - DRAWER_HEIGHT + DRAWER_SNAP_MARGIN
			) {
				handleStatusChange('collapsed')
				setBottom(-DRAWER_HEIGHT + COLLAPSED_HEIGHT)
			}
			setDraggingPosition(null)
		}

		document.addEventListener('touchend', handlePointerUp)
		document.addEventListener('touchmove', handlePointerMove)
		document.addEventListener('mouseup', handlePointerUp)
		document.addEventListener('mousemove', handlePointerMove)
		return () => {
			document.removeEventListener('touchend', handlePointerUp)
			document.removeEventListener('touchmove', handlePointerMove)
			document.removeEventListener('mouseup', handlePointerUp)
			document.removeEventListener('mousemove', handlePointerMove)
		}
	}, [
		bottom,
		debugLog,
		draggingPosition,
		handlePointerMove,
		handleStatusChange,
		onClose,
	])

	return (
		<>
			<Overlay open={isOpen} delay={250} preventScroll />
			<animated.div
				style={{
					maxWidth: `${maxWidth}px`,
					left: '50%',
					transform: 'translateX(-50%)',
					position: 'fixed',
					width: '100%',
					height: DRAWER_HEIGHT,
					transition: 'height 200ms',
					zIndex: 15,
					...animateStyles,
				}}
				ref={bottomSheetRef}
			>
				<div
					className={styles.bottomSheet}
					aria-modal="true"
					role="dialog"
					aria-labelledby="BottomSheet-title"
					suppressHydrationWarning
				>
					<div onMouseDown={handlePointerDown} onTouchStart={handlePointerDown}>
						<div
							className={`${styles.thumbBarWrapper} ${
								draggingPosition == null ? styles.grabbable : styles.grabbing
							}`}
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
							onDragStart={(e: any) => {
								e.preventDefault()
								e.dataTransfer.setDragImage(new Image(), 0, 0)
							}}
							draggable
						>
							<div className={styles.thumbBar} />
						</div>
						<div className={styles.header}>
							<div className={styles.headerTitle}>
								{title && <h1 id="BottomSheet-title">{title}</h1>}
								{subtitle && <h2>{subtitle}</h2>}
							</div>
							<button
								className={styles.closeButton}
								type="button"
								onClick={() => {
									onClose()
									handleStatusChange('dismissed')
								}}
								aria-label={closeButtonAriaLabel}
							>
								<CloseIcon />
							</button>
						</div>
					</div>
					<div
						className={styles.sheetBody}
						ref={scrollRef}
						tabIndex={0}
						style={{
							height:
								DRAWER_HEIGHT +
								bottom -
								(title ?? subtitle ? COLLAPSED_HEIGHT : THUMB_HEIGHT),
						}}
					>
						{isDebugMode ? (
							<p className={styles.debugLog}>{debugLog}</p>
						) : (
							// <RemoveScroll removeScrollBar={false}>{children}</RemoveScroll>
							children
						)}
					</div>
				</div>
			</animated.div>
		</>
	)
}
export default BottomSheet
