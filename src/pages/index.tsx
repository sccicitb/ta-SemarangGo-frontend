import withProtectedPage from "@/components/hocs/withProtectedPage";
import { Button } from "antd";
import { NavLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import LoginPage from "./login";

import SearchHeader from "@/components/searchHeader/SearchHeader";
import Separator from "@/components/separator/Separator";
import styles from "./index.module.css";
import appStyles from "./_app.module.css";

function HomePage() {
  return (
    <div>
      <header className={`${styles.header} ${appStyles.appWrapper}`}>
        <SearchHeader />
      </header>
      <main>
        <Separator />
        
      </main>
    </div>
  );
}

export default withProtectedPage(HomePage, LoginPage);
