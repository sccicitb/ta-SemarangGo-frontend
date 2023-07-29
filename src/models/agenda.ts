export interface AgendaType {
	ID: number
	title: string
	scheduleDate: string
	scheduleTime: string
	location: string
}

export interface AgendaResponseData {
	data: AgendaType[]
	status: number
}
