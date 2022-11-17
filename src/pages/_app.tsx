import { ReactNode } from "react";
import styles from "./_app.module.css";

interface Props {
  children: ReactNode;
}

export default function App({ children }: Props) {
  return <div className={styles.appWrapper} id="app-root">{children}</div>;
}
