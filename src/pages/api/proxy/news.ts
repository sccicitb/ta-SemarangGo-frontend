import {
	createProxyMiddleware,
	responseInterceptor,
} from 'http-proxy-middleware'
import type { NextApiRequest, NextApiResponse } from 'next'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const proxyMiddleware: any = createProxyMiddleware({
	target: `${process.env.NEXT_PUBLIC_API ?? ''}`,
	changeOrigin: true,
	pathRewrite: { '^/api/proxy': '' },
	headers: {
		authorization: process.env.API_AUTH ?? '',
	},
	selfHandleResponse: true,
	onProxyRes: responseInterceptor(
		async (responseBuffer, proxyRes, req, res) => {
			let data = JSON.parse(responseBuffer.toString('utf8'))

			// manipulate JSON data here
			data = Object.assign(
				{},
				{
					...data,
					data: data.data.map(function (item: any) {
						delete item.content
						return item
					}),
				},
			)

			// return manipulated JSON
			return JSON.stringify(data)
		},
	),
})

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	res.setHeader(
		'Cache-Control',
		'public, s-maxage=300, stale-while-revalidate=600',
	)
	proxyMiddleware(req, res, (result: any) => {
		if (result instanceof Error) {
			throw result
		}
	})
}

export const config = {
	api: {
		externalResolver: true,
	},
}
