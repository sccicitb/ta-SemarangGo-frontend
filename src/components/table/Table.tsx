import { useState } from 'react'

import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
	getPaginationRowModel,
} from '@tanstack/react-table'

import { titleCase } from '@/utils/string'

import styles from './Table.module.scss'
import { NextIcon, PrevIcon } from '../icon/SVGIcon'

interface TableProps<T extends object> {
	columns?: Array<ColumnDef<T>>
	defaultData: T[]
	showFooter?: boolean
	showNavigation?: boolean
	showIndex?: boolean
}

const Table = <T extends object>({
	columns,
	defaultData,
	showFooter,
	showNavigation = true,
	showIndex = true,
}: TableProps<T>) => {
	const [data] = useState(() => [...defaultData])
	if (typeof columns === 'undefined') {
		columns = data.reduce<Array<ColumnDef<T>>>((columns, row) => {
			Object.keys(row as object).forEach((key) => {
				if (!columns.find((column) => column.id === key)) {
					columns.push({
						id: key,
						header: titleCase(key),
						cell: (row) => row.renderValue(),
						accessorKey: key,
					})
				}
			})
			return columns
		}, [])
	}
	// useEffect(() => {
	// 	if (showIndex && !columns?.find((column) => column.id === 'index')) {
	// 		setData((data) =>
	// 			data.map((row, index) => ({
	// 				index: index + 1,
	// 				...row,
	// 			})),
	// 		)
	// 		columns?.unshift({
	// 			accessorKey: 'index',
	// 			id: 'index',
	// 			header: 'No.',
	// 			cell: (row) => row.renderValue(),
	// 		})
	// 	}
	// }, [showIndex, columns])

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: showNavigation ? getPaginationRowModel() : undefined,
	})
	return (
		<>
			<table className={styles.tableWrapper}>
				<thead className={styles.head}>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{showIndex && (
								<th key={0} className={styles.headFont}>
									No.
								</th>
							)}
							{headerGroup.headers.map((header) => (
								<th key={header.id} className={styles.headFont}>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext(),
										  )}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row, index) => (
						<tr
							key={row.id}
							className={index % 2 === 0 ? styles.darkBodyBg : ''}
						>
							{showIndex && (
								<td key={index} className={styles.bodyFont}>
									{showNavigation
										? table.getState().pagination.pageSize *
												table.getState().pagination.pageIndex +
										  index +
										  1
										: index + 1}
								</td>
							)}
							{row.getVisibleCells().map((cell) => (
								<td key={cell.id} className={styles.bodyFont}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
				{showFooter ? (
					<tfoot>
						{table.getFooterGroups().map((footerGroup) => (
							<tr key={footerGroup.id}>
								{footerGroup.headers.map((header) => (
									<th key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.footer,
													header.getContext(),
											  )}
									</th>
								))}
							</tr>
						))}
					</tfoot>
				) : null}
			</table>
			{showNavigation ? (
				<div className={styles.pagination}>
					<button
						className={`${styles.arrow} ${styles.prev}`}
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						<PrevIcon />
					</button>
					<div className={styles.contentWrapper}>
						<span className={styles.pageText}>
							Halaman{' '}
							<b>
								{table.getState().pagination.pageIndex + 1} dari{' '}
								{table.getPageCount()}
							</b>
						</span>
						<div className={styles.pageSizeText}>
							Tampilkan{' '}
							<select
								value={table.getState().pagination.pageSize}
								onChange={(e) => {
									table.setPageSize(Number(e.target.value))
								}}
							>
								{[10, 20, 30, 40, 50].map((pageSize) => (
									<option key={pageSize} value={pageSize}>
										{pageSize}
									</option>
								))}
							</select>
						</div>
					</div>
					<button
						className={`${styles.arrow} ${styles.next}`}
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						<NextIcon />
					</button>
				</div>
			) : null}
		</>
	)
}
export default Table
