import { Link, To } from "react-router-dom";

import styles from "./ServiceSection.module.css";

import { ServiceGridTypes } from "@/models/serviceGrid";
import ServiceCard from "../serviceCard/ServiceCard";


const ServiceSection = ({
  title,
  columnCount,
  data,
  isViewAllAvaliable,
  viewAllLink
}: {
  title: string;
  columnCount: number;
  data: ServiceGridTypes.ServiceGrid[];
  isViewAllAvaliable: boolean;
  viewAllLink?: To;
}) => {

  return (
    <div className={styles.serviceSection}>
      <div className={styles.titleCard}>
        <h3 className={styles.title}>{title}</h3>
        { //Check if view all available
          !isViewAllAvaliable
          ? <div/>
          : <Link to={viewAllLink || "/"}>
              <span className={styles.viewAllButton}>Lihat Semua</span>
            </Link>
        }
      </div>
      <div className={styles.grid} style={{gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`}}>
        {
          data.map((element, index) => 
            <ServiceCard
              key={index}
              name={element.name}
              Icon={element.icon}
              link={element.link}
            />
          )
        }
      </div>
    </div>
  );
};

export default ServiceSection;