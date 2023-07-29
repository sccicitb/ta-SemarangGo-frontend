import React, { useState, useRef, useEffect } from 'react'

import { DebounceInput } from 'react-debounce-input'

import styles from './SearchBar.module.scss'
import { CloseIcon, SearchIcon } from '../icon/SVGIcon'

const SearchBar = ({
	name,
	placeholder,
	value,
	onChange,
	onClick,
	onFocus,
	onBlur,
	onReset,
	disabled,
}: {
	name?: string
	placeholder?: string
	value?: string
	onChange?: React.ChangeEventHandler
	onClick?: React.MouseEventHandler
	onFocus?: React.FocusEventHandler
	onBlur?: React.FocusEventHandler
	onReset?: React.MouseEventHandler
	disabled?: boolean
}) => {
	const [inputValue, setInputValue] = useState<string>(value ?? '')
	const ref = useRef<HTMLInputElement>(null)

	const clearInput = (e: React.MouseEvent<HTMLSpanElement>) => {
		setInputValue('')
		ref.current?.setAttribute('value', '')
		if (typeof onReset !== 'undefined') {
			onReset(e)
		}
	}

	const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
		ref.current?.focus()
		if (typeof onClick !== 'undefined') {
			onClick(e)
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value)
		if (typeof onChange !== 'undefined') {
			onChange(e)
		}
	}

	useEffect(() => {
		setInputValue(value ?? '')
	}, [value])

	return (
		<div className={styles.search} onClick={handleClick}>
			<div className={styles.searchIcon}>
				<SearchIcon />
			</div>
			<DebounceInput
				name={name}
				type="text"
				inputMode="search"
				returnKeyType="search"
				enterKeyHint="search"
				autoCapitalize={false}
				autocapitalize="none"
				inputRef={ref}
				placeholder={placeholder}
				value={inputValue}
				onChange={handleChange}
				onFocus={onFocus}
				onBlur={onBlur}
				autoFocus
				disabled={disabled}
				minLength={2}
				debounceTimeout={500}
			/>
			<div className={styles.searchIcon}>
				{
					// Check if input exist
					inputValue.length === 0 ? (
						<div />
					) : (
						<button id={styles.clearButton} onClick={clearInput}>
							<CloseIcon />
						</button>
					)
				}
			</div>
		</div>
	)
}

export default SearchBar
