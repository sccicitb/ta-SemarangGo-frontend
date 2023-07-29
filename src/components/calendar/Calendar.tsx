import { useRef, type Ref } from 'react'

import CalendarLib from 'react-calendar'
import { type Value } from 'react-calendar/dist/cjs/shared/types'

import { useOutsideClick } from '@/hooks/useOutsideClick'

import 'react-calendar/dist/Calendar.css'
import styles from './Calendar.module.scss'
import { NextIcon, PrevIcon } from '../icon/SVGIcon'

interface CalendarProps {
	value?: Date | null
	onChange?: (
		value: Date | null,
		event: React.MouseEvent<HTMLButtonElement>,
	) => void
	onClickOutside?: () => void
	className?: string
	inputRef?: Ref<HTMLDivElement>
}

const Calendar = ({
	value,
	onChange,
	onClickOutside,
	className,
	inputRef,
}: CalendarProps) => {
	const handleChange = (
		value: Value,
		event: React.MouseEvent<HTMLButtonElement>,
	) => {
		if (onChange) onChange(value as Date | null, event)
	}

	const handleOnClickOutside = () => {
		if (onClickOutside) {
			onClickOutside()
		}
	}

	function tileClassName({ date, view }: { date: Date; view: string }) {
		if (date.getTime() === value?.getTime()) {
			return styles.activeItem
		}
		return styles.item
	}

	const calendarRef = useRef<HTMLDivElement>(null)
	useOutsideClick([calendarRef], () => handleOnClickOutside)

	return (
		<CalendarLib
			inputRef={inputRef}
			className={`${styles.calendar} ${className ?? ''}`}
			tileClassName={tileClassName}
			value={value}
			onChange={handleChange}
			minDetail="year"
			locale="id-ID"
			nextLabel={<NextIcon />}
			prevLabel={<PrevIcon />}
			next2Label={null}
			prev2Label={null}
		/>
	)
}
export default Calendar
