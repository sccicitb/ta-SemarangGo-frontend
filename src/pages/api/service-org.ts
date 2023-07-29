import type { NextApiRequest, NextApiResponse } from 'next'

import data from '@/data/serviceOrg.json'
import { type OrgType } from '@/models/org'

interface Data {
	data: Record<string, OrgType>
}

export function getServiceOrg(): Record<string, OrgType> {
	return data
}

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>,
) {
	res.setHeader('Cache-Control', 's-maxage=1800')
	res.status(200).json({ data: getServiceOrg() })
}
