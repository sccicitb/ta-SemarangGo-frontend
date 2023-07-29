import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import map from '@/assets/images/map.png'
import Separator from '@/components/separator/Separator'
import StaticSearchHeader from '@/containers/staticSearchHeader/StaticSearchHeader'

import styles from './_error.module.scss'

// interface State {
// 	status: string
// 	title: string
// 	message: string
// }

function NotFoundPage() {
	const statusCode = 404
	const status = 'Not Found'
	const message = 'Maaf, halaman yang Anda coba akses tidak tersedia!'
	const to = '/'
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
						<span>
							Kembali ke{' '}
							<Link className={styles.link} href={to}>
								Beranda
							</Link>
						</span>
					</div>
				</section>
			</main>
		</>
	)
}
export default NotFoundPage
