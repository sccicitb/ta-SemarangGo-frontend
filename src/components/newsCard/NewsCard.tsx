import { Link } from "react-router-dom";
import styles from "./NewsCard.module.css";
import fontStyles from "@/variables/font-variable.module.css"

const NewsCard = ({
  image,
  title,
  date
}: {
  image: string;
  title: string;
  date: Date;
}) => {
  return (
    <Link to="/berita">
      <div className={styles.newsCard}>
        <div className={styles.newsImageWrapper}>
          <img src={image} className={styles.newsImage}/>
        </div>
        <div className={styles.newsTextWrapper}>
          <div className={styles.newsTitleWrapper}>
            <p className={`${fontStyles.bold} ${styles.newsTitle}`}>{title}</p>
          </div>
          <span className={`${styles.newsDate} ${fontStyles.subRegular}`}>{date.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;