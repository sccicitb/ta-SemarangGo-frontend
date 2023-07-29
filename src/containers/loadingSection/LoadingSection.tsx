import styles from './LoadingSection.module.scss'

const LoadingSection = () => {
	return (
		<div className={styles.loaderContainer}>
			<div className={styles.loadingSpinner} />
			{/* <Oval
				wrapperClass={styles.loadingSpinner}
				height={85}
				width={85}
				color="#da251d"
				secondaryColor="#fff2f2"
				visible
				ariaLabel="oval-loading"
				strokeWidth={5}
			/> */}
		</div>
	)
}

export default LoadingSection
