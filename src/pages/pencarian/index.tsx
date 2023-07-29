import React, { useEffect } from 'react'

import Head from 'next/head'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

import SearchBar from '@/components/searchBar/SearchBar'
import Separator from '@/components/separator/Separator'
import PopularSearchSection from '@/containers/_pencarian/popularSearchSection/PopularSearchSection'
import SearchResultSection from '@/containers/_pencarian/searchResultSection/SearchResultSection'
import Header from '@/containers/header/Header'
import * as search from '@/models/search'

import styles from './index.module.scss'

const SearchPage = () => {
	const title = 'Pencarian'
	const router = useRouter()
	const searchParams = useSearchParams()

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value) {
			const url = {
				pathname: router.pathname,
				query: { ...router.query, q: e.target.value },
			}
			void router.replace(url, undefined, { shallow: true })
		} else {
			void router.replace(router.pathname, undefined, { shallow: true })
		}
	}

	const handleResetSearch = (e: React.MouseEvent<HTMLSpanElement>) => {
		void router.replace(router.pathname, undefined, { shallow: true })
	}
	const [query, setQuery] = React.useState<string | null>(
		searchParams.get(search.params.query),
	)
	useEffect(() => {
		setQuery(searchParams.get(search.params.query))
	}, [searchParams])

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta
					name="description"
					content="Cari berbagai kebutuhan informasi publik menggunakan fitur pencarian dengan mudah"
				/>
			</Head>
			<Header title={title} />
			<main className={styles.wrapper}>
				<Separator />
				<section className={styles.searchHeaderSection}>
					<SearchBar
						name="q"
						placeholder="Cari layanan dan informasi publik..."
						value={searchParams.get(search.params.query) ?? ''}
						onChange={handleSearch}
						onReset={handleResetSearch}
					/>
				</section>
				{(() => {
					if (!query || query === '') {
						return <PopularSearchSection />
					} else {
						return <SearchResultSection query={query} />
					}
				})()}
			</main>
		</>
	)
}

export default SearchPage
