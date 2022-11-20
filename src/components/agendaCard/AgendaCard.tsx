import { Link } from "react-router-dom";

import { 
  MdOutlineCalendarToday as DateIcon,
  MdOutlineSchedule as TimeIcon,
  MdOutlineLocationOn as LocationIcon,
} from "react-icons/md";

import styles from "./AgendaCard.module.css";
import fontStyles from "@/variables/font-variable.module.css"

const AgendaCard = ({
  title,
  time,
  location
}: {
  title: string;
  time: Date;
  location: string;
}) => {
  var currentTime = new Date();
  const startTime = time;
  const numOfHours = 1;
  const endTime = new Date(startTime.getTime() + numOfHours * 60 * 60 * 1000);
  const Tag = () => {
    switch (true) {
      case currentTime<startTime:
        return (
          <div className={`${styles.tag} ${styles.soon}`}>
            <span className={`${fontStyles.tag} ${styles.tagText}`}>
              Segera
            </span>
          </div>
        )
      case (currentTime>=startTime && currentTime<=endTime):
        return (
          <div className={`${styles.tag} ${styles.onGoing}`}>
            <span className={`${fontStyles.tag} ${styles.tagText}`}>
              Sedang Berlangsung
            </span>
          </div>
        )
      case currentTime>endTime:
        return (
          <div className={`${styles.tag} ${styles.finished}`}>
            <span className={`${fontStyles.tag} ${styles.tagText}`}>
              Selesai
            </span>
          </div>
        )
      default:
        return null
    }
  };

  return (
    <div className={styles.agendaCard}>
      <Tag />
      <div className={styles.agendaTitleWrapper}>
        <p className={`${fontStyles.agendaTitle} ${styles.agendaTitle}`}>{title}</p>
      </div>
      <div className={styles.agendaDateTimeWrapper}>
        <div className={styles.iconWrapper}>
          <DateIcon className={styles.icon}/>
        </div>
        <span className={`${fontStyles.agendaContent} ${styles.dateTimeText}`}>
          {time.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
      </div>
      <div className={styles.agendaDateTimeWrapper}>
        <div className={styles.iconWrapper}>
          <TimeIcon className={styles.icon}/>
        </div>
        <span className={`${fontStyles.agendaContent} ${styles.dateTimeText}`}>
          {time.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
        </span>
      </div>
      <div className={styles.agendaLocWrapper}>
        <div className={styles.iconWrapper}>
          <LocationIcon className={styles.icon}/>
        </div>
        <p className={`${fontStyles.agendaContent} ${styles.locationText}`}>
          {location}
        </p>
      </div>
    </div>
  );
};

export default AgendaCard;