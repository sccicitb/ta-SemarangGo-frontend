import { type Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'

import {
	CustomHealthIcon,
	CustomEducationIcon,
	CustomCitizenshipIcon,
	CustomTradeIcon,
	CustomAllIcon,
	CustomBusinessIcon,
	CustomManufacturingIcon,
	CustomVillageIcon,
} from '@/components/icon/SVGIcon'

import styles from './ServiceClusterSection.module.scss'

const SVGIconCard = ({
	name,
	Icon,
	to,
}: {
	name: string
	Icon: React.FC<React.SVGProps<SVGSVGElement>>
	to: Url
}) => {
	return (
		<div className={styles.iconCard}>
			<Link href={to} prefetch={false}>
				<div className={styles.iconBackground}>
					<Icon />
				</div>
			</Link>
			<Link href={to} prefetch={false}>
				<span className={styles.name}>{name}</span>
			</Link>
		</div>
	)
}

interface ServiceIconProps {
	name: string
	icon: React.FC<React.SVGProps<SVGSVGElement>>
	to: Url
}

const ServiceClusterSection = ({ id }: { id?: string }) => {
	const title = 'Seluruh Layanan'
	const columnCount = 4
	const data: ServiceIconProps[] = [
		{
			name: 'Kesehatan',
			icon: CustomHealthIcon,
			to: '/layanan/kesehatan',
		},
		{
			name: 'Pendidikan',
			icon: CustomEducationIcon,
			to: '/layanan/pendidikan',
		},
		{
			name: 'Sosial',
			icon: CustomCitizenshipIcon,
			to: '/layanan/sosial',
		},
		{
			name: 'Ketenagakerjaan',
			icon: CustomBusinessIcon,
			to: '/layanan/naker',
		},
		{
			name: 'UMKM',
			icon: CustomTradeIcon,
			to: '/layanan/umkm',
		},
		{
			name: 'Pembangunan',
			icon: CustomManufacturingIcon,
			to: '/layanan/pembangunan',
		},
		{
			name: 'Desa',
			icon: CustomVillageIcon,
			to: '/layanan/desa',
		},
		{
			name: 'Lihat Semua',
			icon: CustomAllIcon,
			to: '/layanan/OPD',
		},
	]
	return (
		<section className={styles.serviceSection} id={id}>
			<h3>{title}</h3>
			<div
				className={styles.grid}
				style={{
					gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
				}}
			>
				{data.map((element, index) => (
					<SVGIconCard
						key={index}
						name={element.name}
						Icon={element.icon}
						to={element.to}
					/>
				))}
			</div>
		</section>
	)
}

export default ServiceClusterSection
