import React from 'react'

import Link from 'next/link'

import NewsCard, { NewsCardSkeleton } from '@/components/newsCard/NewsCard'
import Separator from '@/components/separator/Separator'
import { GetNewsList } from '@/services/news'

import styles from './NewsSection.module.scss'

const NewsSection = () => {
	const title = 'Kabar Terkini'
	const page = 1
	const limit = 3
	const { data, isLoading } = GetNewsList(page, limit)
	const isError = typeof data === 'undefined' || data.data.length === 0

	if (isLoading) {
		return (
			<section className={styles.newsSection}>
				<div className={styles.titleCard}>
					<h3>{title}</h3>
					<Link href="/berita" className={styles.viewAllButton}>
						Lihat Semua
					</Link>
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
				<Link href="/berita" className={styles.viewAllButton}>
					Lihat Semua
				</Link>
			</div>
			<div className={styles.contentWrapper}>
				{!isError && (
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
						/>
						<Separator type="M" />
					</React.Fragment>
				))}
			</div>
		</section>
	)
}

export default NewsSection
