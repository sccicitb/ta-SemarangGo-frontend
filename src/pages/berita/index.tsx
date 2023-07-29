import { useEffect, useState } from 'react'

import dynamic from 'next/dynamic'
import Head from 'next/head'

import guideImg from '@/assets/images/news-guide.png'
import Separator from '@/components/separator/Separator'
import RecentNewsSection from '@/containers/_berita/recentNewsSection/RecentNewsSection'
import GuideSection from '@/containers/guideSection/GuideSection'
import Header from '@/containers/header/Header'

import styles from './index.module.scss'

const OtherNewsSection = dynamic(
	async () =>
		await import('@/containers/_berita/otherNewsSection/OtherNewsSection'),
)

const NewsPage = () => {
	const [showOtherNewsSection, setShowOtherNewsSection] = useState(false)
	useEffect(() => {
		const onScroll = () => {
			if (window.scrollY >= 100) {
				setShowOtherNewsSection(true)
			}
		}
		window.addEventListener('scroll', onScroll)

		return () => {
			window.removeEventListener('scroll', onScroll)
		}
	}, [])
	return (
		<>
			<Head>
				<title>Berita</title>
				<meta
					name="description"
					content="Cari tahu kabar terkini Kota Semarang"
				/>
			</Head>
			<Header
				title="Berita dan Pengumuman"
				isBackButtonDisplayed={false}
				isSearchButtonDisplayed
			/>
			<main className={styles.pageWrapper}>
				<Separator />
				<GuideSection
					image={guideImg}
					text="Dapatkan informasi terkini dan terpercaya terkait Kota Semarang"
				/>
				<Separator />
				<RecentNewsSection />
				<Separator />
				{showOtherNewsSection && <OtherNewsSection pagination />}
				<Separator />
			</main>
		</>
	)
}
export default NewsPage
