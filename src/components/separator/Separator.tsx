import styles from './Separator.module.scss'

type SeparatorTypes = ['XL', 'M']

type SeparatorType = SeparatorTypes[number]

const Separator = ({
	height,
	type = 'XL',
	color,
	style,
}: {
	height?: string | number
	type?: SeparatorType
	color?: string
	style?: React.CSSProperties
}) => {
	switch (type) {
		case 'XL':
			return (
				<hr
					className={`${styles.separator} ${styles.xlSeparator}`}
					style={{ borderTopWidth: height, borderTopColor: color, ...style }}
				/>
			)
		case 'M':
			return (
				<hr
					className={`${styles.separator} ${styles.mSeparator}`}
					style={{ borderTopWidth: height, borderTopColor: color, ...style }}
				/>
			)
	}
}

export default Separator
