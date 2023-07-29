import { type Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'
import ContentLoader from 'react-content-loader'

import { clusterBEMap } from '@/models/cityIndex'
import { getKey } from '@/utils/map'
import { slugify, titleCase } from '@/utils/string'

import styles from './IndexCard.module.scss'
import { IndexIcon, TargetIcon } from '../icon/SVGIcon'

const Tag = ({ text }: { text: string }) => {
	return (
		<div className={`${styles.tag}`}>
			<span className={`${styles.tagText}`}>{text}</span>
		</div>
	)
}

interface IndexCardProps {
	id?: string
	title: string
	currentIndex: number
	targetIndex: number
	description: string
	tag: string
	isTagDisplayed?: boolean
	to?: Url
	cluster?: string
}

const IndexCard = ({
	id,
	title,
	currentIndex,
	targetIndex,
	description,
	tag,
	isTagDisplayed = false,
	to,
	cluster,
}: IndexCardProps) => {
	to ??= `/indeks-kota-cerdas/${getKey(clusterBEMap, cluster)}/${slugify(
		title,
	)}`
	return (
		<Link href={to} className={styles.indexCard} prefetch={false}>
			<h4 className={styles.title}>{title}</h4>
			<div className={styles.indexWrapper}>
				<div className={styles.index}>
					<IndexIcon />
					<div className={styles.textWrapper}>
						<span className={styles.valueType}>Indeks</span>
						<span className={styles.value}>
							{currentIndex.toLocaleString('id-ID')}
						</span>
					</div>
				</div>
				<div className={styles.index}>
					<TargetIcon />
					<div className={styles.textWrapper}>
						<span className={styles.valueType}>Target Indeks</span>
						<span className={styles.value}>
							{targetIndex.toLocaleString('id-ID')}
						</span>
					</div>
				</div>
			</div>
			<p className={styles.description}>{description}</p>
			{tag && isTagDisplayed && <Tag text={titleCase(tag)} />}
		</Link>
	)
}

export default IndexCard

export const IndexCardSkeleton = ({ ...props }) => (
	<ContentLoader
		speed={2}
		style={{ width: '100%', height: props.isTagDisplayed ? 128 : 100 }}
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
		uniqueKey="opd-service-card-skeleton"
		{...props}
	>
		<rect x="0" y="0" rx="8" ry="8" width="40%" height="20" />
		<rect x="0" y="32" rx="8" ry="8" width="25" height="25" />
		<rect x="50%" y="32" rx="8" ry="8" width="25" height="25" />
		<rect x="37" y="32" rx="2" ry="2" width="60" height="10" />
		<rect x="37" y="46" rx="2" ry="2" width="60" height="10" />
		<rect x="56%" y="32" rx="2" ry="2" width="60" height="10" />
		<rect x="56%" y="46" rx="2" ry="2" width="60" height="10" />
		<rect x="0" y="68" rx="8" ry="8" width="100%" height="10" />
		<rect x="0" y="83" rx="8" ry="8" width="100%" height="10" />
		{props.isTagDisplayed && (
			<rect x="0" y="102" rx="8" ry="8" width="80" height="26" />
		)}
	</ContentLoader>
)
