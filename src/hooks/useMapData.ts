/* eslint-disable no-case-declarations */
import { useEffect } from 'react'

import localforage from 'localforage'
import lodashGet from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import { atom, useRecoilState } from 'recoil'

import { ENDPOINT_PATH } from '@/interfaces'
import { apiFetcher } from '@/services/api'

const keys = ['serviceOrg', 'serviceCluster']
type keysTypes = ['serviceOrg', 'serviceCluster']
type keysType = keysTypes[number]

type tosTypes = ['idToName', 'nameToId']
type tosType = tosTypes[number]

const mapDataState = atom({
	key: 'mapData',
	default: {},
})

function useMapData() {
	const [mapData, setMapData] = useRecoilState(mapDataState)

	useEffect(() => {
		async function fetchData() {
			const data = await localforage.getItem('mapData')
			if (data === null) {
				const newData = await Promise.all(
					keys.map(async (key) => {
						const customDataToId: Record<string, any> = {}
						const customDataToName: Record<string, any> = {}
						switch (key) {
							case 'serviceOrg':
								const data1 = await apiFetcher(
									`${ENDPOINT_PATH.GET_SERVICE_ORG}?page=1&limit=100`,
								).then((res: any) => res)

								for (const item of data1.data ?? []) {
									customDataToId[item.name] = item._id
									customDataToName[item._id] = item.name
								}
								return {
									serviceOrg: {
										idToName: customDataToName,
										nameToId: customDataToId,
									},
								}
							case 'serviceCluster':
								const data2 = await apiFetcher(
									ENDPOINT_PATH.GET_SERVICE_CLUSTER,
								)
								for (const item of data2?.data ?? []) {
									customDataToId[item.name] = item._id
									customDataToName[item._id] = item.name
								}
								return {
									serviceCluster: {
										idToName: customDataToName,
										nameToId: customDataToId,
									},
								}
							default:
								return { key: {} }
						}
					}),
				)
				const newMapData = newData.reduce(
					(prev, curr) => ({ ...prev, ...curr }),
					{},
				)

				setMapData((prevMapData) => ({
					...prevMapData,
					...newMapData,
				}))

				void localforage.setItem('mapData', newMapData)
			} else {
				setMapData(() => ({
					...data,
				}))
			}
		}

		if (isEmpty(mapData)) {
			void fetchData()
		}
	}, [mapData, setMapData])

	function get(key: keysType | string, to?: tosType, defaultValue?: any) {
		return lodashGet(mapData, to ? [key, to] : key, defaultValue)
	}
	function set(key: string, value: any) {
		setMapData((prevMapData) => ({
			...prevMapData,
			[key]: value,
		}))
	}

	return {
		get,
		set,
	}
}

export default useMapData
