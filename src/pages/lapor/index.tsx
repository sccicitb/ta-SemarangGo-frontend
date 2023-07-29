import { type Url } from 'next/dist/shared/lib/router/router'
import Head from 'next/head'
import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'

import guideImg from '@/assets/images/report-guide.png'
import sapaImg from '@/assets/images/sapa-icon.png'
import {
	CustomInstagram,
	CustomMail,
	CustomTwitter,
	CustomWhatsapp,
	ReportIcon,
} from '@/components/icon/SVGIcon'
import Separator from '@/components/separator/Separator'
import GuideSection from '@/containers/guideSection/GuideSection'
import Header from '@/containers/header/Header'
import { slugify } from '@/utils/string'

import styles from './index.module.scss'

const ReportServiceCard = ({
	title,
	description,
	to,
	Icon,
	url,
	openInApp = true,
}: {
	title: string
	description: string
	to?: Url
	Icon: React.FC<React.SVGProps<SVGSVGElement>> | StaticImageData
	url: string
	openInApp?: boolean
}) => {
	to ??= `/lapor/${slugify(title)}`
	return (
		<Link
			className={styles.reportServiceCard}
			href={openInApp ? to : url}
			rel={openInApp ? undefined : 'noopener noreferrer'}
			target={openInApp ? undefined : '_blank'}
		>
			{typeof Icon === 'function' ? (
				<Icon className={styles.icon} />
			) : (
				<Image src={Icon} className={styles.icon} alt="" />
			)}
			<span className={styles.title}>{title}</span>
			<p>{description}</p>
		</Link>
	)
}

const SocialMediaCard = ({
	title,
	to,
	Icon,
}: {
	title: string
	to: Url
	Icon: React.FC<React.SVGProps<SVGSVGElement>> | StaticImageData | string
}) => {
	return (
		<Link
			className={styles.socialMediaCard}
			href={to}
			target="_blank"
			rel="noopener noreferrer"
		>
			{typeof Icon === 'function' ? (
				<div className={styles.iconWrapper}>
					<Icon className={styles.icon} />
				</div>
			) : (
				<Image src={Icon} className={styles.icon} alt="" />
			)}
			<span className={styles.title}>{title}</span>
		</Link>
	)
}

const ReportPage = () => {
	const reportServiceData = [
		{
			title: 'Sapa Mbak Ita',
			description: 'Formulir pengaduan Sapa Mba Ita',
			icon: sapaImg,
			url: 'https://sapambakita.semarangkota.go.id/',
		},
		{
			title: 'Lapor.go.id',
			description: 'Lapor kejadian dan keluhan terkait pelayanan publik',
			icon: ReportIcon,
			url: 'https://www.lapor.go.id/',
			openInApp: false,
		},
	]

	const socialMediaData = [
		{
			title: 'Instagram',
			to: 'https://www.instagram.com/semarangpemkot/',
			icon: CustomInstagram,
		},
		{
			title: 'Twitter',
			to: 'https://twitter.com/PemkotSmg',
			icon: CustomTwitter,
		},
		{
			title: 'Whatsapp',
			to: 'https://api.whatsapp.com/send?phone=6281215000512&text=sapambakita%23nama%23judul%23lokasi%23isilaporan%23jeniskelamin(L%2FP)%23apakah%20difabel%3F(Y%2FN)',
			icon: CustomWhatsapp,
		},
		{
			title: 'Email',
			to: 'mailto:semarangpemkot@semarangkota.go.id',
			icon: CustomMail,
		},
	]
	const title = 'Lapor Kota Semarang'
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta
					name="description"
					content="Laporkan temuan dan keluhan Anda terkait pelayanan publik di Kota Semarang"
				/>
			</Head>
			<Header
				title={title}
				isBackButtonDisplayed={false}
				isSearchButtonDisplayed
			/>
			<main className={styles.pageWrapper}>
				<Separator />
				<GuideSection
					image={guideImg}
					text="Memiliki aduan terhadap pelayanan publik dan fasilitas di Kota
							Semarang?"
					emText="Yuk, Lapor!"
				/>
				<Separator />
				<section className={styles.reportServiceSection}>
					<h3>Lapor</h3>
					<div className={styles.contentWrapper}>
						{reportServiceData.map((el, index) => (
							<ReportServiceCard
								key={index}
								title={el.title}
								description={el.description}
								Icon={el.icon}
								url={el.url}
								openInApp={el.openInApp}
							/>
						))}
					</div>
				</section>
				<Separator />
				<section className={styles.socialMediaSection}>
					<h3>Sosial Media</h3>
					<div className={styles.contentWrapper}>
						{socialMediaData.map((el, index) => (
							<SocialMediaCard
								key={index}
								title={el.title}
								to={el.to}
								Icon={el.icon}
							/>
						))}
					</div>
				</section>
				<Separator />
			</main>
		</>
	)
}
export default ReportPage
