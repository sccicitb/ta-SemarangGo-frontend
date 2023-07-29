import { useState } from 'react'

import IndexCard, { IndexCardSkeleton } from '@/components/indexCard/IndexCard'
import Pagination from '@/components/pagination/Pagination'
import { clusterBEMap, cityIndexDesc } from '@/models/cityIndex'
import { GetCityIndexListByCluster } from '@/services/cityIndex'
import { getKey } from '@/utils/map'
import { camelCaseToTitleCase } from '@/utils/string'

import styles from './CityIndexSection.module.scss'

interface Props {
	cluster: string
	pagination?: boolean
}

const CityIndexSection = ({ cluster, pagination }: Props) => {
	const itemsPerPage = 10
	const [, setPageIndex] = useState(1)
	const currentYear = new Date().getFullYear() - 1

	const { data, isLoading } = GetCityIndexListByCluster(cluster)

	const handlePageClick = (event: { selected: number }) => {
		setPageIndex(event.selected + 1)
	}

	if (isLoading) {
		return (
			<section className={styles.section}>
				<span className={styles.totalIndex}>
					<b>{'  '}</b> indeks ditemukan
				</span>
				<IndexCardSkeleton isTagDisplayed={false} />
				<IndexCardSkeleton isTagDisplayed={false} />
				<IndexCardSkeleton isTagDisplayed={false} />
			</section>
		)
	}

	return (
		<section className={styles.section}>
			<span className={styles.totalIndex}>
				<b>{data?.data.length}</b> indeks ditemukan
			</span>
			{data?.data.map((item, index) => (
				<IndexCard
					id={index.toString()}
					key={index}
					title={camelCaseToTitleCase(item.title)}
					currentIndex={item.data[currentYear]}
					targetIndex={item.data[currentYear + 1]}
					description={cityIndexDesc[item.title]}
					tag={getKey(clusterBEMap, item.cluster)}
					isTagDisplayed={false}
					cluster={item.cluster}
				/>
			))}
			{pagination && (
				<Pagination
					totalItem={data?.data.length}
					itemsPerPage={itemsPerPage}
					onPageChange={handlePageClick}
					className={styles.pagination}
				/>
			)}
		</section>
	)
}

export default CityIndexSection
