import { Link, To } from "react-router-dom";

import AgendaCard from "../agendaCard/agendaCard";
import { AgendaCardTypes } from "@/models/agendaCard";
import styles from "./AgendaSection.module.css";


const AgendaSection = ({
  title,
  data,
  viewAllLink
}: {
  title: string;
  data: AgendaCardTypes.AgendaCard[];
  viewAllLink?: To;
}) => {

  return (
    <div className={styles.agendaSection}>
      <div className={styles.titleCard}>
        <h3 className={styles.title}>{title}</h3>
        <Link to={viewAllLink || "/agenda"}>
          <span className={styles.viewAllButton}>Lihat Semua</span>
        </Link>
      </div>
      <div className={styles.cardWrapper} >
        {
          data.map((element, index) => 
            <AgendaCard
              key={index}
              title={element.title}
              time={element.time}
              location={element.location}
            />
          )
        }
      </div>
    </div>
  );
};

export default AgendaSection;