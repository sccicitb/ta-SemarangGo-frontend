import { useRouter } from 'next/router'

import OutlinedButton from '@/components/outlinedButton/OutlinedButton'

import styles from './PopularSearchSection.module.scss'

const popularSearchData = [
	'COVID-19',
	'Transportasi',
	'Semarang',
	'Ekonomi',
	'G20',
]

const PopularSearchSection = () => {
	const router = useRouter()

	const handlePopularSearchClick = (e: React.MouseEvent) => {
		const url = {
			pathname: router.pathname,
			query: {
				...router.query,
				q: e.currentTarget.getAttribute('value') ?? '',
			},
		}
		void router.replace(url, undefined, { shallow: true })
	}

	return (
		<section className={styles.popularSearchSection}>
			<h3>Pencarian Populer</h3>
			<div className={styles.contentWrapper}>
				{popularSearchData.map((value, index) => (
					<OutlinedButton
						key={index}
						text={value}
						value={value}
						onClick={handlePopularSearchClick}
					/>
				))}
			</div>
		</section>
	)
}

export default PopularSearchSection
