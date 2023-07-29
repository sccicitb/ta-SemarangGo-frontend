import { AxiosError } from 'axios'
import { type GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import Separator from '@/components/separator/Separator'
import OPDSection from '@/containers/_layanan/opdSection/OPDSection'
import { OPDServiceSection } from '@/containers/_layanan/serviceSection/ServiceSection'
import Header from '@/containers/header/Header'
import { type ErrorResponseData } from '@/models/error'
import { type OrgType } from '@/models/org'
import ErrorPage from '@/pages/_error'
import { getServiceOrg } from '@/pages/api/service-org'

import styles from './index.module.scss'

interface OPDServicePageProps {
	data: OrgType
	error?: ErrorResponseData
}

const OPDServicePage = ({ data, error }: OPDServicePageProps) => {
	const router = useRouter()
	const { id } = router.query

	if (error) {
		return <ErrorPage />
	}

	return (
		<>
			<Head>
				<title>{data.name}</title>
				<meta name="description" content={data.description} />
				<meta name="keywords" content={data.name} />
				<meta name="keywords" content="semarang" />
				<meta name="keywords" content="dinas" />
			</Head>
			<Header title="Dinas" isBackButtonDisplayed />
			<main className={styles.pageWrapper}>
				<Separator />
				<OPDSection
					title={data.name}
					description={data.description}
					telp={data.phone}
					email={data.email}
					address={data.address}
					url={data.website}
				/>
				<Separator />
				<OPDServiceSection
					title="Layanan"
					opdID={id?.toString() ?? ''}
					pagination
				/>
			</main>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async ({
	req,
	res,
	params,
}) => {
	res.setHeader(
		'Cache-Control',
		'public, s-maxage=60, stale-while-revalidate=120',
	)
	const { id } = params as {
		id: string
	}
	try {
		const data = getServiceOrg()

		return {
			props: {
				data: data[id],
			},
		}
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			return {
				props: {
					error: {
						status: error.response?.status,
						data: error.message,
					},
				},
			}
		}
		return {
			props: {
				error:
					error !== undefined
						? JSON.parse(JSON.stringify(error))
						: 'Unknown error',
			},
		}
	}
}
export default OPDServicePage
