export function getLocalStorage(key: string): object | undefined {
	if (typeof window === 'undefined') {
		return undefined
	}
	const val = window.localStorage.getItem(key)
	if (val) {
		return JSON.parse(val)
	}
	return undefined
}

export function setLocalStorage(key: string, val: object | string) {
	const newVal = typeof val === 'string' ? val : JSON.stringify(val)
	window.localStorage.setItem(key, newVal)
}

export function isLocalStorageAvailable() {
	const test = 'test'
	try {
		localStorage.setItem(test, test)
		localStorage.removeItem(test)
		return true
	} catch (e: unknown) {
		return false
	}
}
