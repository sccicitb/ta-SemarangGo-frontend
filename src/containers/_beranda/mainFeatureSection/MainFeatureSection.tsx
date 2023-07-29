import { useEffect, useRef, useState } from 'react'

import { type Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'
import type SwiperCore from 'swiper'
import { Navigation, Scrollbar } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/scss'
import 'swiper/scss/pagination'
import 'swiper/scss/scrollbar'

import { NextButton, PrevButton } from '@/components/button/Button'
import {
	CustomAgendaIcon,
	CustomAllIcon,
	CustomNewsIcon,
	CustomReportIcon,
	CustomSmartCityIcon,
} from '@/components/icon/SVGIcon'

import styles from './MainFeatureSection.module.scss'

interface MainFeatureCardProps {
	title: string
	Icon: React.FC<React.SVGProps<SVGSVGElement>>
	description: string
	to: Url
}

const MainFeatureCard = ({
	title,
	Icon,
	description,
	to,
}: MainFeatureCardProps) => {
	return (
		<Link
			href={to}
			className={styles.mainFeatureCard}
			aria-label={title}
			prefetch={false}
		>
			<div className={styles.iconWrapper}>
				<Icon />
			</div>
			<span className={styles.title}>{title}</span>
			<p>{description}</p>
		</Link>
	)
}

const MainFeatureSection = () => {
	const title = 'Fitur Utama'
	const data = [
		{
			title: 'Layanan Publik',
			icon: CustomAllIcon,
			description: 'Temukan berbagai layanan digital publik',
			to: '/layanan/OPD',
		},
		{
			title: 'Berita Kota',
			icon: CustomNewsIcon,
			description: 'Temukan berbagai berita & pengumuman',
			to: '/berita',
		},
		{
			title: 'Indeks Pencapaian Kota',
			icon: CustomSmartCityIcon,
			description: 'Cari tahu statistik keadaan Kota Semarang',
			to: '/indeks-kota-cerdas',
		},
		{
			title: 'Agenda Kegiatan',
			icon: CustomAgendaIcon,
			description: 'Temukan berbagai agenda kegiatan',
			to: '/agenda',
		},
		{
			title: 'Buat Laporan Kota',
			icon: CustomReportIcon,
			description: 'Laporkan kejadian dan pelayanan publik',
			to: '/lapor',
		},
	]
	const swiperRef = useRef<SwiperCore>()
	const [disabledPrev, setDisabledPrev] = useState<boolean | undefined>(true)
	const [disabledNext, setDisabledNext] = useState<boolean | undefined>(false)
	const [buttonStyle, setButtonStyle] = useState({ opacity: 0 })
	useEffect(() => {
		if (swiperRef.current) {
			swiperRef.current.on('slideChange', () => {
				setDisabledPrev(swiperRef.current?.isBeginning)
				setDisabledNext(swiperRef.current?.isEnd)
			})
			swiperRef.current.on('reachEnd', function () {
				setDisabledNext(true)
			})
		}
	}, [swiperRef])

	return (
		<section className={styles.newsCategorySection}>
			<div className={styles.titleCard}>
				<h3>{title}</h3>
			</div>
			<div
				className={styles.carouselContainer}
				onMouseEnter={(e) => {
					setButtonStyle({ opacity: 1 })
				}}
				onMouseLeave={(e) => {
					setButtonStyle({ opacity: 0 })
				}}
			>
				<Swiper
					modules={[Navigation, Scrollbar]}
					slidesPerView="auto"
					spaceBetween={10}
					effect="slide"
					className={styles.contentWrapper}
					scrollbar={{ draggable: true, dragSize: 100 }}
					onBeforeInit={(swiper) => {
						swiperRef.current = swiper
					}}
				>
					{data.map((el, index) => (
						<SwiperSlide
							key={index}
							style={{ width: 'fit-content', height: 'auto' }}
						>
							<MainFeatureCard
								title={el.title}
								Icon={el.icon}
								description={el.description}
								to={el.to}
							/>
						</SwiperSlide>
					))}
				</Swiper>
				<div className={styles.buttonWrapper}>
					<PrevButton
						onClick={() => swiperRef.current?.slidePrev()}
						disabled={disabledPrev}
						className={styles.button}
						style={buttonStyle}
					/>
					<NextButton
						onClick={() => swiperRef.current?.slideNext()}
						disabled={disabledNext}
						className={styles.button}
						style={buttonStyle}
					/>
				</div>
			</div>
		</section>
	)
}
export default MainFeatureSection
