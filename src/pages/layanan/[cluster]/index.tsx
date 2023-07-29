import {
	type InferGetStaticPropsType,
	type GetStaticPaths,
	type GetStaticProps,
} from 'next'
import Head from 'next/head'

import Separator from '@/components/separator/Separator'
import MainServiceSection from '@/containers/_layanan/mainServiceSection/MainServiceSection'
import { ClusterServiceSection } from '@/containers/_layanan/serviceSection/ServiceSection'
import Header from '@/containers/header/Header'
import { clusterMap } from '@/models/service'

import styles from './index.module.scss'

const ServiceClusterPage = ({
	cluster,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	const title = `Layanan ${clusterMap.get(cluster) ?? ''}`
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="author" content={process.env.NEXT_PUBLIC_COMPANY_NAME} />
			</Head>
			<Header title={title} isBackButtonDisplayed />
			<main className={styles.pageWrapper}>
				<Separator />
				<MainServiceSection cluster={cluster} />
				<Separator />
				<ClusterServiceSection
					title="Layanan Lainnya"
					cluster={cluster}
					pagination
				/>
			</main>
		</>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	const clusters = Array.from(clusterMap.keys())
	const paths = clusters.map((cluster) => ({
		params: { cluster },
	}))
	return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<{ cluster: string }> = async (
	context,
) => {
	const { cluster } = context.params as {
		cluster: string
	}
	return { props: { cluster } }
}

export default ServiceClusterPage
