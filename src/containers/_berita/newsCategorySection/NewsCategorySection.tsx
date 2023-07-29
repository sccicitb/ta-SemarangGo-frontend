import { useEffect, useRef, useState } from 'react'

import { type Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'
import { Navigation, Scrollbar } from 'swiper'
import type SwiperCore from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { NextButton, PrevButton } from '@/components/button/Button'
import {
	CustomEducationIcon,
	CustomGovernanceIcon,
	CustomHealthIcon,
	CustomTourismIcon,
	CustomTradeIcon,
	CustomTransportationIcon,
} from '@/components/icon/SVGIcon'

import styles from './NewsCategorySection.module.scss'

// Import Swiper styles
import 'swiper/scss'
import 'swiper/scss/pagination'
import 'swiper/scss/scrollbar'

interface NewsCategoryCardProps {
	title: string
	Icon: React.FC<React.SVGProps<SVGSVGElement>>
	description: string
	to: Url
}

const NewsCategoryCard = ({
	title,
	Icon,
	description,
	to,
}: NewsCategoryCardProps) => {
	return (
		<Link href={to} className={styles.newsCategoryCard}>
			<div className={styles.iconWrapper}>
				<Icon />
			</div>
			<span className={styles.title}>{title}</span>
			<p>{description}</p>
		</Link>
	)
}

const NewsCategorySection = () => {
	const title = 'Telusuri Kategori Berita'
	const data = [
		{
			title: 'Kesehatan',
			icon: CustomHealthIcon,
			description: 'Imunisasi, vaksin, penyuluhan kesehatan',
			to: '/berita/kesehatan',
		},
		{
			title: 'Pendidikan',
			icon: CustomEducationIcon,
			description: 'Prestasi masyarakat, PPDB, beasiswa',
			to: '/berita/pendidikan',
		},
		{
			title: 'Pariwisata',
			icon: CustomTourismIcon,
			description: 'Rekomendasi, info tempat wisata, turis',
			to: '/berita/pariwisata',
		},
		{
			title: 'Transportasi',
			icon: CustomTransportationIcon,
			description: 'Keadaan jalan, info kemacetan, proyek PU',
			to: '/berita/transportasi',
		},
		{
			title: 'Bisnis & UMKM',
			icon: CustomTradeIcon,
			description: 'Perizinan, acara bisnis, cerita UMKM',
			to: '/berita/bisnis-umkm',
		},
		{
			title: 'Pemerintahan',
			icon: CustomGovernanceIcon,
			description: 'Kegiatan pemerintah kota, kebijakan daerah',
			to: '/berita/pemerintahan',
		},
	]
	const swiperRef = useRef<SwiperCore>()
	const [disabledPrev, setDisabledPrev] = useState<boolean | undefined>(true)
	const [disabledNext, setDisabledNext] = useState<boolean | undefined>(false)
	const [buttonStyle, setButtonStyle] = useState({ opacity: 0 })
	useEffect(() => {
		if (swiperRef.current) {
			swiperRef.current.update()
			swiperRef.current.on('slideChange', () => {
				setDisabledPrev(swiperRef.current?.isBeginning)
				setDisabledNext(swiperRef.current?.isEnd)
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
						<SwiperSlide key={index} style={{ width: 'fit-content' }}>
							<NewsCategoryCard
								key={index}
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
export default NewsCategorySection
