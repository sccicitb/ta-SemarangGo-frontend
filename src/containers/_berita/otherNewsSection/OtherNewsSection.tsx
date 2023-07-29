import { useEffect, useRef, useState } from 'react'

import NewsCard, { NewsCardSkeleton } from '@/components/newsCard/NewsCard'
import Pagination from '@/components/pagination/Pagination'
import { type newsCategoryType } from '@/models/news'
import { GetNewsList } from '@/services/news'

import styles from './OtherNewsSection.module.scss'

interface OtherNewsSectionProps {
	isTagDisplayed?: boolean
	pagination?: boolean
	itemsPerPage?: number
	newsCategory?: newsCategoryType
}

const OtherNewsSection = ({
	isTagDisplayed = true,
	pagination = false,
	itemsPerPage = 5,
	newsCategory,
}: OtherNewsSectionProps) => {
	const title = 'Berita Lainnya'
	const [pageIndex, setPageIndex] = useState(1)
	const firstPageOffset = 3

	const { data, isLoading } = GetNewsList(pageIndex, itemsPerPage)

	const handlePageClick = (event: { selected: number }) => {
		setPageIndex(event.selected + 1)
		scrollToTop()
	}

	const paginationRef = useRef<null | HTMLDivElement>(null)

	const scrollToTop = () => {
		const element = document.getElementById('pagination')
		const headerOffset = 75
		const elementPosition = element?.getBoundingClientRect().top ?? 0
		const offsetPosition = elementPosition + window.pageYOffset - headerOffset

		window.scrollTo({
			top: offsetPosition,
			behavior: 'smooth',
		})
	}
	useEffect(() => {
		if (paginationRef.current && pagination) {
			scrollToTop()
		}
	}, [pagination, paginationRef, data])

	return (
		<section
			id="pagination"
			className={styles.otherNewsSection}
			ref={paginationRef}
		>
			<div className={styles.title}>
				<h3>{title}</h3>
			</div>
			<div className={styles.contentWrapper}>
				{(() => {
					if (isLoading) {
						return (
							<>
								<NewsCardSkeleton type="M" isImageDisplayed />
								<NewsCardSkeleton type="M" isImageDisplayed />
								<NewsCardSkeleton type="M" isImageDisplayed />
								{pageIndex !== 1 && (
									<>
										<NewsCardSkeleton type="M" isImageDisplayed />
										<NewsCardSkeleton type="M" isImageDisplayed />
									</>
								)}
							</>
						)
					} else {
						return (
							typeof data !== 'undefined' &&
							(pageIndex === 1
								? data.data.slice(-(data.data.length - firstPageOffset))
								: data.data
							).map((value, index) => (
								<NewsCard
									key={index}
									type="M"
									image={value.thumbnail}
									title={value.headline}
									date={new Date(value.postDate)}
									tag={value.category}
									slug={value.slug}
									isTagDisplayed={isTagDisplayed}
								/>
							))
						)
					}
				})()}
			</div>
			{pagination && (
				<Pagination
					itemsPerPage={itemsPerPage}
					onPageChange={handlePageClick}
					className={styles.pagination}
					pageCount={data?.totalPage}
				/>
			)}
		</section>
	)
}
export default OtherNewsSection
