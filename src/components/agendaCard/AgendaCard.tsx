import { useEffect, useState } from 'react'

import dynamic from 'next/dynamic'
import ContentLoader from 'react-content-loader'

import styles from './AgendaCard.module.scss'
import AgendaTag from './AgendaTag'
import { DateIcon, LocationIcon, TimeIcon } from '../icon/SVGIcon'

const AgendaBottomSheet = dynamic(
	async () => await import('./AgendaBottomSheet'),
	{
		ssr: false,
	},
)

interface AgendaCardProps {
	title: string
	time: Date
	location: string
	category?: string
	isDateDisplayed?: boolean
	showBottomSheet?: boolean
}

const AgendaCard = ({
	title,
	time,
	location,
	category = 'PemKot Semarang',
	isDateDisplayed = true,
	showBottomSheet = true,
}: AgendaCardProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const dateValue = time.toLocaleDateString('id-ID', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})
	const timeValue =
		time.toLocaleTimeString('id-ID', {
			hour: '2-digit',
			minute: '2-digit',
		}) + ' WIB'

	const [isOpenDelay, setIsOpenDelay] = useState(isOpen)
	useEffect(() => {
		if (isOpen) setIsOpenDelay(true)
		else {
			const timeout = setTimeout(() => {
				setIsOpenDelay(false)
			}, 150)
			return () => clearTimeout(timeout)
		}
	}, [isOpen])
	return (
		<>
			<div className={styles.agendaCard} onClick={() => setIsOpen(true)}>
				<AgendaTag startTime={time} />
				<div className={styles.title}>{title}</div>
				{isDateDisplayed && (
					<div className={styles.dateTimeWrapper}>
						<DateIcon className={styles.icon} />
						<span className={styles.dateTime}>{dateValue}</span>
					</div>
				)}
				<div className={styles.dateTimeWrapper}>
					<TimeIcon className={styles.icon} />
					<span className={styles.dateTime}>{timeValue}</span>
				</div>
				<div className={styles.locWrapper}>
					<LocationIcon className={styles.icon} />
					<p className={styles.location}>{location}</p>
				</div>
			</div>
			{showBottomSheet && isOpenDelay && (
				<AgendaBottomSheet
					isOpen={isOpen}
					title={title}
					dateValue={dateValue}
					timeValue={timeValue}
					category={category}
					time={time}
					location={location}
					onClose={() => setIsOpen(false)}
				/>
			)}
		</>
	)
}

export default AgendaCard

export const AgendaCardSkeleton = ({ ...props }) => (
	<ContentLoader
		speed={2}
		style={{ width: '100%', height: 125 }}
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
		uniqueKey="agenda-card-skeleton"
		{...props}
	>
		<rect x="13" y="11" rx="8" ry="8" width="70" height="30" />
		<rect x="13" y="47" rx="3" ry="3" width="381" height="14" />
		<circle cx="26" cy="82" r="13" />
		<rect x="53" y="76" rx="3" ry="3" width="178" height="10" />
		<circle cx="26" cy="112" r="13" />
		<rect x="53" y="107" rx="3" ry="3" width="178" height="10" />
	</ContentLoader>
)
