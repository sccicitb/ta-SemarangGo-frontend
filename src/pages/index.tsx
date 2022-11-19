import withUnProtectedPage from "@/components/hocs/withUnProctectedPage";
import { NavLink } from "react-router-dom";
import { useRecoilValue } from "recoil";

import SearchHeader from "@/components/searchHeader/SearchHeader";
import Separator from "@/components/separator/Separator";
import styles from "./index.module.css";
import appStyles from "./_app.module.css";
import PopularServiceSection from "@/components/popularServiceSection/PopularServiceSection";

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
      </main>
    </div>
  );
}

export default HomePage;
