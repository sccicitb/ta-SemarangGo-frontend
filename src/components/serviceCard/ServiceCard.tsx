import { type UrlObject } from 'url'

import { useEffect, useState } from 'react'

import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'
import ContentLoader from 'react-content-loader'

import { slugify } from '@/utils/string'
import { checkHTTPS, removeProtocol } from '@/utils/url'

import styles from './ServiceCard.module.scss'

interface ServiceCardProps {
	image: string | StaticImageData
	title: string
	desc: string
	org: string
	to?: UrlObject | string
	url: string
	isImageDisplayed?: boolean
	isOrgDisplayed?: boolean
	cluster?: string
	id?: string
}

const ServiceCard = ({
	image,
	title,
	desc,
	org,
	to,
	url,
	isImageDisplayed = true,
	isOrgDisplayed = true,
	cluster,
	id,
}: ServiceCardProps) => {
	const [isHttpsTo, setIsHttpsTo] = useState(false)
	url = removeProtocol(url)
	to ??= `/layanan/${cluster ?? 'semua'}/${id ?? slugify(title)}`
	const originTo = to
	if (!id) {
		to = `${to as string}?url=https://${url}&title=${title}`
	}

	useEffect(() => {
		async function checkProtocol() {
			setIsHttpsTo(await checkHTTPS(url))
		}
		void checkProtocol()
	}, [url])
	return (
		<Link
			href={isHttpsTo ? to : `http://${url}`}
			as={isHttpsTo ? originTo : undefined}
			rel={isHttpsTo ? undefined : 'noopener noreferrer'}
			target={isHttpsTo ? undefined : '_blank'}
			className={styles.wrapper}
			draggable={false}
			prefetch={false}
		>
			<div className={styles.serviceCard}>
				{isImageDisplayed && (
					<div className={styles.imageWrapper}>
						<Image src={image} draggable={false} alt="" />
					</div>
				)}
				<div className={styles.textWrapper}>
					<h4 className={styles.title}>{title}</h4>
					<p className={styles.description}>{desc}</p>
					{isOrgDisplayed && (
						<div className={styles.orgWrapper}>
							<span className={styles.org}>{org}</span>
						</div>
					)}
				</div>
			</div>
		</Link>
	)
}

export default ServiceCard

export const ServiceCardSkeleton = () => {
	return (
		<ContentLoader
			speed={2}
			style={{ width: '100%', height: '102' }}
			backgroundColor="#f3f3f3"
			foregroundColor="#ecebeb"
			uniqueKey="service-card-skeleton"
		>
			<rect x="0" y="0" rx="8" ry="8" width="24%" height="100%" />
			<rect x="26%" y="2" rx="8" ry="8" width="180" height="16" />
			<rect x="26%" y="25" rx="8" ry="8" width="74%" height="10" />
			<rect x="26%" y="40" rx="8" ry="8" width="74%" height="10" />
			<rect x="26%" y="55" rx="8" ry="8" width="50%" height="10" />
			<rect x="26%" y="72" rx="8" ry="8" width="120" height="25" />
		</ContentLoader>
	)
}
