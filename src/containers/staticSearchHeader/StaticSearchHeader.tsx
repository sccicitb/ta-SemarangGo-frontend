import Image from 'next/image'
import Link from 'next/link'

import logoImg from '@/assets/images/sego-logo.png'
import SearchBar from '@/components/searchBar/SearchBar'

import styles from './StaticSearchHeader.module.scss'

const StaticSearchHeader = () => {
	return (
		<header className={styles.headerWrapper}>
			<Link href="/">
				<Image
					src={logoImg}
					alt="SemarangGo Logo"
					className={styles.logo}
					priority
				/>
			</Link>
			<Link
				href="/pencarian"
				className={styles.searchWrapper}
				id="search"
				prefetch={false}
			>
				<SearchBar placeholder="Cari layanan dan informasi..." disabled />
			</Link>
		</header>
	)
}

export default StaticSearchHeader
