import { type Url } from 'next/dist/shared/lib/router/router'

import {
	BrandingIcon,
	EconomyIcon,
	EnvirontmentIcon,
	GovernanceIcon,
	LivingIcon,
	SocietyIcon,
} from '@/components/icon/SVGIcon'
import IconCard from '@/components/iconCard/IconCard'

import styles from './CityIndeksCluster.module.scss'

interface IconProps {
	name: string
	icon: React.FC<React.SVGProps<SVGSVGElement>>
	to: Url
}

const CityIndeksCluster = () => {
	const title = 'Kelompok Indeks Kota'
	const columnCount = 3
	const data: IconProps[] = [
		{
			name: 'Pemerintahan',
			icon: GovernanceIcon,
			to: '/indeks-kota-cerdas/pemerintahan',
		},
		{
			name: 'Branding',
			icon: BrandingIcon,
			to: '/indeks-kota-cerdas/branding',
		},
		{
			name: 'Ekonomi',
			icon: EconomyIcon,
			to: '/indeks-kota-cerdas/ekonomi',
		},
		{
			name: 'Kehidupan',
			icon: LivingIcon,
			to: '/indeks-kota-cerdas/kehidupan',
		},
		{
			name: 'Masyarakat',
			icon: SocietyIcon,
			to: '/indeks-kota-cerdas/masyarakat',
		},
		{
			name: 'Lingkungan',
			icon: EnvirontmentIcon,
			to: '/indeks-kota-cerdas/lingkungan',
		},
	]
	return (
		<section className={styles.smartCitySection}>
			<h3>{title}</h3>
			<div
				className={styles.grid}
				style={{
					gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
				}}
			>
				{data.map((element, index) => (
					<IconCard
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

export default CityIndeksCluster
