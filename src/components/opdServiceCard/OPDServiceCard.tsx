import { type UrlObject } from 'url'

import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'
import ContentLoader from 'react-content-loader'

import defaultImg from '@/assets/images/semarang-logo.png'

import styles from './OPDServiceCard.module.scss'
import { CategoryIcon } from '../icon/SVGIcon'
interface OPDServiceCardProps {
	id: string
	name: string
	to?: string | UrlObject
	image?: string | StaticImageData
	totalService?: number
}

const OPDServicesCard = ({
	id,
	name,
	to,
	image,
	totalService,
}: OPDServiceCardProps) => {
	to ??= `/layanan/OPD/${id}`
	return (
		<Link className={styles.opdServiceCard} href={to} prefetch={false}>
			<Image src={image ?? defaultImg} alt={name} priority />
			<div className={styles.textWrapper}>
				<span className={styles.name}>{name}</span>
				{totalService && (
					<div className={styles.totalServiceWrapper}>
						<CategoryIcon />
						<span className={styles.totalService}>
							<b>{totalService}</b> Aplikasi
						</span>
					</div>
				)}
			</div>
		</Link>
	)
}
export default OPDServicesCard

export const OPDServicesCardSkeleton = ({ ...props }) => (
	<ContentLoader
		speed={2}
		style={{ width: '100%', height: 197 }}
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
		uniqueKey="opd-service-card-skeleton"
		{...props}
	>
		<rect x="0" y="0" rx="8" ry="8" width="100%" height="140" />
		<rect x="0" y="150" rx="8" ry="8" width="50%" height="15" />
		<circle cx="10" cy="182" r="10" />
		<rect x="25" y="175" rx="8" ry="8" width="30%" height="15" />
	</ContentLoader>
)
