import { RiArrowRightUpLine as LinkIcon } from "react-icons/ri";
import styles from "./SemarangGoSection.module.css";
import fontStyles from "@/variables/font-variable.module.css"


const SemarangGoSection: React.FC = () => {
  return (
    <div className={styles.sectionWrapper}>
      <div>
        <h1 className={styles.titleText}>Tentang SemarangGo</h1>
      </div>
      <div>
        <p className={`${fontStyles.regular} ${styles.contentText}`}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dignissim tincidunt lacus, quis convallis enim facilisis varius. Nullam pulvinar erat ipsum, nec venenatis ligula suscipit ut. 
        </p>
      </div>
      <div className={styles.buttonWrapper}>
        <button className={`${fontStyles.button} ${styles.button}`}>
          Selengkapnya
          <div className={styles.iconWrapper}>
            <LinkIcon className={styles.icon}/>
          </div>
        </button>
      </div>
    </div>
  )
}

export default SemarangGoSection;