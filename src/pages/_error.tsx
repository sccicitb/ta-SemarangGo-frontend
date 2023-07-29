import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import map from '@/assets/images/map.png'
import Separator from '@/components/separator/Separator'
import StaticSearchHeader from '@/containers/staticSearchHeader/StaticSearchHeader'

import styles from './_error.module.scss'

function ErrorPage({
	statusCode,
	errorMessage,
}: {
	statusCode?: number
	errorMessage?: string
}) {
	const router = useRouter()
	const status = (() => {
		if (statusCode === 404) {
			return 'Not Found'
		} else if (statusCode === 500) {
			return 'Internal Server Error'
		} else {
			return 'Error'
		}
	})()
	const message = (() => {
		if (errorMessage) {
			return errorMessage
		} else if (statusCode === 404) {
			return 'Maaf, halaman yang Anda coba akses tidak tersedia!'
		} else if (statusCode === 500) {
			return 'Maaf, terjadi kesalahan pada server!'
		} else {
			return 'Maaf, terjadi kesalahan!'
		}
	})()
	const to = (() => {
		if (statusCode === 404) {
			return '/'
		} else {
			return router.asPath
		}
	})()
	const [toMessage1, toMessage2] = (() => {
		if (statusCode === 404) {
			return ['Kembali ke ', 'Beranda']
		} else {
			return ['Muat ulang halaman ini ', 'atau coba lagi nanti']
		}
	})()
	return (
		<>
			<Head>
				<title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<StaticSearchHeader />
			<main className={styles.wrapper}>
				<Separator />
				<section className={styles.sectionWrapper}>
					<div className={styles.statusWrapper}>
						<span className={styles.statusText}>{statusCode}</span>
						{/\s/g.test(status) ? (
							<div className={styles.titleWrapper}>
								<span className={styles.titleText1}>
									{status.substring(0, status.indexOf(' '))}
								</span>
								<span className={styles.titleText2}>
									{status.substring(status.indexOf(' ') + 1)}
								</span>
							</div>
						) : (
							<span className={styles.titleText2}>{status}</span>
						)}
					</div>
					<div className={styles.messageWrapper}>
						<Image src={map} alt="Error image" />
						<span>{message}</span>
						{statusCode === 404 ? (
							<span>
								{toMessage1}
								<Link className={styles.link} href={to}>
									{toMessage2}
								</Link>
							</span>
						) : (
							<span>
								<Link className={styles.link} href={to}>
									{toMessage1}
								</Link>
								{toMessage2}
							</span>
						)}
					</div>
				</section>
			</main>
		</>
	)
}

ErrorPage.getInitialProps = ({ res, err }: { res: any; err: any }) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404
	return { statusCode }
}

export default ErrorPage
