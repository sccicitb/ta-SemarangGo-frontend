import {
	BloodIcon,
	CartIcon,
	CoronaIcon,
	EmergencyIcon,
	EngineeringIcon,
	GovernanceIcon,
	HealthIcon,
	MomandChildIcon,
	SportIcon,
} from '@/components/icon/SVGIcon'
import MainServiceCard from '@/components/mainServiceCard/MainServiceCard'

import styles from './MainServiceSection.module.scss'

const data = [
	{
		icon: EmergencyIcon,
		title: 'Ambulan Hebat',
		description: 'Akses ambulan darurat di Kota Semarang',
		url: 'ambulanhebat.semarangkota.go.id',
		cluster: 'kesehatan',
	},
	{
		icon: HealthIcon,
		title: 'Kamar Tersedia',
		description: 'Informasi ketersediaan kamar rumah sakit di Kota Semarang',
		url: 'infobed.rsud.semarangkota.go.id',
		cluster: 'kesehatan',
	},
	{
		icon: CoronaIcon,
		title: 'COVID-19',
		description: 'Informasi terkait COVID-19 dan vaksinasi di Kota Semarang',
		url: 'siagacorona.semarangkota.go.id',
		cluster: 'kesehatan',
	},
	{
		icon: BloodIcon,
		title: 'PMI',
		description: 'Website Palang Merah Indonesia(PMI) Kota Semarang',
		url: 'pmikotasemarang.or.id',
		cluster: 'kesehatan',
	},
	{
		icon: GovernanceIcon,
		title: 'Dinas Ketenagakerjaan',
		description: 'Halaman utama Dinas Ketenagakerjaan Kota Semarang',
		url: 'disnaker.semarangkota.go.id',
		cluster: 'naker',
	},
	{
		icon: EngineeringIcon,
		title: 'Lowongan Kerja',
		description: 'Layanan pendaftaran kerja oleh Dinas Ketenagakerjaan',
		url: 'disnaker.semarangkota.go.id/user/daftarLowongan',
		cluster: 'naker',
	},
	{
		icon: GovernanceIcon,
		title: 'Simpen',
		description: 'Sistem Informasi Pendidikan Kota Semarang',
		url: 'simpen.semarangkota.go.id',
		cluster: 'pendidikan',
	},
	{
		icon: SportIcon,
		title: 'Sang Juara',
		description: 'Aplikasi pengadministrasian kejuaraan siswa',
		url: 'sangjuara.semarangkota.go.id',
		cluster: 'pendidikan',
	},
	{
		icon: GovernanceIcon,
		title: 'Disperkim',
		description: 'Dinas Perumahan dan Kawasan Permukiman (Disperkim)',
		url: 'disperkim.semarangkota.go.id',
		cluster: 'desa',
	},
	{
		icon: GovernanceIcon,
		title: 'Disperkim',
		description: 'Dinas Perumahan dan Kawasan Permukiman (Disperkim)',
		url: 'disperkim.semarangkota.go.id',
		cluster: 'pembangunan',
	},
	{
		icon: GovernanceIcon,
		title: 'Dinas Pekerjaan Umum',
		description: 'Halaman utama situs Dinas Pekerjaan Umum',
		url: 'disperkim.semarangkota.go.id',
		cluster: 'pembangunan',
	},
	{
		icon: GovernanceIcon,
		title: 'Dinas Sosial',
		description: 'Halaman utama situs Dinas Sosial',
		url: 'dinsos.semarangkota.go.id',
		cluster: 'sosial',
	},
	{
		icon: MomandChildIcon,
		title: 'Silaga',
		description: 'Sistem Integrasi dari Lahir sampai Meninggal',
		url: 'silaga.diskominfo.semarangkota.go.id',
		cluster: 'sosial',
	},
	{
		icon: GovernanceIcon,
		title: 'Dinas KopUMKM',
		description: 'Halaman utama situs Dinas Koperasi dan UMKM',
		url: 'diskopumkm.semarangkota.go.id',
		cluster: 'umkm',
	},
	{
		icon: CartIcon,
		title: 'Data Pelaku Usaha',
		description: 'Sistem informasi digital terintegrasi pelaku usaha',
		url: 'silangitbumi.semarangkota.go.id/data-gerai-kopimi',
		cluster: 'umkm',
	},
]

interface MainServiceSectionProps {
	cluster: string
}

const MainServiceSection = ({ cluster }: MainServiceSectionProps) => {
	const filteredData = data.filter((item) => item.cluster === cluster)

	return (
		<section className={styles.section}>
			<h3>Layanan Utama</h3>
			<div className={styles.contentWrapper}>
				{filteredData.map((item, index) => (
					<MainServiceCard
						key={index}
						Icon={item.icon}
						title={item.title}
						description={item.description}
						url={item.url}
						cluster={cluster}
					/>
				))}
			</div>
		</section>
	)
}
export default MainServiceSection
