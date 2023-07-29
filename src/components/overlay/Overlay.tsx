import { useEffect, type ReactNode, useState } from 'react'

import styles from './Overlay.module.scss'

interface OverlayProps {
	open: boolean
	children?: ReactNode
	blur?: boolean
	preventScroll?: boolean
	resetScroll?: boolean
	style?: React.CSSProperties
	delay?: number
}

function Overlay({
	open,
	children,
	blur,
	preventScroll,
	resetScroll,
	style,
	delay,
}: OverlayProps) {
	const [isShown, setIsShown] = useState(open)

	function lockScroll(e: { preventDefault: () => void }) {
		e.preventDefault()
	}

	useEffect(() => {
		const { body, documentElement } = document
		let { scrollTop } = document.documentElement
		if (preventScroll && resetScroll) {
			if (open) {
				// eslint-disable-next-line react-hooks/exhaustive-deps
				scrollTop = documentElement.scrollTop
				body.style.top = `-${scrollTop}px`
				body.classList.add(styles.stopScrolling)
				document.addEventListener('mousewheel touchmove', lockScroll)
			} else {
				scrollTop = parseInt(body.style.top)
				body.classList.remove(styles.stopScrolling)
				// if (resetScroll === false) documentElement.scrollTop = -scrollTop
				body.style.removeProperty('top')
				document.removeEventListener('mousewheel touchmove', lockScroll)
			}
		} else if (preventScroll) {
			if (open) {
				const scrollTop =
					window.pageYOffset || document.documentElement.scrollTop
				window.onscroll = function () {
					window.scrollTo(0, scrollTop)
				}
			} else {
				// eslint-disable-next-line @typescript-eslint/no-empty-function
				window.onscroll = function () {}
			}
		}
	}, [open, preventScroll, resetScroll])

	useEffect(() => {
		if (!open) {
			const timer = setTimeout(() => {
				setIsShown(false)
			}, delay)
			return () => clearTimeout(timer)
		} else {
			setIsShown(true)
		}
	}, [delay, open])

	return (
		<div
			className={`${styles.overlayWrapper} ${blur ? styles.blur : ''}`.trim()}
			hidden={!isShown}
			style={style}
		>
			{children}
		</div>
	)
}

export default Overlay
