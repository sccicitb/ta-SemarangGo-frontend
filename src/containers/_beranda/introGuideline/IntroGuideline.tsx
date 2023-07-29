import React, { useEffect, useState } from 'react'

import localforage from 'localforage'
import dynamic from 'next/dynamic'
import {
	type CallBackProps,
	STATUS,
	type Step,
	type TooltipRenderProps,
} from 'react-joyride'

import styles from './IntroGuideline.module.scss'

const JoyRideNoSSR = dynamic(async () => await import('react-joyride'), {
	ssr: false,
})

const Tooltip = ({
	continuous,
	index,
	size,
	step,
	isLastStep,
	backProps,
	closeProps,
	primaryProps,
	tooltipProps,
	skipProps,
}: TooltipRenderProps) => {
	let width = 290

	if (window.innerWidth > 480) {
		width = 380
	}

	return (
		<div className={styles.tooltip} {...tooltipProps} style={{ width }}>
			{step.title && <h3 className={styles.title}>{step.title}</h3>}
			<p
				className={styles.content}
				style={{ margin: step.title ? '0.5em' : '1.5em' }}
			>
				{step.content}
			</p>
			<div className={styles.footer}>
				{!isLastStep && (
					<button className={styles.skipButton} {...skipProps}>
						Lewati
					</button>
				)}
				<div className={styles.backNextWrapper}>
					{index > 0 && (
						<button className={styles.backButton} {...backProps}>
							Kembali
						</button>
					)}
					{continuous && (
						<button className={styles.primaryButton} {...primaryProps}>
							{!isLastStep ? `Lanjut (${index + 1}/${size})` : 'Selesai'}
						</button>
					)}
					{!continuous && (
						<button className={styles.primaryButton} {...closeProps}>
							Tutup
						</button>
					)}
				</div>
			</div>
		</div>
	)
}

const steps: Step[] = [
	{
		target: 'body',
		disableBeacon: true,
		content: 'Selamat datang di SemarangGo! Yuk, kenali fiturnya',
		placement: 'center',
	},
	{
		target: '#service',
		disableBeacon: true,
		title: 'Layanan Publik',
		content:
			'Temukan berbagai layanan publik digital (website/aplikasi) yang Anda butuhkan',
	},
	{
		target: '#news',
		disableBeacon: true,
		title: 'Berita',
		content: 'Cari tahu kabar terkini Kota Semarang',
	},
	{
		target: '#smartCity',
		disableBeacon: true,
		title: 'Kota Cerdas',
		content:
			'Cari tahu keadaan Kota Semarang melalui pencapaian berbagai indeks kota',
	},
	{
		target: '#agenda',
		disableBeacon: true,
		title: 'Agenda',
		content: 'Ayo berpartisipasi di berbagai kegiatan Kota Semarang',
	},
	{
		target: '#report',
		disableBeacon: true,
		title: 'Lapor',
		content:
			'Laporkan temuan dan keluhan Anda terkait pelayanan publik di Kota Semarang',
	},
	{
		target: '#search',
		disableBeacon: true,
		title: 'Pencarian',
		content:
			'Cari berbagai kebutuhan informasi publik menggunakan fitur pencarian dengan mudah',
	},
]

const IntroGuideline = () => {
	const [isLocalStorage] = useState<boolean>(
		typeof window.localStorage !== 'undefined',
	)
	const [enabled, setEnabled] = useState<boolean | undefined>(false)
	const [firstVisit, setFirstVisit] = useState<boolean | undefined>(true)
	const key = 'previouslyVisited'

	useEffect(() => {
		if (firstVisit) {
			if (isLocalStorage) {
				const value = window.localStorage.getItem(key) === 'true'
				if (!value) {
					setEnabled(true)
				}
			} else {
				void localforage.getItem(key).then((value) => {
					if (value === null || value === false) {
						setEnabled(true)
					}
				})
			}
		}
	}, [enabled, firstVisit, isLocalStorage])

	const handleJoyrideCallback = (data: CallBackProps) => {
		const { status } = data
		const finishedStatuses: string[] = [
			STATUS.FINISHED,
			STATUS.SKIPPED,
			STATUS.ERROR,
		]

		if (finishedStatuses.includes(status)) {
			setEnabled(false)
			setFirstVisit(false)
			if (isLocalStorage) {
				window.localStorage.setItem(key, 'true')
			} else {
				void localforage.setItem(key, true)
			}
		}
	}

	return (
		<JoyRideNoSSR
			run={enabled}
			steps={steps}
			continuous
			disableScrolling
			callback={handleJoyrideCallback}
			showProgress
			showSkipButton
			hideCloseButton
			locale={{
				back: 'Kembali',
				last: 'Selesai',
				next: 'Lanjut',
				skip: 'Lewati',
				close: 'Tutup',
			}}
			tooltipComponent={Tooltip}
		/>
	)
}
export default IntroGuideline
