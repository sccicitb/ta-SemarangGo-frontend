import { useEffect, useState } from 'react'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import Separator from '@/components/separator/Separator'
import { Tab, Tabs } from '@/components/tab/Tab'
import { ENDPOINT_PATH } from '@/interfaces'
import * as search from '@/models/search'
import { apiFetcher } from '@/services/api'
import { SearchAgenda, SearchCityIndex } from '@/services/search'

import {
	AgendaSearchResult,
	IndexSearchResult,
	NewsSearchResult,
	ServiceSearchResult,
} from './SearchResult'
import styles from './SearchResult.module.scss'
import NotFoundSection from '../notFoundSection/NotFoundSection'

const searchCategory = {
	service: {
		name: 'Layanan',
		value: 'layanan',
	},
	news: {
		name: 'Berita',
		value: 'berita',
	},
	agenda: {
		name: 'Kegiatan',
		value: 'kegiatan',
	},
	index: {
		name: 'Indeks',
		value: 'indeks',
	},
}

const searchCategoryData = [
	{
		name: 'Semua',
		value: '',
	},
	{
		name: 'Layanan',
		value: 'layanan',
	},
	{
		name: 'Berita',
		value: 'berita',
	},
	{
		name: 'Kegiatan',
		value: 'kegiatan',
	},
	{
		name: 'Indeks',
		value: 'indeks',
	},
]

const SearchResultSection = ({ query }: { query: string }) => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const [activeFilter, setActiveFilter] = useState(0)

	useEffect(() => {
		const type = searchParams.get(search.params.type)
		if (type) {
			setActiveFilter(
				searchCategoryData.findIndex((item) => item.value === type),
			)
		}
	}, [searchParams])

	const handleFilterChange = (
		e: React.MouseEvent<HTMLButtonElement>,
		value: string | number,
	) => {
		setActiveFilter(typeof value === 'string' ? parseInt(value) : value)
		const type = e.currentTarget.getAttribute('name')
		if (type && type !== '') {
			const url = {
				pathname: router.pathname,
				query: { ...router.query, type },
			}
			void router.replace(url, undefined, { shallow: true })
		} else {
			const { type, ...routerQuery } = router.query
			void router.replace(
				{
					query: { ...routerQuery },
				},
				undefined,
				{ shallow: true },
			)
		}
	}

	const handleSearchTypeClick = (e: React.MouseEvent) => {
		const value = e.currentTarget.getAttribute('value')
		if (value && value !== '') {
			const url = {
				pathname: router.pathname,
				query: { ...router.query, type: value },
			}
			void router.replace(url, undefined, { shallow: true })
		} else {
			const { type, ...routerQuery } = router.query
			void router.replace(
				{
					query: { ...routerQuery },
				},
				undefined,
				{ shallow: true },
			)
		}
	}

	const AllServiceResult = () => {
		const { data, isLoading, error } =
			useSWR<search.ServiceSearchListResponseData>(
				`${ENDPOINT_PATH.GET_SERVICE_SEARCH}?query=${query}`,
				apiFetcher,
			)
		if (isLoading) {
			return <div />
		}
		if (error || data?.status !== 200) {
			return <NotFoundSection />
		}
		return <ServiceSearchResult showAll data={data.searchResult} />
	}

	const AllNewsResult = () => {
		const { data, isLoading, error } =
			useSWR<search.NewsSearchListResponseData>(
				`${ENDPOINT_PATH.GET_NEWS_SEARCH}?query=${query}`,
				apiFetcher,
			)
		if (isLoading) {
			return <div />
		}
		if (error || data?.status !== 200) {
			return <NotFoundSection />
		}
		return <NewsSearchResult showAll data={data.searchResult} />
	}

	const AllAgendaResult = () => {
		const { data, isLoading, error } = SearchAgenda(query)
		if (isLoading) {
			return <div />
		}
		if (error || data.status !== 200) {
			return <NotFoundSection />
		}
		return <AgendaSearchResult showAll data={data.data} />
	}

	const AllIndexResult = () => {
		const { data, isLoading, error } = SearchCityIndex(query)
		if (isLoading) {
			return <div />
		}
		if (error || data?.status !== 200) {
			return <NotFoundSection />
		}
		return <IndexSearchResult showAll data={data.data} />
	}

	const SearchAllResult = ({ limit }: { limit?: number }) => {
		const { data, isLoading } = useSWR<search.SearchResponseData>(
			`${ENDPOINT_PATH.GET_SEARCH}?query=${query}`,
			apiFetcher,
		)
		const { data: indexData } = SearchCityIndex(query)
		if (isLoading) {
			return <div />
		}
		if (
			!data ||
			data.status !== 200 ||
			(data.applications.length === 0 &&
				data.news.length === 0 &&
				data.agendas.length === 0 &&
				indexData?.data?.length === 0)
		) {
			return <NotFoundSection />
		}
		return (
			<>
				{data.applications.length > 0 && (
					<>
						<ServiceSearchResult
							data={data.applications}
							showAll={false}
							limit={limit}
							onViewAllClick={handleSearchTypeClick}
						/>
						<Separator />
					</>
				)}
				{data.news.length > 0 && (
					<>
						<NewsSearchResult
							data={data.news}
							showAll={false}
							limit={limit}
							onViewAllClick={handleSearchTypeClick}
						/>
						<Separator />
					</>
				)}
				{data.agendas.length > 0 && (
					<>
						<AgendaSearchResult
							data={data.agendas}
							showAll={false}
							limit={limit}
							onViewAllClick={handleSearchTypeClick}
						/>
						<Separator />
					</>
				)}
				<IndexSearchResult
					data={indexData?.data}
					showAll={false}
					limit={limit}
					onViewAllClick={handleSearchTypeClick}
				/>
			</>
		)
	}

	return (
		<>
			<section className={styles.searchCategorySection}>
				<div className={styles.filterWrapper}>
					<Tabs selectedTab={activeFilter} onChange={handleFilterChange}>
						{searchCategoryData.map((value, index) => (
							<Tab
								key={index}
								label={value.name}
								name={value.value}
								value={index}
							/>
						))}
					</Tabs>
				</div>
			</section>
			<Separator />
			{(() => {
				switch (searchParams.get('type')) {
					case searchCategory.service.value:
						return <AllServiceResult />
					case searchCategory.news.value:
						return <AllNewsResult />
					case searchCategory.agenda.value:
						return <AllAgendaResult />
					case searchCategory.index.value:
						return <AllIndexResult />
					default:
						return <SearchAllResult limit={3} />
				}
			})()}
		</>
	)
}

export default SearchResultSection
