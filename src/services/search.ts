import { useEffect, useState } from 'react'

import filter from 'lodash/filter'
import includes from 'lodash/includes'
import useSWR from 'swr'

import { ENDPOINT_PATH } from '@/interfaces'
import {
	type CityIndexType,
	type CityIndexListResponseData,
	cityIndexDesc,
} from '@/models/cityIndex'
import { type SearchResponseData } from '@/models/search'
import { camelCaseToTitleCase } from '@/utils/string'

import { apiFetcher } from './api'

export function SearchAgenda(query?: string) {
	const params = new URLSearchParams()
	if (query) params.append('query', query)

	const { data, isLoading, error, mutate } = useSWR<SearchResponseData>(
		`${ENDPOINT_PATH.GET_SEARCH}?${params.toString()}`,
		apiFetcher,
	)

	return {
		data: { status: data?.status, data: data?.agendas },
		isLoading,
		error,
		mutate,
	}
}

export function SearchCityIndex(query?: string) {
	const { data, isLoading, error, mutate } = useSWR<CityIndexListResponseData>(
		`${ENDPOINT_PATH.GET_CITY_INDEX}`,
		apiFetcher,
	)

	const [filteredData, setFilteredData] = useState<CityIndexType[] | undefined>(
		[],
	)
	useEffect(
		() =>
			setFilteredData(
				data
					? filter(
							data.data,
							(item) =>
								includes(
									camelCaseToTitleCase(item.title).toLowerCase(),
									query?.toLowerCase() ?? '',
								) ||
								includes(
									cityIndexDesc[item.title].toLowerCase(),
									query?.toLowerCase() ?? '',
								),
					  )
					: [],
			),
		[data, query],
	)

	return {
		data: query ? { ...data, data: filteredData } : undefined,
		isLoading,
		error,
		mutate,
	}
}
