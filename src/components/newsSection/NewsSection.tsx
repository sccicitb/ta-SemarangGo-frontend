import { Link, To } from "react-router-dom";

import styles from "./NewsSection.module.css";

import { NewsCardTypes } from "@/models/newsCard";
import NewsCard from "../newsCard/NewsCard";


const NewsSection = ({
  title,
  data,
  viewAllLink
}: {
  title: string;
  data: NewsCardTypes.NewsCard[];
  viewAllLink?: To;
}) => {

  return (
    <div className={styles.newsSection}>
      <div className={styles.titleCard}>
        <h3 className={styles.title}>{title}</h3>
        <Link to={viewAllLink || "/berita"}>
          <span className={styles.viewAllButton}>Lihat Semua</span>
        </Link>
      </div>
      <div className={styles.slider} >
        {
          data.map((element, index) => 
            <NewsCard
              key={index}
              image={element.image}
              title={element.title}
              date={element.date}
            />
          )
        }
      </div>
    </div>
  );
};

export default NewsSection;