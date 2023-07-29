import React, { type PropsWithChildren, useEffect, useState } from 'react'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import Overlay from '@/components/overlay/Overlay'

import LoadingSection from '../loadingSection/LoadingSection'

const NavBar = dynamic(async () => await import('../navBar/NavBar'), {
	ssr: false,
})

function Loading() {
	const router = useRouter()
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const handleStart = (url: string) =>
			url !== router.pathname && !url.includes('?') && setLoading(true)
		const handleComplete = () => setLoading(false)

		router.events.on('routeChangeStart', handleStart)
		router.events.on('routeChangeComplete', handleComplete)
		router.events.on('routeChangeError', handleComplete)

		return () => {
			router.events.off('routeChangeStart', handleStart)
			router.events.off('routeChangeComplete', handleComplete)
			router.events.off('routeChangeError', handleComplete)
		}
	}, [router.pathname, router.events])

	return (
		<Overlay open={loading} preventScroll resetScroll>
			<LoadingSection />
		</Overlay>
	)
}

const Layout = ({ children }: PropsWithChildren) => {
	return (
		<>
			{Loading()}
			{children}
			<NavBar />
		</>
	)
}
export default Layout
