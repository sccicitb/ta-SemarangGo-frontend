import dynamic from 'next/dynamic'

import styles from './AgendaCard.module.scss'
import AgendaTag from './AgendaTag'
import { CategoryIcon, DateIcon, LocationIcon, TimeIcon } from '../icon/SVGIcon'

const BottomSheet = dynamic(
	async () => await import('../bottomSheet/BottomSheet'),
	{
		ssr: false,
	},
)

interface AgendaBottomSheetProps {
	isOpen: boolean
	title: string
	dateValue: string
	timeValue: string
	time: Date
	location: string
	category?: string
	isDateDisplayed?: boolean
	onClose: () => void
}

const AgendaBottomSheet = ({
	isOpen,
	title,
	dateValue,
	timeValue,
	time,
	location,
	category,
	onClose,
}: AgendaBottomSheetProps) => {
	return (
		<BottomSheet
			isOpen={isOpen}
			onClose={onClose}
			initialDrawerDistanceTop={350}
		>
			<div className={styles.agendaModal}>
				<div className={styles.titleWrapper}>
					<AgendaTag startTime={time} />
					<div className={styles.title}>{title}</div>
				</div>
				<div className={styles.contentWrapper}>
					<div className={styles.contentItem}>
						<DateIcon />
						<div className={styles.contentText}>
							<span className={styles.attribute}>Tanggal Kegiatan</span>
							<span className={styles.value}>{dateValue}</span>
						</div>
					</div>
					<div className={styles.contentItem}>
						<TimeIcon />
						<div className={styles.contentText}>
							<span className={styles.attribute}>Jam Mulai</span>
							<span className={styles.value}>{timeValue}</span>
						</div>
					</div>
					<div className={styles.contentItem}>
						<CategoryIcon />
						<div className={styles.contentText}>
							<span className={styles.attribute}>Kategori Kegiatan</span>
							<span className={styles.value}>{category}</span>
						</div>
					</div>
					<div className={styles.contentItem}>
						<LocationIcon />
						<div className={styles.contentText}>
							<span className={styles.attribute}>Lokasi Kegiatan</span>
							<span className={styles.value}>{location}</span>
						</div>
					</div>
				</div>
			</div>
		</BottomSheet>
	)
}

export default AgendaBottomSheet
