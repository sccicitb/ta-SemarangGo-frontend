import IndexCard, { IndexCardSkeleton } from '@/components/indexCard/IndexCard'
import { cityIndexDesc, clusterBEMap } from '@/models/cityIndex'
import { GetCityIndexList } from '@/services/cityIndex'
import { getKey } from '@/utils/map'
import { camelCaseToTitleCase } from '@/utils/string'

import styles from './PopularCityIndexSection.module.scss'

const PopularCityIndexSection = () => {
	const { data, isLoading } = GetCityIndexList()
	const totalItem = 5
	const currentYear = new Date().getFullYear() - 1

	if (isLoading) {
		return (
			<section className={styles.section}>
				<h3>Indeks Populer</h3>
				<IndexCardSkeleton isTagDisplayed />
				<IndexCardSkeleton isTagDisplayed />
				<IndexCardSkeleton isTagDisplayed />
				<IndexCardSkeleton isTagDisplayed />
			</section>
		)
	}

	return (
		<section className={styles.section}>
			<h3>Indeks Populer</h3>
			{data?.data.slice(0, totalItem).map((item, index) => (
				<IndexCard
					key={index}
					title={camelCaseToTitleCase(item.title)}
					currentIndex={item.data[currentYear]}
					targetIndex={item.data[currentYear + 1]}
					description={cityIndexDesc[item.title]}
					tag={getKey(clusterBEMap, item.cluster)}
					isTagDisplayed
					id={index.toString()}
					cluster={item.cluster}
				/>
			))}
		</section>
	)
}
export default PopularCityIndexSection
