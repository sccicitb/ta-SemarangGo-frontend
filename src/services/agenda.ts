import useSWR from 'swr'

import { ENDPOINT_PATH } from '@/interfaces'
import { type AgendaResponseData } from '@/models/agenda'
import { toISOStringDate } from '@/utils/date'

import { apiFetcher } from './api'

const options = {
	revalidateIfStale: false,
	revalidateOnFocus: false,
	revalidateOnReconnect: false,
}

export function GetAgendaList(startDate?: Date | null, endDate?: Date | null) {
	const params = new URLSearchParams()
	params.append('startDate', toISOStringDate(startDate))
	params.append('endDate', toISOStringDate(endDate))
	const { data, isLoading, error, mutate } = useSWR<AgendaResponseData>(
		`${ENDPOINT_PATH.GET_AGENDA}?${params.toString()}`,
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
