export const getWindow = (): Window | null =>
	typeof window !== 'undefined' ? window : null

export const isBrowser = (): boolean => typeof window !== 'undefined'
