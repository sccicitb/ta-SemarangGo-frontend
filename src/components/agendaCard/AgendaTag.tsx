import styles from './AgendaCard.module.scss'

const AgendaTag = ({
	startTime,
	endTime,
}: {
	startTime: Date
	endTime?: Date
}) => {
	const currentTime = new Date()
	const numOfHours = 1
	if (endTime === undefined) {
		endTime = new Date(startTime.getTime() + numOfHours * 60 * 60 * 1000)
	}
	switch (true) {
		case currentTime < startTime:
			return (
				<div className={`${styles.tag} ${styles.tagSoon}`}>
					<span className={`${styles.tagText}`}>Akan Datang</span>
				</div>
			)
		case currentTime >= startTime && currentTime <= endTime:
			return (
				<div className={`${styles.tag} ${styles.tagOnGoing}`}>
					<span className={`${styles.tagText}`}>Sedang Berlangsung</span>
				</div>
			)
		case currentTime > endTime:
			return (
				<div className={`${styles.tag} ${styles.tagFinished}`}>
					<span className={`${styles.tagText}`}>Selesai</span>
				</div>
			)
		default:
			return null
	}
}

export default AgendaTag
