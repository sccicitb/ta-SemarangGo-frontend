import { useState } from 'react'

import { type ColumnDef } from '@tanstack/react-table'
import { AxiosError } from 'axios'
import { type GetServerSideProps } from 'next'
import Head from 'next/head'

import LineChart from '@/components/lineChart/LineChart'
import Separator from '@/components/separator/Separator'
import { Tab, Tabs } from '@/components/tab/Tab'
import Table from '@/components/table/Table'
import Header from '@/containers/header/Header'
import { ENDPOINT_PATH } from '@/interfaces'
import { cityIndexDesc, type CityIndexResponseData } from '@/models/cityIndex'
import { type ErrorResponseData } from '@/models/error'
import ErrorPage from '@/pages/_error'
import { api } from '@/services/api'
import { camelCaseToTitleCase, slugToCamelCase } from '@/utils/string'

import styles, { colorMonoWhite } from './index.module.scss'

interface Item {
	year: number
	value: number
}

const columns: Array<ColumnDef<Item>> = [
	{
		accessorKey: 'year',
		id: 'year',
		header: 'Tahun',
		cell: (row) => row.renderValue(),
	},
	{
		accessorKey: 'value',
		id: 'value',
		header: 'Nilai Indeks',
		cell: (row) => row.getValue<number>().toLocaleString('id-ID'),
	},
]

interface CityIndexContentPageProps {
	data: CityIndexResponseData
	error?: ErrorResponseData
}

const CityIndexContentPage = ({ data, error }: CityIndexContentPageProps) => {
	const [activeTab, setActiveTab] = useState(0)
	if (error) {
		return <ErrorPage statusCode={error.status} />
	}

	const handleTabChange = (
		e: React.MouseEvent<HTMLButtonElement>,
		value: string | number,
	) => {
		setActiveTab(typeof value === 'string' ? parseInt(value) : value)
	}
	const pageTitle = 'Indeks Kota'
	const title = camelCaseToTitleCase(data.data[0].title)
	const desc = cityIndexDesc[data.data[0].title]
	const currentYear = new Date().getFullYear()
	const yearData = data.data[0].data[currentYear]
	const chartDataSize = 10
	const targetData =
		data.data[0].data[
			Object.keys(data.data[0].data)[Object.keys(data.data[0].data).length - 1]
		]
	const dataPerYear = Object.entries(data.data[0].data).map((item) => ({
		year: parseInt(item[0]),
		value: item[1],
	}))
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="keywords" content={pageTitle} />
			</Head>
			<Header title={pageTitle} isBackButtonDisplayed />
			<main className={styles.pageWrapper}>
				<Separator />
				<section className={styles.detailedIndexSection}>
					<h3>{title}</h3>
					<p>{desc}</p>
					<div className={styles.currentDataWrapper}>
						<div className={styles.currentData}>
							<span className={styles.tag}>Tahun ini</span>
							<span className={styles.value}>
								{yearData.toLocaleString('id-ID')}
							</span>
						</div>
						<div className={styles.currentData}>
							<span className={styles.tag}>Target</span>
							<span className={styles.value}>
								{targetData.toLocaleString('id-ID')}
							</span>
						</div>
					</div>
				</section>
				<Separator height={20} color={colorMonoWhite} />
				<section className={styles.chartSection}>
					<div className={styles.tabWrapper}>
						<Tabs selectedTab={activeTab} onChange={handleTabChange}>
							<Tab label="Grafik" value={0} />
							<Tab label="Tabel" value={1} />
						</Tabs>
					</div>
					<Separator style={{ width: '100%' }} />
					<div className={styles.chartWrapper}>
						{(() => {
							switch (activeTab) {
								case 0:
									return (
										<LineChart
											data={dataPerYear.slice(-chartDataSize)}
											title="Perkembangan Indeks per Tahun"
											chartTitle={title}
											xAxisTitle="Tahun"
											yAxisTitle="Indeks"
											xAxisKey="year"
											yAxisKey="value"
											zoneValue={currentYear}
										/>
									)
								case 1:
									return (
										<Table
											defaultData={dataPerYear}
											columns={columns}
											showNavigation
											showIndex
										/>
									)
								default:
									return (
										<LineChart
											data={[]}
											title=""
											chartTitle=""
											xAxisTitle=""
											yAxisTitle=""
											xAxisKey=""
											yAxisKey=""
										/>
									)
							}
						})()}
					</div>
				</section>
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
		'public, s-maxage=3600, stale-while-revalidate',
	)
	const { slug } = params as {
		cluster: string
		slug: string
	}
	try {
		const res = await api.get(
			`${ENDPOINT_PATH.GET_CITY_INDEX}/${slugToCamelCase(slug)}`,
		)
		const data = res.data as CityIndexResponseData

		return {
			props: {
				data: {
					...data,
				},
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
				error: {
					status: 404,
					data: 'Something went wrong',
				},
			},
		}
	}
}

export default CityIndexContentPage
