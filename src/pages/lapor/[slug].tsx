import { useEffect, useRef, useState } from 'react'

import {
	type GetStaticPaths,
	type GetStaticProps,
	type InferGetStaticPropsType,
} from 'next'
import Head from 'next/head'
import Link from 'next/link'

import SnackBar from '@/components/snackBar/SnackBar'
import Header from '@/containers/header/Header'
import LoadingSection from '@/containers/loadingSection/LoadingSection'

import styles from './[slug].module.scss'

interface DataProps {
	title: string
	url: string
}
const staticData: Record<string, DataProps> = {
	'sapa-mbak-ita': {
		title: 'Sapa Mbak Ita',
		url: 'https://sapambakita.semarangkota.go.id',
	},
}

const ServiceDetailPage = ({
	data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	const frameRef = useRef<HTMLIFrameElement>(null)
	const [idxBack, setIdxBack] = useState(0)
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		const frame = frameRef.current
		if (frame) {
			frame.addEventListener('loadstart', () => setIsLoaded(false))
			frame.addEventListener('progress', () => setIsLoaded(false))
			frame.addEventListener('load', () => setIdxBack(idxBack + 1))

			return () => {
				frame.removeEventListener('loadstart', () => setIsLoaded(false))
				frame.removeEventListener('progress', () => setIsLoaded(false))
				frame.removeEventListener('load', () => setIdxBack(idxBack + 1))
			}
		}
	}, [frameRef, idxBack])

	useEffect(() => {
		if (!isLoaded) {
			setTimeout(() => {
				setIsLoaded(true)
			}, 3000)
		}
	}, [isLoaded])

	const extUrl = data.url
	const extTitle = data.title

	return (
		<>
			<Head>
				<title>{data.title}</title>
			</Head>
			<Header
				title={data.title}
				backTo={idxBack === 0 ? -1 : -idxBack}
				isBackButtonDisplayed
				isInfoButtonDisplayed={false}
				shouldConfirmLeave
			/>
			<SnackBar
				open
				message={
					<Link href={extUrl} rel="noopener noreferrer" target="_blank">
						<u>Buka layanan di halaman baru</u>
					</Link>
				}
			/>
			<main className={styles.pageWrapper}>
				{!isLoaded && <LoadingSection />}
				<iframe
					id={extTitle}
					name={extTitle}
					title={`Layanan ${extTitle}`}
					ref={frameRef}
					is="x-frame-bypass"
					loading="lazy"
					src={extUrl}
					sandbox="allow-scripts allow-same-origin allow-downloads allow-popups"
				></iframe>
			</main>
		</>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	const urls = Object.keys(staticData)
	const paths = urls.map((slug) => ({
		params: { slug },
	}))
	return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<{ data: DataProps }> = async (
	context,
) => {
	const { slug } = context.params as {
		slug: string
	}
	const data = staticData[slug]
	return { props: { data } }
}

export default ServiceDetailPage
