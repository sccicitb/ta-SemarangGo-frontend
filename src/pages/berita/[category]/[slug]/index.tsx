import { AxiosError } from 'axios'
import { type GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import Separator from '@/components/separator/Separator'
import Header from '@/containers/header/Header'
import { ENDPOINT_PATH } from '@/interfaces'
import { type ErrorResponseData } from '@/models/error'
import {
	type newsCategoryType,
	newsCategoryTypeToTitle,
	type NewsResponseData,
} from '@/models/news'
import ErrorPage from '@/pages/_error'
import { api } from '@/services/api'
import html from '@/utils/html'

import styles from './index.module.scss'

interface NewsContentPageProps {
	data: NewsResponseData
	error?: ErrorResponseData
}

const NewsContentPage = ({ data, error }: NewsContentPageProps) => {
	if (error) {
		return <ErrorPage statusCode={error.status} />
	}

	const { headline, thumbnail, shortDescription, content, postDate, category } =
		data.data
	const date = new Date(postDate)
	return (
		<>
			<Head>
				<title>{headline}</title>
				<meta name="description" content={shortDescription} />
			</Head>
			<Header isBackButtonDisplayed />
			<main className={styles.newsPage}>
				<Separator />
				<section className={styles.newsSection}>
					<h2 className={styles.title}>{headline}</h2>
					<div className={styles.imgTagDateWrapper}>
						<Image
							loader={() => thumbnail}
							unoptimized
							src={thumbnail}
							alt={shortDescription}
							width={600}
							height={300}
							priority
						/>
						<div className={styles.tagDateWrapper}>
							<span className={styles.tag}>
								{newsCategoryTypeToTitle[category as newsCategoryType]}
							</span>
							<span className={styles.date}>
								{date.toLocaleDateString('id-ID', {
									year: 'numeric',
									month: 'long',
									day: 'numeric',
								})}
							</span>
						</div>
						<div className={styles.textWrapper}>{html(content)}</div>
					</div>
				</section>
			</main>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async ({
	req,
	res,
	params,
}) => {
	res.setHeader(
		'Cache-Control',
		'public, s-maxage=3600, stale-while-revalidate',
	)
	const { category, slug } = params as {
		category: string
		slug: string
	}
	try {
		const res = await api.get(`${ENDPOINT_PATH.GET_NEWS}/${slug}`)
		const data = res.data as NewsResponseData
		data.data.content = data.data.content
			.replace(/\s+/g, ' ')
			.replace(/>\s/g, '>')

		return {
			props: {
				data: {
					data: {
						...data.data,
						category,
					},
				},
			},
		}
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			return {
				props: {
					error: {
						status: error.response?.status,
						data: error.message,
					},
				},
			}
		}
		return {
			props: {
				error: {
					status: 404,
					data: 'Something went wrong',
				},
			},
		}
	}
}

export default NewsContentPage
