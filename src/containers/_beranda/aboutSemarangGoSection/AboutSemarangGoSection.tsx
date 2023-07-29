import styles from './AboutSemarangGoSection.module.scss'

const AboutSemarangGoSection = () => {
	const title = 'Tentang SemarangGo'
	const description =
		'SemarangGo merupakan sebuah platform informasi publik yang berfungsi sebagai portal bagi masyarakat Kota Semarang. Masyarakat dapat mengakses berbagai informasi dan layanan publik yang berada di Kota Semarang.'
	return (
		<section className={styles.sectionWrapper}>
			<h1>{title}</h1>
			<p>{description}</p>
		</section>
	)
}

export default AboutSemarangGoSection
