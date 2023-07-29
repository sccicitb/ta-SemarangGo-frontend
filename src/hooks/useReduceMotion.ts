import { useState, useEffect } from 'react'

const useReduceMotion = () => {
	const [matches, setMatch] = useState(
		typeof window !== 'undefined'
			? window.matchMedia('(prefers-reduced-motion: reduce)').matches
			: false,
	)
	useEffect(() => {
		const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
		const handleChange = () => {
			setMatch(mq.matches)
		}
		handleChange()
		mq.addEventListener('change', handleChange)
		return () => {
			mq.removeEventListener('change', handleChange)
		}
	}, [])
	return matches
}
export default useReduceMotion
