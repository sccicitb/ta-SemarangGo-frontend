import { type UrlObject } from 'url'

import { useCallback, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import Dialog from '../dialog/Dialog'

export interface LeaveConfirmDialogProps {
	shouldConfirmLeave: boolean
}

const LeaveConfirmDialog = ({
	shouldConfirmLeave,
}: LeaveConfirmDialogProps) => {
	const [shouldShowLeaveConfirmDialog, setShouldShowLeaveConfirmDialog] =
		useState(false)
	const [nextRouterPath, setNextRouterPath] = useState<string | null>()

	const Router = useRouter()

	const onRouteChangeStart = useCallback(
		(nextPath: string) => {
			if (!shouldConfirmLeave) {
				return
			}

			setShouldShowLeaveConfirmDialog(true)
			setNextRouterPath(nextPath)

			// eslint-disable-next-line @typescript-eslint/no-throw-literal
			throw 'cancelRouteChange'
		},
		[shouldConfirmLeave],
	)

	const onCancelRouteChange = () => {
		setNextRouterPath(null)
		setShouldShowLeaveConfirmDialog(false)
	}

	const onConfirmRouteChange = () => {
		setShouldShowLeaveConfirmDialog(false)
		Router.events.off('routeChangeStart', onRouteChangeStart) // simply remove the listener
		void Router.push(nextRouterPath as unknown as UrlObject)
	}

	useEffect(() => {
		Router.events.on('routeChangeStart', onRouteChangeStart)

		return () => {
			Router.events.off('routeChangeStart', onRouteChangeStart)
		}
	}, [Router.events, onRouteChangeStart])

	useEffect(() => {
		Router.beforePopState(({ url, as, options }) => {
			if (as !== Router.asPath) {
				if (shouldConfirmLeave) {
					setShouldShowLeaveConfirmDialog(true)
					setNextRouterPath(url)

					// eslint-disable-next-line @typescript-eslint/no-throw-literal
					throw 'cancelRouteChange'
				}
			}
			return true
		})

		return () => {
			Router.beforePopState(() => true)
		}
	}, [Router, shouldConfirmLeave])

	return (
		<Dialog
			title="Perhatian!"
			description="Apakah Anda yakin untuk meninggalkan halaman ini? Data yang Anda isi dan belum dikirimkan akan terhapus dan Anda harus melakukan kembali proses yang dilakukan."
			confirmLabel="Lanjut ke halaman selanjutnya"
			cancelLabel="Batal"
			isOpen={shouldShowLeaveConfirmDialog}
			onConfirm={onConfirmRouteChange}
			onCancel={onCancelRouteChange}
		/>
	)
}
export default LeaveConfirmDialog
