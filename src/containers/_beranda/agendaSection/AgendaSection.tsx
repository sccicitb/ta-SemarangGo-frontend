import Image from 'next/image'
import Link from 'next/link'

import notFoundImg from '@/assets/images/not-found-2.png'
import AgendaCard, {
	AgendaCardSkeleton,
} from '@/components/agendaCard/AgendaCard'
import { GetAgendaList } from '@/services/agenda'

import styles from './AgendaSection.module.scss'

const AgendaSection = () => {
	const title = 'Agenda Kegiatan'
	const { data, isLoading } = GetAgendaList()
	const isError =
		typeof data === 'undefined' || data.status !== 200 || data.data.length === 0

	if (isLoading) {
		return (
			<div className={styles.agendaSection}>
				<div className={styles.titleCard}>
					<h3>{title}</h3>
					<Link href="/agenda" className={styles.viewAllButton}>
						Lihat Semua
					</Link>
				</div>
				<div className={styles.cardWrapper}>
					<AgendaCardSkeleton />
					<AgendaCardSkeleton />
				</div>
			</div>
		)
	}

	return (
		<div className={styles.agendaSection}>
			<div className={styles.titleCard}>
				<h3>{title}</h3>
				<Link href="/agenda" className={styles.viewAllButton}>
					Lihat Semua
				</Link>
			</div>
			<div className={styles.cardWrapper}>
				{isError ? (
					<div className={styles.notFoundWrapper}>
						<Image src={notFoundImg} alt="" />
						<span>Tidak ada kegiatan hari ini!</span>
					</div>
				) : (
					data.data.slice(0, 3).map((element, index) => (
						<AgendaCard
							key={index}
							title={element.title}
							time={
								new Date(
									element.scheduleDate.split('T')[0] +
										'T' +
										element.scheduleTime,
								)
							}
							location={element.location}
							// showBottomSheet={false}
						/>
					))
				)}
			</div>
		</div>
	)
}
export default AgendaSection
