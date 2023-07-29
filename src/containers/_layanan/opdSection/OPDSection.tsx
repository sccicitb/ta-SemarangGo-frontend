import { type UrlObject } from 'url'

import { useEffect, useState } from 'react'

import { CallIcon, LocationIcon, MailIcon } from '@/components/icon/SVGIcon'
import OutlinedButton from '@/components/outlinedButton/OutlinedButton'
import { checkHTTPS, isProtocolExist } from '@/utils/url'

import styles from './OPDSection.module.scss'

interface OPDSectionProps {
	title?: string
	description?: string
	telp?: string
	email?: string
	url?: string | UrlObject
	address?: string
}

const OPDSection = ({
	title,
	description,
	telp,
	email,
	address,
	url,
}: OPDSectionProps) => {
	const openInNewTab = (url: string | URL | undefined) => {
		const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
		if (newWindow) newWindow.opener = null
	}
	const [externalUrl, setExternalUrl] = useState(url as string)

	useEffect(() => {
		if (url) {
			async function checkProtocol() {
				setExternalUrl(
					(await checkHTTPS(url as string))
						? `http://${url as string}`
						: `https://${url as string}`,
				)
			}
			if (!isProtocolExist(url as string)) {
				void checkProtocol()
			}
		}
	}, [externalUrl, url])

	return (
		<section className={styles.opdSection}>
			{title && <h3>{title}</h3>}
			{description && <p>{description}</p>}
			<div className={styles.contentWrapper}>
				{telp && (
					<a href={`tel:${telp}`} className={styles.contenItem}>
						<CallIcon />
						<p>{telp}</p>
					</a>
				)}
				{email && (
					<a href={`mailto:${email}`} className={styles.contenItem}>
						<MailIcon />
						<p>{email}</p>
					</a>
				)}
				{address && (
					<div className={styles.contenItem}>
						<LocationIcon />
						<p>{address}</p>
					</div>
				)}
			</div>
			{url && (
				<OutlinedButton
					className={styles.button}
					text="Buka Situs Resmi"
					onClick={() => openInNewTab(externalUrl)}
					isIconDisplayed
				/>
			)}
		</section>
	)
}
export default OPDSection
