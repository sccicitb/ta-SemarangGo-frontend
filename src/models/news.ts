export type newsCategoryTypes = [
	'kesehatan',
	'pendidikan',
	'pariwisata',
	'transportasi',
	'bisnis-umkm',
	'pemerintahan',
	'lainnya',
]
export type newsCategoryType = newsCategoryTypes[number]

export const newsCategoryTypeToTitle: Record<newsCategoryType, string> = {
	kesehatan: 'Kesehatan',
	pendidikan: 'Pendidikan',
	pariwisata: 'Pariwisata',
	transportasi: 'Transportasi',
	'bisnis-umkm': 'Bisnis & UMKM',
	pemerintahan: 'Pemerintahan',
	lainnya: 'Lainnya',
}

export interface NewsType {
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

export interface NewsResponseData {
	status: number
	data: NewsType
}

export interface NewsListResponseData {
	status: number
	currentPage: number
	totalPage: number

	data: NewsType[]
}
