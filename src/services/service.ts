import useSWR from 'swr'

import { ENDPOINT_PATH } from '@/interfaces'
import {
	type ServiceClusterListResponseData,
	type ServiceListPaginationResponseData,
} from '@/models/service'

import { apiFetcher, multiApiFetcher } from './api'

const options = {
	revalidateIfStale: false,
	revalidateOnFocus: false,
	revalidateOnReconnect: false,
}

export function GetServiceListByOPD(
	opdID: string,
	page: number,
	sizePerPage: number,
) {
	const params = new URLSearchParams()
	params.append('dinas', opdID)
	params.append('page', page.toString())
	params.append('limit', sizePerPage.toString())

	const { data, isLoading, error, mutate } =
		useSWR<ServiceListPaginationResponseData>(
			`${ENDPOINT_PATH.GET_SERVICE}?${params.toString()}`,
			apiFetcher,
		)
	return {
		data,
		isLoading,
		error,
		mutate,
	}
}

export function GetServiceClusterList() {
	const { data, isLoading, error, mutate } =
		useSWR<ServiceClusterListResponseData>(
			`${ENDPOINT_PATH.GET_SERVICE_CLUSTER}}`,
			apiFetcher,
		)
	return {
		data,
		isLoading,
		error,
		mutate,
	}
}

export function GetServiceListByCluster(
	clusterID: string | undefined,
	page: number,
	sizePerPage: number,
) {
	const params = new URLSearchParams()
	if (clusterID) params.append('cluster', clusterID)
	params.append('page', page.toString())
	params.append('limit', sizePerPage.toString())

	const { data, isLoading, error, mutate } =
		useSWR<ServiceListPaginationResponseData>(
			`${ENDPOINT_PATH.GET_SERVICE}?${params.toString()}`,
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

export function GetServiceListByMultipleCluster(
	clusterID: string[] | undefined,
	page: number,
	sizePerPage: number,
) {
	const urls = []
	for (const id of clusterID ?? []) {
		if (id) {
			const params = new URLSearchParams()
			if (clusterID) params.append('cluster', id)
			params.append('page', page.toString())
			params.append('limit', sizePerPage.toString())
			urls.push(`${ENDPOINT_PATH.GET_SERVICE}?${params.toString()}`)
		}
	}

	const { data, isLoading, error, mutate } = useSWR<
		ServiceListPaginationResponseData[]
	>(urls.length > 0 ? urls : null, multiApiFetcher)

	return {
		data,
		isLoading,
		error,
		mutate,
	}
}
