import { useState, useEffect, useCallback } from 'react'

import { type Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import Dialog from '@/components/dialog/Dialog'
import { BackIcon, InfoIcon, SearchIcon } from '@/components/icon/SVGIcon'

import styles from './Header.module.scss'

const Header = ({
	title,
	subTitle,
	backTo,
	isBackButtonDisplayed = true,
	isInfoButtonDisplayed = false,
	onInfoButtonClick,
	shouldConfirmLeave = false,
	isSearchButtonDisplayed = false,
}: {
	title?: string
	subTitle?: string
	backTo?: Url | number
	isBackButtonDisplayed?: boolean
	isInfoButtonDisplayed?: boolean
	onInfoButtonClick?: React.MouseEventHandler
	shouldConfirmLeave?: boolean
	isSearchButtonDisplayed?: boolean
}) => {
	const router = useRouter()
	const [isBackConfirmDialogOpen, setIsBackConfirmDialogOpen] = useState(false)
	const [isContinueToNextPage, setIsContinueToNextPage] = useState(false)

	const handleBackClick = useCallback(async () => {
		if (backTo && !(typeof backTo === 'number')) {
			router.push(backTo as string)
		} else if (backTo && typeof backTo === 'number') {
			history.go(backTo)
		} else if (history.length > 1) {
			router.back()
		} else {
			router.push('/')
		}
	}, [backTo, router])

	const handleBackConfirmDialog = () => {
		setIsBackConfirmDialogOpen(true)
	}

	const backConfirmDialog = () => {
		return (
			<Dialog
				title="Perhatian!"
				description="Apakah Anda yakin untuk kembali ke beranda? Data yang Anda isi dan belum dikirimkan akan terhapus dan Anda harus melakukan kembali proses yang dilakukan."
				confirmLabel="Kembali ke Beranda"
				cancelLabel="Batal"
				isOpen={isBackConfirmDialogOpen}
				onConfirm={handleContinueToNextPage}
				onCancel={handleCancelBackConfirmDialog}
			/>
		)
	}

	const handleContinueToNextPage = () => {
		setIsContinueToNextPage(true)
		setIsBackConfirmDialogOpen(false)
	}

	const handleCancelBackConfirmDialog = () => {
		setIsBackConfirmDialogOpen(false)
	}

	useEffect(() => {
		if (isContinueToNextPage) {
			void handleBackClick()
			setIsContinueToNextPage(!isContinueToNextPage)
		}
	}, [handleBackClick, isContinueToNextPage])

	return (
		<header className={styles.headerWrapper}>
			<div className={styles.wrapper}>
				{isBackButtonDisplayed && (
					<BackIcon
						className={`${styles.icon} ${styles.iconBack}`}
						onClick={
							shouldConfirmLeave ? handleBackConfirmDialog : handleBackClick
						}
					/>
				)}
				{shouldConfirmLeave && backConfirmDialog()}
				{/* {shouldConfirmLeave && <LeaveConfirmDialog shouldConfirmLeave />} */}
				<div className={styles.titleWrapper}>
					{title && <h3>{title}</h3>}
					{subTitle && <p>{subTitle}</p>}
				</div>
			</div>
			{isSearchButtonDisplayed && (
				<Link href="/pencarian" aria-label="Pencarian" prefetch={false}>
					<SearchIcon className={`${styles.icon} ${styles.iconSearch}`} />
				</Link>
			)}
			{isInfoButtonDisplayed && (
				<InfoIcon className={styles.icon} onClick={onInfoButtonClick} />
			)}
		</header>
	)
}
export default Header
