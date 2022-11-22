import withUnProtectedPage from "@/components/hocs/withUnProctectedPage";
import { NavLink } from "react-router-dom";
import { useRecoilValue } from "recoil";

import styles from "./index.module.css";
import appStyles from "./_app.module.css";

import SearchHeader from "@/components/searchHeader/SearchHeader";
import Separator from "@/components/separator/Separator";
import PopularServiceSection from "@/components/popularServiceSection/PopularServiceSection";
import Carousel from "@/components/carousel/Carousel";
import SmartCityAnalysisSection from "@/components/smartCityAnalysisSection/SmartCityAnalysisSection";
import { NewsCardTypes } from "@/models/newsCard";
import NewsSection from "@/components/newsSection/NewsSection";
import { AgendaCardTypes } from "@/models/agendaCard";
import AgendaSection from "@/components/agendaSection/AgendaSection";
import SemarangGoSection from "@/components/semarangGoSection/SemarangGoSection";

const newsData: NewsCardTypes.NewsCard[] = [
  {
    image: "/src/assets/images/news-1.png",
    title: "Berita Semarang Hari Ini Wow Sangat Keren Semarang Hari Ini. Let\’s go brother and sisterr",
    date: new Date("2022-08-16T00:00:00")
  },
  {
    image: "/src/assets/images/news-1.png",
    title: "Berita Semarang Hari Ini Wow Sangat Keren Semarang Hari Ini. Let\’s go brother and sisterr",
    date: new Date("2022-08-16T00:00:00")
  },
  {
    image: "/src/assets/images/news-1.png",
    title: "Berita Semarang Hari Ini Wow Sangat Keren Semarang Hari Ini. Let\’s go brother and sisterr",
    date: new Date("2022-08-16T00:00:00")
  }
]

const agendaData: AgendaCardTypes.AgendaCard[] = [
  {
    title: "Upacara Hari Perhubungan Nasional Tahun 2022 Tk. Kita Semarang",
    time: new Date("2022-11-08T07:30:00"),
    location: "Halaman Kantor Dinas Perhubungan Kota Semarang"
  },
  {
    title: "Rapat Badan Anggaran DPRD Kota Semarang Pembahasan Raperda tentang Perubahanan APBD Kota Semarang TA. 2022",
    time: new Date("2022-11-08T09:00:00"),
    location: "Ballroom Quest Hotel Semarang"
  },
]

function HomePage() {
  return (
    <div>
      <header className={`${styles.header} ${appStyles.appHeaderWrapper}`}>
        <SearchHeader />
      </header>
      <main className={styles.mainWrapper}>
        <Separator />
        <PopularServiceSection />
        <Separator />
        <Carousel />
        <Separator />
        <SmartCityAnalysisSection />
        <Separator />
        <NewsSection
          title="Kabar Terkini"
          data={newsData}
        />
        <Separator />
        <AgendaSection 
          title={"Agenda Kegiatan"} 
          data={agendaData}          
        />
        <Separator />
        <SemarangGoSection />
      </main>
    </div>
  );
}

export default HomePage;
