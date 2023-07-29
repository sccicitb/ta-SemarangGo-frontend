import { type Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'
import { useRouter } from 'next/router'

import {
	CustomAgendaIcon,
	CustomSmartCityIcon,
	CustomReportIcon,
	CustomHomeIcon,
	CustomNewsIcon,
	HomeIcon,
	NewsIcon,
	SmartCityIcon,
	AgendaIcon,
	ReportIcon,
} from '@/components/icon/SVGIcon'

import styles from './NavBar.module.scss'

interface navItemProps {
	to: Url
	icon: React.FC<React.SVGProps<SVGSVGElement>>
	activeIcon: React.FC<React.SVGProps<SVGSVGElement>>
	text: string
	id?: string
}

function NavItemLink({ item, ...props }: { item: navItemProps }) {
	const router = useRouter()
	const isActive = router.pathname === item.to

	return (
		<li className={styles.navItem} id={item.id}>
			<Link href={item.to} prefetch={false} {...props}>
				<>
					{isActive ? (
						<item.activeIcon className={`${styles.icon} ${styles.active}`} />
					) : (
						<item.icon className={styles.icon} />
					)}
					<span
						className={
							isActive
								? `${styles.navText} ${styles.active} `
								: `${styles.navText}`
						}
					>
						{item.text}
					</span>
				</>
			</Link>
		</li>
	)
}

const NavBar = () => {
	const data: navItemProps[] = [
		{
			to: '/',
			icon: HomeIcon,
			activeIcon: CustomHomeIcon,
			text: 'Beranda',
			id: 'home',
		},
		{
			to: '/berita',
			icon: NewsIcon,
			activeIcon: CustomNewsIcon,
			text: 'Berita',
			id: 'news',
		},
		{
			to: '/indeks-kota-cerdas',
			icon: SmartCityIcon,
			activeIcon: CustomSmartCityIcon,
			text: 'Indeks Kota',
			id: 'smartCity',
		},
		{
			to: '/agenda',
			icon: AgendaIcon,
			activeIcon: CustomAgendaIcon,
			text: 'Agenda',
			id: 'agenda',
		},
		{
			to: '/lapor',
			icon: ReportIcon,
			activeIcon: CustomReportIcon,
			text: 'Lapor',
			id: 'report',
		},
	]

	const routes = data.map((item) => item.to)
	const router = useRouter()
	const isDisplay = routes.includes(router.asPath)

	if (isDisplay) {
		return (
			<nav className={styles.nav}>
				<ul>
					{data.map((element, index) => (
						<NavItemLink key={index} item={element} />
					))}
				</ul>
			</nav>
		)
	}
	return null
}
export default NavBar
