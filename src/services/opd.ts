import useSWR from 'swr'

import { ENDPOINT_PATH } from '@/interfaces'
import { type OrgListResponseData } from '@/models/org'
import {
	type ServiceOPDListResponseData,
	type ServiceOPDResponseData,
} from '@/models/service'

import { apiFetcher, nextApiFetcher } from './api'

export function GetOPDList(
	query: string | null,
	page: number,
	sizePerPage: number,
) {
	const params = new URLSearchParams()
	params.append('page', page.toString())
	params.append('limit', sizePerPage.toString())
	if (query) {
		params.append('query', query)
	}
	const { data, isLoading, error, mutate } = useSWR<ServiceOPDListResponseData>(
		`${ENDPOINT_PATH.GET_SERVICE_ORG}?${params.toString()}`,
		apiFetcher,
	)
	return {
		data,
		isLoading,
		error,
		mutate,
	}
}

export function GetOPDByID(id: string) {
	const { data, isLoading, error, mutate } = useSWR<ServiceOPDResponseData>(
		`${ENDPOINT_PATH.GET_SERVICE_ORG}/${id}`,
		apiFetcher,
	)
	return {
		data,
		isLoading,
		error,
		mutate,
	}
}

export function GetOPDDetails(orgId: string) {
	const { data, isLoading, error, mutate } = useSWR<OrgListResponseData>(
		`${ENDPOINT_PATH.GET_ORG_DETAILS}`,
		nextApiFetcher,
	)

	return {
		data: data?.data[orgId],
		isLoading,
		error,
		mutate,
	}
}
