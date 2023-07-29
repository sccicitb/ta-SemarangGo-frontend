import useSWR from 'swr'

import { ENDPOINT_PATH } from '@/interfaces'
import { type NewsListResponseData } from '@/models/news'

import { proxyApiFetcher } from './api'

const options = {
	revalidateIfStale: false,
	revalidateOnFocus: false,
	revalidateOnReconnect: false,
}

export function GetNewsList(page?: number, limit?: number) {
	const params = new URLSearchParams()
	if (page) params.append('page', page.toString())
	if (limit) params.append('limit', limit.toString())

	const { data, isLoading, error, mutate } = useSWR<NewsListResponseData>(
		`${ENDPOINT_PATH.GET_NEWS}?${params.toString()}`,
		proxyApiFetcher,
		options,
	)

	return {
		data,
		isLoading,
		error,
		mutate,
	}
}
