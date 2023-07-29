import {
	type InferGetStaticPropsType,
	type GetStaticPaths,
	type GetStaticProps,
} from 'next'
import Head from 'next/head'

import Separator from '@/components/separator/Separator'
import OtherNewsSection from '@/containers/_berita/otherNewsSection/OtherNewsSection'
import RecentNewsSection from '@/containers/_berita/recentNewsSection/RecentNewsSection'
import Header from '@/containers/header/Header'
import { type newsCategoryType, newsCategoryTypeToTitle } from '@/models/news'

import styles from './index.module.scss'

const NewsCategoryPage = ({
	category,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	const title = `Berita ${
		newsCategoryTypeToTitle[category as newsCategoryType]
	}`

	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<Header title={title} isBackButtonDisplayed />
			<main className={styles.pageWrapper}>
				<Separator />
				<RecentNewsSection newsCategory={category as newsCategoryType} />
				<Separator />
				<OtherNewsSection
					pagination
					itemsPerPage={5}
					newsCategory={category as newsCategoryType}
				/>
			</main>
		</>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	const categorys = Object.keys(newsCategoryTypeToTitle)
	const paths = categorys.map((category) => ({
		params: { category },
	}))
	return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<{ category: string }> = async (
	context,
) => {
	const { category } = context.params as {
		category: string
	}
	return { props: { category } }
}

export default NewsCategoryPage
