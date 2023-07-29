import useSWR from 'swr'

import { ENDPOINT_PATH } from '@/interfaces'
import { type CityIndexListResponseData } from '@/models/cityIndex'

import { apiFetcher } from './api'

const options = {
	revalidateIfStale: false,
	revalidateOnFocus: false,
	revalidateOnReconnect: false,
}

export function GetCityIndexList() {
	const { data, isLoading, error, mutate } = useSWR<CityIndexListResponseData>(
		`${ENDPOINT_PATH.GET_CITY_INDEX}`,
		apiFetcher,
		options,
	)
	return {
		data,
		isLoading,
		error,
		mutate,
	}
}

export function GetCityIndexListByCluster(cluster: string) {
	const { data, isLoading, error, mutate } = useSWR<CityIndexListResponseData>(
		`${ENDPOINT_PATH.GET_CITY_INDEX}/cluster/${cluster}`,
		apiFetcher,
		options,
	)
	return {
		data,
		isLoading,
		error,
		mutate,
	}
}
