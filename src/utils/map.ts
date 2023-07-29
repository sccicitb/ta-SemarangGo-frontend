export function getKey<K>(m: Map<K, any>, val: any): K
export function getKey(m: Record<string, any>, val: any): string
export function getKey(m: any, val: any): any {
	if (m instanceof Map) {
		for (const [key, value] of m.entries()) {
			if (Array.isArray(value)) {
				if (value.includes(val)) return key
			} else {
				if (value === val) return key
			}
		}
	} else if (typeof m === 'object') {
		for (const [key, value] of Object.entries(m)) {
			if (Array.isArray(value)) {
				if (value.includes(val)) return key
			} else {
				if (value === val) return key
			}
		}
	}
}
