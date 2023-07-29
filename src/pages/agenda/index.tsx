import { useState } from 'react'

import Head from 'next/head'
import Image from 'next/image'

import notFoundImg from '@/assets/images/not-found-2.png'
import AgendaCard, {
	AgendaCardSkeleton,
} from '@/components/agendaCard/AgendaCard'
import DateSlider from '@/components/dateSlider/DateSlider'
import Separator from '@/components/separator/Separator'
import Header from '@/containers/header/Header'
import { GetAgendaList } from '@/services/agenda'

import styles from './index.module.scss'

const AgendaPage = () => {
	const title = 'Agenda Kegiatan'
	const [dateValue, setDateValue] = useState<Date | undefined | null>(
		new Date(),
	)
	const { data, isLoading, error } = GetAgendaList(dateValue, dateValue)

	const handleDateChange = (date: Date | null) => {
		setDateValue(date)
	}

	return (
		<>
			<Head>
				<title>Agenda</title>
				<meta name="description" content={title} />
				<meta
					name="description"
					content="Ayo berpartisipasi di berbagai kegiatan Kota Semarang!"
				/>
			</Head>
			<Header
				title={title}
				isBackButtonDisplayed={false}
				isSearchButtonDisplayed
			/>
			<main className={styles.pageWrapper}>
				<Separator />
				<section className={styles.agendaSection}>
					<DateSlider value={dateValue} onChange={handleDateChange} />
					<div className={styles.cardWrapper}>
						{(() => {
							if (isLoading) {
								return (
									<>
										<AgendaCardSkeleton />
										<AgendaCardSkeleton />
									</>
								)
							} else if (
								typeof data === 'undefined' ||
								data.status !== 200 ||
								data.data.length === 0
							) {
								return (
									<div className={styles.notFoundWrapper}>
										<Image src={notFoundImg} alt="" priority={!!error} />
										<span>Tidak ada kegiatan hari ini!</span>
									</div>
								)
							} else {
								return data.data.map((element, index) => (
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
										isDateDisplayed={false}
									/>
								))
							}
						})()}
					</div>
				</section>
			</main>
		</>
	)
}
export default AgendaPage
