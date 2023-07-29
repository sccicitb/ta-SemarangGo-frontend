export const clusterMap = new Map<string, string>([
	['pemerintahan', 'Pemerintahan'],
	['branding', 'Branding'],
	['ekonomi', 'Ekonomi'],
	['kehidupan', 'Kehidupan'],
	['masyarakat', 'Masyarakat'],
	['lingkungan', 'Lingkungan'],
])

export const clusterSubtitleMap = new Map<string, string>([
	['pemerintahan', 'Smart Governance'],
	['branding', 'Smart Branding'],
	['ekonomi', 'Smart Economy'],
	['kehidupan', 'Smart Living'],
	['masyarakat', 'Smart Society'],
	['lingkungan', 'Smart Environment'],
])

export interface CityIndexType {
	title: string
	data: Record<string, number>
	cluster: string
}

export interface CityIndexResponseData {
	status: number
	data: CityIndexType[]
}

export interface CityIndexListResponseData {
	status: number
	data: CityIndexType[]
}

export const clusterBEMap = new Map<string, string>([
	['pemerintahan', 'Pemerintah'],
	['branding', 'Pembangunan'],
	['ekonomi', 'Ekonomi'],
	['kehidupan', 'Pendidikan'],
	['masyarakat', 'Masyarakat'],
	['lingkungan', 'Kesehatan'],
])

export const cityIndexDesc: Record<string, string> = {
	tingkatPengangguranTerbuka:
		'Tingkat Pengangguran Terbuka (TPT) adalah persentase jumlah pengangguran terhadap jumlah angkatan kerja.',
	indexPembangunanManusia:
		'Indeks Pembangunan Manusia (IPM) adalah pengukuran perbandingan dari harapan hidup, melek huruf, pendidikan dan standar hidup.',
	tingkatKearifanBudayaLokal:
		'Tingkat Kearifan Budaya Lokal merupakan indikator bagian dari budaya suatu masyarakat yang tidak dapat dipisahkan dari bahasa masyarakat itu sendiri.',
	indeksPembangunanGender:
		'Indeks Pembangunan Gender adalah pengukuran pembangunan kesetaraan gender dalam masyarakat.',
	indexReformasiBirokrasi:
		'Indeks Reformasi Birokrasi adalah pengukuran tingkat reformasi birokrasi dalam suatu pemerintahan.',
	indeksKinerjaSistemInfrastruktur:
		'Indeks Kinerja Sistem Infrastruktur (Infrastructure Performance Index) adalah sebuah pengukuran yang digunakan untuk mengevaluasi kinerja infrastruktur daerah dalam berbagai aspek, seperti transportasi, energi, telekomunikasi, dan sanitasi.',
	lajuPertumbuhanEkonomi:
		'Laju pertumbuhan ekonomi mengacu pada persentase kenaikan produk domestik bruto (PDB) daerah dalam satu periode tertentu.',
	angkaKemiskinan:
		'Angka kemiskinan mengacu pada persentase jumlah penduduk suatu wilayah yang hidup di bawah garis kemiskinan dengan pendapatan yang tidak mencukupi untuk memenuhi kebutuhan dasar hidup seperti makanan, sandang, dan papan.',
	indeksKualitasLingkunganHidup:
		'Indeks Kualitas Lingkungan Hidup (IKLH) merupakan gambaran atau indikasi awal yang memberikankesimpulan cepat dari suatu kondisi lingkungan hidup pada lingkup dan periode tertentu.',
	persentasePenurunanGangguan:
		'Persentase penurunan gangguan keamanan dan ketertiban masyarakat (Kamtibmas) mengacu pada persentase penurunan jumlah gangguan Kamtibmas dalam satu periode tertentu.',
	indeksDemokrasi:
		'Indeks Demokrasi adalah pengukuran tingkat demokrasi dalam suatu pemerintahan.',
}
