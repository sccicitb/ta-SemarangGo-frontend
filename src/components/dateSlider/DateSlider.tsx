import React, {
	type LegacyRef,
	forwardRef,
	useEffect,
	useState,
	useCallback,
	useRef,
} from 'react'

import endOfISOWeek from 'date-fns/endOfISOWeek'
import startOfISOWeek from 'date-fns/startOfISOWeek'
import { type Value } from 'react-calendar/dist/cjs/shared/types'
import type SwiperCore from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { useOutsideClick } from '@/hooks/useOutsideClick'
import { getIndexDay } from '@/utils/date'

import styles from './DateSlider.module.scss'
import { NextButton, PrevButton } from '../button/Button'
import Calendar from '../calendar/Calendar'
import { NextIcon, PrevIcon } from '../icon/SVGIcon'
import 'swiper/scss'

const DateCard = ({
	date,
	isBulletDisplayed,
	onClick,
	active,
}: {
	date: Date
	isBulletDisplayed: boolean
	onClick?: (date: Date) => void
	active: boolean
}) => {
	const handleClick = () => {
		if (onClick) {
			onClick(date)
		}
	}

	return (
		<div
			className={`${styles.dateCard} ${active ? styles.dateCardActive : ''}`}
			onClick={handleClick}
		>
			<div
				className={`${styles.dateWrapper} ${
					active ? styles.dateCardActive : ''
				}`}
			>
				<span className={styles.date}>
					{date.toLocaleString('id-ID', { weekday: 'long' })}
				</span>
				<span className={styles.day}>{date.getDate()}</span>
			</div>
			<div
				className={`${styles.bullet} ${
					isBulletDisplayed ? styles.bulletDisplayed : ''
				} ${isBulletDisplayed && active ? styles.bulletActive : ''}`}
			/>
		</div>
	)
}

interface DateSliderProps {
	value: Date | undefined | null
	onChange: (date: Date | null) => void
}

const DateSlider = ({ value, onChange }: DateSliderProps) => {
	const [date, setDate] = useState<Date | undefined | null>(value ?? new Date())
	const [startDate, setStartDate] = useState(startOfISOWeek(date ?? new Date()))
	const [endDate, setEndDate] = useState(endOfISOWeek(date ?? new Date()))
	const weekTime = 7 * 24 * 60 * 60 * 1000
	const [showCalendar, setShowCalendar] = useState(false)
	const now = new Date()

	const handleCalendarInputChange = (
		value: Value,
		event: React.MouseEvent<HTMLButtonElement>,
	) => {
		if (date !== null) {
			setDate(value as Date | null)
		}
	}

	const handleDateClick = (date: Date) => {
		setDate(date)
	}

	const handleNextWeekClick = useCallback(() => {
		if (typeof date !== 'undefined' && date !== null) {
			setDate(new Date(date.getTime() + weekTime))
		} else {
			setDate(new Date(new Date().getTime() + weekTime))
		}
	}, [date, weekTime])

	const handlePrevWeekClick = useCallback(() => {
		if (typeof date !== 'undefined' && date !== null) {
			setDate(new Date(date.getTime() - weekTime))
		} else {
			setDate(new Date(new Date().getTime() - weekTime))
		}
	}, [date, weekTime])

	const SelectedWeek = forwardRef(
		({ onClick }: { onClick: any }, ref: LegacyRef<HTMLSpanElement>) => (
			<span className={styles.selectedWeek} ref={ref} onClick={onClick}>
				{`${startDate.getDate()} - ${endDate.toLocaleString('id-ID', {
					day: 'numeric',
					month: 'long',
					year: 'numeric',
				})}`}
			</span>
		),
	)
	SelectedWeek.displayName = 'SelectedWeek'

	useEffect(() => {
		if (typeof date !== 'undefined' && date !== null) {
			setStartDate(startOfISOWeek(date))
			setEndDate(endOfISOWeek(date))
			swiperRef.current?.slideTo(getIndexDay(date))
		}
	}, [date])

	useEffect(() => {
		if (typeof date !== 'undefined') {
			onChange(date)
			setShowCalendar(false)
		}
	}, [date, onChange])

	const swiperRef = useRef<SwiperCore>()
	const [disabledPrev, setDisabledPrev] = useState<boolean | undefined>(
		swiperRef.current?.isBeginning,
	)
	const [disabledNext, setDisabledNext] = useState<boolean | undefined>(
		swiperRef.current?.isEnd,
	)
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

	const calendarRef = useRef(null)
	useOutsideClick([calendarRef], () => setShowCalendar(false))

	return (
		<div className={styles.dateComponent}>
			<div className={styles.weeklyWrapper}>
				<PrevIcon onClick={handlePrevWeekClick} />
				<SelectedWeek onClick={() => setShowCalendar((prev) => !prev)} />
				<Calendar
					inputRef={calendarRef}
					className={showCalendar ? styles.calendar : styles.hide}
					value={date}
					onChange={handleCalendarInputChange}
					onClickOutside={() => setShowCalendar(false)}
				/>
				<NextIcon onClick={handleNextWeekClick} />
			</div>
			<div
				className={styles.sliderWrapper}
				onMouseEnter={(e) => {
					setButtonStyle({ opacity: 1 })
				}}
				onMouseLeave={(e) => {
					setButtonStyle({ opacity: 0 })
				}}
			>
				<Swiper
					initialSlide={getIndexDay(date ?? new Date())}
					slideToClickedSlide
					spaceBetween={10}
					effect="slide"
					slidesPerView="auto"
					className={styles.slider}
					breakpoints={{
						520: {
							spaceBetween: 20,
						},
					}}
					onBeforeInit={(swiper) => {
						swiperRef.current = swiper
					}}
				>
					{Array.from({ length: 7 }, (_, i) => {
						const d = new Date(startDate)
						d.setDate(startDate.getDate() + i)
						return (
							<SwiperSlide key={i} style={{ width: 'fit-content' }}>
								<DateCard
									date={d}
									onClick={handleDateClick}
									active={
										d.getDate() === date?.getDate() &&
										d.getMonth() === date.getMonth()
									}
									isBulletDisplayed={
										d.getDate() === now.getDate() &&
										d.getMonth() === now.getMonth()
									}
								/>
							</SwiperSlide>
						)
					})}
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
		</div>
	)
}
export default DateSlider
