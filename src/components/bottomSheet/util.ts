export const syncHeight = () => {
	document.documentElement.style.setProperty(
		'--window-inner-height',
		`${window.innerHeight}px`,
	)
}

export interface TBottomSheetEvents {
	collapsed: string
	dismissed: string
	expanded: string
	snapToTop: string
}

export type TBottomSheetEventsKey = keyof TBottomSheetEvents

export const bottomSheetEvents: TBottomSheetEvents = {
	collapsed: 'in collapse state',
	dismissed: 'was dismissed',
	expanded: 'is expanded',
	snapToTop: 'snapped to top',
}
