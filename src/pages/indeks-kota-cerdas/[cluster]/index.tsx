import {
	type InferGetStaticPropsType,
	type GetStaticPaths,
	type GetStaticProps,
} from 'next'
import Head from 'next/head'

import Separator from '@/components/separator/Separator'
import CityIndexSection from '@/containers/_indeks-kota-cerdas/cityIndexSection/CityIndexSection'
import Header from '@/containers/header/Header'
import {
	clusterMap,
	clusterSubtitleMap,
	clusterBEMap,
} from '@/models/cityIndex'

import styles from './index.module.scss'

const CityIndexClusterPage = ({
	cluster,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	const beCluster = clusterBEMap.get(cluster)

	return (
		<>
			<Head>
				<title>{`Indeks ${clusterMap.get(cluster) ?? ''}`}</title>
				<meta name="keywords" content={cluster} />
			</Head>
			<Header
				title={clusterMap.get(cluster)}
				subTitle={clusterSubtitleMap.get(cluster)}
				isBackButtonDisplayed
			/>
			<main className={styles.pageWrapper}>
				<Separator />
				<CityIndexSection cluster={beCluster ?? ''} pagination={false} />
			</main>
		</>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	const clusters = Array.from(clusterBEMap.keys())
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

export default CityIndexClusterPage
