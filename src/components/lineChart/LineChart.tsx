import { useRef, useState } from 'react'

import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'

import {
	maxScreenWidth,
	colorPrimaryRedAlt,
	colorMonoWhite,
	colorMonoDarkGrey,
	fontFamily,
} from './LineChart.module.scss'

if (typeof Highcharts === 'object') {
	HighchartsExporting(Highcharts)
}

interface LineChartProps<T extends object> {
	data: T[]
	title: string
	chartTitle: string
	xAxisTitle: string
	yAxisTitle: string
	xAxisKey: keyof T
	yAxisKey: keyof T
	zoneValue?: number
}

const LineChart = <T extends object>({
	data,
	title,
	chartTitle,
	xAxisTitle,
	yAxisTitle,
	xAxisKey,
	yAxisKey,
	zoneValue,
}: LineChartProps<T>) => {
	const chartData = data.map((row) => ({
		x: row[xAxisKey],
		y: row[yAxisKey],
	}))
	const chartRef = useRef<HighchartsReact.RefObject>()
	const [chartOptions] = useState<Highcharts.Options>({
		title: {
			text: title,
		},
		xAxis: {
			title: {
				text: xAxisTitle,
			},
			crosshair: {
				dashStyle: 'Dash',
			},
			ordinal: false,
			minRange: 1,
		},
		yAxis: {
			title: {
				text: yAxisTitle,
			},
			allowDecimals: true,
			opposite: false,
			labels: {
				formatter: function (): string {
					return this.value.toLocaleString('id-ID')
				},
			},
			gridLineDashStyle: 'Dash',
			gridLineWidth: 0.5,
			plotLines: [
				{
					value: 0,
					width: 1,
					color: '#808080',
				},
			],
		},
		legend: {
			layout: 'horizontal',
			align: 'center',
			verticalAlign: 'top',
		},
		plotOptions: {
			series: {
				label: {
					connectorAllowed: false,
				},
			},
		},
		series: [
			{
				type: 'line',
				name: chartTitle,
				data: chartData as unknown as any[],
				lineWidth: 2,
				color: colorPrimaryRedAlt,
				marker: {
					fillColor: colorMonoWhite,
					lineWidth: 2,
					radius: 3,
					lineColor: colorPrimaryRedAlt,
				},
				animation: {
					duration: 500,
				},
				zoneAxis: 'x',
				zones: [
					{
						value: zoneValue,
					},
					{
						dashStyle: 'Dot',
					},
				],
			},
		],
		chart: {
			backgroundColor: 'transparent',
			renderTo: 'container',
			style: {
				fontFamily,
			},
			width:
				typeof window !== 'undefined' &&
				window.innerWidth < parseInt(maxScreenWidth)
					? window.innerWidth
					: null,
		},
		navigation: {
			buttonOptions: {
				enabled: false,
			},
		},
		rangeSelector: { enabled: false },
		credits: { enabled: false },
		tooltip: {
			animation: true,
			useHTML: true,
			backgroundColor: colorMonoWhite,
			borderColor: colorMonoDarkGrey,
			borderWidth: 1,
			borderRadius: 15,
			shadow: {
				offsetX: 1,
				offsetY: 2,
				width: 2,
				opacity: 0.05,
			},
			shape: 'square',
			hideDelay: 100,
			outside: false,
			pointFormatter: function () {
				return `${this.series.name}: <b>${
					this.y?.toLocaleString('id-ID') ?? ''
				}</b>`
			},
		},
		navigator: {
			handles: {
				width: 20,
				height: 30,
			},
			maskFill: 'rgba(78, 125, 217, 0.2)',
			outlineWidth: 0,
			enabled: false,
			xAxis: {},
		},
		scrollbar: {
			enabled: false,
		},
	})

	return (
		<div>
			<HighchartsReact
				highcharts={Highcharts}
				options={chartOptions}
				constructorType="chart"
				ref={chartRef}
			/>
		</div>
	)
}
export default LineChart
