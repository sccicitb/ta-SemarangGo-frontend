/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-fragments */
import { Fragment } from 'react'

import dynamic from 'next/dynamic'

const NoSSR = (props: { children: React.ReactNode }) => (
	<Fragment>{props.children}</Fragment>
)

export default dynamic(async () => await Promise.resolve(NoSSR), {
	ssr: false,
})
