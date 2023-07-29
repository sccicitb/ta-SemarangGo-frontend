import axios, { type AxiosError, type AxiosRequestConfig } from 'axios'
import { type NextApiRequest, type NextApiResponse } from 'next'

import { filterProperties, isValidUrl } from '@/utils/url'

const METHOD = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options']

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	res.setHeader('Cache-Control', 's-maxage=1800')
	const { endpoint, method } = req.query

	if (method && !METHOD.includes(method.toString().toLowerCase())) {
		const out = {
			error:
				'Method parameter must be one of: get, post, put, delete, head, options',
		}
		res.status(400).json(out)
		return
	}

	if (!endpoint) {
		const out = {
			error: 'Missing endpoint URL!',
		}

		res.status(400).json(out)
		return
	}

	if (!isValidUrl(endpoint as string)) {
		const out = {
			error: 'Endpoint parameter must be a valid URL!',
		}

		res.status(400).json(out)
		return
	}

	try {
		const reqConfig: AxiosRequestConfig = {
			url: endpoint.toString(),
			method: method?.toString() ?? 'get',
			headers: {
				'X-Requested-With': 'XMLHttpRequest',
			},
			params: filterProperties({ ...req.query }, ['endpoint', 'method']),
		}

		const endpointReq = await axios(reqConfig)
		const endpointRes = await endpointReq.data

		res.status(200).json(endpointRes)
	} catch (err: unknown) {
		const axiosError = err as AxiosError
		const out = {
			error: 'Something went wrong...',
			message: axiosError.message,
		}

		res.status(500).json(out)
	}
}

export default handler
