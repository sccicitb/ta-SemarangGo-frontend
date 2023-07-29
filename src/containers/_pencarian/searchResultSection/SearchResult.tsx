import semarangLogo from '@/assets/images/semarang-logo.png'
import AgendaCard from '@/components/agendaCard/AgendaCard'
import IndexCard from '@/components/indexCard/IndexCard'
import NewsCard from '@/components/newsCard/NewsCard'
import ServiceCard from '@/components/serviceCard/ServiceCard'
import { cityIndexDesc, clusterBEMap } from '@/models/cityIndex'
import type * as search from '@/models/search'
import { getKey } from '@/utils/map'
import { camelCaseToTitleCase } from '@/utils/string'

import styles from './SearchResult.module.scss'
import NotFoundSection from '../notFoundSection/NotFoundSection'

const ServiceSearchResult = ({
	showAll,
	limit,
	data,
	onViewAllClick,
}: {
	showAll: boolean
	limit?: number
	data?: search.ServiceSearchType[]
	onViewAllClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}) => {
	if (!data || data.length === 0) {
		if (showAll) return <NotFoundSection />
		return <div />
	}
	return (
		<section className={styles.resultSection}>
			<div className={styles.titleWrapper}>
				<div className={styles.title}>
					<h3>{!showAll ? 'Layanan' : 'Hasil Pencarian'}</h3>
					<span>
						<b>{data.length}</b> layanan ditemukan
					</span>
				</div>
				{!showAll ? (
					<button
						value="layanan"
						className={styles.viewAllButton}
						onClick={onViewAllClick}
					>
						Lihat Semua
					</button>
				) : (
					<div />
				)}
			</div>
			<div className={styles.serviceContentWrapper}>
				{(limit ? data.slice(0, limit) : data).map((value, index) => (
					<ServiceCard
						key={index}
						image={semarangLogo}
						title={value.title}
						desc={value.body}
						org="Kota Semarang"
						url={value.url}
					/>
				))}
			</div>
		</section>
	)
}

const NewsSearchResult = ({
	showAll,
	limit,
	data,
	onViewAllClick,
}: {
	showAll: boolean
	limit?: number
	data?: search.NewsSearchType[]
	onViewAllClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}) => {
	if (!data || data.length === 0) {
		if (showAll) return <NotFoundSection />
		return <div />
	}
	return (
		<section className={styles.resultSection}>
			<div className={styles.titleWrapper}>
				<div className={styles.title}>
					<h3>{!showAll ? 'Berita' : 'Hasil Pencarian'}</h3>
					<span>
						<b>{data.length}</b> berita/artikel ditemukan
					</span>
				</div>
				{!showAll ? (
					<button
						value="berita"
						className={styles.viewAllButton}
						onClick={onViewAllClick}
					>
						Lihat Semua
					</button>
				) : (
					<div />
				)}
			</div>
			<div className={styles.newsContentWrapper}>
				{(limit ? data.slice(0, limit) : data).map((value, index) => (
					<NewsCard
						key={index}
						type="M"
						image={value.thumbnail}
						title={value.headline}
						date={new Date(value.postDate)}
						tag={value.category ?? 'lainnya'}
						slug={value.slug}
					/>
				))}
			</div>
		</section>
	)
}

const AgendaSearchResult = ({
	showAll,
	limit,
	data,
	onViewAllClick,
}: {
	showAll: boolean
	limit?: number
	data?: search.AgendaSearchType[]
	onViewAllClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}) => {
	if (!data || data.length === 0) {
		if (showAll) return <NotFoundSection />
		return <div />
	}
	return (
		<section className={styles.resultSection}>
			<div className={styles.titleWrapper}>
				<div className={styles.title}>
					<h3>{!showAll ? 'Kegiatan' : 'Hasil Pencarian'}</h3>
					<span>
						<b>{data.length}</b> kegiatan ditemukan
					</span>
				</div>
				{!showAll ? (
					<button
						value="kegiatan"
						className={styles.viewAllButton}
						onClick={onViewAllClick}
					>
						Lihat Semua
					</button>
				) : (
					<div />
				)}
			</div>
			<div className={styles.agendaContentWrapper}>
				{(limit ? data.slice(0, limit) : data).map((value, index) => (
					<AgendaCard
						key={index}
						title={value.title}
						time={
							new Date(
								value.scheduleDate.split('T')[0] + 'T' + value.scheduleTime,
							)
						}
						location={value.location}
					/>
				))}
			</div>
		</section>
	)
}

const IndexSearchResult = ({
	showAll,
	limit,
	data,
	onViewAllClick,
}: {
	showAll: boolean
	limit?: number
	data?: search.CityIndexSearchType[]
	onViewAllClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}) => {
	const currentYear = new Date().getFullYear() - 1
	if (!data || data.length === 0) {
		if (showAll) return <NotFoundSection />
		return <div />
	}
	return (
		<section className={styles.resultSection}>
			<div className={styles.titleWrapper}>
				<div className={styles.title}>
					<h3>{!showAll ? 'Indeks' : 'Hasil Pencarian'}</h3>
					<span>
						<b>{data.length}</b> indeks ditemukan
					</span>
				</div>
				{!showAll ? (
					<button
						value="indeks"
						className={styles.viewAllButton}
						onClick={onViewAllClick}
					>
						Lihat Semua
					</button>
				) : (
					<div />
				)}
			</div>
			<div className={styles.indeksContentWrapper}>
				{(limit ? data.slice(0, limit) : data).map((value, index) => (
					<IndexCard
						key={index}
						title={camelCaseToTitleCase(value.title)}
						currentIndex={value.data[currentYear]}
						targetIndex={value.data[currentYear + 1]}
						description={cityIndexDesc[value.title]}
						tag={getKey(clusterBEMap, value.cluster)}
						cluster={value.cluster}
					/>
				))}
			</div>
		</section>
	)
}

export {
	ServiceSearchResult,
	NewsSearchResult,
	AgendaSearchResult,
	IndexSearchResult,
}
