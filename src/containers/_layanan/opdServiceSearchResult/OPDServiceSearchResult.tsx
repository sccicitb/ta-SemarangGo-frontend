import { useEffect, useRef, useState } from 'react'

import OPDServicesCard, {
	OPDServicesCardSkeleton,
} from '@/components/opdServiceCard/OPDServiceCard'
import Pagination from '@/components/pagination/Pagination'
import { GetOPDList } from '@/services/opd'

import styles from './OPDServiceSearchResult.module.scss'
import NotFoundSection from '../notFoundSection/NotFoundSection'

interface OPDServiceSearchResultProps {
	query: string | null
	pagination?: boolean
	itemsPerPage?: number
}

const OPDServiceSearchResult = ({
	query,
	pagination,
	itemsPerPage = 4,
}: OPDServiceSearchResultProps) => {
	const [page, setPage] = useState(1)

	const topElRef = useRef<null | HTMLDivElement>(null)
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}

	const { data, isLoading, error } = GetOPDList(query, page, itemsPerPage)

	const handlePageClick = (event: { selected: number }) => {
		setPage(event.selected + 1)
	}

	useEffect(() => {
		if (pagination && page) {
			scrollToTop()
		}
	}, [page, pagination])

	useEffect(() => {
		if (query) {
			setPage(1)
		}
	}, [query])

	if (isLoading) {
		return (
			<section className={styles.searchByOpdSection}>
				<span className={styles.totalOpd}>
					<b>{data?.totalData}</b> dinas ditemukan
				</span>
				<OPDServicesCardSkeleton />
				<OPDServicesCardSkeleton />
			</section>
		)
	}

	if (error || data?.data.length === 0) {
		return <NotFoundSection />
	}

	return (
		<section className={styles.searchByOpdSection} ref={topElRef}>
			<span className={styles.totalOpd}>
				<b>{data?.totalData}</b> dinas ditemukan
			</span>
			{data?.data.map((item, index) => (
				<OPDServicesCard
					id={item._id}
					key={index}
					name={item.name}
					totalService={item.appCount}
				/>
			))}
			{pagination && (
				<Pagination
					initialPage={page - 1}
					itemsPerPage={itemsPerPage}
					onPageChange={handlePageClick}
					className={styles.pagination}
					pageCount={data?.totalPage}
				/>
			)}
		</section>
	)
}
export default OPDServiceSearchResult
