import https from 'https'
import { type TLSSocket } from 'tls'
import { type UrlObject } from 'url'

import validator from 'validator'

export function removeProtocol(url: string) {
	return url.replace(/^https?:\/\//, '')
}

export function isProtocolExist(url: string) {
	return url.startsWith('http://') || url.startsWith('https://')
}

export function isValidUrl(url: string) {
	const pattern = new RegExp(
		'^([a-zA-Z]+:\\/\\/)?' + // protocol
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
			'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
			'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
			'(\\#[-a-z\\d_]*)?$', // fragment locator
		'i',
	)
	return pattern.test(url)
}

export function filterProperties(raw: object, unallowed: string[]): object {
	return Object.keys(raw)
		.filter((key) => !unallowed.includes(key))
		.reduce((obj, key) => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			obj[key] = raw[key]
			return obj
		}, {})
}

export async function pingURL(url: UrlObject | string): Promise<boolean> {
	try {
		const res = await fetch(
			`/api/proxy/page?method=head&endpoint=${
				typeof url === 'string' ? url : url.href ?? ''
			}`,
		)
		return res.ok
	} catch (error: unknown) {
		return false
	}
}

export async function checkHTTPS(url: UrlObject | string) {
	if (typeof url === 'string') {
		if (url.startsWith('https')) {
			return true
		} else if (url.startsWith('http')) {
			return false
		} else {
			return await pingURL('https://' + url)
		}
	} else {
		return url.protocol === 'https:'
	}
}

const getDaysBetween = (validFrom: Date | number, validTo: Date | number) => {
	return Math.round(Math.abs(+validFrom - +validTo) / 8.64e7)
}

const getDaysRemaining = (validFrom: Date | number, validTo: Date | number) => {
	const daysRemaining = getDaysBetween(validFrom, validTo)
	if (new Date(validTo).getTime() < new Date().getTime()) {
		return -daysRemaining
	}
	return daysRemaining
}

interface SSLCertificateInfo {
	daysRemaining: number
	valid: boolean
	validFrom: string
	validTo: string
}

const getSSLCertificateInfo = async (
	host: string,
): Promise<SSLCertificateInfo> => {
	if (!validator.isFQDN(host)) {
		return await Promise.reject(new Error('Invalid host.'))
	}
	const options = {
		agent: false,
		method: 'HEAD',
		port: 443,
		rejectUnauthorized: false,
		hostname: host,
	}

	return await new Promise((resolve, reject) => {
		try {
			const req = https.request(options, (res) => {
				const crt = (res.socket as TLSSocket).getPeerCertificate()
				const vFrom = crt.valid_from
				const vTo = crt.valid_to
				const validTo = new Date(vTo)
				resolve({
					daysRemaining: getDaysRemaining(new Date(), validTo),
					valid: (res.socket as TLSSocket).authorized || false,
					validFrom: new Date(vFrom).toISOString(),
					validTo: validTo.toISOString(),
				})
			})
			req.on('error', reject)
			req.end()
		} catch (e: unknown) {
			reject(e)
		}
	})
}

export const checkCertificateValidity = async (host: string) => {
	let isValid = true
	try {
		const res = await getSSLCertificateInfo(host)
		if (res.daysRemaining <= 0 || !res.valid) {
			isValid = false
		}
	} catch (err: unknown) {
		isValid = false
	}

	return isValid
}
