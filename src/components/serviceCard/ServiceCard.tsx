import { Link, To } from "react-router-dom";
import { IconType } from "react-icons/lib";
import styles from "./ServiceCard.module.css";


const ServiceCard = ({
  name,
  Icon,
  link
}: {
  name: String;
  Icon: IconType;
  link: To;
}) => {
  return (
    <div className={styles.serviceCard}>
      <Link to={link}>
        <div className={styles.iconBackGround}>
          <Icon className={styles.icon} />
        </div>
      </Link>
      <Link to={link}>
        <span className={styles.serviceName}>{name}</span>
      </Link>
    </div>
  );
};

export default ServiceCard;