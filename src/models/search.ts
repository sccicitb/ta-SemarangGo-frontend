// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type paramsType = {
	query: string
	type?: string
}

export const params = {
	query: 'q',
	type: 'type',
}

export interface ServiceSearchType {
	url: string
	title: string
	body: string
}
export interface ServiceSearchListResponseData {
	status: number
	searchResult: ServiceSearchType[]
}

export interface NewsSearchType {
	headline: string
	source: string
	url: string
	shortDescription: string
	category?: string
	postDate: string
	thumbnail: string
	content: string
	slug: string
}

export interface NewsSearchListResponseData {
	status: number
	searchResult: NewsSearchType[]
}

export interface AgendaSearchType {
	ID: number
	title: string
	scheduleDate: string
	scheduleTime: string
	location: string
}

export interface AgendaSearchListResponseData {
	status: number
	searchResult: AgendaSearchType[]
}

export interface CityIndexSearchType {
	title: string
	data: Record<string, number>
	cluster: string
}

export interface CityIndexSearchListResponseData {
	status: number
	searchResult: CityIndexSearchType[]
}

export interface SearchResponseData {
	status: number
	applications: ServiceSearchType[]
	news: NewsSearchType[]
	agendas: AgendaSearchType[]
}
