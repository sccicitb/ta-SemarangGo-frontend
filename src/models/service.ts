export const clusterMap = new Map<string, string>([
	['kesehatan', 'Kesehatan'],
	['pendidikan', 'Pendidikan'],
	['sosial', 'Sosial'],
	['naker', 'Ketenagakerjaan'],
	['umkm', 'UMKM'],
	['pembangunan', 'Pembangunan'],
	['desa', 'Desa'],
])

export const clusterBEMap: Record<string, string[]> = {
	kesehatan: ['kesehatan'],
	pendidikan: ['pendidikan'],
	sosial: ['sosial', 'tentram dan lind masy', 'pemb-anak perempuan'],
	naker: ['naker'],
	umkm: ['UMKM'],
	pembangunan: ['perkim', 'perec Pembgn', 'PU'],
	desa: ['pemb masy desa'],
}

export interface ServiceType {
	_id: string
	name: string
	domain: string
	tagId: string
	clusterId: string[]
	thumbnail: string
	isPublic: boolean
	description: string
}

export interface ServiceResponseData {
	status: number
	data: ServiceType
}

export interface ServiceListResponseData {
	status: number
	data: ServiceType[]
}

export interface ServiceOPDType {
	_id: string
	name: string
	userCount: number
	appCount: number
}

export interface ServiceClusterType {
	_id: string
	name: string
	appCount: number
}

export interface ServiceOPDResponseData {
	status: number
	data: ServiceOPDType
}

export interface ServiceOPDListResponseData {
	status: number
	totalData: number
	currentPage: number
	totalPage: number
	data: ServiceOPDType[]
}

export interface ServiceListPaginationResponseData {
	status: number
	totalData: number
	currentPage: number
	totalPage: number
	data: ServiceType[]
}

export interface ServiceClusterListResponseData {
	status: number
	data: ServiceClusterType[]
}
