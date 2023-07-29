import { useState } from 'react'

import semarangLogo from '@/assets/images/semarang-logo.png'
import Pagination from '@/components/pagination/Pagination'
import ServiceCard, {
	ServiceCardSkeleton,
} from '@/components/serviceCard/ServiceCard'
import useMapData from '@/hooks/useMapData'
import { clusterBEMap } from '@/models/service'
import {
	GetServiceListByMultipleCluster,
	GetServiceListByOPD,
} from '@/services/service'
import { getKey } from '@/utils/map'

import styles from './ServiceSection.module.scss'

interface ClusterServiceSectionProps {
	title: string
	cluster: string
	pagination: boolean
	itemsPerPage?: number
}

interface OPDServiceSectionProps {
	title: string
	opdID: string
	pagination: boolean
	itemsPerPage?: number
}

const ClusterServiceSection = ({
	title,
	cluster,
	pagination,
	itemsPerPage = 5,
}: ClusterServiceSectionProps) => {
	const [page, setPage] = useState<number>(1)
	const { get } = useMapData()
	const orgNameMap = get('serviceOrg', 'idToName', {})
	const clusterBEList = clusterBEMap[cluster]
	const clusterMap = get('serviceCluster', 'nameToId', {})

	const clusterIDs = clusterBEList.map((clusterBE) => clusterMap[clusterBE])
	const { data, isLoading } = GetServiceListByMultipleCluster(
		clusterIDs,
		page,
		10,
	)

	const handlePageClick = (event: { selected: number }) => {
		setPage(event.selected + 1)
	}
	return (
		<section className={styles.serviceSection}>
			<div className={styles.titleWrapper}>
				<h3>{title}</h3>
				<span className={styles.totalService}>
					<b>
						{data?.map((el) => el.totalData).reduce((acc, curr) => acc + curr)}
					</b>{' '}
					layanan ditemukan
				</span>
			</div>
			{isLoading ? (
				<>
					<ServiceCardSkeleton />
					<ServiceCardSkeleton />
					<ServiceCardSkeleton />
				</>
			) : (
				data?.map((el) =>
					el.data.map((item, index) => (
						<ServiceCard
							key={index}
							image={item.thumbnail === '-' ? semarangLogo : item.thumbnail}
							title={item.name}
							desc={item.description}
							org={orgNameMap[item.tagId]}
							url={item.domain}
							isImageDisplayed
							isOrgDisplayed
							id={item._id}
							cluster={cluster}
						/>
					)),
				)
			)}
			{pagination && (
				<Pagination
					itemsPerPage={itemsPerPage}
					onPageChange={handlePageClick}
					className={styles.pagination}
					pageCount={data && (clusterIDs.length > 1 ? 1 : data[0].totalPage)}
				/>
			)}
		</section>
	)
}

const OPDServiceSection = ({
	title,
	opdID,
	pagination,
	itemsPerPage = 5,
}: OPDServiceSectionProps) => {
	const [page, setPage] = useState<number>(1)
	const { get } = useMapData()
	const orgNameMap = get('serviceOrg', 'idToName', {})
	const clusterNameMap = get('serviceCluster', 'idToName', {})
	const { data, isLoading } = GetServiceListByOPD(opdID, page, itemsPerPage)

	const handlePageClick = (event: { selected: number }) => {
		setPage(event.selected + 1)
	}
	return (
		<section className={styles.serviceSection}>
			<div className={styles.titleWrapper}>
				<h3>{title}</h3>
				<span className={styles.totalService}>
					<b>{data?.totalData}</b> layanan ditemukan
				</span>
			</div>
			{isLoading ? (
				<>
					<ServiceCardSkeleton />
					<ServiceCardSkeleton />
					<ServiceCardSkeleton />
				</>
			) : (
				data?.data.map((item, index) => (
					<ServiceCard
						key={index}
						image={item.thumbnail === '-' ? semarangLogo : item.thumbnail}
						title={item.name}
						desc={item.description}
						org={orgNameMap[item.tagId]}
						url={item.domain}
						isImageDisplayed
						isOrgDisplayed={typeof opdID === 'undefined'}
						id={item._id}
						cluster={getKey(clusterBEMap, clusterNameMap[item.clusterId[0]])}
					/>
				))
			)}
			{pagination && (
				<Pagination
					itemsPerPage={itemsPerPage}
					onPageChange={handlePageClick}
					className={styles.pagination}
					pageCount={data?.totalPage}
				/>
			)}
		</section>
	)
}

export { ClusterServiceSection, OPDServiceSection }
