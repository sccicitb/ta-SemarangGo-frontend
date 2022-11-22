import { useState } from "react";
import { NavLink } from "react-router-dom";

import styles from "./NavBar.module.css";
import fontStyles from "@/variables/font-variable.module.css"

import { 
  MdOutlineHome as HomeIcon,
  MdHome as ActiveHomeIcon,
  MdOutlineFeed as NewsIcon,
  MdFeed as ActiveNewsIcon,
  MdOutlineEventNote as AgendaIcon,  
  MdEventNote as ActiveAgendaIcon,
  MdInsights as SmartCityIcon,
} from "react-icons/md";


const NavBar = () => {
  const [activeLink, setActiveLink] = useState<number>(0);

  const data = [
    {
      link: "/",
      icon: HomeIcon,
      activeIcon: ActiveHomeIcon,
      text: "Beranda"
    },
    {
      link: "/news",
      icon: NewsIcon,
      activeIcon: ActiveNewsIcon,
      text: "Berita"
    },
    {
      link: "/agenda",
      icon: AgendaIcon,
      activeIcon: ActiveAgendaIcon,
      text: "Agenda"
    },
    {
      link: "/smart-city",
      icon: SmartCityIcon,
      activeIcon: SmartCityIcon,
      text: "Smart City"
    }
  ]

  const handleClick = ({ index }: {index: number}) => {
    setActiveLink(index);
  }
  
  return (
    <nav className={styles.navBarWrapper}>
      {data.map((element, index) => 
        <NavLink 
          to={element.link} 
          key={index} 
          onClick={() => handleClick}
          className={({ isActive }) =>
            isActive ? `${styles.navItem} ${styles.active}` : `${styles.navItem} ${styles.inactive}`
          }
        >
          <div className={styles.iconWrapper}>
            { //Check if active
              activeLink === index
                ? <element.activeIcon className={styles.icon}/>
                : <element.icon />
            }
          </div>
          <span className={fontStyles.subRegular}>
            {element.text}
          </span>
        </NavLink>
      )}
    </nav>
  );
};
export default NavBar;