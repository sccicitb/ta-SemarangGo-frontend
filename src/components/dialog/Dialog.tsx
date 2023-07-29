import { useRef } from 'react'

import { Portal } from '@reach/portal'

import { useOutsideClick } from '@/hooks/useOutsideClick'

import styles from './Dialog.module.scss'
import Overlay from '../overlay/Overlay'

interface DialogProps {
	title: string
	description: string
	confirmLabel: string
	cancelLabel: string
	isOpen: boolean
	onConfirm?: () => void
	onCancel?: () => void
	onConfirmClick?: (value: boolean) => void
}

const Dialog = ({
	title,
	description,
	confirmLabel,
	cancelLabel,
	isOpen,
	onConfirm,
	onCancel,
	onConfirmClick,
}: DialogProps) => {
	const dialogRef = useRef<HTMLDivElement>(null)

	const handleConfirm = () => {
		onConfirm?.()
		onConfirmClick?.(true)
	}

	const handleCancel = () => {
		onCancel?.()
		onConfirmClick?.(false)
	}
	useOutsideClick([dialogRef], () => handleCancel())

	return (
		<Portal>
			<Overlay open={isOpen} delay={100} />
			{isOpen && (
				<div
					className={styles.dialogWrapper}
					aria-modal="true"
					role="dialog"
					ref={dialogRef}
				>
					<h2 className={styles.title}>{title}</h2>
					<p className={styles.description}>{description}</p>
					<div className={styles.buttonWrapper}>
						<button className={styles.confirmButton} onClick={handleConfirm}>
							{confirmLabel}
						</button>
						<button className={styles.cancelButton} onClick={handleCancel}>
							{cancelLabel}
						</button>
					</div>
				</div>
			)}
		</Portal>
	)
}
export default Dialog
