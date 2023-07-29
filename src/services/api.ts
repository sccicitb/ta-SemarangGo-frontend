/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { type BareFetcher } from 'swr'

export const mocksApi = axios.create({
	baseURL: process.env.MOCK_API,
})

export const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API,
	timeout: 10000,
})

export const nextApi = axios.create({
	baseURL: '/api',
	timeout: 10000,
})

export const proxyApi = axios.create({
	baseURL: '/api/proxy',
	timeout: 10000,
})

export const mockFetcher: BareFetcher = async (resource: string) =>
	await mocksApi.get(resource).then((res) => res.data)

export const apiFetcher = async (resource: string) =>
	await api.get(resource).then((res) => res.data)

export const nextApiFetcher = async (resource: string) =>
	await nextApi.get(resource).then((res) => res.data)

export const proxyApiFetcher = async (resource: string) =>
	await proxyApi.get(resource).then((res) => res.data)

export async function multiApiFetcher(urls: any[]) {
	return await Promise.all(urls.map(async (url) => await apiFetcher(url)))
}

api.interceptors.request.use(
	function (config) {
		config.headers.Authorization = 'ytta'
		config.headers['Content-Type'] = 'application/json'
		return config
	},
	async function (error) {
		return await Promise.reject(error)
	},
)

api.interceptors.response.use(
	function (response) {
		return response
	},
	async function (error) {
		// if ([401].includes(error.response.code)) {
		// 	window.location.replace('/logout')
		// 	// window.history.replaceState({}, '')
		// 	return await Promise.reject(error)
		// }
		return await Promise.reject(error.response)
	},
)

mocksApi.interceptors.response.use(
	function (response) {
		return response
	},
	async function (error) {
		return await Promise.reject(error)
	},
)

nextApi.interceptors.response.use(
	function (response) {
		return response
	},
	async function (error) {
		return await Promise.reject(error.response)
	},
)
