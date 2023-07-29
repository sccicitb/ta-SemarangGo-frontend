export interface OrgType {
	name: string
	description: string
	phone: string
	email: string
	address: string
	website: string
}

export interface OrgListResponseData {
	data: Record<string, OrgType>
}
