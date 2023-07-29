const slugSeparator = '-'

export const slugify = (...args: Array<string | number>): string => {
	const value = args.join(' ')

	return value
		.normalize('NFD') // split an accented letter in the base letter and the acent
		.replace(/[\u0300-\u036f]/g, '') // remove all previously split accents
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9 ]/g, '') // remove all chars not letters, numbers and spaces (to be replaced)
		.replace(/\s+/g, slugSeparator) // separator
}

export const slugToTitle = (str: string, separator?: string) => {
	if (separator === undefined) {
		separator = slugSeparator
	}
	return str
		.replaceAll(separator, ' ')
		.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase())
}

export const titleCase = (title: string) =>
	title
		.split(/ /g)
		.map((word) => `${word.substring(0, 1).toUpperCase()}${word.substring(1)}`)
		.join(' ')

export const camelCaseToTitleCase = (camelCase: string) =>
	camelCase
		.split(/(?=[A-Z])/)
		.map((word) => `${word.substring(0, 1).toUpperCase()}${word.substring(1)}`)
		.join(' ')

export const toCamelCase = (str: string) =>
	str
		.replace(/\s(.)/g, function (a) {
			return a.toUpperCase()
		})
		.replace(/\s/g, '')
		.replace(/^(.)/, function (b) {
			return b.toLowerCase()
		})

export const slugToCamelCase = (str: string, separator?: string) => {
	if (separator === undefined) {
		separator = slugSeparator
	}
	return toCamelCase(slugToTitle(str, separator))
}
