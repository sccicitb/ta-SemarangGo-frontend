import styles from './OutlinedButton.module.scss'
import { LinkToIcon } from '../icon/SVGIcon'

const OutlinedButton = ({
	text,
	value,
	onClick,
	className,
	iconClassName,
	isIconDisplayed = true,
}: {
	text?: string
	value?: string
	onClick?: React.MouseEventHandler
	className?: string
	iconClassName?: string
	isIconDisplayed?: boolean
}) => {
	return (
		<button
			type="button"
			className={`${styles.button} ${className ?? ''}`}
			onClick={onClick}
			value={value}
		>
			{text}
			{isIconDisplayed && (
				<LinkToIcon className={`${styles.icon} ${iconClassName ?? ''}`} />
			)}
		</button>
	)
}

export default OutlinedButton
