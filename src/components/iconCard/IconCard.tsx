import { type Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'

import styles from './IconCard.module.scss'

const IconCard = ({
	name,
	Icon,
	to,
}: {
	name: string
	Icon: React.FC<React.SVGProps<SVGSVGElement>>
	to: Url
}) => {
	return (
		<div className={styles.iconCard}>
			<Link href={to} prefetch={false}>
				<div className={styles.iconBackground}>
					<Icon className={styles.icon} />
				</div>
			</Link>
			<Link href={to} prefetch={false}>
				<span className={styles.name}>{name}</span>
			</Link>
		</div>
	)
}

export default IconCard
