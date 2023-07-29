import { useEffect } from 'react'
import {
	useLocation,
	useNavigationType,
	useSearchParams,
} from 'react-router-dom'

export default function ScrollToTop() {
	const { pathname } = useLocation()
	const [searchParams] = useSearchParams()
	const navigationType = useNavigationType()

	useEffect(() => {
		if (navigationType !== 'POP') {
			window.scrollTo(0, 0)
		}
	}, [pathname, searchParams.toString()])

	return null
}
