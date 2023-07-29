/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
	dest: 'public',
	disable: process.env.NODE_ENV === 'development',
})

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
})

const nextConfig = withPWA({
	reactStrictMode: true,
	webpack(config, { isServer }) {
		// camel-case style names from css modules
		config.module.rules
			.find(({ oneOf }) => !!oneOf)
			.oneOf.filter(({ use }) => JSON.stringify(use)?.includes('css-loader'))
			.reduce((acc, { use }) => acc.concat(use), [])
			.forEach(({ options }) => {
				if (options.modules) {
					options.modules.exportLocalsConvention = 'camelCase'
				}
			})

		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			use: ['@svgr/webpack'],
		})

		return config
	},
	// TODO: config lint and typescript in prod
	eslint: {
		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true,
	},
	typescript: {
		// !! WARN !!
		// Dangerously allow production builds to successfully complete even if
		// your project has type errors.
		// !! WARN !!
		ignoreBuildErrors: true,
	},
})

module.exports = withBundleAnalyzer(nextConfig)
