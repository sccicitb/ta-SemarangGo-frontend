import { useEffect, type MutableRefObject } from 'react'

export const useOutsideClick = <T extends Array<MutableRefObject<any>>>(
	ref: T,
	callback: () => void,
): void => {
	useEffect(() => {
		const handler = (event: MouseEvent | TouchEvent): void => {
			// Check if the mouse click was within the element's ref.
			if (ref.length === 0) return
			const node = ref.find((x) => x.current?.contains(event.target as Node))

			if (!node) {
				callback()
			}
		}

		window.addEventListener('mousedown', handler)
		window.addEventListener('touchstart', handler)

		return (): void => {
			window.removeEventListener('mousedown', handler)
			window.removeEventListener('touchstart', handler)
		}
	}, [ref, callback])
}
