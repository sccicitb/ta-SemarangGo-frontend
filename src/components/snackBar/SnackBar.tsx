import { useRef, useCallback, useEffect } from 'react'

import styles from './SnackBar.module.scss'
import { CloseIcon } from '../icon/SVGIcon'

interface SnackBarProp {
	open: boolean
	message: string | React.ReactNode
	icon?: React.ReactNode
	closeIcon?: React.ReactNode
	onOpen?: () => void
	onClose?: () => void
	onMessageClick?: () => void
}

const SnackBar = ({
	open,
	message,
	icon,
	closeIcon,
	onOpen,
	onClose,
	onMessageClick,
}: SnackBarProp) => {
	const snackBarRef = useRef<HTMLDivElement>(null)

	const handleOpen = useCallback(() => {
		onOpen?.()
		snackBarRef.current?.classList.add(styles.show)
	}, [onOpen])

	const handleClose = useCallback(() => {
		onClose?.()
		snackBarRef.current?.classList.remove(styles.show)
	}, [onClose])

	useEffect(() => {
		if (open) {
			handleOpen()
		} else {
			handleClose()
		}
	}, [handleClose, handleOpen, open])

	return (
		<div className={`${styles.snackbar} ${styles.topCenter}`} ref={snackBarRef}>
			<div className={styles.container}>
				{icon && <span className={styles.icon}>{icon}</span>}
				<p className={styles.message} onClick={onMessageClick}>
					{message}
				</p>
				<button
					type="button"
					className={styles.actionButton}
					onClick={handleClose}
				>
					{closeIcon ?? <CloseIcon />}
				</button>
			</div>
		</div>
	)
}

export default SnackBar
