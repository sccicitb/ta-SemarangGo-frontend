import React from 'react'

import NewsCard, { NewsCardSkeleton } from '@/components/newsCard/NewsCard'
import Separator from '@/components/separator/Separator'
import { type newsCategoryType } from '@/models/news'
import { GetNewsList } from '@/services/news'

import styles from './RecentNewsSection.module.scss'

interface RecentNewsSectionProps {
	isTagDisplayed?: boolean
	newsCategory?: newsCategoryType
}

const RecentNewsSection = ({
	isTagDisplayed = true,
	newsCategory,
}: RecentNewsSectionProps) => {
	const title = 'Kabar Terkini'
	const page = 1
	const limit = 3
	const { data, isLoading } = GetNewsList(page, limit)

	if (isLoading) {
		return (
			<section className={styles.newsSection}>
				<div className={styles.titleCard}>
					<h3>{title}</h3>
				</div>
				<div className={styles.contentWrapper}>
					<NewsCardSkeleton type="XL" />
					<Separator type="M" />
					<NewsCardSkeleton type="M" isImageDisplayed={false} />
					<Separator type="M" />
					<NewsCardSkeleton type="M" isImageDisplayed={false} />
					<Separator type="M" />
				</div>
			</section>
		)
	}

	return (
		<section className={styles.newsSection}>
			<div className={styles.titleCard}>
				<h3>{title}</h3>
			</div>
			<div className={styles.contentWrapper}>
				{typeof data !== 'undefined' && data.data.length !== 0 && (
					<NewsCard
						type="XL"
						image={data.data[0].thumbnail}
						title={data.data[0].headline}
						date={new Date(data.data[0].postDate)}
						tag={data.data[0].category}
						description={data.data[0].shortDescription}
						slug={data.data[0].slug}
					/>
				)}
				<Separator type="M" />
				{data?.data.slice(-(data.data.length - 1)).map((element, index) => (
					<React.Fragment key={index}>
						<NewsCard
							type="M"
							title={element.headline}
							date={new Date(element.postDate)}
							tag={element.category}
							image={element.thumbnail}
							slug={element.slug}
							isImageDisplayed={false}
							isTagDisplayed={isTagDisplayed}
						/>
						<Separator type="M" />
					</React.Fragment>
				))}
			</div>
		</section>
	)
}

export default RecentNewsSection
